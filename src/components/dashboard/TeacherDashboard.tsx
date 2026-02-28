"use client";

import Link from "next/link";
import {
  Users,
  BookOpen,
  FileText,
  BarChart2,
  MessagesSquare,
  BookMarked,
  PlusCircle,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_ACTIONS = [
  {
    label: "View Students",
    href: "/teacher",
    Icon: Users,
    cls: "text-indigo-600 bg-indigo-50",
  },
  {
    label: "Manage Lessons",
    href: "/teacher",
    Icon: BookOpen,
    cls: "text-blue-600   bg-blue-50",
  },
  {
    label: "Assignments",
    href: "/teacher",
    Icon: FileText,
    cls: "text-violet-600 bg-violet-50",
  },
  {
    label: "Progress Reports",
    href: "/teacher",
    Icon: BarChart2,
    cls: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Messages",
    href: "/teacher",
    Icon: MessagesSquare,
    cls: "text-rose-600   bg-rose-50",
  },
  {
    label: "Curriculum",
    href: "/teacher",
    Icon: BookMarked,
    cls: "text-amber-600  bg-amber-50",
  },
];

const STATS = [
  {
    label: "Students",
    value: "—",
    Icon: Users,
    ring: "ring-indigo-100",
    ico: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    label: "Lessons",
    value: "—",
    Icon: BookOpen,
    ring: "ring-blue-100",
    ico: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Assignments",
    value: "—",
    Icon: ClipboardList,
    ring: "ring-violet-100",
    ico: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    label: "Avg Score",
    value: "—",
    Icon: BarChart2,
    ring: "ring-emerald-100",
    ico: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

export default function TeacherDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Teacher";

  return (
    <div className="w-full space-y-5">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Welcome, {firstName}!
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your classes, lessons, and student progress.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors self-start sm:self-auto">
          <PlusCircle size={14} /> New Lesson
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map(({ label, value, Icon, ring, ico, bg }) => (
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

      {/* Two-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-blue-50 p-4 rounded-2xl mb-4">
              <GraduationCap size={28} className="text-blue-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              No activity yet
            </p>
            <p className="text-xs text-gray-400 max-w-xs">
              Student activity, lesson completions, and assignment submissions
              will appear here.
            </p>
            <Link
              href="/teacher"
              className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Go to Classes <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Quick Actions
            </h2>
            <div className="space-y-1">
              {QUICK_ACTIONS.map(({ label, href, Icon, cls }) => (
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

          {/* Tips */}
          <div className="bg-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <BookMarked size={14} className="text-emerald-200" />
              <span className="text-sm font-bold">Teach Smarter</span>
            </div>
            <p className="text-xs text-emerald-200 mb-3 leading-relaxed">
              Use the AI-powered lesson builder to create interactive lessons in
              minutes.
            </p>
            <button className="inline-flex items-center gap-1.5 bg-white text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
              Build Lesson <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
