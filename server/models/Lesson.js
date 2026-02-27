// @ts-nocheck
import mongoose from "mongoose";
import { SUBJECTS, GRADE_LEVELS } from "./Student.js";

export const LESSON_TYPES = {
  ANIMATED: "animated",
  INTERACTIVE: "interactive",
  QUIZ: "quiz",
  STORY: "story",
  GAME: "game",
  PRACTICE: "practice",
};

export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

// Lesson Schema
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: Object.values(SUBJECTS),
      required: true,
    },
    grade: {
      type: String,
      enum: Object.values(GRADE_LEVELS),
      required: true,
    },
    chapter: {
      chapterNumber: {
        type: Number,
        required: true,
      },
      chapterName: {
        type: String,
        required: true,
      },
    },
    lessonType: {
      type: String,
      enum: Object.values(LESSON_TYPES),
      required: true,
    },
    difficulty: {
      type: String,
      enum: Object.values(DIFFICULTY_LEVELS),
      default: DIFFICULTY_LEVELS.MEDIUM,
    },
    duration: {
      estimated: {
        type: Number, // in minutes
        required: true,
      },
      actual: {
        type: Number,
        default: 0,
      },
    },
    content: {
      // Text content
      text: String,

      // Media content
      images: [
        {
          url: String,
          alt: String,
          caption: String,
        },
      ],
      videos: [
        {
          url: String,
          title: String,
          duration: Number,
          thumbnail: String,
        },
      ],
      audios: [
        {
          url: String,
          title: String,
          duration: Number,
        },
      ],

      // Interactive content
      animations: [
        {
          url: String,
          type: {
            type: String,
            enum: ["lottie", "gif", "svg"],
          },
          triggers: [String], // when to play: ['start', 'click', 'hover']
        },
      ],

      // Quiz/Assessment content
      questions: [
        {
          id: String,
          type: {
            type: String,
            enum: ["mcq", "fill_blank", "drag_drop", "matching", "true_false"],
          },
          question: String,
          options: [String],
          correctAnswer: mongoose.Schema.Types.Mixed,
          explanation: String,
          points: {
            type: Number,
            default: 10,
          },
        },
      ],

      // Interactive activities
      activities: [
        {
          type: {
            type: String,
            enum: [
              "drag_drop",
              "puzzle",
              "coloring",
              "memory_game",
              "word_search",
            ],
          },
          instructions: String,
          data: mongoose.Schema.Types.Mixed,
          completionCriteria: mongoose.Schema.Types.Mixed,
        },
      ],
    },

    learningObjectives: [String],
    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    gamification: {
      xpReward: {
        type: Number,
        default: 50,
      },
      coinReward: {
        type: Number,
        default: 10,
      },
      starsRequired: {
        type: Number,
        default: 3,
      },
    },

    accessibility: {
      audioNarration: {
        type: Boolean,
        default: true,
      },
      subtitles: {
        type: Boolean,
        default: true,
      },
      highContrast: {
        type: Boolean,
        default: false,
      },
      largeText: {
        type: Boolean,
        default: false,
      },
    },

    aiFeatures: {
      adaptiveDifficulty: {
        type: Boolean,
        default: true,
      },
      personalizedHints: {
        type: Boolean,
        default: true,
      },
      progressPrediction: {
        type: Boolean,
        default: true,
      },
    },

    metadata: {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      version: {
        type: Number,
        default: 1,
      },
      tags: [String],
      isPublished: {
        type: Boolean,
        default: false,
      },
      publishedAt: Date,
      averageRating: {
        type: Number,
        default: 0,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Progress tracking for individual lesson attempts
const lessonProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    attempts: [
      {
        attemptNumber: Number,
        startedAt: {
          type: Date,
          default: Date.now,
        },
        completedAt: Date,
        timeSpent: Number, // in seconds
        score: Number,
        maxScore: Number,
        starsEarned: {
          type: Number,
          min: 0,
          max: 3,
          default: 0,
        },
        xpEarned: {
          type: Number,
          default: 0,
        },
        coinsEarned: {
          type: Number,
          default: 0,
        },
        answers: [
          {
            questionId: String,
            userAnswer: mongoose.Schema.Types.Mixed,
            isCorrect: Boolean,
            timeSpent: Number,
            attempts: Number,
          },
        ],
        hintsUsed: [
          {
            questionId: String,
            hintLevel: Number,
            timestamp: Date,
          },
        ],
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Overall lesson progress
    bestScore: {
      type: Number,
      default: 0,
    },
    bestStars: {
      type: Number,
      default: 0,
    },
    totalAttempts: {
      type: Number,
      default: 0,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },
    unlockedAt: Date,
    lastAccessedAt: Date,

    // AI tracking
    aiInsights: {
      difficultyAdjustments: [
        {
          from: String,
          to: String,
          reason: String,
          timestamp: Date,
        },
      ],
      recommendedNextSteps: [String],
      weakTopics: [String],
      strongTopics: [String],
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for efficient querying
lessonProgressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });
lessonSchema.index({ subject: 1, grade: 1, "chapter.chapterNumber": 1 });

export const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
export const LessonProgress =
  mongoose.models.LessonProgress ||
  mongoose.model("LessonProgress", lessonProgressSchema);
