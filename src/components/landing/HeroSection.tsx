"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Star,
  Zap,
  ShieldCheck,
  Brain,
  Gamepad2,
  BarChart3,
  CheckCircle,
} from "lucide-react";

const GRADES = [
  { label: "Play Group", age: "3–4 yrs" },
  { label: "Nursery", age: "4–5 yrs" },
  { label: "LKG", age: "5–6 yrs" },
  { label: "UKG", age: "6–7 yrs" },
  { label: "Class 1", age: "7–8 yrs" },
  { label: "Class 2", age: "8–9 yrs" },
  { label: "Class 3", age: "9–10 yrs" },
  { label: "Class 4", age: "10–11 yrs" },
  { label: "Class 5", age: "11–12 yrs" },
];

const TRUST = [
  "Free 7-day trial",
  "No credit card required",
  "100% safe for kids",
  "COPPA Compliant",
];

const STATS = [
  { value: "50K+", label: "Happy Students", icon: Star },
  { value: "500+", label: "Lessons", icon: BookOpen },
  { value: "98%", label: "Parent Trust", icon: Trophy },
];

const HIGHLIGHTS = [
  { icon: Brain, label: "AI-Powered Tutor" },
  { icon: Gamepad2, label: "Gamified Learning" },
  { icon: ShieldCheck, label: "Child-Safe Platform" },
  { icon: BarChart3, label: "Parent Analytics" },
];

/* Floating decorations: emoji, position, animation class, delay */
const DECO = [
  {
    e: "📚",
    top: "8%",
    left: "4%",
    cls: "hero-float",
    delay: "0s",
    size: "text-3xl",
    op: "opacity-70",
  },
  {
    e: "⭐",
    top: "6%",
    right: "5%",
    cls: "hero-twinkle",
    delay: "0.5s",
    size: "text-4xl",
    op: "opacity-80",
  },
  {
    e: "🎮",
    top: "22%",
    left: "2%",
    cls: "hero-float-alt",
    delay: "1s",
    size: "text-2xl",
    op: "opacity-60",
  },
  {
    e: "🏆",
    top: "18%",
    right: "3%",
    cls: "hero-float",
    delay: "1.5s",
    size: "text-3xl",
    op: "opacity-70",
  },
  {
    e: "🚀",
    top: "55%",
    left: "1.5%",
    cls: "hero-float-side",
    delay: "0.8s",
    size: "text-3xl",
    op: "opacity-65",
  },
  {
    e: "✏️",
    top: "60%",
    right: "2%",
    cls: "hero-float-alt",
    delay: "2s",
    size: "text-2xl",
    op: "opacity-60",
  },
  {
    e: "🔬",
    top: "38%",
    left: "5%",
    cls: "hero-twinkle",
    delay: "2.5s",
    size: "text-2xl",
    op: "opacity-55",
  },
  {
    e: "💡",
    top: "42%",
    right: "4%",
    cls: "hero-float",
    delay: "3s",
    size: "text-2xl",
    op: "opacity-60",
  },
  {
    e: "🌟",
    top: "72%",
    left: "3%",
    cls: "hero-twinkle",
    delay: "1.2s",
    size: "text-3xl",
    op: "opacity-50",
  },
  {
    e: "🎨",
    top: "75%",
    right: "3.5%",
    cls: "hero-float-alt",
    delay: "0.3s",
    size: "text-2xl",
    op: "opacity-55",
  },
  {
    e: "🔢",
    top: "13%",
    left: "14%",
    cls: "hero-float",
    delay: "4s",
    size: "text-xl",
    op: "opacity-40",
  },
  {
    e: "🎯",
    top: "10%",
    right: "14%",
    cls: "hero-float-alt",
    delay: "3.5s",
    size: "text-xl",
    op: "opacity-40",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(160deg, #f0f0ff 0%, #fdf4ff 20%, #ffffff 55%, #f0f9ff 80%, #f5f0ff 100%)",
      }}
    >
      {/* ── Dot-grid background overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c7d2fe 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* ── Soft coloured blobs ── */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-edujoy-primary-300 opacity-20 blur-3xl hero-pulse-blob pointer-events-none" />
      <div
        className="absolute -top-16 -right-20 w-96 h-96 rounded-full bg-edujoy-primary-400 opacity-20 blur-3xl hero-pulse-blob pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-amber-200 opacity-25 blur-3xl hero-pulse-blob pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 -right-28 w-72 h-72 rounded-full bg-fun-pink opacity-10 blur-3xl hero-pulse-blob pointer-events-none"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-teal-200 opacity-20 blur-3xl hero-pulse-blob pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      {/* ── Floating emoji decorations ── */}
      {DECO.map(({ e, top, left, right, cls, delay, size, op }, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${cls} ${size} ${op}`}
          style={{ top, left, right, animationDelay: delay }}
          aria-hidden="true"
        >
          {e}
        </span>
      ))}

      {/* ── Geometric accent shapes ── */}
      <div
        className="absolute top-28 left-[10%] w-6 h-6 rounded-full bg-amber-400 opacity-50 hero-twinkle pointer-events-none"
        style={{ animationDelay: "0.7s" }}
      />
      <div
        className="absolute top-40 right-[12%] w-4 h-4 rounded-full bg-rose-400 opacity-50 hero-twinkle pointer-events-none"
        style={{ animationDelay: "1.8s" }}
      />
      <div className="absolute top-64 left-[18%] w-5 h-5 rounded bg-edujoy-primary-400 opacity-40 hero-spin-slow pointer-events-none" />
      <div
        className="absolute top-56 right-[18%] w-4 h-4 rounded bg-edujoy-primary-500 opacity-40 hero-spin-slow pointer-events-none"
        style={{ animationDelay: "-10s" }}
      />
      <div
        className="absolute top-80 left-[8%] w-3 h-3 rounded-full bg-emerald-400 opacity-50 hero-float-alt pointer-events-none"
        style={{ animationDelay: "2.2s" }}
      />
      <div
        className="absolute top-96 right-[9%] w-3 h-3 rounded-full bg-fun-blue opacity-40 hero-float pointer-events-none"
        style={{ animationDelay: "1.3s" }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* BADGE */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-white/90 text-edujoy-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-edujoy-primary-200 shadow-sm backdrop-blur-sm">
            <Sparkles size={14} className="text-edujoy-primary-500" />
            AI-Powered Learning Platform for Kids
          </span>
        </div>

        {/* HEADLINE */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Learning Made{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
              }}
            >
              Creative
            </span>
            <br />
            for Every Child
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-xl mx-auto">
            A safe, gamified, AI-powered educational platform for children from
            Play Group to Class&nbsp;5. Earn XP, unlock adventures, and master
            every subject with your personal AI tutor.
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center gap-2 bg-edujoy-primary-600 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-edujoy-primary-700 active:scale-95 transition-all shadow-lg shadow-edujoy-primary-200"
          >
            <Zap size={17} /> Start Learning Free <ArrowRight size={17} />
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 bg-white/90 text-gray-700 font-semibold text-base px-7 py-3.5 rounded-xl border border-gray-200 hover:bg-white hover:border-edujoy-primary-200 hover:shadow-md active:scale-95 transition-all backdrop-blur-sm"
          >
            <BookOpen size={17} /> Parent Login
          </Link>
        </div>

        {/* TRUST CHECKS */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-500 mb-14">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle
                size={13}
                className="text-emerald-500 flex-shrink-0"
              />
              {t}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-14">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl py-5 px-2 border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Icon
                size={20}
                className="text-edujoy-primary-500 mx-auto mb-1"
              />
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* FEATURE PILLS */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 bg-white/90 border border-edujoy-primary-100 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-edujoy-primary-300 hover:bg-edujoy-primary-50 hover:-translate-y-0.5 transition-all backdrop-blur-sm cursor-default"
            >
              <Icon size={15} className="text-edujoy-primary-500" /> {label}
            </span>
          ))}
        </div>

        {/* GRADE GRID */}
        <div className="border-t border-edujoy-primary-100 pt-10">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Available for all grades
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {GRADES.map(({ label, age }) => (
              <Link key={label} href="/auth/signup">
                <div className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl px-2 py-3 text-center hover:border-edujoy-primary-300 hover:bg-edujoy-primary-50 hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer">
                  <p className="text-xs font-bold text-gray-800 group-hover:text-edujoy-primary-700">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{age}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />
      <div className="h-px bg-gray-100 relative z-10" />
    </section>
  );
}
