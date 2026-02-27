import { User, Student } from '../models/index.js';
import { 
  generateTokenPair, 
  storeRefreshToken, 
  removeRefreshToken, 
  removeAllRefreshTokens,
  verifyRefreshToken,
  validateRefreshToken 
} from '../utils/jwt.js';
import {
  generateVerificationToken,
  generateOTP,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeChildEmail,
  sendOTPEmail
} from '../utils/auth.js';

// Register new user
export const register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists with this email',
        code: 'USER_EXISTS'
      });
    }
    
    // Generate verification token
    const verificationToken = generateVerificationToken();
    
    // Create new user
    const user = new User({
      email,
      password,
      fullName,
      role,
      verificationToken,
      isVerified: false
    });
    
    await user.save();
    
    // Send verification email
    const emailSent = await sendVerificationEmail(email, fullName, verificationToken);
    
    // Generate tokens for immediate login (optional - depends on requirements)
    const { accessToken, refreshToken } = generateTokenPair(user);
    
    // Store refresh token
    const deviceInfo = {
      userAgent: req.headers['user-agent'],
      ip: req.ip
    };
    await storeRefreshToken(user._id, refreshToken, deviceInfo);
    
    // Set secure httpOnly cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Remove sensitive data from response
    const { password: _, refreshTokens, verificationToken: __, ...userResponse } = user.toObject();
    
    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      accessToken,
      emailSent,
      nextStep: 'verify_email'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'User already exists with this email',
        code: 'DUPLICATE_EMAIL'
      });
    }
    
    res.status(500).json({
      error: 'Registration failed',
      code: 'REGISTRATION_ERROR'
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Check if account is locked
    if (user.isLocked()) {
      return res.status(423).json({
        error: 'Account is temporarily locked due to multiple failed login attempts',
        code: 'ACCOUNT_LOCKED',
        lockUntil: user.lockUntil
      });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account is deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      await user.incLoginAttempts();
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user);
    
    // Store refresh token
    const deviceInfo = {
      userAgent: req.headers['user-agent'],
      ip: req.ip
    };
    await storeRefreshToken(user._id, refreshToken, deviceInfo);
    
    // Set refresh token cookie
    const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // 30 days or 7 days
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: cookieMaxAge
    });
    
    // Get user profile based on role
    let profile = null;
    if (user.role === 'student') {
      profile = await Student.findOne({ userId: user._id }).populate('parentId', 'fullName email');
    }
    
    // Remove sensitive data from response
    const { password: _, refreshTokens, ...userResponse } = user.toObject();
    
    res.json({
      message: 'Login successful',
      user: userResponse,
      profile,
      accessToken,
      requiresVerification: !user.isVerified
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
};

// Register child account
export const registerChild = async (req, res) => {
  try {
    const { studentName, grade, gender, dateOfBirth, parentId } = req.body;
    
    // Verify parent exists and is a parent role
    const parent = await User.findById(parentId);
    if (!parent || parent.role !== 'parent') {
      return res.status(400).json({
        error: 'Invalid parent account',
        code: 'INVALID_PARENT'
      });
    }
    
    // Create child user account (no password required for children)
    const childEmail = `${studentName.toLowerCase().replace(/\s+/g, '.')}@child.edujoykids.local`;
    const temporaryPassword = Math.random().toString(36).slice(-8);
    
    const childUser = new User({
      email: childEmail,
      password: temporaryPassword,
      fullName: studentName,
      role: 'student',
      isVerified: true // Children don't need email verification
    });
    
    await childUser.save();
    
    // Create student profile
    const student = new Student({
      userId: childUser._id,
      parentId,
      studentName,
      grade,
      gender,
      dateOfBirth: new Date(dateOfBirth)
    });
    
    await student.save();
    
    // Send welcome email to parent
    await sendWelcomeChildEmail(parent.email, studentName, parent.fullName);
    
    res.status(201).json({
      message: 'Child account created successfully',
      student: {
        id: student._id,
        studentName,
        grade,
        gender,
        dateOfBirth
      },
      childUser: {
        id: childUser._id,
        email: childEmail,
        fullName: studentName
      }
    });
    
  } catch (error) {
    console.error('Child registration error:', error);
    res.status(500).json({
      error: 'Failed to create child account',
      code: 'CHILD_REGISTRATION_ERROR'
    });
  }
};

// Refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const cookieRefreshToken = req.cookies.refreshToken;
    
    const token = refreshToken || cookieRefreshToken;
    
    if (!token) {
      return res.status(401).json({
        error: 'Refresh token required',
        code: 'REFRESH_TOKEN_MISSING'
      });
    }
    
    // Verify refresh token
    const decoded = verifyRefreshToken(token);
    
    // Check if refresh token exists in database
    const isValid = await validateRefreshToken(decoded.userId, token);
    if (!isValid) {
      return res.status(401).json({
        error: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }
    
    // Get user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'User not found or inactive',
        code: 'USER_INACTIVE'
      });
    }
    
    // Generate new access token
    const { accessToken } = generateTokenPair(user);
    
    res.json({
      accessToken,
      message: 'Token refreshed successfully'
    });
    
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      error: 'Token refresh failed',
      code: 'REFRESH_ERROR'
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const cookieRefreshToken = req.cookies.refreshToken;
    
    const token = refreshToken || cookieRefreshToken;
    
    if (token && req.user) {
      await removeRefreshToken(req.user._id, token);
    }
    
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    res.json({
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      code: 'LOGOUT_ERROR'
    });
  }
};

// Logout from all devices
export const logoutAllDevices = async (req, res) => {
  try {
    await removeAllRefreshTokens(req.user._id);
    
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    res.json({
      message: 'Logged out from all devices successfully'
    });
    
  } catch (error) {
    console.error('Logout all devices error:', error);
    res.status(500).json({
      error: 'Failed to logout from all devices',
      code: 'LOGOUT_ALL_ERROR'
    });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired verification token',
        code: 'INVALID_VERIFICATION_TOKEN'
      });
    }
    
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    
    res.json({
      message: 'Email verified successfully'
    });
    
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: 'Email verification failed',
      code: 'VERIFICATION_ERROR'
    });
  }
};

// Resend verification email
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    
    if (user.isVerified) {
      return res.status(400).json({
        error: 'Email is already verified',
        code: 'ALREADY_VERIFIED'
      });
    }
    
    // Generate new verification token
    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    await user.save();
    
    // Send verification email
    const emailSent = await sendVerificationEmail(email, user.fullName, verificationToken);
    
    res.json({
      message: 'Verification email sent successfully',
      emailSent
    });
    
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      error: 'Failed to resend verification email',
      code: 'RESEND_VERIFICATION_ERROR'
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal that user doesn't exist
      return res.json({
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }
    
    // Generate reset token
    const resetToken = generateVerificationToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();
    
    // Send reset email
    const emailSent = await sendPasswordResetEmail(email, user.fullName, resetToken);
    
    res.json({
      message: 'If an account with that email exists, a password reset link has been sent',
      emailSent
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      error: 'Failed to process password reset request',
      code: 'FORGOT_PASSWORD_ERROR'
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired reset token',
        code: 'INVALID_RESET_TOKEN'
      });
    }
    
    // Update password
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    
    // Reset login attempts
    await user.resetLoginAttempts();
    
    await user.save();
    
    // Remove all refresh tokens for security
    await removeAllRefreshTokens(user._id);
    
    res.json({
      message: 'Password reset successful'
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: 'Password reset failed',
      code: 'RESET_PASSWORD_ERROR'
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    let profile = null;
    
    // Get role-specific profile
    if (req.user.role === 'student') {
      profile = await Student.findOne({ userId: req.user._id })
        .populate('parentId', 'fullName email')
        .populate('schoolId', 'name');
    }
    
    const { password, refreshTokens, ...userResponse } = req.user.toObject();
    
    res.json({
      user: userResponse,
      profile
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to get profile',
      code: 'GET_PROFILE_ERROR'
    });
  }
};