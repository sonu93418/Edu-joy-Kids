import express from 'express';
import {
  register,
  login,
  registerChild,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getProfile
} from '../controllers/authController.js';

import {
  authenticateToken,
  authorize,
  authRateLimit,
  passwordResetRateLimit,
  generalRateLimit
} from '../middleware/auth.js';

import {
  validateSignup,
  validateLogin,
  validateChildSignup,
  validateForgotPassword,
  validateResetPassword,
  validateVerifyEmail,
  validateRefreshToken,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', 
  authRateLimit,
  validateSignup,
  register
);

router.post('/login', 
  authRateLimit,
  validateLogin,
  login
);

router.post('/refresh-token',
  generalRateLimit,
  validateRefreshToken,
  refreshAccessToken
);

router.post('/verify-email',
  generalRateLimit,
  validateVerifyEmail,
  verifyEmail
);

router.post('/resend-verification',
  authRateLimit,
  validateForgotPassword, // reuse email validation
  resendVerification
);

router.post('/forgot-password',
  passwordResetRateLimit,
  validateForgotPassword,
  forgotPassword
);

router.post('/reset-password',
  passwordResetRateLimit,
  validateResetPassword,
  resetPassword
);

// Protected routes
router.use(authenticateToken); // All routes below require authentication

router.get('/profile',
  generalRateLimit,
  getProfile
);

router.post('/logout',
  generalRateLimit,
  logout
);

router.post('/logout-all',
  generalRateLimit,
  logoutAllDevices
);

// Parent-only routes
router.post('/register-child',
  generalRateLimit,
  authorize('parent'),
  validateChildSignup,
  registerChild
);

// Additional auth routes can be added here
router.get('/verify-token', (req, res) => {
  // If we reach here, token is valid (thanks to authenticateToken middleware)
  res.json({
    valid: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      isVerified: req.user.isVerified
    }
  });
});

router.get('/session-info', (req, res) => {
  // Get session information
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role,
      isVerified: req.user.isVerified,
      lastLogin: req.user.lastLogin,
      subscription: req.user.subscription
    },
    session: {
      loginTime: req.user.lastLogin,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    }
  });
});

export default router;