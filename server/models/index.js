import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }

    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/edujoykids",
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Close database connection
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error.message);
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

export { connectDB, disconnectDB };

// Export all models
export { User } from "./User.js";
export { Student } from "./Student.js";
export { Lesson, LessonProgress } from "./Lesson.js";
export {
  Badge,
  Achievement,
  Reward,
  DailyChallenge,
  StudentInventory,
} from "./Gamification.js";
export { School, Payment, AIAnalytics, Notification } from "./Analytics.js";

// Type definitions for TypeScript
export const ModelTypes = {
  USER_ROLES: {
    STUDENT: "student",
    PARENT: "parent",
    TEACHER: "teacher",
    ADMIN: "admin",
    SCHOOL_ADMIN: "school_admin",
  },
  GRADE_LEVELS: {
    PLAY_GROUP: "play_group",
    NURSERY: "nursery",
    LKG: "lkg",
    UKG: "ukg",
    CLASS_1: "class_1",
    CLASS_2: "class_2",
    CLASS_3: "class_3",
    CLASS_4: "class_4",
    CLASS_5: "class_5",
  },
  SUBJECTS: {
    ENGLISH: "english",
    MATH: "math",
    SCIENCE: "science",
    EVS: "evs",
    GK: "gk",
    HINDI: "hindi",
  },
  LESSON_TYPES: {
    ANIMATED: "animated",
    INTERACTIVE: "interactive",
    QUIZ: "quiz",
    STORY: "story",
    GAME: "game",
    PRACTICE: "practice",
  },
  SUBSCRIPTION_PLANS: {
    FREE: "free",
    BASIC: "basic",
    PREMIUM: "premium",
    SCHOOL: "school",
  },
};
