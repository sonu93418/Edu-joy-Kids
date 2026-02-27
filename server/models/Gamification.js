import mongoose from 'mongoose';

// Badge Schema for gamification
const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['learning', 'streak', 'achievement', 'milestone', 'special'],
    required: true
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  criteria: {
    type: {
      type: String,
      enum: ['lessons_completed', 'streak_days', 'total_xp', 'subject_mastery', 'quiz_score', 'time_spent'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    subject: String, // for subject-specific badges
    grade: String    // for grade-specific badges
  },
  rewards: {
    xp: {
      type: Number,
      default: 0
    },
    coins: {
      type: Number,
      default: 0
    },
    unlockables: [String] // themes, avatars, etc.
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Achievement Schema - broader accomplishments
const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['academic', 'social', 'creativity', 'persistence', 'exploration'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'extreme'],
    default: 'medium'
  },
  progress: {
    type: {
      type: String,
      enum: ['binary', 'incremental'],
      default: 'binary'
    },
    maxValue: Number,
    unit: String // e.g., 'lessons', 'days', 'points'
  },
  rewards: {
    xp: {
      type: Number,
      default: 0
    },
    coins: {
      type: Number,
      default: 0
    },
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge'
    },
    unlockables: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Reward Schema - individual rewards/items
const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['avatar', 'theme', 'sticker', 'music', 'effect'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  previewImage: String,
  cost: {
    coins: {
      type: Number,
      default: 0
    },
    xp: {
      type: Number,
      default: 0
    },
    requiredLevel: {
      type: Number,
      default: 1
    },
    requiredBadges: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge'
    }]
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  metadata: {
    colors: [String],
    animations: [String],
    sounds: [String],
    customProperties: mongoose.Schema.Types.Mixed
  },
  availability: {
    startDate: Date,
    endDate: Date,
    isLimitedTime: {
      type: Boolean,
      default: false
    },
    maxQuantity: Number,
    currentQuantity: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Daily Challenge Schema
const dailyChallengeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'puzzle', 'creative', 'memory', 'speed'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  targetGrades: [{
    type: String,
    enum: ['play_group', 'nursery', 'lkg', 'ukg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5']
  }],
  content: {
    instructions: String,
    materials: mongoose.Schema.Types.Mixed,
    timeLimit: Number, // in minutes
    maxAttempts: {
      type: Number,
      default: 3
    }
  },
  rewards: {
    xp: {
      type: Number,
      default: 25
    },
    coins: {
      type: Number,
      default: 15
    },
    specialRewards: [String]
  },
  participation: {
    totalParticipants: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Student Reward Inventory
const studentInventorySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true
  },
  items: [{
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    },
    quantity: {
      type: Number,
      default: 1
    },
    acquiredAt: {
      type: Date,
      default: Date.now
    },
    isEquipped: {
      type: Boolean,
      default: false
    },
    metadata: mongoose.Schema.Types.Mixed
  }],
  equipped: {
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    },
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    },
    music: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    }
  }
}, {
  timestamps: true
});

export const Badge = mongoose.models.Badge || mongoose.model('Badge', badgeSchema);
export const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
export const Reward = mongoose.models.Reward || mongoose.model('Reward', rewardSchema);
export const DailyChallenge = mongoose.models.DailyChallenge || mongoose.model('DailyChallenge', dailyChallengeSchema);
export const StudentInventory = mongoose.models.StudentInventory || mongoose.model('StudentInventory', studentInventorySchema);