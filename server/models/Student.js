// @ts-nocheck
import mongoose from "mongoose";

export const GRADE_LEVELS = {
  PLAY_GROUP: "play_group",
  NURSERY: "nursery",
  LKG: "lkg",
  UKG: "ukg",
  CLASS_1: "class_1",
  CLASS_2: "class_2",
  CLASS_3: "class_3",
  CLASS_4: "class_4",
  CLASS_5: "class_5",
};

export const SUBJECTS = {
  ENGLISH: "english",
  MATH: "math",
  SCIENCE: "science",
  EVS: "evs",
  GK: "gk",
  HINDI: "hindi",
};

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      enum: Object.values(GRADE_LEVELS),
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    avatar: {
      selectedAvatar: {
        type: String,
        default: "default_child_1",
      },
      customizations: {
        skinColor: String,
        hairColor: String,
        clothingColor: String,
        accessories: [String],
      },
    },
    learningProfile: {
      learningStyle: {
        type: String,
        enum: ["visual", "auditory", "kinesthetic", "reading"],
        default: "visual",
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium",
      },
      strongSubjects: [
        {
          type: String,
          enum: Object.values(SUBJECTS),
        },
      ],
      weakSubjects: [
        {
          type: String,
          enum: Object.values(SUBJECTS),
        },
      ],
      preferredTimeSlots: [
        {
          day: {
            type: String,
            enum: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
          },
          startTime: String,
          endTime: String,
        },
      ],
    },
    gamification: {
      level: {
        type: Number,
        default: 1,
      },
      totalXP: {
        type: Number,
        default: 0,
      },
      coins: {
        type: Number,
        default: 100,
      },
      streakDays: {
        type: Number,
        default: 0,
      },
      badges: [
        {
          badgeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Badge",
          },
          earnedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      achievements: [
        {
          achievementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Achievement",
          },
          earnedAt: {
            type: Date,
            default: Date.now,
          },
          progress: {
            type: Number,
            default: 0,
          },
        },
      ],
      currentTheme: {
        type: String,
        default: "forest_adventure",
      },
      unlockedThemes: [
        {
          type: String,
          default: ["forest_adventure"],
        },
      ],
    },
    progress: {
      overallProgress: {
        type: Number,
        default: 0,
      },
      subjectProgress: [
        {
          subject: {
            type: String,
            enum: Object.values(SUBJECTS),
          },
          progress: {
            type: Number,
            default: 0,
          },
          lastStudied: Date,
          timeSpentMinutes: {
            type: Number,
            default: 0,
          },
        },
      ],
      weeklyGoals: {
        lessonsTarget: {
          type: Number,
          default: 7,
        },
        studyTimeTarget: {
          type: Number,
          default: 60,
        },
        currentWeekProgress: {
          lessons: {
            type: Number,
            default: 0,
          },
          studyTime: {
            type: Number,
            default: 0,
          },
        },
      },
    },
    parentalControls: {
      maxDailyScreenTime: {
        type: Number,
        default: 60, // minutes
      },
      allowedDays: [
        {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          default: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        },
      ],
      allowedTimeSlots: [
        {
          startTime: String,
          endTime: String,
        },
      ],
      contentRestrictions: {
        disallowedTopics: [String],
        requiresApproval: {
          type: Boolean,
          default: false,
        },
      },
    },
    aiTutor: {
      personalizedRecommendations: [
        {
          type: {
            type: String,
            enum: ["lesson", "practice", "review", "challenge"],
          },
          content: String,
          reason: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      weaknessAnalysis: [
        {
          subject: {
            type: String,
            enum: Object.values(SUBJECTS),
          },
          topic: String,
          confidence: Number,
          suggestedActions: [String],
          lastUpdated: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Calculate age
studentSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

// Calculate next level XP requirement
studentSchema.virtual("nextLevelXP").get(function () {
  return this.gamification.level * 100; // 100 XP per level
});

// Add XP method
studentSchema.methods.addXP = function (amount) {
  this.gamification.totalXP += amount;

  // Check for level up
  const requiredXP = this.gamification.level * 100;
  if (this.gamification.totalXP >= requiredXP) {
    this.gamification.level++;
    this.gamification.coins += 50; // Bonus coins for level up
  }

  return this.save();
};

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
