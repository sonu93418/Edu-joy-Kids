'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { useGame } from '@/store/game-store';
import { Trophy, Star, Zap, Lock } from 'lucide-react';

const ALL_BADGES = [
  { id: 'first_lesson', emoji: '🌟', name: 'First Step', desc: 'Complete your first lesson', category: 'Learning', unlocked: true, xp: 50 },
  { id: 'streak_3', emoji: '🔥', name: 'On Fire!', desc: 'Maintain a 3-day streak', category: 'Streaks', unlocked: true, xp: 75 },
  { id: 'perfect_quiz', emoji: '🎯', name: 'Sharpshooter', desc: 'Score 100% on a quiz', category: 'Performance', unlocked: true, xp: 100 },
  { id: 'math_master', emoji: '🔢', name: 'Math Wizard', desc: 'Complete 5 Math lessons', category: 'Subjects', unlocked: true, xp: 120 },
  { id: 'english_star', emoji: '📖', name: 'Word Master', desc: 'Complete 5 English lessons', category: 'Subjects', unlocked: false, xp: 120 },
  { id: 'science_explorer', emoji: '🔬', name: 'Scientist', desc: 'Complete 5 Science lessons', category: 'Subjects', unlocked: false, xp: 120 },
  { id: 'streak_7', emoji: '💎', name: 'Diamond Streak', desc: 'Maintain a 7-day streak', category: 'Streaks', unlocked: false, xp: 200 },
  { id: 'level_5', emoji: '🏆', name: 'Rising Star', desc: 'Reach Level 5', category: 'Milestones', unlocked: false, xp: 250 },
  { id: 'lessons_10', emoji: '📚', name: 'Book Worm', desc: 'Complete 10 lessons total', category: 'Learning', unlocked: false, xp: 150 },
  { id: 'coins_100', emoji: '🪙', name: 'Coin Collector', desc: 'Collect 100 coins', category: 'Milestones', unlocked: false, xp: 100 },
  { id: 'speed_quiz', emoji: '⚡', name: 'Speed Demon', desc: 'Complete a quiz in under 2 minutes', category: 'Performance', unlocked: false, xp: 80 },
  { id: 'parent_favorite', emoji: '❤️', name: 'Parent\'s Joy', desc: 'Get praised by your parent', category: 'Special', unlocked: false, xp: 200 },
];

const CATEGORIES = ['All', 'Learning', 'Streaks', 'Performance', 'Subjects', 'Milestones', 'Special'];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } };

export default function AchievementsPage() {
  const { totalXP, currentLevel, coins, streaks, badges } = useGame();
  const unlockedCount = ALL_BADGES.filter(b => b.unlocked).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Trophy size={28} className="text-yellow-400" /> My Achievements
          </h1>
          <p className="text-gray-500 mt-1">{unlockedCount} of {ALL_BADGES.length} badges earned</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '⚡', label: 'Total XP', value: totalXP.toLocaleString(), color: 'text-fun-orange', bg: 'bg-orange-50 border-orange-100' },
            { icon: '🏆', label: 'Level', value: `Level ${currentLevel}`, color: 'text-fun-purple', bg: 'bg-purple-50 border-purple-100' },
            { icon: '🪙', label: 'Coins', value: coins.toLocaleString(), color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-100' },
            { icon: '🔥', label: 'Best Streak', value: `${streaks.best} days`, color: 'text-fun-pink', bg: 'bg-pink-50 border-pink-100' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl border-2 ${stat.bg} p-4 flex items-center gap-3`}>
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className={`font-black text-lg ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="card-fun p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-black text-gray-800">Badge Collection Progress</p>
            <p className="text-sm font-bold text-gray-500">{unlockedCount}/{ALL_BADGES.length}</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-fun-orange"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / ALL_BADGES.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Badges Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_BADGES.map((badge) => (
            <motion.div
              key={badge.id}
              variants={item}
              whileHover={badge.unlocked ? { y: -4, scale: 1.03 } : {}}
              className={`card-fun p-4 text-center relative overflow-hidden ${!badge.unlocked ? 'opacity-60 grayscale' : ''}`}
            >
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-3xl">
                  <Lock size={24} className="text-gray-400" />
                </div>
              )}
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-3 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-yellow-200 to-fun-orange shadow-md'
                  : 'bg-gray-100'
              }`}>
                {badge.emoji}
              </div>
              <p className="font-black text-gray-800 text-sm">{badge.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">{badge.desc}</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <Zap size={12} className="text-fun-orange" />
                <span className="text-xs font-bold text-fun-orange">+{badge.xp} XP</span>
              </div>
              {badge.unlocked && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-fun-green rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">✓</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
