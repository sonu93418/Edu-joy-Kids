// @ts-nocheck
import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// All AI routes require authentication
router.use(authenticateToken);

/**
 * POST /api/ai/chat
 * AI Study Buddy chat endpoint
 */
router.post("/chat", async (req, res) => {
  try {
    const { message, grade, history = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    // Check if OpenAI is configured
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res
        .status(503)
        .json({ success: false, message: "AI service not configured" });
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: openaiKey });

    const systemPrompt = `You are "Edu", a friendly and enthusiastic AI tutor for children in ${grade || "primary school"} (ages 5-12). 
Your personality:
- Warm, encouraging, and playful
- Use simple, age-appropriate language
- Add emojis to make responses fun and engaging
- Break down complex topics into easy-to-understand pieces
- Give relatable examples from everyday life
- Always be positive and encouraging
- Keep responses concise (under 200 words unless explaining a complex topic)
- Use bullet points and formatting to make content scannable

Subjects you help with: Mathematics, English, Science, Urdu, Social Studies, Islamiat.
Always end with a question or encouragement to keep the child engaged.`;

    const chatHistory = history.map((h) => ({
      role: h.role,
      content: h.content,
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "I had trouble understanding that. Could you ask again? 🤔";

    res.json({ success: true, message: reply });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res
      .status(500)
      .json({ success: false, message: "AI service temporarily unavailable" });
  }
});

/**
 * POST /api/ai/analyze-weakness
 * Analyze student's weak areas from lesson performance
 */
router.post("/analyze-weakness", async (req, res) => {
  try {
    const { studentId, subject, recentScores } = req.body;
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res
        .status(503)
        .json({ success: false, message: "AI service not configured" });
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: openaiKey });

    const prompt = `A student has these recent scores in ${subject}:
${JSON.stringify(recentScores, null, 2)}

Based on these scores, identify:
1. Main areas of weakness (be specific)
2. Recommended practice topics (3 max)
3. Suggested study approach

Respond in JSON format:
{
  "weakAreas": ["area1", "area2"],
  "recommendations": ["topic1", "topic2", "topic3"],
  "studyApproach": "brief description",
  "encouragement": "positive message for the student"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(response.choices[0]?.message?.content || "{}");
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ success: false, message: "Analysis failed" });
  }
});

/**
 * POST /api/ai/generate-hint
 * Generate a contextual hint for a quiz question
 */
router.post("/generate-hint", async (req, res) => {
  try {
    const { question, subject, grade } = req.body;
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res
        .status(503)
        .json({ success: false, message: "AI service not configured" });
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: openaiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give a helpful hint (not the answer) for this ${grade} ${subject} question: "${question}". Keep it friendly, short (1-2 sentences) and use an emoji.`,
        },
      ],
      max_tokens: 80,
      temperature: 0.7,
    });

    const hint =
      response.choices[0]?.message?.content ||
      "Think carefully and use what you've learned! 💡";
    res.json({ success: true, hint });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, hint: "Think carefully! You can do it! 💡" });
  }
});

export default router;
