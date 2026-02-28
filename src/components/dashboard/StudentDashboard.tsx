"use client";
// ─── REWRITTEN: full cartoon theme ───
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Zap,
  Flame,
  Star,
  Play,
  CheckCircle,
  ChevronRight,
  Target,
  Clock,
  TrendingUp,
  Coins,
  Calculator,
  Microscope,
  PenLine,
  Moon,
  Globe,
  Lightbulb,
  Type,
  Plus,
  Sparkles,
  Leaf,
  Swords,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { useGame } from "@/store/game-store";

/* ── Cartoon SVG Owl Mascot ── */
const OwlMascot = ({ size = 120 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 1.14)} viewBox="0 0 160 182" fill="none">
    <ellipse cx="80" cy="120" rx="52" ry="55" fill="#F59E0B" />
    <ellipse cx="80" cy="125" rx="38" ry="42" fill="#FEF3C7" />
    <ellipse cx="30" cy="115" rx="22" ry="35" fill="#D97706" transform="rotate(-20 30 115)" />
    <ellipse cx="130" cy="115" rx="22" ry="35" fill="#D97706" transform="rotate(20 130 115)" />
    <ellipse cx="80" cy="65" rx="46" ry="44" fill="#F59E0B" />
    <polygon points="52,28 44,8 62,22" fill="#D97706" />
    <polygon points="108,28 116,8 98,22" fill="#D97706" />
    <ellipse cx="80" cy="68" rx="34" ry="32" fill="#FEF3C7" />
    <circle cx="64" cy="62" r="13" fill="white" stroke="#D97706" strokeWidth="2.5" />
    <circle cx="96" cy="62" r="13" fill="white" stroke="#D97706" strokeWidth="2.5" />
    <circle cx="64" cy="64" r="7" fill="#1E40AF" />
    <circle cx="96" cy="64" r="7" fill="#1E40AF" />
    <circle cx="67" cy="61" r="2.5" fill="white" />
    <circle cx="99" cy="61" r="2.5" fill="white" />
    <path d="M55 52 Q64 46 73 52" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M87 52 Q96 46 105 52" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <polygon points="80,74 74,85 86,85" fill="#F97316" />
    <ellipse cx="72" cy="118" rx="6" ry="8" fill="#FDE68A" opacity="0.6" />
    <ellipse cx="88" cy="118" rx="6" ry="8" fill="#FDE68A" opacity="0.6" />
  </svg>
);

/* ── Cloud shape ── */
const Cloud = ({ size = 80, color = "white" }: { size?: number; color?: string }) => (
  <svg width={size} height={Math.round(size * 0.6)} viewBox="0 0 80 48" fill="none">
    <ellipse cx="40" cy="32" rx="36" ry="16" fill={color} />
    <circle cx="26" cy="28" r="14" fill={color} />
    <circle cx="52" cy="26" r="17" fill={color} />
    <circle cx="40" cy="20" r="13" fill={color} />
  </svg>
);

/* ── SVG star ── */
const SvgStar = ({ size = 18, color = "#FCD34D" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <polygon
      points="10,1 12.3,7.5 19,7.5 13.8,11.8 15.9,18.5 10,14.5 4.1,18.5 6.2,11.8 1,7.5 7.7,7.5"
      fill={color}
    />
  </svg>
);

/* ── Subject Cartoon Characters ── */
const BookChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="8" y="8" width="34" height="40" rx="5" fill="white" fillOpacity="0.92"/>
    <rect x="8" y="8" width="9" height="40" rx="4" fill="white" fillOpacity="0.55"/>
    <rect x="19" y="14" width="17" height="2.5" rx="1.2" fill="#1D4ED8" fillOpacity="0.4"/>
    <rect x="19" y="19" width="13" height="2.5" rx="1.2" fill="#1D4ED8" fillOpacity="0.4"/>
    <rect x="19" y="24" width="10" height="2.5" rx="1.2" fill="#1D4ED8" fillOpacity="0.4"/>
    <circle cx="20" cy="35" r="5" fill="#1D4ED8"/>
    <circle cx="32" cy="35" r="5" fill="#1D4ED8"/>
    <circle cx="21" cy="34" r="2" fill="white"/>
    <circle cx="33" cy="34" r="2" fill="white"/>
    <path d="M17 42 Q26 47 35 42" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
const CalcChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="10" y="6" width="36" height="44" rx="6" fill="white" fillOpacity="0.92"/>
    <rect x="14" y="10" width="28" height="12" rx="3" fill="#5B21B6" fillOpacity="0.45"/>
    <circle cx="22" cy="16" r="4" fill="#4C1D95"/>
    <circle cx="34" cy="16" r="4" fill="#4C1D95"/>
    <circle cx="23" cy="15" r="1.5" fill="white"/>
    <circle cx="35" cy="15" r="1.5" fill="white"/>
    <path d="M18 23 Q28 27 38 23" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="14" y="30" width="10" height="6" rx="2" fill="#7C3AED" fillOpacity="0.4"/>
    <rect x="28" y="30" width="10" height="6" rx="2" fill="#7C3AED" fillOpacity="0.4"/>
    <rect x="14" y="40" width="10" height="6" rx="2" fill="#7C3AED" fillOpacity="0.4"/>
    <rect x="28" y="40" width="10" height="6" rx="2" fill="#A78BFA" fillOpacity="0.55"/>
    <rect x="16" y="32" width="6" height="2" rx="1" fill="#7C3AED"/>
    <rect x="31" y="32" width="6" height="2" rx="1" fill="#7C3AED"/>
    <rect x="33" y="30" width="2" height="6" rx="1" fill="#7C3AED"/>
  </svg>
);
const BeakerChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M20 8 L20 24 L8 44 Q6 50 12 50 L44 50 Q50 50 48 44 L36 24 L36 8 Z" fill="white" fillOpacity="0.88"/>
    <rect x="18" y="8" width="20" height="5" rx="2.5" fill="white" fillOpacity="0.5"/>
    <circle cx="18" cy="43" r="5" fill="#059669" fillOpacity="0.5"/>
    <circle cx="36" cy="45" r="4" fill="#10B981" fillOpacity="0.45"/>
    <circle cx="22" cy="28" r="5" fill="#065F46"/>
    <circle cx="34" cy="30" r="5" fill="#065F46"/>
    <circle cx="23" cy="27" r="2" fill="white"/>
    <circle cx="35" cy="29" r="2" fill="white"/>
    <path d="M19 37 Q28 42 37 37" stroke="#065F46" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>
);
const PenChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="22" y="4" width="12" height="40" rx="6" fill="white" fillOpacity="0.92"/>
    <rect x="22" y="4" width="12" height="7" rx="5" fill="#FCA5A5" fillOpacity="0.8"/>
    <polygon points="22,44 34,44 28,54" fill="#FDE68A" fillOpacity="0.9"/>
    <circle cx="22" cy="22" r="4.5" fill="#9F1239"/>
    <circle cx="34" cy="22" r="4.5" fill="#9F1239"/>
    <circle cx="23" cy="21" r="1.8" fill="white"/>
    <circle cx="35" cy="21" r="1.8" fill="white"/>
    <path d="M20 30 Q28 35 36 30" stroke="#9F1239" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <circle cx="40" cy="10" r="3" fill="white" fillOpacity="0.5"/>
    <circle cx="44" cy="6" r="2" fill="white" fillOpacity="0.4"/>
  </svg>
);
const MoonChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M42 28 C42 38 34 46 24 46 C18.5 46 13.5 43.5 10.5 39.5 C14 41.5 18 42.5 22 42.5 C32 42.5 40 34.5 40 24.5 C40 18.5 37 13 32 10 C38 12.5 42 19.5 42 28Z" fill="white" fillOpacity="0.92"/>
    <circle cx="23" cy="24" r="4.5" fill="#92400E"/>
    <circle cx="33" cy="28" r="4.5" fill="#92400E"/>
    <circle cx="24" cy="23" r="1.8" fill="white"/>
    <circle cx="34" cy="27" r="1.8" fill="white"/>
    <path d="M20 34 Q27 39 35 34" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <polygon points="47,6 48.8,12 44,12 48,15.5 46.5,9.5 51,6" fill="white" fillOpacity="0.75"/>
  </svg>
);
const GlobeChar = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="22" fill="white" fillOpacity="0.88"/>
    <ellipse cx="28" cy="28" rx="11" ry="22" stroke="#0E7490" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
    <ellipse cx="28" cy="28" rx="22" ry="8" stroke="#0E7490" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
    <circle cx="20" cy="22" r="4.5" fill="#0C4A6E"/>
    <circle cx="32" cy="22" r="4.5" fill="#0C4A6E"/>
    <circle cx="21" cy="21" r="1.8" fill="white"/>
    <circle cx="33" cy="21" r="1.8" fill="white"/>
    <path d="M17 30 Q28 35 39 30" stroke="#0C4A6E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <circle cx="28" cy="28" r="22" stroke="#67E8F9" strokeWidth="2" fill="none" strokeOpacity="0.45"/>
  </svg>
);
const SubjectChar = ({ id }: { id: string }) => {
  if (id === "english")  return <BookChar />;
  if (id === "math")     return <CalcChar />;
  if (id === "science")  return <BeakerChar />;
  if (id === "urdu")     return <PenChar />;
  if (id === "islamiat") return <MoonChar />;
  if (id === "social")   return <GlobeChar />;
  return null;
};

/* ── Data ── */
const SUBJECTS = [
  { id: "english",  Icon: BookOpen,   label: "English",        color: "from-blue-400 to-blue-600",         progress: 72, done: 18, total: 25 },
  { id: "math",     Icon: Calculator, label: "Mathematics",    color: "from-violet-400 to-violet-600",      progress: 58, done: 14, total: 24 },
  { id: "science",  Icon: Microscope, label: "Science",        color: "from-emerald-400 to-emerald-600",    progress: 85, done: 17, total: 20 },
  { id: "urdu",     Icon: PenLine,    label: "Urdu",           color: "from-rose-400 to-rose-600",          progress: 45, done:  9, total: 20 },
  { id: "islamiat", Icon: Moon,       label: "Islamiat",       color: "from-amber-400 to-amber-600",        progress: 90, done: 18, total: 20 },
  { id: "social",   Icon: Globe,      label: "Social Studies", color: "from-teal-400 to-teal-600",          progress: 30, done:  6, total: 20 },
];

const DAILY_MISSIONS = [
  { id: 1, label: "Complete 2 lessons",   xp: 50, completed: true,  Icon: BookOpen  },
  { id: 2, label: "Score 80%+ on a quiz", xp: 75, completed: true,  Icon: Target    },
  { id: 3, label: "Practice 15 minutes",  xp: 30, completed: false, Icon: Clock     },
  { id: 4, label: "Learn a new word",     xp: 20, completed: false, Icon: Lightbulb },
];

const RECENT_LESSONS = [
  { id: 1, title: "Addition & Subtraction", subject: "Math",    duration: "12 min", stars: 3, completed: true,  Icon: Plus, color: "from-violet-400 to-violet-600"   },
  { id: 2, title: "Animals & Habitats",     subject: "Science", duration: "15 min", stars: 2, completed: true,  Icon: Leaf, color: "from-emerald-400 to-emerald-600" },
  { id: 3, title: "The Alphabet Song",      subject: "English", duration: "8 min",  stars: 0, completed: false, Icon: Type, color: "from-blue-400 to-blue-600"        },
];

const WEEK_DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const ACTIVITY   = [1, 1, 0, 1, 1, 0, 1];
const DAY_COLORS = ["#60A5FA","#A78BFA","#F472B6","#34D399","#FBBF24","#F87171","#818CF8"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item       = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

/* ═══════════════════════════════════════════════════════════════ */
export default function StudentDashboard() {
  const { user } = useAuth();
  const { totalXP, currentLevel, xpToNextLevel, coins, streaks } = useGame();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const xpPercent = Math.min(100, Math.round(((totalXP % xpToNextLevel) / xpToNextLevel) * 100));
  const missionsComplete = DAILY_MISSIONS.filter((m) => m.completed).length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">

      {/* ── CARTOON HERO BANNER ── */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-edujoy-primary-400 via-fun-purple to-fun-pink text-white shadow-fun-lg"
        style={{ minHeight: 190 }}
      >
        {/* Clouds */}
        <div className="absolute top-3 left-6 opacity-20 pointer-events-none">
          <Cloud size={100} />
        </div>
        <div className="absolute bottom-4 left-44 opacity-15 pointer-events-none">
          <Cloud size={65} />
        </div>

        {/* Floating stars */}
        {[
          { top: "14%", left: "9%",  size: 18, color: "#FCD34D", delay: 0   },
          { top: "62%", left: "54%", size: 14, color: "#A5F3FC", delay: 0.6 },
          { top: "18%", left: "78%", size: 16, color: "#FDE68A", delay: 1.1 },
          { top: "72%", left: "30%", size: 12, color: "#C4B5FD", delay: 0.3 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left }}
            animate={{ y: [-6, 6, -6], rotate: [0, 20, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: s.delay }}
          >
            <SvgStar size={s.size} color={s.color} />
          </motion.div>
        ))}

        {/* Text */}
        <div className="relative z-10 p-6" style={{ maxWidth: "calc(100% - 160px)" }}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="bg-white/25 text-white text-xs font-black px-3 py-0.5 rounded-full">
              {greeting}!
            </span>
            {streaks.current > 0 && (
              <span className="bg-yellow-400/85 text-gray-900 text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame size={11} /> {streaks.current}-day streak!
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black mt-1 leading-tight drop-shadow-md">
            {user?.fullName?.split(" ")[0] ?? "Student"},<br />
            <span className="text-yellow-300">Ready to learn?</span>
          </h1>

          <p className="mt-2 opacity-85 text-sm">
            <strong>{totalXP.toLocaleString()} XP</strong> earned so far — amazing!
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/student/learn">
              <motion.span
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-5 py-2.5 rounded-2xl shadow-lg cursor-pointer transition-colors"
              >
                <Sparkles size={15} /> Continue Learning
              </motion.span>
            </Link>
            <Link href="/student/achievements">
              <motion.span
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 font-bold text-sm px-4 py-2.5 rounded-2xl cursor-pointer transition-colors"
              >
                <Trophy size={14} /> Achievements
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Animated owl on the right */}
        <motion.div
          className="absolute right-0 bottom-0 pointer-events-none select-none z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <OwlMascot size={148} />
        </motion.div>
      </motion.div>

      {/* ── STAT CARDS ── */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { Icon: Zap,    label: "Total XP",   value: totalXP.toLocaleString(),  grad: "from-orange-400 to-amber-500",  ring: "ring-orange-200" },
          { Icon: Coins,  label: "Coins",      value: coins.toLocaleString(),    grad: "from-yellow-400 to-yellow-500", ring: "ring-yellow-200" },
          { Icon: Flame,  label: "Day Streak", value: `${streaks.current} days`, grad: "from-pink-400 to-rose-500",     ring: "ring-pink-200"   },
          { Icon: Trophy, label: "Level",      value: `Level ${currentLevel}`,   grad: "from-violet-400 to-purple-600", ring: "ring-violet-200" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`rounded-3xl bg-gradient-to-br ${stat.grad} ring-4 ${stat.ring} p-4 flex flex-col items-center justify-center text-white shadow-lg cursor-default select-none`}
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
            >
              <stat.Icon size={32} />
            </motion.div>
            <p className="font-black text-xl mt-1.5 leading-none drop-shadow">{stat.value}</p>
            <p className="text-xs font-semibold opacity-85 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── RAINBOW XP BAR ── */}
      <motion.div variants={item} className="card-fun p-5 relative overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Star size={90} className="fill-yellow-400 text-yellow-400" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow">
              <Star size={16} className="fill-white text-white" />
            </div>
            <div>
              <p className="font-black text-gray-800 text-sm">Level {currentLevel} Explorer</p>
              <p className="text-xs text-gray-400">{totalXP % xpToNextLevel} / {xpToNextLevel} XP to Level {currentLevel + 1}</p>
            </div>
          </div>
          <span className="text-lg font-black text-violet-500">{xpPercent}%</span>
        </div>
        {/* rainbow bar */}
        <div className="h-5 bg-gray-100 rounded-full overflow-hidden ring-2 ring-gray-200">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#60A5FA,#A78BFA,#F472B6,#FBBF24,#34D399)" }}
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1 px-0.5">
          {[25, 50, 75, 100].map((m) => (
            <span key={m} className={`text-xs font-bold ${xpPercent >= m ? "text-violet-500" : "text-gray-300"}`}>{m}%</span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── SUBJECT TILES ── */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-edujoy-primary-500" /> My Subjects
            </h2>
            <Link href="/student/learn" className="text-sm text-edujoy-primary-500 font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SUBJECTS.map((sub) => (
              <Link key={sub.id} href={`/student/learn/${sub.id}`}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl overflow-hidden shadow-md cursor-pointer"
                >
                  {/* coloured header with cartoon mascot */}
                  <div className={`bg-gradient-to-br ${sub.color} flex items-center justify-center py-4`}>
                    <SubjectChar id={sub.id} />
                  </div>
                  {/* card body */}
                  <div className="bg-white p-3">
                    <p className="font-black text-gray-800 text-sm">{sub.label}</p>
                    <p className="text-xs text-gray-400 mb-1.5">{sub.done}/{sub.total} lessons</p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${sub.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.progress}%` }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{sub.progress}%</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-5">

          {/* Daily Quests */}
          <motion.div variants={item} className="card-fun p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-gray-800 flex items-center gap-2">
                <Swords size={18} className="text-fun-orange" /> Today&apos;s Quests
              </h2>
              <span className="text-xs font-black bg-orange-100 text-fun-orange px-2 py-0.5 rounded-full">
                {missionsComplete}/{DAILY_MISSIONS.length}
              </span>
            </div>
            {/* mini progress */}
            <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-fun-orange to-yellow-400"
                animate={{ width: `${(missionsComplete / DAILY_MISSIONS.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="space-y-2">
              {DAILY_MISSIONS.map((mission) => (
                <motion.div
                  key={mission.id}
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border-l-4 transition-all ${
                    mission.completed ? "bg-green-50 border-green-400" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <mission.Icon size={14} className={mission.completed ? "text-green-500" : "text-gray-400"} />
                  <p className={`text-xs font-semibold flex-1 ${mission.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {mission.label}
                  </p>
                  {mission.completed ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <span className="text-xs font-black text-fun-orange bg-orange-100 px-1.5 py-0.5 rounded-full">+{mission.xp}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div variants={item} className="card-fun p-5">
            <h2 className="text-sm font-black text-gray-800 flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-fun-blue" /> Weekly Activity
            </h2>
            <div className="flex items-end justify-between gap-1">
              {WEEK_DAYS.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                    style={{
                      background: ACTIVITY[i]
                        ? `linear-gradient(135deg,${DAY_COLORS[i]},${DAY_COLORS[(i + 2) % 7]})`
                        : "#F3F4F6",
                    }}
                  >
                    {ACTIVITY[i] ? (
                      <Star size={13} className="fill-white text-white" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-300 block" />
                    )}
                  </motion.div>
                  <span className="text-xs text-gray-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── RECENT LESSONS ── */}
      <motion.div variants={item} className="card-fun p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Clock size={20} className="text-fun-blue" /> Continue Learning
          </h2>
          <Link href="/student/learn" className="text-sm text-edujoy-primary-500 font-bold flex items-center gap-1 hover:underline">
            All Lessons <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {RECENT_LESSONS.map((lesson) => (
            <Link key={lesson.id} href={`/student/lesson/${lesson.id}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-edujoy-primary-200 transition-all cursor-pointer"
              >
                <div className={`bg-gradient-to-r ${lesson.color} py-5 flex items-center justify-center`}>
                  <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center">
                    <lesson.Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="font-bold text-gray-800 text-sm truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-400">{lesson.subject} · {lesson.duration}</p>
                  <div className="mt-2">
                    {lesson.completed ? (
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star key={s} size={13} className={s <= lesson.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                        ))}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-edujoy-primary-500 bg-edujoy-primary-50 px-2 py-0.5 rounded-full">
                        <Play size={9} /> Start now
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── MOTIVATIONAL FOOTER CARD ── */}
      <motion.div
        variants={item}
        className="rounded-3xl bg-gradient-to-r from-fun-yellow via-fun-orange to-fun-pink p-5 flex items-center justify-between text-white shadow-fun-lg overflow-hidden relative"
      >
        <div className="absolute right-4 opacity-10 pointer-events-none">
          <Trophy size={90} />
        </div>
        <div>
          <p className="font-black text-lg drop-shadow">Keep up the great work!</p>
          <p className="text-sm opacity-90 mt-0.5">Every lesson makes you smarter.</p>
        </div>
        <Link href="/student/learn">
          <motion.span
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/25 hover:bg-white/40 font-black text-sm px-5 py-2.5 rounded-2xl cursor-pointer flex items-center gap-2 transition-colors"
          >
            Let&apos;s Go <Sparkles size={14} />
          </motion.span>
        </Link>
      </motion.div>

    </motion.div>
  );
}
