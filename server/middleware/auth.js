import rateLimit from "express-rate-limit";
import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/index.js";

// Rate limiting middleware
export const createRateLimit = (windowMs, maxRequests, message) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    message: {
      error: message,
      code: "RATE_LIMIT_EXCEEDED",
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for admin users in development
      return process.env.NODE_ENV === "development" && req.ip === "127.0.0.1";
    },
  });
};

// Authentication rate limits
export const authRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  "Too many authentication attempts, please try again later",
);

export const passwordResetRateLimit = createRateLimit(
  60 * 60 * 1000, // 1 hour
  3, // 3 attempts
  "Too many password reset attempts, please try again later",
);

export const generalRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  "Too many requests, please try again later",
);

// JWT Authentication middleware
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: "Access token required",
        code: "TOKEN_MISSING",
      });
    }

    const decoded = verifyAccessToken(token);

    // Fetch user and check if still active
    const user = await User.findById(decoded.userId).select(
      "-password -refreshTokens",
    );

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "User not found or inactive",
        code: "USER_INACTIVE",
      });
    }

    // Check if user is locked
    if (user.isLocked()) {
      return res.status(423).json({
        error:
          "Account is temporarily locked due to multiple failed login attempts",
        code: "ACCOUNT_LOCKED",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid access token") {
      return res.status(401).json({
        error: "Invalid or expired token",
        code: "TOKEN_INVALID",
      });
    }

    console.error("Authentication error:", error);
    res.status(500).json({
      error: "Authentication failed",
      code: "AUTH_ERROR",
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
        code: "AUTH_REQUIRED",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS",
        required: roles,
        current: req.user.role,
      });
    }

    next();
  };
};

// Child safety middleware - additional protection for child accounts
export const childSafetyCheck = async (req, res, next) => {
  try {
    if (req.user.role === "student") {
      // Additional safety checks for student accounts
      const Student = (await import("../models/Student.js")).Student;
      const student = await Student.findOne({ userId: req.user._id }).populate(
        "parentId",
      );

      if (!student) {
        return res.status(404).json({
          error: "Student profile not found",
          code: "STUDENT_NOT_FOUND",
        });
      }

      // Check parental controls
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.toLocaleLowerCase().slice(0, 3); // mon, tue, etc.

      // Check if current day is allowed
      if (!student.parentalControls.allowedDays.includes(currentDay)) {
        return res.status(403).json({
          error: "Access not allowed on this day",
          code: "DAY_RESTRICTED",
        });
      }

      // Check time slots
      const timeSlots = student.parentalControls.allowedTimeSlots;
      if (timeSlots.length > 0) {
        const isInAllowedTime = timeSlots.some((slot) => {
          const start = parseInt(slot.startTime.split(":")[0]);
          const end = parseInt(slot.endTime.split(":")[0]);
          return currentHour >= start && currentHour < end;
        });

        if (!isInAllowedTime) {
          return res.status(403).json({
            error: "Access not allowed at this time",
            code: "TIME_RESTRICTED",
            allowedTimes: timeSlots,
          });
        }
      }

      req.student = student;
    }

    next();
  } catch (error) {
    console.error("Child safety check error:", error);
    res.status(500).json({
      error: "Safety check failed",
      code: "SAFETY_CHECK_ERROR",
    });
  }
};

// Optional authentication - doesn't fail if not authenticated
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select(
        "-password -refreshTokens",
      );

      if (user && user.isActive && !user.isLocked()) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Verify email required middleware
export const requireVerifiedEmail = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      error: "Email verification required",
      code: "EMAIL_NOT_VERIFIED",
    });
  }
  next();
};

// Admin-only middleware
export const adminOnly = authorize("admin");

// Teacher or admin middleware
export const teacherOrAdmin = authorize("teacher", "admin");

// Parent, teacher, or admin middleware
export const parentTeacherOrAdmin = authorize("parent", "teacher", "admin");

// School admin or admin middleware
export const schoolAdminOrAdmin = authorize("school_admin", "admin");

// Security headers middleware
export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  // Content Security Policy for child safety
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://js.stripe.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "media-src 'self' https:; " +
      "connect-src 'self' https://api.stripe.com; " +
      "frame-src https://js.stripe.com;",
  );

  next();
};

// CORS configuration for child safety
export const corsConfig = {
  origin: (origin, callback) => {
    // In development, allow all origins
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    const allowedOrigins = [
      process.env.APP_URL,
      "http://localhost:3000",
      "https://edujoykids.com",
      "https://www.edujoykids.com",
    ].filter(Boolean); // remove undefined/null entries

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// Request logging middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const userInfo = req.user
      ? `User: ${req.user._id} (${req.user.role})`
      : "Anonymous";

    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - ${userInfo}`,
    );

    // Log suspicious activities
    if (res.statusCode === 403 || res.statusCode === 401) {
      console.warn(
        `Security warning: ${req.method} ${req.originalUrl} - IP: ${req.ip} - ${userInfo}`,
      );
    }
  });

  next();
};
