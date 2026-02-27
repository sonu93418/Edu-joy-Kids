"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Users,
  BarChart2,
  Plus,
  ChevronRight,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Flame,
  GraduationCap,
  Building2,
  Trophy,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const CLASSES = [
  {
    id: "1",
    name: "Class 3 - Section A",
    students: 28,
    grade: "Class 3",
    activeLesson: "Fractions",
    avgProgress: 68,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "2",
    name: "Class 2 - Section B",
    students: 25,
    grade: "Class 2",
    activeLesson: "Phonics",
    avgProgress: 74,
    color: "from-fun-purple to-purple-600",
  },
  {
    id: "3",
    name: "Class 4 - Section A",
    students: 30,
    grade: "Class 4",
    activeLesson: "Multiplication",
    avgProgress: 55,
    color: "from-fun-green to-green-600",
  },
];

const TOP_STUDENTS = [
  { name: "Fatima K.", grade: "Class 3", xp: 4200, streak: 15 },
  { name: "Ahmed M.", grade: "Class 3", xp: 3800, streak: 12 },
  { name: "Zara A.", grade: "Class 2", xp: 3500, streak: 9 },
];

const STRUGGLING_STUDENTS = [
  {
    name: "Bilal H.",
    issue: "Struggling with fractions",
    subject: "Math",
    days: 3,
  },
  {
    name: "Nadia R.",
    issue: "Missed 3 lessons this week",
    subject: "English",
    days: 3,
  },
];

const RECENT_LESSONS = [
  {
    title: "Introduction to Fractions",
    subject: "Math",
    class: "Class 3 A",
    completionRate: 85,
    avgScore: 78,
    status: "published",
  },
  {
    title: "Animal Habitats Quiz",
    subject: "Science",
    class: "Class 3 A",
    completionRate: 92,
    avgScore: 84,
    status: "published",
  },
  {
    title: "Sentence Structure",
    subject: "English",
    class: "Class 2 B",
    completionRate: 0,
    avgScore: 0,
    status: "draft",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function TeacherDashboard() {
  const { user } = useAuth();

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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            Welcome back, {user?.fullName?.split(" ")[0] ?? "there"}!
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your classes and track student progress
          </p>
        </div>
        <Link href="/teacher/lessons/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-fun px-5 py-3 flex items-center gap-2 font-black"
          >
            <Plus size={18} /> Create Lesson
          </motion.button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {(() => {
          const statIcons = [GraduationCap, BookOpen, CheckCircle, Star];
          return [
            {
              label: "Total Students",
              value: "83",
              color: "text-fun-blue",
              bg: "bg-blue-50 border-blue-100",
            },
            {
              label: "Active Lessons",
              value: "24",
              color: "text-fun-purple",
              bg: "bg-purple-50 border-purple-100",
            },
            {
              label: "Avg Completion",
              value: "76%",
              color: "text-fun-green",
              bg: "bg-green-50 border-green-100",
            },
            {
              label: "Avg Score",
              value: "81%",
              color: "text-fun-orange",
              bg: "bg-orange-50 border-orange-100",
            },
          ].map((stat, i) => {
            const StatIcon = statIcons[i];
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 ${stat.bg} p-4 flex items-center gap-3`}
              >
                <StatIcon size={28} className={`${stat.color} flex-shrink-0`} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </p>
                  <p className={`font-black text-lg ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          });
        })()}
      </motion.div>

      {/* My Classes */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Users size={20} className="text-edujoy-primary-500" /> My Classes
          </h2>
          <Link
            href="/teacher/classes"
            className="text-sm font-bold text-edujoy-primary-500 hover:underline flex items-center gap-1"
          >
            Manage <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLASSES.map((cls) => (
            <Link key={cls.id} href={`/teacher/classes/${cls.id}`}>
              <motion.div
                whileHover={{ y: -3 }}
                className="card-fun p-5 cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center mb-3 shadow-sm`}
                >
                  <Building2 size={24} className="text-white" />
                </div>
                <h3 className="font-black text-gray-800">{cls.name}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {cls.students} students · {cls.grade}
                </p>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      Class Progress
                    </span>
                    <span className="text-xs font-bold text-gray-600">
                      {cls.avgProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${cls.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cls.avgProgress}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Active: {cls.activeLesson}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lessons */}
        <motion.div variants={item} className="lg:col-span-2 card-fun p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-fun-purple" /> Recent Lessons
            </h2>
            <Link
              href="/teacher/lessons"
              className="text-sm font-bold text-edujoy-primary-500 hover:underline flex items-center gap-1"
            >
              All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_LESSONS.map((lesson, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-edujoy-primary-100 to-fun-purple/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-edujoy-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {lesson.title}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                        lesson.status === "published"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {lesson.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {lesson.subject} · {lesson.class}
                  </p>
                  {lesson.status === "published" && (
                    <div className="flex gap-4 mt-1 text-xs font-bold">
                      <span className="text-fun-green">
                        ✓ {lesson.completionRate}% complete
                      </span>
                      <span className="text-fun-blue flex items-center gap-1">
                        <Star size={10} className="fill-current" />{" "}
                        {lesson.avgScore}% avg
                      </span>
                    </div>
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top Performers */}
          <motion.div variants={item} className="card-fun p-5">
            <h2 className="text-base font-black text-gray-800 flex items-center gap-2 mb-3">
              <Star size={16} className="text-yellow-400" /> Top Performers
            </h2>
            <div className="space-y-2">
              {TOP_STUDENTS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-xl bg-gray-50"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0 ${["bg-fun-purple", "bg-fun-orange", "bg-edujoy-primary-500"][i]}`}
                  >
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {s.name}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Zap size={10} /> {s.xp} XP · <Flame size={10} />{" "}
                      {s.streak}d
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Needs Attention */}
          <motion.div variants={item} className="card-fun p-5">
            <h2 className="text-base font-black text-gray-800 flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-fun-orange" /> Needs
              Attention
            </h2>
            <div className="space-y-2">
              {STRUGGLING_STUDENTS.map((s, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-orange-50 border border-orange-100"
                >
                  <p className="text-sm font-black text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{s.issue}</p>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {s.subject}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
