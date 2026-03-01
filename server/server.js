import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Resolve __dirname for ES modules and load .env from the server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load env vars FIRST before any other module reads process.env
dotenv.config({ path: join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./models/index.js";

// Import middleware
import {
  generalRateLimit,
  securityHeaders,
  corsConfig,
  requestLogger,
} from "./middleware/auth.js";

// Import routes
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import paymentRoutes from "./routes/payments.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy (for proper IP detection behind reverse proxy)
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());
app.use(securityHeaders);
app.use(cors(corsConfig));

// Request logging
app.use(requestLogger);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Rate limiting (global)
app.use(generalRateLimit);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "EduJoy Kids API is healthy",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// Root API info endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "EduJoy Kids API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "GET  /api/health",
      auth: "POST /api/auth/register | /api/auth/login | /api/auth/logout",
      ai: "POST /api/ai/chat | /api/ai/analyze-weakness | /api/ai/generate-hint",
      payments: "POST /api/payments/create-checkout-session",
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
// Webhook must come before json body parser
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use("/api/payments", paymentRoutes);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    code: "ENDPOINT_NOT_FOUND",
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handler — always returns JSON (never HTML)
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  // Avoid sending headers twice
  if (res.headersSent) return next(error);

  const isDevelopment = process.env.NODE_ENV === "development";

  res.setHeader("Content-Type", "application/json");
  res.status(error.status || 500).json({
    error: isDevelopment ? error.message : "Internal server error",
    code: error.code || "INTERNAL_ERROR",
    ...(isDevelopment && { stack: error.stack }),
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 EduJoy Kids Server running on port ${PORT}`);
      console.log(`📚 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 API URL: http://localhost:${PORT}/api`);
      console.log(`❤️  Where Learning Feels Like Play!`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // Only exit for truly fatal errors
  if (error.code === "ERR_USE_AFTER_FREE" || error.code === "EADDRINUSE") {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  // Log but do NOT exit — a single failed DB query should not bring down the server
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});

// Start the server
startServer();

export default app;
