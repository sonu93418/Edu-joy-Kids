"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Star, Zap, Shield, ArrowRight, X } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const PLANS = [
  {
    id: "free",
    name: "Free",
    emoji: "🌱",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Start your learning journey",
    color: "from-gray-400 to-gray-600",
    popular: false,
    features: [
      "1 child profile",
      "10 free lessons per month",
      "Basic progress tracking",
      "Games & activities",
      "Mobile friendly",
    ],
    missing: [
      "Unlimited lessons",
      "AI Study Buddy",
      "Advanced analytics",
      "Parent controls",
      "Offline access",
    ],
    cta: "Get Started Free",
    ctaHref: "/auth/signup",
  },
  {
    id: "family",
    name: "Family",
    emoji: "👨‍👩‍👧",
    priceMonthly: 899,
    priceYearly: 7199,
    description: "Perfect for 1-3 children",
    color: "from-edujoy-primary-400 to-fun-purple",
    popular: true,
    features: [
      "Up to 3 child profiles",
      "Unlimited lessons",
      "🤖 AI Study Buddy",
      "Advanced parent dashboard",
      "Screen time controls",
      "Daily missions & rewards",
      "Progress PDF reports",
      "Offline learning mode",
      "Priority support",
    ],
    missing: [],
    cta: "Start 7-Day Free Trial",
    ctaHref: "/auth/signup?plan=family",
  },
  {
    id: "family_pro",
    name: "Family Pro",
    emoji: "⭐",
    priceMonthly: 1499,
    priceYearly: 11999,
    description: "For the dedicated learner",
    color: "from-fun-orange to-fun-pink",
    popular: false,
    features: [
      "Up to 5 child profiles",
      "Everything in Family",
      "AI Weakness Detection",
      "Personalized learning path",
      "Video call tutoring (2/mo)",
      "Custom learning goals",
      "Early access to new content",
      "Dedicated parent advisor",
    ],
    missing: [],
    cta: "Start 7-Day Free Trial",
    ctaHref: "/auth/signup?plan=family_pro",
  },
];

const SCHOOL_PLAN = {
  name: "School & Enterprise",
  emoji: "🏫",
  features: [
    "Unlimited student accounts",
    "Teacher accounts & tools",
    "School admin dashboard",
    "Custom curriculum alignment",
    "Branded experience",
    "Bulk progress reports",
    "API access",
    "Dedicated account manager",
    "Training & onboarding",
    "SLA & premium support",
  ],
};

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes! You can cancel your subscription at any time with no cancellation fees. You'll keep access until the end of your billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! Family and Family Pro plans come with a 7-day free trial. No credit card required to start.",
  },
  {
    q: "What age groups are supported?",
    a: "EduJoy Kids supports children from Play Group (age 3) all the way to Class 5 (age 10-11).",
  },
  {
    q: "Can I switch plans?",
    a: "Absolutely! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const formatPrice = (pkr: number) =>
    pkr === 0 ? "Free" : `Rs. ${pkr.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-edujoy-primary-50 via-white to-fun-purple/5">
      <Navigation />

      <main className="pt-28 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-16">
          <span className="inline-flex items-center gap-2 bg-edujoy-primary-100 text-edujoy-primary-600 font-bold px-4 py-2 rounded-full text-sm mb-4">
            <Star size={14} className="fill-current" /> Simple Pricing
          </span>
          <h1 className="text-5xl font-black text-gray-800 mb-4">
            Invest in Your{" "}
            <span className="gradient-text">Child&apos;s Future</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Start free, upgrade when ready. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`font-bold ${!yearly ? "text-gray-800" : "text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${yearly ? "bg-edujoy-primary-500" : "bg-gray-300"}`}
            >
              <div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                style={{ transform: `translateX(${yearly ? 28 : 4}px)` }}
              />
            </button>
            <span
              className={`font-bold ${yearly ? "text-gray-800" : "text-gray-400"}`}
            >
              Yearly{" "}
              <span className="text-fun-green text-sm font-black">
                Save 33%
              </span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative card-fun p-6 flex flex-col hover:-translate-y-1.5 transition-transform ${plan.popular ? "ring-4 ring-edujoy-primary-400 ring-offset-2" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-edujoy-primary-400 to-fun-purple text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md">
                  ⭐ Most Popular
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-3xl shadow-md mb-4`}
              >
                {plan.emoji}
              </div>

              <h2 className="text-2xl font-black text-gray-800">{plan.name}</h2>
              <p className="text-gray-400 text-sm mt-0.5 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <p className="text-4xl font-black text-gray-800">
                  {plan.priceMonthly === 0
                    ? "Free"
                    : formatPrice(
                        yearly
                          ? Math.round(plan.priceYearly / 12)
                          : plan.priceMonthly,
                      )}
                </p>
                {plan.priceMonthly > 0 && (
                  <p className="text-sm text-gray-400">
                    {yearly
                      ? `Rs. ${plan.priceYearly.toLocaleString()} billed yearly`
                      : "per month"}
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle
                      size={16}
                      className="text-fun-green flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
                {plan.missing.map((feature, i) => (
                  <li
                    key={`miss-${i}`}
                    className="flex items-start gap-2 text-sm opacity-40"
                  >
                    <X
                      size={16}
                      className="text-gray-400 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref}>
                <div
                  className={`w-full py-3 rounded-2xl font-black text-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? "bg-gradient-to-r from-edujoy-primary-400 to-fun-purple text-white shadow-fun"
                      : "border-2 border-gray-200 text-gray-700 hover:border-edujoy-primary-300 hover:bg-edujoy-primary-50"
                  }`}
                >
                  {plan.cta}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* School Plan */}
        <div className="max-w-5xl mx-auto px-4 mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white overflow-hidden relative">
            <div className="absolute right-0 top-0 text-[200px] opacity-5 leading-none">
              🏫
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <span className="text-4xl mb-3 block">🏫</span>
                  <h2 className="text-3xl font-black mb-2">
                    School & Enterprise
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Full-featured platform for schools with custom branding,
                    admin tools, and dedicated support.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SCHOOL_PLAN.features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-200"
                      >
                        <CheckCircle
                          size={14}
                          className="text-fun-green flex-shrink-0"
                        />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-gray-300 text-center">
                    Custom pricing based on school size
                  </p>
                  <Link href="/contact?type=school">
                    <div className="bg-white text-gray-800 font-black px-8 py-4 rounded-2xl cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all">
                      Contact Sales <ArrowRight size={18} />
                    </div>
                  </Link>
                  <p className="text-gray-400 text-xs">
                    Free demo · No commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="card-fun overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-black text-gray-800">{faq.q}</span>
                  <span
                    className="text-gray-400 font-bold text-xl flex-shrink-0 ml-4 transition-transform duration-200"
                    style={{
                      transform: `rotate(${expandedFaq === i ? 45 : 0}deg)`,
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
