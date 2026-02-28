import { validationResult, body, param, query } from "express-validator";

// Validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: errors.array().map((error) => ({
        field: error.path ?? error.param,
        message: error.msg,
        value: error.value,
      })),
    });
  }

  next();
};

// Common validation rules
export const validateEmail = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Please provide a valid email address");

export const validatePassword = body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage(
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  );

export const validateName = (fieldName) =>
  body(fieldName)
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(`${fieldName} must be between 2 and 50 characters`)
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(`${fieldName} must contain only letters and spaces`);

export const validateRole = body("role")
  .isIn(["student", "parent", "teacher", "admin", "school_admin"])
  .withMessage("Please provide a valid role");

export const validateGrade = body("grade")
  .isIn([
    "play_group",
    "nursery",
    "lkg",
    "ukg",
    "class_1",
    "class_2",
    "class_3",
    "class_4",
    "class_5",
  ])
  .withMessage("Please provide a valid grade level");

export const validateGender = body("gender")
  .isIn(["male", "female", "other"])
  .withMessage("Please provide a valid gender");

export const validateDateOfBirth = body("dateOfBirth")
  .isISO8601()
  .toDate()
  .custom((value) => {
    const age = Math.floor(
      (Date.now() - value.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
    );
    if (age < 3 || age > 12) {
      throw new Error("Child must be between 3 and 12 years old");
    }
    return true;
  });

export const validateObjectId = (fieldName) =>
  body(fieldName).isMongoId().withMessage(`${fieldName} must be a valid ID`);

export const validateParamId = param("id")
  .isMongoId()
  .withMessage("ID parameter must be valid");

// Auth validation rules
export const validateSignup = [
  validateEmail,
  validatePassword,
  validateName("fullName"),
  validateRole,
  handleValidationErrors,
];

export const validateLogin = [
  validateEmail,
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

export const validateChildSignup = [
  validateName("studentName"),
  validateGrade,
  validateGender,
  validateDateOfBirth,
  validateObjectId("parentId"),
  handleValidationErrors,
];

export const validateForgotPassword = [validateEmail, handleValidationErrors];

export const validateResetPassword = [
  body("token").notEmpty().withMessage("Reset token is required"),
  validatePassword,
  handleValidationErrors,
];

export const validateVerifyEmail = [
  body("token").notEmpty().withMessage("Verification token is required"),
  handleValidationErrors,
];

export const validateRefreshToken = [
  body("refreshToken").notEmpty().withMessage("Refresh token is required"),
  handleValidationErrors,
];

// Student profile validation
export const validateUpdateStudent = [
  validateName("studentName").optional(),
  validateGrade.optional(),
  validateGender.optional(),
  body("learningStyle")
    .optional()
    .isIn(["visual", "auditory", "kinesthetic", "reading"])
    .withMessage("Please provide a valid learning style"),
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("Please provide a valid difficulty level"),
  handleValidationErrors,
];

// Lesson validation
export const validateLesson = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("subject")
    .isIn(["english", "math", "science", "evs", "gk", "hindi"])
    .withMessage("Please provide a valid subject"),
  validateGrade.withMessage("Please provide a valid grade"),
  body("lessonType")
    .isIn(["animated", "interactive", "quiz", "story", "game", "practice"])
    .withMessage("Please provide a valid lesson type"),
  body("difficulty")
    .isIn(["easy", "medium", "hard"])
    .withMessage("Please provide a valid difficulty level"),
  body("duration.estimated")
    .isInt({ min: 1, max: 180 })
    .withMessage("Estimated duration must be between 1 and 180 minutes"),
  handleValidationErrors,
];

// Query validation
export const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
  handleValidationErrors,
];

export const validateSearch = [
  query("q")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
  query("subject")
    .optional()
    .isIn(["english", "math", "science", "evs", "gk", "hindi"])
    .withMessage("Please provide a valid subject"),
  query("grade")
    .optional()
    .isIn([
      "play_group",
      "nursery",
      "lkg",
      "ukg",
      "class_1",
      "class_2",
      "class_3",
      "class_4",
      "class_5",
    ])
    .withMessage("Please provide a valid grade"),
  handleValidationErrors,
];

// Payment validation
export const validatePayment = [
  body("plan")
    .isIn(["basic", "premium", "school_basic", "school_premium"])
    .withMessage("Please provide a valid plan"),
  body("paymentMethod")
    .isIn(["stripe", "razorpay", "paypal"])
    .withMessage("Please provide a valid payment method"),
  handleValidationErrors,
];

// Content moderation validation
export const validateContent = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be between 1 and 1000 characters")
    .custom((value) => {
      // Basic profanity filter (this should be more sophisticated in production)
      const blockedWords = ["badword1", "badword2"]; // Add actual blocked words
      const lowercaseContent = value.toLowerCase();

      for (const word of blockedWords) {
        if (lowercaseContent.includes(word)) {
          throw new Error("Content contains inappropriate language");
        }
      }

      return true;
    }),
  handleValidationErrors,
];

// File upload validation
export const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
      code: "FILE_REQUIRED",
    });
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "audio/mpeg",
    "audio/wav",
    "video/mp4",
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: "Invalid file type",
      code: "INVALID_FILE_TYPE",
      allowed: allowedTypes,
    });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (req.file.size > maxSize) {
    return res.status(400).json({
      error: "File too large",
      code: "FILE_TOO_LARGE",
      maxSize: "5MB",
    });
  }

  next();
};
