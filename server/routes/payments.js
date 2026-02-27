import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

const PLANS = {
  family_monthly: { price: 89900, name: 'Family Monthly', interval: 'month' },
  family_yearly: { price: 719900, name: 'Family Yearly', interval: 'year' },
  family_pro_monthly: { price: 149900, name: 'Family Pro Monthly', interval: 'month' },
  family_pro_yearly: { price: 1199900, name: 'Family Pro Yearly', interval: 'year' },
};

// Helper to get Stripe instance
const getStripe = async () => {
  const Stripe = (await import('stripe')).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
};

/**
 * POST /api/payments/create-checkout-session
 * Create a Stripe checkout session for a subscription
 */
router.post('/create-checkout-session', authenticateToken, authorize('parent', 'school_admin'), async (req, res) => {
  try {
    const { planId, successUrl, cancelUrl } = req.body;
    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({ success: false, message: 'Invalid plan' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(503).json({ success: false, message: 'Payment service not configured' });
    }

    const stripe = await getStripe();

    // Create or get Stripe customer
    let customerId = req.user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: `${req.user.firstName} ${req.user.lastName}`,
        metadata: { userId: req.user.id },
      });
      customerId = customer.id;
      // Save to DB (simplified)
    }

    // Create price dynamically
    const price = await stripe.prices.create({
      unit_amount: plan.price,
      currency: 'pkr',
      recurring: { interval: plan.interval },
      product_data: { name: plan.name },
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/parent/subscription?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: { userId: req.user.id, planId },
      subscription_data: {
        trial_period_days: 7,
        metadata: { userId: req.user.id, planId },
      },
    });

    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ success: false, message: 'Failed to create checkout session' });
  }
});

/**
 * POST /api/payments/cancel-subscription
 * Cancel the current subscription at period end
 */
router.post('/cancel-subscription', authenticateToken, authorize('parent', 'school_admin'), async (req, res) => {
  try {
    const subscriptionId = req.user.subscriptionId;
    if (!subscriptionId) {
      return res.status(400).json({ success: false, message: 'No active subscription found' });
    }

    const stripe = await getStripe();
    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

    res.json({ success: true, message: 'Subscription will be canceled at the end of the billing period' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel subscription' });
  }
});

/**
 * GET /api/payments/subscription-status
 * Get current subscription status
 */
router.get('/subscription-status', authenticateToken, async (req, res) => {
  try {
    const { Payment } = await import('../models/index.js');
    const payment = await Payment.findOne({ userId: req.user.id }).sort({ createdAt: -1 });

    if (!payment) {
      return res.json({
        success: true,
        subscription: { plan: 'free', status: 'active', features: [] },
      });
    }

    res.json({
      success: true,
      subscription: {
        plan: payment.plan,
        status: payment.status,
        currentPeriodEnd: payment.currentPeriodEnd,
        cancelAtPeriodEnd: payment.cancelAtPeriodEnd,
        trialEnd: payment.trialEnd,
      },
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ success: false, message: 'Failed to get subscription status' });
  }
});

/**
 * POST /api/payments/webhook
 * Stripe webhook handler
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(400).json({ success: false, message: 'Webhook secret not configured' });
  }

  let event;
  try {
    const stripe = await getStripe();
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ success: false, message: `Webhook Error: ${err.message}` });
  }

  try {
    const { Payment, User } = await import('../models/index.js');

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await Payment.findOneAndUpdate(
          { userId },
          {
            userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer,
            plan: subscription.metadata?.planId || 'family',
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
          },
          { upsert: true, new: true }
        );

        // Update user subscription
        await User.findByIdAndUpdate(userId, {
          'subscription.plan': subscription.metadata?.planId || 'family',
          'subscription.status': subscription.status,
          'subscription.expiresAt': new Date(subscription.current_period_end * 1000),
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await Payment.findOneAndUpdate({ userId }, { status: 'canceled' });
        await User.findByIdAndUpdate(userId, {
          'subscription.plan': 'free',
          'subscription.status': 'inactive',
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.warn(`Payment failed for customer: ${invoice.customer}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

export default router;
