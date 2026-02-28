import crypto from "crypto";
import nodemailer from "nodemailer";

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587),
    secure: (process.env.SMTP_SECURE || process.env.EMAIL_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });
};

// Generate verification token
export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Generate OTP
export const generateOTP = (length = 6) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};

// Hash sensitive data
export const hashData = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

// Verify hash
export const verifyHash = (data, hash) => {
  const dataHash = hashData(data);
  return dataHash === hash;
};

// Encrypt sensitive data
export const encryptData = (text) => {
  const algorithm = "aes-256-gcm";
  const keyStr =
    process.env.ENCRYPTION_KEY || "edujoykids-32-char-key-dev-only!!";
  const key = Buffer.from(keyStr.slice(0, 32).padEnd(32, "0"), "utf8");
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
};

// Decrypt sensitive data
export const decryptData = (encryptedData) => {
  const algorithm = "aes-256-gcm";
  const keyStr =
    process.env.ENCRYPTION_KEY || "edujoykids-32-char-key-dev-only!!";
  const key = Buffer.from(keyStr.slice(0, 32).padEnd(32, "0"), "utf8");
  const iv = Buffer.from(encryptedData.iv, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

  let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// Email templates
const emailTemplates = {
  verification: (name, verificationUrl) => ({
    subject: "Welcome to EduJoy Kids - Verify Your Email",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Comic Sans MS', cursive; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 30px; text-align: center;">
          <h1 style="color: #e564fe; margin-bottom: 20px;">🎉 Welcome to EduJoy Kids!</h1>
          <p style="font-size: 18px; color: #333; margin-bottom: 30px;">Hi ${name},</p>
          <p style="color: #666; margin-bottom: 30px;">
            We're excited to have you join our learning adventure! Click the magic button below to verify your email and start your journey.
          </p>
          <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(45deg, #e564fe, #ff69b4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 20px 0;">
            🚀 Verify Email & Start Learning
          </a>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link: <br/>
            <span style="word-break: break-all;">${verificationUrl}</span>
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
            <p style="color: #666; font-size: 14px;">
              🛡️ Safe • Secure • Fun Learning Environment
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  passwordReset: (name, resetUrl) => ({
    subject: "Reset Your EduJoy Kids Password",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Comic Sans MS', cursive; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 30px; text-align: center;">
          <h1 style="color: #e564fe; margin-bottom: 20px;">🔐 Password Reset</h1>
          <p style="font-size: 18px; color: #333; margin-bottom: 30px;">Hi ${name},</p>
          <p style="color: #666; margin-bottom: 30px;">
            Don't worry! We'll help you reset your password so you can get back to learning.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(45deg, #e564fe, #ff69b4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 20px 0;">
            🔑 Reset Password
          </a>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            This link will expire in 1 hour for security reasons.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            If you didn't request this reset, please ignore this email.
          </p>
        </div>
      </div>
    `,
  }),

  welcomeChild: (childName, parentName, loginUrl) => ({
    subject: `🎉 ${childName}'s Learning Adventure Begins!`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Comic Sans MS', cursive; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 30px; text-align: center;">
          <h1 style="color: #e564fe; margin-bottom: 20px;">🌟 Welcome ${childName}!</h1>
          <p style="font-size: 18px; color: #333; margin-bottom: 30px;">Dear ${parentName},</p>
          <p style="color: #666; margin-bottom: 30px;">
            ${childName}'s account is ready! They can now start their exciting learning journey with EduJoy Kids.
          </p>
          <div style="background: #f8f9ff; border-radius: 15px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #e564fe; margin-bottom: 15px;">What's Next?</h3>
            <ul style="text-align: left; color: #666; list-style: none; padding: 0;">
              <li style="margin: 10px 0;">📚 Explore age-appropriate lessons</li>
              <li style="margin: 10px 0;">🎮 Earn XP and unlock rewards</li>
              <li style="margin: 10px 0;">🏆 Complete daily challenges</li>
              <li style="margin: 10px 0;">📊 Track progress in parent dashboard</li>
            </ul>
          </div>
          <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(45deg, #e564fe, #ff69b4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 20px 0;">
            🚀 Start Learning Now
          </a>
        </div>
      </div>
    `,
  }),
};

// Send verification email
export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`;

    const template = emailTemplates.verification(name, verificationUrl);

    const mailOptions = {
      from: `"EduJoy Kids 🎈" <${process.env.SMTP_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    const template = emailTemplates.passwordReset(name, resetUrl);

    const mailOptions = {
      from: `"EduJoy Kids 🎈" <${process.env.SMTP_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

// Send welcome email for child account
export const sendWelcomeChildEmail = async (
  parentEmail,
  childName,
  parentName,
) => {
  try {
    const transporter = createTransporter();
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`;

    const template = emailTemplates.welcomeChild(
      childName,
      parentName,
      loginUrl,
    );

    const mailOptions = {
      from: `"EduJoy Kids 🎈" <${process.env.SMTP_USER}>`,
      to: parentEmail,
      subject: template.subject,
      html: template.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Welcome child email sent:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending welcome child email:", error);
    return false;
  }
};

// Send OTP email
export const sendOTPEmail = async (email, name, otp) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"EduJoy Kids 🎈" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your EduJoy Kids Verification Code",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Comic Sans MS', cursive; text-align: center; padding: 20px;">
          <h2 style="color: #e564fe;">🔐 Your Verification Code</h2>
          <p>Hi ${name},</p>
          <p>Use this code to verify your account:</p>
          <div style="font-size: 32px; font-weight: bold; color: #e564fe; background: #f8f9ff; padding: 20px; border-radius: 15px; margin: 20px 0; letter-spacing: 5px;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};
