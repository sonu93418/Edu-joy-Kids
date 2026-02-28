"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Zap,
  Flame,
  Star,
  Play,
  TrendingUp,
  Coins,
  Sparkles,
  Calculator,
  Microscope,
  PenLine,
  Moon,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { useGame } from "@/store/game-store";

const SUBJECTS = [
  { id: "english", label: "English", Icon: BookOpen, bg: "bg-blue-500" },
  { id: "math", label: "Mathematics", Icon: Calculator, bg: "bg-violet-500" },
  { id: "science", label: "Science", Icon: Microscope, bg: "bg-emerald-500" },
  { id: "urdu", label: "Urdu", Icon: PenLine, bg: "bg-rose-500" },
  { id: "islamiat", label: "Islamiat", Icon: Moon, bg: "bg-amber-500" },
  { id: "social", label: "Social Studies", Icon: Globe, bg: "bg-teal-500" },
];

export default function StudentDashboard() {
  const { user, student } = useAuth() as any;
  const {
    totalXP = 0,
    currentLevel = 1,
    xpToNextLevel = 200,
    coins = 0,
    streaks = { current: 0 },
  } = (useGame() as any) ?? {};

  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(
      h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening",
    );
  }, []);

  const firstName = user?.fullName?.split(" ")[0] ?? "Student";
  const grade = student?.grade ?? null;
  const safeXpNext = Math.max(xpToNextLevel, 1);
  const xpInLevel = totalXP % safeXpNext;
  const xpPct = Math.min(100, Math.round((xpInLevel / safeXpNext) * 100));

  return (
    <div className="w-full space-y-5">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {greeting}, {firstName}
            {grade ? (
              <span className="ml-1 text-base font-normal text-gray-400">
                · {grade}
              </span>
            ) : (
              ""
            )}
            !
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Ready to continue your learning journey?
          </p>
        </div>
        <Link
          href="/student/learn"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors self-start sm:self-auto"
        >
          <Play size={14} /> Continue Learning
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total XP",
            value: totalXP.toLocaleString(),
            Icon: Zap,
            bg: "bg-amber-50",
            ico: "text-amber-500",
            ring: "ring-amber-100",
          },
          {
            label: "Coins",
            value: coins.toLocaleString(),
            Icon: Coins,
            bg: "bg-yellow-50",
            ico: "text-yellow-500",
            ring: "ring-yellow-100",
          },
          {
            label: "Streak",
            value: `${streaks.current} days`,
            Icon: Flame,
            bg: "bg-rose-50",
            ico: "text-rose-500",
            ring: "ring-rose-100",
          },
          {
            label: "Level",
            value: `Level ${currentLevel}`,
            Icon: Trophy,
            bg: "bg-violet-50",
            ico: "text-violet-500",
            ring: "ring-violet-100",
          },
        ].map(({ label, value, Icon, bg, ico, ring }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-gray-100 ring-1 ${ring} p-4 flex items-center gap-3`}
          >
            <div className={`${bg} p-2.5 rounded-xl flex-shrink-0`}>
              <Icon size={18} className={ico} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-medium truncate">
                {label}
              </p>
              <p className="text-base font-bold text-gray-900 truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* XP Bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
        <Star
          size={15}
          className="text-amber-400 fill-amber-400 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-semibold text-gray-700">
              Level {currentLevel}
            </span>
            <span>
              {xpInLevel.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">
          {xpToNextLevel - xpInLevel} XP to go
        </span>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Subjects — left 2/3 */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">My Subjects</h2>
            <Link
              href="/student/learn"
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SUBJECTS.map(({ id, label, Icon, bg }) => (
              <Link key={id} href="/student/learn">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group cursor-pointer">
                  <div
                    className={`${bg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 truncate">
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right panel — 1/3 */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Quick Actions
            </h2>
            <div className="space-y-1">
              {[
                {
                  label: "Continue Learning",
                  href: "/student/learn",
                  Icon: Play,
                  cls: "text-indigo-600 bg-indigo-50",
                },
                {
                  label: "Ask AI Tutor",
                  href: "/student/ai-tutor",
                  Icon: Sparkles,
                  cls: "text-violet-600 bg-violet-50",
                },
                {
                  label: "Achievements",
                  href: "/student/achievements",
                  Icon: Trophy,
                  cls: "text-amber-600  bg-amber-50",
                },
                {
                  label: "My Progress",
                  href: "/student/learn",
                  Icon: TrendingUp,
                  cls: "text-emerald-600 bg-emerald-50",
                },
              ].map(({ label, href, Icon, cls }) => (
                <Link key={label} href={href}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cls}`}
                    >
                      <Icon size={13} />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      {label}
                    </span>
                    <ChevronRight
                      size={13}
                      className="ml-auto text-gray-300 group-hover:text-gray-400"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Tutor */}
          <div className="bg-violet-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-violet-200" />
              <span className="text-sm font-bold">AI Tutor</span>
            </div>
            <p className="text-xs text-violet-200 mb-3 leading-relaxed">
              Stuck on a topic? Get instant, clear explanations 24/7.
            </p>
            <Link
              href="/student/ai-tutor"
              className="inline-flex items-center gap-1.5 bg-white text-violet-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-violet-50 transition-colors"
            >
              Ask Now <ArrowRight size={12} />
            </Link>
          </div>

          {/* Streak badge (only when active) */}
          {streaks.current > 0 && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-rose-100 p-2.5 rounded-xl flex-shrink-0">
                <Flame size={16} className="text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {streaks.current}-Day Streak!
                </p>
                <p className="text-xs text-gray-500">Keep logging in daily.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Getting Started (zero XP) */}
      {totalXP === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl flex-shrink-0">
            <BookOpen size={20} className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">
              Start your learning journey
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose a subject and complete your first lesson to earn XP and
              coins.
            </p>
          </div>
          <Link
            href="/student/learn"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0"
          >
            Start Learning <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}
