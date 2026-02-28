"use client";

import Link from "next/link";
import {
  Sparkles, ArrowRight, BookOpen, Trophy, Star, Zap,
  ShieldCheck, Brain, Gamepad2, BarChart3, CheckCircle,
} from "lucide-react";

const GRADES = [
  { label: "Play Group", age: "3–4 yrs" },
  { label: "Nursery",    age: "4–5 yrs" },
  { label: "LKG",        age: "5–6 yrs" },
  { label: "UKG",        age: "6–7 yrs" },
  { label: "Class 1",    age: "7–8 yrs" },
  { label: "Class 2",    age: "8–9 yrs" },
  { label: "Class 3",    age: "9–10 yrs" },
  { label: "Class 4",    age: "10–11 yrs" },
  { label: "Class 5",    age: "11–12 yrs" },
];

const TRUST = [
  "Free 7-day trial",
  "No credit card required",
  "100% safe for kids",
  "COPPA Compliant",
];

const STATS = [
  { value: "50K+", label: "Happy Students", icon: Star     },
  { value: "500+", label: "Lessons",         icon: BookOpen },
  { value: "98%",  label: "Parent Trust",    icon: Trophy   },
];

const HIGHLIGHTS = [
  { icon: Brain,      label: "AI-Powered Tutor"    },
  { icon: Gamepad2,   label: "Gamified Learning"    },
  { icon: ShieldCheck,label: "Child-Safe Platform"  },
  { icon: BarChart3,  label: "Parent Analytics"     },
];

export default function HeroSection() {
  return (
    <section className="bg-white pt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">

        {/* BADGE */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-indigo-100">
            <Sparkles size={14} className="text-indigo-500" />
            AI-Powered Learning Platform for Kids
          </span>
        </div>

        {/* HEADLINE */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Learning Made{" "}
            <span className="text-indigo-600">Creative</span>
            <br />
            for Every Child
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto">
            A safe, gamified, AI-powered educational platform for children from
            Play Group to Class&nbsp;5. Earn XP, unlock adventures, and master
            every subject with your personal AI tutor.
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Zap size={17} /> Start Learning Free <ArrowRight size={17} />
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-base px-7 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <BookOpen size={17} /> Parent Login
          </Link>
        </div>

        {/* TRUST CHECKS */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-500 mb-14">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" />
              {t}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-14">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center bg-gray-50 rounded-2xl py-5 px-2 border border-gray-100">
              <Icon size={20} className="text-indigo-500 mx-auto mb-1" />
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
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
            >
              <Icon size={15} className="text-indigo-500" /> {label}
            </span>
          ))}
        </div>

        {/* GRADE GRID */}
        <div className="border-t border-gray-100 pt-10">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Available for all grades
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {GRADES.map(({ label, age }) => (
              <Link key={label} href="/auth/signup">
                <div className="group bg-white border border-gray-100 rounded-xl px-2 py-3 text-center hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-gray-800 group-hover:text-indigo-700">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{age}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />
    </section>
  );
}
