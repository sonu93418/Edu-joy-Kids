"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Shield,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Target,
  Award,
  AlertCircle,
  Plus,
  Settings,
  Zap,
  Flame,
  Trophy,
  Lightbulb,
  AlertTriangle,
  UserPlus,
  CreditCard,
  BarChart2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const CHILDREN = [
  {
    id: "1",
    name: "Ali Ahmed",
    grade: "Class 3",
    level: 8,
    xp: 3200,
    streak: 7,
    lastActive: "2 hours ago",
    subjects: [
      { name: "English", progress: 72, color: "bg-blue-400" },
      { name: "Math", progress: 58, color: "bg-purple-400" },
      { name: "Science", progress: 85, color: "bg-green-400" },
    ],
    weeklyTime: 340, // minutes
    weeklyGoal: 420,
    status: "active",
  },
  {
    id: "2",
    name: "Sara Ahmed",
    grade: "Play Group",
    level: 3,
    xp: 850,
    streak: 3,
    lastActive: "Yesterday",
    subjects: [
      { name: "English", progress: 45, color: "bg-blue-400" },
      { name: "Math", progress: 30, color: "bg-purple-400" },
    ],
    weeklyTime: 120,
    weeklyGoal: 180,
    status: "needs_attention",
  },
];

const ALERTS = [
  {
    id: 1,
    type: "warning",
    child: "Ali Ahmed",
    message: "Screen time limit reached (2 hrs)",
    Icon: Clock,
  },
  {
    id: 2,
    type: "success",
    child: "Ali Ahmed",
    message: "Completed all daily missions!",
    Icon: CheckCircle,
  },
  {
    id: 3,
    type: "info",
    child: "Sara Ahmed",
    message: "Hasn't practiced in 2 days",
    Icon: Lightbulb,
  },
];

const AI_INSIGHTS = [
  {
    child: "Ali Ahmed",
    insight:
      "Ali struggles with fractions. Recommend 15 min of fraction practice daily.",
    action: "Assign Practice",
    priority: "high",
  },
  {
    child: "Sara Ahmed",
    insight:
      "Sara learns best with visual activities. Coloring & matching games work great!",
    action: "View Plan",
    priority: "medium",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function ParentDashboard() {
  const { user } = useAuth();
  const [activeChild, setActiveChild] = useState(CHILDREN[0]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-black text-gray-800">
          Welcome back, {user?.fullName?.split(" ")[0] ?? "there"}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s how your children are doing today
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {(() => {
          const statIcons = [Users, BookOpen, Clock, Trophy];
          return [
            {
              label: "Children",
              value: "2",
              color: "text-fun-blue",
              bg: "bg-blue-50 border-blue-100",
            },
            {
              label: "Lessons Today",
              value: "5",
              color: "text-fun-green",
              bg: "bg-green-50 border-green-100",
            },
            {
              label: "Learning Time",
              value: "1.2 hrs",
              color: "text-fun-purple",
              bg: "bg-purple-50 border-purple-100",
            },
            {
              label: "Badges Earned",
              value: "12",
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

      {/* Children Cards */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Users size={20} className="text-edujoy-primary-500" /> My Children
          </h2>
          <Link
            href="/parent/children/add"
            className="flex items-center gap-1 text-sm font-bold text-edujoy-primary-500 hover:underline"
          >
            <Plus size={16} /> Add Child
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHILDREN.map((child) => (
            <motion.div
              key={child.id}
              whileHover={{ y: -2 }}
              className="card-fun p-5 cursor-pointer"
              onClick={() => setActiveChild(child)}
            >
              {/* Child Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fun-yellow to-fun-orange flex items-center justify-center text-2xl font-black text-white shadow-sm">
                  {child.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-gray-800">{child.name}</h3>
                    {child.status === "needs_attention" && (
                      <span className="text-xs bg-yellow-100 text-yellow-600 font-bold px-2 py-0.5 rounded-full">
                        Needs Attention
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{child.grade}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs font-bold">
                    <span className="text-fun-orange flex items-center gap-1">
                      <Zap size={10} /> Level {child.level}
                    </span>
                    <span className="text-fun-pink flex items-center gap-1">
                      <Flame size={10} /> {child.streak}d
                    </span>
                    <span className="text-gray-400">• {child.lastActive}</span>
                  </div>
                </div>
                <Link
                  href={`/parent/children/${child.id}`}
                  className="text-gray-300 hover:text-edujoy-primary-500 transition-colors"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>

              {/* Subject Progress */}
              <div className="space-y-2 mb-3">
                {child.subjects.map((sub) => (
                  <div key={sub.name} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16 flex-shrink-0">
                      {sub.name}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${sub.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-8 text-right">
                      {sub.progress}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Weekly time */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">
                    Weekly Learning
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-fun-green to-edujoy-primary-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (child.weeklyTime / child.weeklyGoal) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-600">
                    {Math.round(child.weeklyTime / 60)}h/
                    {Math.round(child.weeklyGoal / 60)}h
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <motion.div variants={item} className="card-fun p-5">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-fun-purple" /> AI Insights
          </h2>
          <div className="space-y-3">
            {AI_INSIGHTS.map((insight, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border-2 ${insight.priority === "high" ? "border-orange-200 bg-orange-50" : "border-blue-100 bg-blue-50"}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl mt-0.5">
                    {insight.priority === "high" ? (
                      <AlertTriangle size={20} className="text-orange-500" />
                    ) : (
                      <Lightbulb size={20} className="text-blue-500" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 mb-1">
                      {insight.child}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {insight.insight}
                    </p>
                    <button
                      className={`mt-2 text-xs font-black px-3 py-1 rounded-xl ${insight.priority === "high" ? "bg-orange-400 text-white" : "bg-blue-400 text-white"}`}
                    >
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts & Notifications */}
        <motion.div variants={item} className="card-fun p-5">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-fun-orange" /> Notifications
          </h2>
          <div className="space-y-3">
            {ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-xl ${
                  alert.type === "warning"
                    ? "bg-yellow-50 border border-yellow-200"
                    : alert.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-blue-50 border border-blue-200"
                }`}
              >
                <alert.Icon
                  size={24}
                  className={`flex-shrink-0 ${alert.type === "warning" ? "text-yellow-600" : alert.type === "success" ? "text-green-600" : "text-blue-600"}`}
                />
                <div>
                  <p className="text-xs font-bold text-gray-500">
                    {alert.child}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item} className="card-fun p-5">
        <h2 className="text-lg font-black text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              Icon: UserPlus,
              label: "Add Child Profile",
              href: "/parent/children/add",
              color: "from-edujoy-primary-400 to-fun-purple",
            },
            {
              Icon: Clock,
              label: "Set Screen Time",
              href: "/parent/safety",
              color: "from-fun-blue to-blue-600",
            },
            {
              Icon: BarChart2,
              label: "View Reports",
              href: "/parent/reports",
              color: "from-fun-green to-green-600",
            },
            {
              Icon: CreditCard,
              label: "Manage Plan",
              href: "/parent/subscription",
              color: "from-fun-orange to-orange-600",
            },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white text-center cursor-pointer shadow-sm`}
              >
                <action.Icon size={28} className="mx-auto" />
                <p className="mt-2 text-xs font-black">{action.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
