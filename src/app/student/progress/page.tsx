"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useGame } from "@/store/game-store";
import { SUBJECTS, GRADES, getLessonsBySubject } from "@/lib/lesson-data";
import { SUBJECT_ICON_MAP } from "@/components/ui/SubjectIcons";
import { Zap, Star, TrendingUp, BookOpen, Target, Award } from "lucide-react";

const LEVEL_XP = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];

function getLevelProgress(totalXP: number, currentLevel: number) {
  const current = LEVEL_XP[currentLevel - 1] ?? 0;
  const next = LEVEL_XP[currentLevel] ?? LEVEL_XP[LEVEL_XP.length - 1];
  const range = next - current;
  const earned = totalXP - current;
  return {
    earned,
    range,
    pct: Math.min(Math.round((earned / range) * 100), 100),
    nextXP: next,
  };
}

export default function StudentProgressPage() {
  const { totalXP, currentLevel, coins, streaks } = useGame();
  const lvl = getLevelProgress(totalXP, currentLevel);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-edujoy-primary-500" />
            My Progress
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your learning journey
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              emoji: "⚡",
              label: "Total XP",
              value: totalXP.toLocaleString(),
              color: "text-orange-500",
              bg: "bg-orange-50 border-orange-100",
            },
            {
              emoji: "🏆",
              label: "Level",
              value: `Level ${currentLevel}`,
              color: "text-edujoy-primary-600",
              bg: "bg-edujoy-primary-50 border-edujoy-primary-100",
            },
            {
              emoji: "🔥",
              label: "Streak",
              value: `${streaks.current}d`,
              color: "text-pink-600",
              bg: "bg-pink-50 border-pink-100",
            },
            {
              emoji: "🪙",
              label: "Coins",
              value: coins.toLocaleString(),
              color: "text-yellow-600",
              bg: "bg-yellow-50 border-yellow-100",
            },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl border-2 ${s.bg} p-4`}>
              <span className="text-3xl block mb-1">{s.emoji}</span>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-gray-800">
                Level {currentLevel} Progress
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {lvl.earned} / {lvl.range} XP to Level {currentLevel + 1}
              </p>
            </div>
            <span className="text-2xl font-black text-edujoy-primary-600">
              {lvl.pct}%
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-edujoy-primary-400 to-fun-pink transition-all duration-700"
              style={{ width: `${lvl.pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {lvl.range - lvl.earned} XP needed to reach Level {currentLevel + 1}
          </p>
        </div>

        {/* Per-subject Progress */}
        <div>
          <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Subject Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUBJECTS.map((subject) => {
              const lessons = getLessonsBySubject(subject.id);
              const completed = lessons.filter(
                (l) => l.status === "completed",
              ).length;
              const total = lessons.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const grades = Array.from(new Set(lessons.map((l) => l.grade)));
              const totalXPAvail = lessons.reduce((a, l) => a + l.xpReward, 0);
              const earnedXP = lessons
                .filter((l) => l.status === "completed")
                .reduce((a, l) => a + l.xpReward, 0);

              const SubjectIcon = SUBJECT_ICON_MAP[subject.id];
              return (
                <div
                  key={subject.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {SubjectIcon && (
                        <SubjectIcon
                          size={24}
                          className="text-edujoy-primary-500"
                        />
                      )}
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {subject.label}
                        </p>
                        <p className="text-xs text-gray-400">
                          {grades.join(", ")}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-gray-600">
                      {pct}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${subject.color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {completed}/{total} lessons
                    </span>
                    <span className="flex items-center gap-1 text-orange-500">
                      <Zap className="w-3 h-3" />
                      {earnedXP}/{totalXPAvail} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak info */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">🔥 Learning Streak</p>
              <p className="text-sm opacity-80 mt-0.5">
                Keep studying every day!
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black">{streaks.current}</p>
              <p className="text-xs opacity-70">days in a row</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="font-black text-xl">{streaks.best}</p>
              <p className="text-xs opacity-80">Best streak</p>
            </div>
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="font-black text-xl">
                {streaks.current >= 7
                  ? "🏅"
                  : streaks.current >= 3
                    ? "🥉"
                    : "🎯"}
              </p>
              <p className="text-xs opacity-80">
                {streaks.current >= 7
                  ? "Diamond"
                  : streaks.current >= 3
                    ? "Bronze"
                    : "Keep going"}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational tip */}
        <div className="bg-edujoy-primary-50 border-2 border-edujoy-primary-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">💡</span>
          <div>
            <p className="font-bold text-edujoy-primary-800 text-sm">
              Tip to Level Up Faster!
            </p>
            <p className="text-edujoy-primary-600 text-sm mt-0.5">
              Complete all quiz slides with 100% score to earn maximum XP.
              Maintain your daily streak for bonus rewards! 🚀
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
