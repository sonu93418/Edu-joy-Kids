"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  RefreshCw,
  BookOpen,
  Lightbulb,
  Pencil,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/store/auth-store";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  { emoji: "🔢", text: "Explain fractions with an easy example" },
  { emoji: "📖", text: "What are sight words and why are they important?" },
  { emoji: "🌱", text: "How does photosynthesis work?" },
  { emoji: "✍️", text: "Help me write a short story about animals" },
  { emoji: "🗺️", text: "What are the continents of the world?" },
  { emoji: "⭐", text: "Quiz me on my math multiplication tables" },
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi there! 👋 I'm Edu, your AI learning buddy! 🦉✨\n\nI'm here to help you learn anything — from tricky math problems to exciting science facts! Ask me any question, and I'll explain it in a fun and easy way.\n\nWhat would you like to learn today? 🚀",
  timestamp: new Date(),
};

export default function AITutorPage() {
  const { user, student } = useAuth();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          grade: student?.grade || "Class 3",
          history: messages
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("AI unavailable");

      const data = await res.json();
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      // Fallback response if API not connected
      const fallbackReplies: Record<string, string> = {
        fraction:
          "A fraction shows part of a whole! 🍕\n\nImagine a pizza cut into 4 equal slices. If you eat 1 slice, you ate **1/4** (one-fourth) of the pizza!\n\n• The **top number** (1) is called the **numerator** — it shows how many parts you have\n• The **bottom number** (4) is called the **denominator** — it shows how many total parts\n\nSo 2/4 means you have 2 out of 4 pieces! 🎉",
        photosynthesis:
          "Photosynthesis is how plants make their own food! 🌱☀️\n\nHere's the magic formula:\n**Sunlight + Water + Carbon Dioxide → Food (glucose) + Oxygen**\n\n🌞 Plants absorb sunlight through their leaves\n💧 They drink water through their roots\n🌬️ They breathe in carbon dioxide from the air\n\nAnd as a bonus — they give us **oxygen** to breathe! Aren't plants amazing? 🌿",
        default:
          "That's a great question! 🌟\n\nI'm your learning buddy and I love helping with school topics like:\n• 📐 Math (counting, addition, fractions, shapes)\n• 📚 English (reading, writing, grammar)\n• 🔬 Science (animals, plants, weather)\n• 🌍 Social Studies (countries, maps, history)\n\nWhat specific topic would you like help with? I'll explain it in a super fun way! 😄",
      };

      const lower = text.toLowerCase();
      let replyText = fallbackReplies.default;
      if (lower.includes("fraction") || lower.includes("math"))
        replyText = fallbackReplies.fraction;
      if (
        lower.includes("photo") ||
        lower.includes("plant") ||
        lower.includes("science")
      )
        replyText = fallbackReplies.photosynthesis;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: replyText,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center text-2xl shadow-md">
              🦉
            </div>
            <div>
              <h1 className="font-black text-gray-800 text-lg">
                Edu — AI Study Buddy
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-fun-green rounded-full animate-pulse" />
                <p className="text-xs text-gray-400 font-medium">
                  Always here to help · Powered by AI
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([WELCOME_MESSAGE])}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all font-medium"
          >
            <RefreshCw size={14} /> New Chat
          </button>
        </div>

        {/* Suggested Prompts (only when just welcome message) */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 flex-shrink-0">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt.text)}
                className="flex items-start gap-2 p-3 rounded-2xl border-2 border-gray-100 bg-white hover:border-edujoy-primary-200 hover:bg-edujoy-primary-50 text-left transition-all"
              >
                <span className="text-xl flex-shrink-0">{prompt.emoji}</span>
                <span className="text-xs font-medium text-gray-600 leading-snug">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-edujoy-primary-300 to-fun-purple"
                    : "bg-gradient-to-br from-fun-yellow to-fun-orange"
                }`}
              >
                {msg.role === "assistant" ? "🦩" : user?.fullName?.[0] || "👦"}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-edujoy-primary-400 to-fun-purple text-white rounded-tr-sm"
                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                }`}
              >
                <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
                <p
                  className={`text-xs mt-1 ${msg.role === "user" ? "text-white/60" : "text-gray-300"}`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-edujoy-primary-300 to-fun-purple flex items-center justify-center text-xl shadow-sm">
                🦉
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-edujoy-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex-shrink-0 flex gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Edu anything... 🦉"
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none font-medium text-gray-800 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-edujoy-primary-400 to-fun-purple text-white flex items-center justify-center disabled:opacity-40 shadow-md flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
