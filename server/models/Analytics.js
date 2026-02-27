import mongoose from 'mongoose';

// School Schema for institutional accounts
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teachers: [{
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    subjects: [String],
    grades: [String],
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    grade: String,
    section: String,
    rollNumber: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  subscription: {
    plan: {
      type: String,
      enum: ['school_basic', 'school_premium', 'school_enterprise'],
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'cancelled'],
      default: 'inactive'
    },
    maxStudents: Number,
    maxTeachers: Number,
    features: [String],
    startDate: Date,
    endDate: Date,
    paymentHistory: [{
      amount: Number,
      currency: String,
      date: Date,
      transactionId: String,
      status: String
    }]
  },
  settings: {
    branding: {
      logo: String,
      primaryColor: String,
      secondaryColor: String,
      schoolTheme: String
    },
    academicYear: {
      startDate: Date,
      endDate: Date
    },
    curriculum: {
      board: String, // CBSE, ICSE, State Board, etc.
      customSubjects: [String],
      gradingSystem: String
    },
    restrictions: {
      allowedDevices: [String],
      blockedApps: [String],
      screenTimeLimit: Number,
      allowedTimes: [{
        day: String,
        startTime: String,
        endTime: String
      }]
    }
  },
  analytics: {
    totalStudents: {
      type: Number,
      default: 0
    },
    activeStudents: {
      type: Number,
      default: 0
    },
    totalTeachers: {
      type: Number,
      default: 0
    },
    averageUsage: {
      daily: Number,
      weekly: Number,
      monthly: Number
    },
    performance: {
      averageScore: Number,
      completionRate: Number,
      engagementRate: Number
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    default: null
  },
  type: {
    type: String,
    enum: ['subscription', 'one_time', 'upgrade', 'addon'],
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'school_basic', 'school_premium', 'school_enterprise'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'paypal', 'bank_transfer'],
    required: true
  },
  paymentGateway: {
    transactionId: String,
    customerId: String,
    subscriptionId: String,
    invoiceId: String,
    receiptUrl: String
  },
  billing: {
    name: String,
    email: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  subscription: {
    startDate: Date,
    endDate: Date,
    autoRenew: {
      type: Boolean,
      default: true
    },
    renewalDate: Date,
    cancellationDate: Date,
    cancellationReason: String
  },
  metadata: {
    promocode: String,
    discount: Number,
    tax: Number,
    refunds: [{
      amount: Number,
      reason: String,
      processedAt: Date,
      refundId: String
    }]
  }
}, {
  timestamps: true
});

// AI Analytics Schema
const aiAnalyticsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  analysisDate: {
    type: Date,
    default: Date.now
  },
  learningProfile: {
    dominantLearningStyle: String,
    adaptedDifficulty: String,
    recommendedStudyTime: Number,
    optimalSessionLength: Number,
    bestTimeSlots: [String],
    attention: {
      averageSpan: Number,
      peakHours: [String],
      distractionFactors: [String]
    }
  },
  performance: {
    overallScore: Number,
    subjectScores: [{
      subject: String,
      score: Number,
      trend: String, // 'improving', 'declining', 'stable'
      confidence: Number
    }],
    skillGaps: [{
      skill: String,
      severity: String,
      recommendations: [String]
    }],
    strengths: [String],
    improvements: [String]
  },
  predictions: {
    nextWeekPerformance: Number,
    riskFactors: [String],
    interventionSuggestions: [String],
    motivationLevel: String,
    burnoutRisk: Number
  },
  emotional: {
    engagementLevel: Number,
    frustrationIndicators: [String],
    confidenceLevel: Number,
    motivationTriggers: [String]
  },
  recommendations: {
    immediate: [String],
    shortTerm: [String],
    longTerm: [String],
    parentActions: [String],
    teacherActions: [String]
  }
}, {
  timestamps: true
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['achievement', 'reminder', 'progress', 'system', 'social', 'safety'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    actionUrl: String,
    actionButton: String,
    imageUrl: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  delivery: {
    channels: [{
      type: String,
      enum: ['in_app', 'push', 'email', 'sms'],
      status: {
        type: String,
        enum: ['pending', 'sent', 'delivered', 'failed'],
        default: 'pending'
      },
      sentAt: Date,
      deliveredAt: Date
    }],
    targetDevices: [String],
    scheduledFor: Date
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'dismissed'],
    default: 'unread'
  },
  readAt: Date,
  dismissedAt: Date,
  expiresAt: Date
}, {
  timestamps: true
});

export const School = mongoose.models.School || mongoose.model('School', schoolSchema);
export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
export const AIAnalytics = mongoose.models.AIAnalytics || mongoose.model('AIAnalytics', aiAnalyticsSchema);
export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);