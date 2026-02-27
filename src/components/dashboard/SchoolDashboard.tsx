"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  BarChart2,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Star,
  Award,
  Target,
  Flame,
  Trophy,
  Building2,
  Settings,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const SCHOOL_INFO = {
  name: "The City School — DHA Campus",
  plan: "Enterprise",
  studentsUsed: 342,
  studentsMax: 500,
  teachersUsed: 28,
  teachersMax: 50,
  renewalDate: "March 2025",
};

const CLASS_PERFORMANCE = [
  {
    grade: "Play Group",
    students: 22,
    avgScore: 88,
    topSubject: "English",
    color: "from-pink-400 to-pink-600",
  },
  {
    grade: "Class 1",
    students: 30,
    avgScore: 82,
    topSubject: "Math",
    color: "from-blue-400 to-blue-600",
  },
  {
    grade: "Class 2",
    students: 35,
    avgScore: 79,
    topSubject: "Science",
    color: "from-purple-400 to-purple-600",
  },
  {
    grade: "Class 3",
    students: 40,
    avgScore: 75,
    topSubject: "English",
    color: "from-green-400 to-green-600",
  },
  {
    grade: "Class 4",
    students: 38,
    avgScore: 71,
    topSubject: "Math",
    color: "from-orange-400 to-orange-600",
  },
  {
    grade: "Class 5",
    students: 32,
    avgScore: 84,
    topSubject: "Science",
    color: "from-teal-400 to-teal-600",
  },
];

const TOP_TEACHERS = [
  {
    name: "Ms. Fatima Ali",
    classes: 3,
    avgStudentScore: 86,
    lessonsCreated: 24,
    rating: 4.9,
  },
  {
    name: "Mr. Usman Khan",
    classes: 2,
    avgStudentScore: 82,
    lessonsCreated: 18,
    rating: 4.7,
  },
  {
    name: "Ms. Aisha Raza",
    classes: 3,
    avgStudentScore: 79,
    lessonsCreated: 21,
    rating: 4.6,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function SchoolDashboard() {
  const { user } = useAuth();
  const studentUsagePercent = Math.round(
    (SCHOOL_INFO.studentsUsed / SCHOOL_INFO.studentsMax) * 100,
  );
  const teacherUsagePercent = Math.round(
    (SCHOOL_INFO.teachersUsed / SCHOOL_INFO.teachersMax) * 100,
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fun-orange via-fun-pink to-fun-purple p-6 text-white shadow-fun-lg"
      >
        <div className="relative z-10">
          <p className="text-sm font-bold opacity-80 mb-1 flex items-center gap-1">
            <Building2 size={16} /> School Dashboard
          </p>
          <h1 className="text-2xl font-black">{SCHOOL_INFO.name}</h1>
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="bg-white/20 rounded-xl px-3 py-1 text-sm font-bold">
              {SCHOOL_INFO.plan} Plan
            </span>
            <span className="bg-white/20 rounded-xl px-3 py-1 text-sm font-bold">
              Renews {SCHOOL_INFO.renewalDate}
            </span>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Building2 size={96} className="text-white" />
        </div>
      </motion.div>

      {/* Usage Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Students usage */}
        <div className="card-fun p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-gray-800 flex items-center gap-2">
              <Users size={18} className="text-fun-blue" /> Student Seats
            </h3>
            <span className="text-sm font-bold text-gray-500">
              {SCHOOL_INFO.studentsUsed} / {SCHOOL_INFO.studentsMax}
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${studentUsagePercent > 80 ? "bg-gradient-to-r from-fun-orange to-fun-pink" : "bg-gradient-to-r from-fun-green to-edujoy-primary-400"}`}
              initial={{ width: 0 }}
              animate={{ width: `${studentUsagePercent}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {studentUsagePercent}% capacity used ·{" "}
            {SCHOOL_INFO.studentsMax - SCHOOL_INFO.studentsUsed} seats remaining
          </p>
        </div>

        {/* Teachers usage */}
        <div className="card-fun p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-gray-800 flex items-center gap-2">
              <Users size={18} className="text-fun-purple" /> Teacher Accounts
            </h3>
            <span className="text-sm font-bold text-gray-500">
              {SCHOOL_INFO.teachersUsed} / {SCHOOL_INFO.teachersMax}
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fun-purple to-fun-pink"
              initial={{ width: 0 }}
              animate={{ width: `${teacherUsagePercent}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {teacherUsagePercent}% capacity used ·{" "}
            {SCHOOL_INFO.teachersMax - SCHOOL_INFO.teachersUsed} accounts
            remaining
          </p>
        </div>
      </motion.div>

      {/* Platform Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {(() => {
          const statIcons = [BookOpen, Star, Flame, Trophy];
          return [
            {
              label: "Lessons Completed",
              value: "12,480",
              color: "text-fun-blue",
            },
            { label: "Average Score", value: "79%", color: "text-fun-orange" },
            { label: "Avg Streak", value: "6 days", color: "text-fun-pink" },
            {
              label: "Badges Earned",
              value: "3,240",
              color: "text-fun-purple",
            },
          ].map((stat, i) => {
            const StatIcon = statIcons[i];
            return (
              <div key={i} className="card-fun p-4 text-center">
                <StatIcon size={28} className={`mx-auto ${stat.color}`} />
                <p className={`font-black text-xl mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            );
          });
        })()}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Performance */}
        <motion.div variants={item} className="lg:col-span-2 card-fun p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <BarChart2 size={20} className="text-edujoy-primary-500" /> Class
              Performance
            </h2>
            <Link
              href="/school/reports"
              className="text-sm font-bold text-edujoy-primary-500 hover:underline flex items-center gap-1"
            >
              Detailed Reports <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {CLASS_PERFORMANCE.map((cls, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}
                >
                  {cls.grade.replace("Class ", "C").replace("Play Group", "PG")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-gray-800">
                      {cls.grade}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{cls.students} students</span>
                      <span className="font-bold text-gray-600">
                        {cls.avgScore}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${cls.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cls.avgScore}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Top subject: {cls.topSubject}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Teachers */}
        <motion.div variants={item} className="card-fun p-5">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
            <Star size={18} className="text-yellow-400" /> Top Teachers
          </h2>
          <div className="space-y-3">
            {TOP_TEACHERS.map((teacher, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-gray-50 hover:bg-edujoy-primary-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs ${i === 0 ? "bg-yellow-400" : i === 1 ? "bg-gray-400" : "bg-orange-400"}`}
                  >
                    {i + 1}
                  </div>
                  <p className="font-bold text-gray-800 text-sm">
                    {teacher.name}
                  </p>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 font-medium ml-10">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-current text-yellow-400" />{" "}
                    {teacher.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {teacher.lessonsCreated} lessons
                  </span>
                  <span>✅ {teacher.avgStudentScore}% avg</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/school/teachers"
            className="block mt-3 text-center text-sm font-bold text-edujoy-primary-500 hover:underline"
          >
            View All Teachers →
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item} className="card-fun p-5">
        <h2 className="text-lg font-black text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(() => {
            const actionIcons = [GraduationCap, UserPlus, BarChart2, Settings];
            return [
              {
                label: "Add Teacher",
                href: "/school/teachers/add",
                color: "from-fun-purple to-purple-600",
              },
              {
                label: "Add Student",
                href: "/school/students/add",
                color: "from-fun-blue to-blue-600",
              },
              {
                label: "School Report",
                href: "/school/reports",
                color: "from-fun-green to-green-600",
              },
              {
                label: "School Settings",
                href: "/school/settings",
                color: "from-gray-400 to-gray-600",
              },
            ].map((action, i) => {
              const ActionIcon = actionIcons[i];
              return (
                <Link key={i} href={action.href}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white text-center cursor-pointer shadow-sm`}
                  >
                    <ActionIcon size={28} className="mx-auto" />
                    <p className="mt-2 text-xs font-black">{action.label}</p>
                  </motion.div>
                </Link>
              );
            });
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}
