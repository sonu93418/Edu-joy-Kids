"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen, Trophy, Zap, Flame, Star, Play, ChevronRight,
  TrendingUp, Coins, Sparkles, Calculator, Microscope,
  PenLine, Moon, Globe, CheckCircle, ArrowRight,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { useGame } from "@/store/game-store";

const SUBJECTS = [
  { id: "english",  label: "English",        icon: BookOpen,    color: "bg-blue-500",    light: "bg-blue-50 text-blue-700"      },
  { id: "math",     label: "Mathematics",    icon: Calculator,  color: "bg-violet-500",  light: "bg-violet-50 text-violet-700"  },
  { id: "science",  label: "Science",        icon: Microscope,  color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700"},
  { id: "urdu",     label: "Urdu",           icon: PenLine,     color: "bg-rose-500",    light: "bg-rose-50 text-rose-700"      },
  { id: "islamiat", label: "Islamiat",       icon: Moon,        color: "bg-amber-500",   light: "bg-amber-50 text-amber-700"    },
  { id: "social",   label: "Social Studies", icon: Globe,       color: "bg-teal-500",    light: "bg-teal-50 text-teal-700"      },
];

const QUICK_ACTIONS = [
  { label: "Continue Learning", href: "/student/learn",        icon: Play,       style: "bg-indigo-600 text-white hover:bg-indigo-700"  },
  { label: "AI Tutor",          href: "/student/ai-tutor",     icon: Sparkles,   style: "bg-violet-600 text-white hover:bg-violet-700"  },
  { label: "Achievements",      href: "/student/achievements", icon: Trophy,     style: "bg-amber-500  text-white hover:bg-amber-600"   },
  { label: "View Progress",     href: "/student/learn",        icon: TrendingUp, style: "bg-emerald-600 text-white hover:bg-emerald-700" },
];

export default function StudentDashboard() {
  const { user, student } = useAuth() as any;
  const {
    totalXP = 0, currentLevel = 1, xpToNextLevel = 100,
    coins = 0, streaks = { current: 0 },
  } = (useGame() as any) ?? {};
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const xpInLevel = totalXP % (xpToNextLevel || 100);
  const xpPercent = xpToNextLevel > 0 ? Math.min(100, Math.round((xpInLevel / xpToNextLevel) * 100)) : 0;
  const firstName  = (user?.fullName?.split(" ")[0]) ?? "Student";
  const grade      = student?.grade ?? null;

  const stats = [
    { label: "Total XP",   value: totalXP.toLocaleString(), icon: Zap,    color: "text-amber-600",  bg: "bg-amber-50"  },
    { label: "Coins",      value: coins.toLocaleString(),   icon: Coins,  color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Day Streak", value: `${streaks.current}d`,   icon: Flame,  color: "text-rose-600",   bg: "bg-rose-50"   },
    { label: "Level",      value: String(currentLevel),    icon: Trophy, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-200 text-sm font-medium">{greeting}</p>
        <h1 className="text-2xl font-bold mt-0.5">
          {firstName}{grade ? ` · ${grade}` : ""}
        </h1>
        <p className="text-indigo-200 text-sm mt-1">
          You have earned{" "}
          <span className="text-white font-semibold">{totalXP.toLocaleString()} XP</span>
          {" "}&mdash; keep going!
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/student/learn"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <Play size={14} /> Continue Learning
          </Link>
          <Link
            href="/student/ai-tutor"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Sparkles size={14} /> Ask AI Tutor
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm"
          >
            <div className={`${bg} p-2 rounded-lg`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-lg font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* XP PROGRESS */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-amber-500 fill-amber-400" />
            <span className="font-semibold text-gray-800 text-sm">
              Level {currentLevel} Progress
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {xpInLevel.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {xpToNextLevel - xpInLevel} XP until Level {currentLevel + 1}
        </p>
      </div>

      {/* SUBJECTS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">My Subjects</h2>
          <Link
            href="/student/learn"
            className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1"
          >
            All Subjects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUBJECTS.map(({ id, label, icon: Icon, color, light }) => (
            <Link key={id} href="/student/learn">
              <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <span className={`mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${light}`}>
                  <Play size={9} /> Begin
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-base font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, style }) => (
            <Link key={label} href={href}>
              <div className={`${style} rounded-xl p-4 text-center transition-colors cursor-pointer`}>
                <Icon size={22} className="mx-auto" />
                <p className="mt-2 text-xs font-semibold">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* GETTING STARTED */}
      {totalXP === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
          <CheckCircle size={40} className="text-indigo-400 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 text-base">Ready to start your journey?</h3>
          <p className="text-sm text-gray-500 mt-1">
            Pick a subject above or ask the AI Tutor — your progress will appear here.
          </p>
          <Link
            href="/student/learn"
            className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <BookOpen size={15} /> Start Learning
          </Link>
        </div>
      )}

      {/* STREAK BANNER */}
      {streaks.current > 0 && (
        <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Flame size={28} />
            <div>
              <p className="font-bold">{streaks.current}-Day Learning Streak!</p>
              <p className="text-sm text-rose-100">Come back tomorrow to keep it going.</p>
            </div>
          </div>
          <Link href="/student/achievements">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors cursor-pointer flex items-center gap-1">
              View <ChevronRight size={13} />
            </span>
          </Link>
        </div>
      )}

      {/* AI TUTOR PROMO */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
        <div className="bg-violet-100 p-3 rounded-xl flex-shrink-0">
          <Sparkles size={24} className="text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm">Need help with a topic?</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Your AI Tutor is available 24/7 — ask any question!
          </p>
        </div>
        <Link
          href="/student/ai-tutor"
          className="flex-shrink-0 bg-violet-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-1"
        >
          Ask Now <ArrowRight size={12} />
        </Link>
      </div>

    </div>
  );
}
