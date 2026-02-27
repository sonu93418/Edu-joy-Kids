'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Search, Filter, Star, Play, Lock, CheckCircle, Clock, Zap, ChevronRight } from 'lucide-react';

const SUBJECTS = [
  { id: 'english', emoji: '📖', label: 'English', color: 'from-blue-400 to-blue-600', lessons: 25, completed: 18 },
  { id: 'math', emoji: '🔢', label: 'Math', color: 'from-purple-400 to-purple-600', lessons: 24, completed: 14 },
  { id: 'science', emoji: '🔬', label: 'Science', color: 'from-green-400 to-green-600', lessons: 20, completed: 17 },
  { id: 'urdu', emoji: '📝', label: 'Urdu', color: 'from-pink-400 to-red-500', lessons: 20, completed: 9 },
  { id: 'islamiat', emoji: '🌙', label: 'Islamiat', color: 'from-orange-400 to-orange-600', lessons: 20, completed: 18 },
  { id: 'social', emoji: '🌍', label: 'Social Studies', color: 'from-teal-400 to-teal-600', lessons: 20, completed: 6 },
];

const LESSONS: Record<string, Array<{ id: string; title: string; duration: string; xp: number; stars: number; status: 'completed' | 'available' | 'locked'; type: string; emoji: string }>> = {
  english: [
    { id: 'e1', title: 'The Alphabet Adventure', duration: '10 min', xp: 40, stars: 3, status: 'completed', type: 'animated', emoji: '🔤' },
    { id: 'e2', title: 'Vowels & Consonants', duration: '12 min', xp: 45, stars: 3, status: 'completed', type: 'interactive', emoji: '🗣️' },
    { id: 'e3', title: 'CVC Words', duration: '15 min', xp: 50, stars: 2, status: 'completed', type: 'quiz', emoji: '📚' },
    { id: 'e4', title: 'Sight Words Practice', duration: '10 min', xp: 40, stars: 0, status: 'available', type: 'game', emoji: '👁️' },
    { id: 'e5', title: 'Simple Sentences', duration: '18 min', xp: 60, stars: 0, status: 'available', type: 'interactive', emoji: '✍️' },
    { id: 'e6', title: 'Nouns & Verbs', duration: '20 min', xp: 65, stars: 0, status: 'locked', type: 'animated', emoji: '🔒' },
  ],
  math: [
    { id: 'm1', title: 'Counting 1-20', duration: '8 min', xp: 35, stars: 3, status: 'completed', type: 'game', emoji: '🔢' },
    { id: 'm2', title: 'Addition Fun', duration: '12 min', xp: 50, stars: 3, status: 'completed', type: 'interactive', emoji: '➕' },
    { id: 'm3', title: 'Subtraction Stories', duration: '15 min', xp: 55, stars: 3, status: 'completed', type: 'animated', emoji: '➖' },
    { id: 'm4', title: 'Shapes & Patterns', duration: '10 min', xp: 40, stars: 0, status: 'available', type: 'quiz', emoji: '🔷' },
    { id: 'm5', title: 'Fractions Intro', duration: '20 min', xp: 70, stars: 0, status: 'available', type: 'interactive', emoji: '🍕' },
  ],
  science: [
    { id: 's1', title: 'Plants & Photosynthesis', duration: '15 min', xp: 55, stars: 3, status: 'completed', type: 'animated', emoji: '🌱' },
    { id: 's2', title: 'Animal Kingdom', duration: '18 min', xp: 60, stars: 2, status: 'completed', type: 'interactive', emoji: '🦁' },
    { id: 's3', title: 'Water Cycle', duration: '12 min', xp: 50, stars: 0, status: 'available', type: 'animated', emoji: '💧' },
  ],
};

const TYPE_COLORS: Record<string, string> = {
  animated: 'bg-blue-100 text-blue-600',
  interactive: 'bg-purple-100 text-purple-600',
  quiz: 'bg-orange-100 text-orange-600',
  game: 'bg-green-100 text-green-600',
  story: 'bg-pink-100 text-pink-600',
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function LearnPage() {
  const [activeSubject, setActiveSubject] = useState('english');
  const [search, setSearch] = useState('');
  const lessons = (LESSONS[activeSubject] || []).filter(l => l.title.toLowerCase().includes(search.toLowerCase()));
  const subjectInfo = SUBJECTS.find(s => s.id === activeSubject)!;

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <BookOpen size={28} className="text-edujoy-primary-500" /> Learn & Grow
          </h1>
          <p className="text-gray-500 mt-1">Pick a subject and start your adventure!</p>
        </motion.div>

        {/* Subject Tabs */}
        <motion.div variants={item}>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SUBJECTS.map((subject) => {
              const pct = Math.round((subject.completed / subject.lessons) * 100);
              return (
                <motion.button
                  key={subject.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveSubject(subject.id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 transition-all ${
                    activeSubject === subject.id
                      ? `bg-gradient-to-br ${subject.color} border-transparent text-white shadow-md`
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{subject.emoji}</span>
                  <span className="text-xs font-black">{subject.label}</span>
                  <span className="text-xs opacity-80">{pct}%</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Subject Progress Banner */}
        <motion.div variants={item} className={`rounded-3xl bg-gradient-to-r ${subjectInfo.color} p-4 text-white flex items-center justify-between`}>
          <div>
            <p className="font-black text-lg">{subjectInfo.emoji} {subjectInfo.label}</p>
            <p className="text-sm opacity-80">{subjectInfo.completed} of {subjectInfo.lessons} lessons completed</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{Math.round((subjectInfo.completed / subjectInfo.lessons) * 100)}%</p>
            <p className="text-xs opacity-80">Progress</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div variants={item} className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none font-medium text-gray-700"
          />
        </motion.div>

        {/* Lessons Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={lesson.status !== 'locked' ? `/student/lesson/${lesson.id}` : '#'}>
                  <div className={`group flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    lesson.status === 'locked'
                      ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-gray-100 bg-white hover:border-edujoy-primary-200 hover:shadow-fun cursor-pointer'
                  }`}>
                    {/* Lesson Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform ${lesson.status !== 'locked' ? 'group-hover:scale-110' : ''} ${
                      lesson.status === 'completed' ? `bg-gradient-to-br ${subjectInfo.color}` :
                      lesson.status === 'available' ? 'bg-edujoy-primary-50' :
                      'bg-gray-100'
                    }`}>
                      {lesson.status === 'locked' ? <Lock size={24} className="text-gray-400" /> : lesson.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-black text-gray-800">{lesson.title}</p>
                        {lesson.status === 'completed' && <CheckCircle size={18} className="text-fun-green flex-shrink-0 mt-0.5" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} /> {lesson.duration}</span>
                        <span className="text-xs text-fun-orange flex items-center gap-1 font-bold"><Zap size={10} /> +{lesson.xp} XP</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${TYPE_COLORS[lesson.type] || 'bg-gray-100 text-gray-500'}`}>{lesson.type}</span>
                      </div>
                      {lesson.status === 'completed' && (
                        <div className="flex gap-0.5 mt-1.5">
                          {[1, 2, 3].map((s) => (
                            <Star key={s} size={14} className={s <= lesson.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                          ))}
                        </div>
                      )}
                      {lesson.status === 'available' && (
                        <button className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-edujoy-primary-500 text-white text-xs font-black rounded-xl hover:bg-edujoy-primary-600 transition-colors">
                          <Play size={10} /> Start Lesson
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {lessons.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold">No lessons found for &quot;{search}&quot;</p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
