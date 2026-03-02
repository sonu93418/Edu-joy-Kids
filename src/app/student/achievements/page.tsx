"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useGame } from "@/store/game-store";
import { Trophy, Star, Zap, Lock, Filter } from "lucide-react";
import { useState, useMemo } from "react";

type UnlockCondition =
  | { type: "xp"; threshold: number }
  | { type: "level"; threshold: number }
  | { type: "streak"; threshold: number }
  | { type: "coins"; threshold: number }
  | { type: "always" };

interface Badge {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  category: string;
  xp: number;
  condition: UnlockCondition;
  conditionLabel: string;
}

const ALL_BADGES: Badge[] = [
  {
    id: "first_xp",
    emoji: "🌟",
    name: "First Step",
    desc: "Earn your first XP",
    category: "Learning",
    xp: 50,
    condition: { type: "xp", threshold: 1 },
    conditionLabel: "Earn any XP",
  },
  {
    id: "xp_100",
    emoji: "⚡",
    name: "Getting Started",
    desc: "Earn 100 XP",
    category: "Learning",
    xp: 30,
    condition: { type: "xp", threshold: 100 },
    conditionLabel: "Earn 100 XP",
  },
  {
    id: "xp_500",
    emoji: "🏅",
    name: "XP Collector",
    desc: "Earn 500 XP",
    category: "Learning",
    xp: 75,
    condition: { type: "xp", threshold: 500 },
    conditionLabel: "Earn 500 XP",
  },
  {
    id: "xp_1000",
    emoji: "💫",
    name: "XP Superstar",
    desc: "Earn 1,000 XP",
    category: "Milestones",
    xp: 150,
    condition: { type: "xp", threshold: 1000 },
    conditionLabel: "Earn 1,000 XP",
  },
  {
    id: "xp_5000",
    emoji: "🌈",
    name: "XP Legend",
    desc: "Earn 5,000 XP",
    category: "Milestones",
    xp: 500,
    condition: { type: "xp", threshold: 5000 },
    conditionLabel: "Earn 5,000 XP",
  },
  {
    id: "level_2",
    emoji: "📈",
    name: "Level Up!",
    desc: "Reach Level 2",
    category: "Milestones",
    xp: 60,
    condition: { type: "level", threshold: 2 },
    conditionLabel: "Reach Level 2",
  },
  {
    id: "level_5",
    emoji: "🏆",
    name: "Rising Star",
    desc: "Reach Level 5",
    category: "Milestones",
    xp: 200,
    condition: { type: "level", threshold: 5 },
    conditionLabel: "Reach Level 5",
  },
  {
    id: "level_10",
    emoji: "👑",
    name: "Champion",
    desc: "Reach Level 10",
    category: "Milestones",
    xp: 400,
    condition: { type: "level", threshold: 10 },
    conditionLabel: "Reach Level 10",
  },
  {
    id: "streak_2",
    emoji: "🔥",
    name: "On Fire!",
    desc: "Maintain a 2-day streak",
    category: "Streaks",
    xp: 50,
    condition: { type: "streak", threshold: 2 },
    conditionLabel: "2-day streak",
  },
  {
    id: "streak_5",
    emoji: "💥",
    name: "Hot Streak",
    desc: "Maintain a 5-day streak",
    category: "Streaks",
    xp: 100,
    condition: { type: "streak", threshold: 5 },
    conditionLabel: "5-day streak",
  },
  {
    id: "streak_7",
    emoji: "💎",
    name: "Diamond Streak",
    desc: "Maintain a 7-day streak",
    category: "Streaks",
    xp: 200,
    condition: { type: "streak", threshold: 7 },
    conditionLabel: "7-day streak",
  },
  {
    id: "streak_14",
    emoji: "🌙",
    name: "Two-Week Hero",
    desc: "Maintain a 14-day streak",
    category: "Streaks",
    xp: 350,
    condition: { type: "streak", threshold: 14 },
    conditionLabel: "14-day streak",
  },
  {
    id: "coins_50",
    emoji: "🥉",
    name: "Saving Up",
    desc: "Collect 50 coins",
    category: "Coins",
    xp: 40,
    condition: { type: "coins", threshold: 50 },
    conditionLabel: "Collect 50 coins",
  },
  {
    id: "coins_100",
    emoji: "🪙",
    name: "Coin Collector",
    desc: "Collect 100 coins",
    category: "Coins",
    xp: 80,
    condition: { type: "coins", threshold: 100 },
    conditionLabel: "Collect 100 coins",
  },
  {
    id: "coins_500",
    emoji: "🤑",
    name: "Rich Kid",
    desc: "Collect 500 coins",
    category: "Coins",
    xp: 200,
    condition: { type: "coins", threshold: 500 },
    conditionLabel: "Collect 500 coins",
  },
  {
    id: "welcome",
    emoji: "👋",
    name: "Welcome!",
    desc: "Joined EduJoy Kids",
    category: "Special",
    xp: 25,
    condition: { type: "always" },
    conditionLabel: "Just join!",
  },
];

const CATEGORIES = [
  "All",
  "Learning",
  "Milestones",
  "Streaks",
  "Coins",
  "Special",
];

function isUnlocked(
  badge: Badge,
  totalXP: number,
  currentLevel: number,
  coins: number,
  streaks: { current: number; best: number },
): boolean {
  const c = badge.condition;
  if (c.type === "always") return true;
  if (c.type === "xp") return totalXP >= c.threshold;
  if (c.type === "level") return currentLevel >= c.threshold;
  if (c.type === "streak") return streaks.best >= c.threshold;
  if (c.type === "coins") return coins >= c.threshold;
  return false;
}

export default function AchievementsPage() {
  const { totalXP, currentLevel, coins, streaks } = useGame();
  const [activeCategory, setActiveCategory] = useState("All");

  const badgesWithState = useMemo(
    () =>
      ALL_BADGES.map((b) => ({
        ...b,
        unlocked: isUnlocked(b, totalXP, currentLevel, coins, streaks),
      })),
    [totalXP, currentLevel, coins, streaks],
  );

  const filtered =
    activeCategory === "All"
      ? badgesWithState
      : badgesWithState.filter((b) => b.category === activeCategory);

  const unlockedCount = badgesWithState.filter((b) => b.unlocked).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Trophy size={28} className="text-yellow-400" /> My Achievements
          </h1>
          <p className="text-gray-500 mt-1">
            {unlockedCount} of {ALL_BADGES.length} badges earned
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              icon: "⚡",
              label: "Total XP",
              value: totalXP.toLocaleString(),
              color: "text-orange-500",
              bg: "bg-orange-50 border-orange-100",
            },
            {
              icon: "🏆",
              label: "Level",
              value: `Level ${currentLevel}`,
              color: "text-edujoy-primary-600",
              bg: "bg-edujoy-primary-50 border-edujoy-primary-100",
            },
            {
              icon: "🪙",
              label: "Coins",
              value: coins.toLocaleString(),
              color: "text-yellow-600",
              bg: "bg-yellow-50 border-yellow-100",
            },
            {
              icon: "🔥",
              label: "Best Streak",
              value: `${streaks.best} days`,
              color: "text-pink-600",
              bg: "bg-pink-50 border-pink-100",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 ${stat.bg} p-4 flex items-center gap-3`}
            >
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </p>
                <p className={`font-black text-lg ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-black text-gray-800">
              Badge Collection Progress
            </p>
            <p className="text-sm font-bold text-gray-500">
              {unlockedCount}/{ALL_BADGES.length}
            </p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
              style={{ width: `${(unlockedCount / ALL_BADGES.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {Math.round((unlockedCount / ALL_BADGES.length) * 100)}% complete
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-edujoy-primary-600 text-white shadow"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-edujoy-primary-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-2xl border-2 p-4 text-center relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md ${
                badge.unlocked
                  ? "border-yellow-200"
                  : "border-gray-100 opacity-60 grayscale"
              }`}
            >
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 rounded-2xl">
                  <Lock size={22} className="text-gray-400" />
                </div>
              )}
              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-3 ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-yellow-200 to-orange-300 shadow-sm"
                    : "bg-gray-100"
                }`}
              >
                {badge.emoji}
              </div>
              <p className="font-black text-gray-800 text-sm">{badge.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                {badge.desc}
              </p>
              <p className="text-xs text-edujoy-primary-500 mt-1 font-medium">
                {badge.conditionLabel}
              </p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <Zap size={12} className="text-orange-500" />
                <span className="text-xs font-bold text-orange-500">
                  +{badge.xp} XP
                </span>
              </div>
              {badge.unlocked && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No badges in this category yet!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
