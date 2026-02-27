import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// JWT configuration
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your-access-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const JWT_ACCESS_EXPIRE = '15m';
const JWT_REFRESH_EXPIRE = '7d';

// Generate access token
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRE,
    algorithm: 'HS256'
  });
};

// Generate refresh token
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
    algorithm: 'HS256'
  });
};

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Generate token pair
export const generateTokenPair = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified
  };
  
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ userId: user._id });
  
  return { accessToken, refreshToken };
};

// Store refresh token in database
export const storeRefreshToken = async (userId, refreshToken, deviceInfo) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Remove old refresh tokens (keep only last 5)
    if (user.refreshTokens.length >= 5) {
      user.refreshTokens = user.refreshTokens.slice(-4);
    }

    // Add new refresh token
    user.refreshTokens.push({
      token: refreshToken,
      device: deviceInfo.userAgent || 'Unknown',
      ipAddress: deviceInfo.ip || 'Unknown',
      createdAt: new Date()
    });

    await user.save();
    return true;
  } catch (error) {
    console.error('Error storing refresh token:', error);
    return false;
  }
};

// Remove refresh token
export const removeRefreshToken = async (userId, refreshToken) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.refreshTokens = user.refreshTokens.filter(
      tokenObj => tokenObj.token !== refreshToken
    );

    await user.save();
    return true;
  } catch (error) {
    console.error('Error removing refresh token:', error);
    return false;
  }
};

// Remove all refresh tokens (logout from all devices)
export const removeAllRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.refreshTokens = [];
    await user.save();
    return true;
  } catch (error) {
    console.error('Error removing all refresh tokens:', error);
    return false;
  }
};

// Validate refresh token exists in database
export const validateRefreshToken = async (userId, refreshToken) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    const tokenExists = user.refreshTokens.some(
      tokenObj => tokenObj.token === refreshToken
    );

    return tokenExists;
  } catch (error) {
    console.error('Error validating refresh token:', error);
    return false;
  }
};

// Clean expired refresh tokens
export const cleanExpiredTokens = async () => {
  try {
    const users = await User.find({
      'refreshTokens.0': { $exists: true }
    });

    for (const user of users) {
      const validTokens = [];
      
      for (const tokenObj of user.refreshTokens) {
        try {
          verifyRefreshToken(tokenObj.token);
          validTokens.push(tokenObj);
        } catch (error) {
          // Token is expired or invalid, don't include it
        }
      }
      
      if (validTokens.length !== user.refreshTokens.length) {
        user.refreshTokens = validTokens;
        await user.save();
      }
    }
    
    console.log('Cleaned expired refresh tokens');
  } catch (error) {
    console.error('Error cleaning expired tokens:', error);
  }
};