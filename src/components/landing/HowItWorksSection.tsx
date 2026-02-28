"use client";

import Link from "next/link";
import { UserPlus, Layers, BookOpen, Trophy, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    title: "Parent Signs Up",
    desc: "Create a parent account in 30 seconds. Set safety settings and parental controls.",
    color: "bg-indigo-500",
  },
  {
    n: 2,
    icon: Layers,
    title: "Create Child Profile",
    desc: "Add your child's grade and details. AI instantly builds a personalised learning path.",
    color: "bg-blue-500",
  },
  {
    n: 3,
    icon: BookOpen,
    title: "Start Learning",
    desc: "Interactive lessons, quizzes, and games aligned to the school curriculum.",
    color: "bg-emerald-500",
  },
  {
    n: 4,
    icon: Trophy,
    title: "Track & Celebrate",
    desc: "Monitor progress in real time. Watch confidence and grades grow week by week.",
    color: "bg-amber-500",
  },
];

const HIGHLIGHTS = [
  "Personalised curriculum",
  "AI-powered insights",
  "Zero ads, child-safe",
  "Live parent dashboard",
  "Certified content",
  "All devices supported",
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Getting Started is Easy
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            From signup to first lesson in under 5 minutes — intuitive for parents and children of all ages.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200" />
          {STEPS.map(({ n, icon: Icon, title, desc, color }) => (
            <div key={n} className="flex flex-col items-center text-center relative z-10">
              <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                <Icon size={26} className="text-white" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Step {n}</span>
              <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>

        {/* HIGHLIGHTS + CTA */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1">
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Built for the Modern Family</h3>
            <p className="text-gray-500 text-sm mb-5">
              EduJoy Kids brings education, safety, and engagement together.
              Parents stay in control while kids enjoy learning like never before.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HIGHLIGHTS.map((label) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 self-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-gray-400 mt-2 text-center">No credit card required</p>
          </div>
        </div>

      </div>
    </section>
  );
}
