"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Building2,
  Shield,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Activity,
  DollarSign,
  GraduationCap,
  Star,
  BarChart2,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const PLATFORM_STATS = [
  { label: "Total Students", value: "52,847", change: "+12%", positive: true },
  { label: "Active Teachers", value: "5,134", change: "+8%", positive: true },
  { label: "Partner Schools", value: "1,247", change: "+15%", positive: true },
  {
    label: "Monthly Revenue",
    value: "$48,290",
    change: "+22%",
    positive: true,
  },
];

const RECENT_REGISTRATIONS = [
  {
    name: "Lahore Grammar School",
    type: "School",
    plan: "Enterprise",
    date: "2 hrs ago",
    students: 450,
  },
  {
    name: "Ahmad Family",
    type: "Parent",
    plan: "Family Pro",
    date: "3 hrs ago",
    students: 2,
  },
  {
    name: "DHA College",
    type: "School",
    plan: "School Basic",
    date: "5 hrs ago",
    students: 200,
  },
];

const CONTENT_STATS = [
  {
    subject: "Mathematics",
    lessons: 124,
    avgRating: 4.8,
    completions: 128_450,
  },
  { subject: "English", lessons: 118, avgRating: 4.7, completions: 142_000 },
  { subject: "Science", lessons: 96, avgRating: 4.9, completions: 89_300 },
  { subject: "Urdu", lessons: 80, avgRating: 4.6, completions: 72_100 },
];

const SECURITY_ALERTS = [
  {
    level: "high",
    message: "3 failed admin login attempts",
    time: "10 min ago",
  },
  {
    level: "medium",
    message: "Unusual content flagged for review (5 items)",
    time: "45 min ago",
  },
  {
    level: "low",
    message: "API rate limit approached for 2 IPs",
    time: "2 hrs ago",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Shield size={28} className="text-fun-orange" /> Admin Panel
          </h1>
          <p className="text-gray-500 mt-1">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-2xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-green-700">
            All Systems Operational
          </span>
        </div>
      </motion.div>

      {/* Platform Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {(() => {
          const statIcons = [Users, GraduationCap, Building2, DollarSign];
          return PLATFORM_STATS.map((stat, i) => {
            const StatIcon = statIcons[i];
            return (
              <div key={i} className="card-fun p-5">
                <div className="flex items-center justify-between mb-2">
                  <StatIcon size={28} className="text-edujoy-primary-500" />
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-full ${stat.positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-gray-800">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            );
          });
        })()}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations */}
        <motion.div variants={item} className="lg:col-span-2 card-fun p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <Activity size={20} className="text-edujoy-primary-500" /> Recent
              Registrations
            </h2>
            <Link
              href="/admin/users"
              className="text-sm font-bold text-edujoy-primary-500 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_REGISTRATIONS.map((reg, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${reg.type === "School" ? "bg-blue-100" : "bg-pink-100"}`}
                >
                  {reg.type === "School" ? (
                    <Building2 size={18} className="text-blue-600" />
                  ) : (
                    <Users size={18} className="text-pink-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{reg.name}</p>
                  <p className="text-xs text-gray-400">
                    {reg.type} · {reg.students} students · {reg.date}
                  </p>
                </div>
                <span className="text-xs bg-edujoy-primary-100 text-edujoy-primary-700 font-bold px-2 py-1 rounded-xl flex-shrink-0">
                  {reg.plan}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Alerts */}
        <motion.div variants={item} className="card-fun p-5">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
            <Shield size={20} className="text-fun-orange" /> Security Alerts
          </h2>
          <div className="space-y-3">
            {SECURITY_ALERTS.map((alert, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border ${
                  alert.level === "high"
                    ? "bg-red-50 border-red-200"
                    : alert.level === "medium"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`text-sm font-black capitalize px-2 py-0.5 rounded-full flex-shrink-0 ${
                      alert.level === "high"
                        ? "bg-red-400 text-white"
                        : alert.level === "medium"
                          ? "bg-yellow-400 text-white"
                          : "bg-blue-400 text-white"
                    }`}
                  >
                    {alert.level}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/security"
            className="mt-4 block text-center text-sm font-bold text-edujoy-primary-500 hover:underline"
          >
            View Security Dashboard →
          </Link>
        </motion.div>
      </div>

      {/* Content Stats */}
      <motion.div variants={item} className="card-fun p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <BookOpen size={20} className="text-fun-purple" /> Content
            Performance
          </h2>
          <Link
            href="/admin/content"
            className="text-sm font-bold text-edujoy-primary-500 hover:underline flex items-center gap-1"
          >
            Manage Content <ChevronRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-bold">Subject</th>
                <th className="pb-3 font-bold">Lessons</th>
                <th className="pb-3 font-bold">Avg Rating</th>
                <th className="pb-3 font-bold">Completions</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CONTENT_STATS.map((cs, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-bold text-gray-800">{cs.subject}</td>
                  <td className="py-3 text-gray-600">{cs.lessons}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-yellow-500 font-bold">
                      <Star size={12} className="fill-current" /> {cs.avgRating}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">
                    {cs.completions.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {(() => {
          const actionIcons = [Users, BookOpen, Building2, BarChart2];
          return [
            {
              label: "Manage Users",
              href: "/admin/users",
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Review Content",
              href: "/admin/content",
              color: "from-fun-purple to-purple-600",
            },
            {
              label: "School Accounts",
              href: "/admin/schools",
              color: "from-fun-green to-green-600",
            },
            {
              label: "Full Analytics",
              href: "/admin/analytics",
              color: "from-fun-orange to-orange-600",
            },
          ].map((action, i) => {
            const ActionIcon = actionIcons[i];
            return (
              <Link key={i} href={action.href}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${action.color} rounded-2xl p-5 text-white text-center cursor-pointer shadow-sm`}
                >
                  <ActionIcon size={32} className="mx-auto" />
                  <p className="mt-2 text-sm font-black">{action.label}</p>
                </motion.div>
              </Link>
            );
          });
        })()}
      </motion.div>
    </motion.div>
  );
}
