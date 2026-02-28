"use client";

import Link from "next/link";
import {
  Users, BookOpen, TrendingUp, BarChart2, PlusCircle,
  ArrowRight, GraduationCap, CheckCircle2, ClipboardList,
  MessageSquare, Star, Clock,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_ACTIONS = [
  { label: "Create Lesson",  href: "/teacher", icon: PlusCircle,   style: "bg-indigo-600  text-white hover:bg-indigo-700"  },
  { label: "My Students",    href: "/teacher", icon: Users,         style: "bg-emerald-600 text-white hover:bg-emerald-700" },
  { label: "Assignments",    href: "/teacher", icon: ClipboardList, style: "bg-amber-500   text-white hover:bg-amber-600"   },
  { label: "Messages",       href: "/teacher", icon: MessageSquare, style: "bg-violet-600  text-white hover:bg-violet-700"  },
];

export default function TeacherDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Teacher";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <p className="text-amber-100 text-sm font-medium">Welcome back</p>
        <h1 className="text-2xl font-bold mt-0.5">{firstName}</h1>
        <p className="text-amber-100 text-sm mt-1">
          Manage your classes, create lessons, and track student progress.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-amber-50 transition-colors"
          >
            <PlusCircle size={14} /> Create New Lesson
          </Link>
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Users size={14} /> View Students
          </Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "My Students",     value: "—", icon: Users,         color: "text-indigo-600",  bg: "bg-indigo-50"  },
          { label: "Total Lessons",   value: "—", icon: BookOpen,      color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Avg Completion",  value: "—", icon: TrendingUp,    color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg Score",       value: "—", icon: Star,          color: "text-violet-600",  bg: "bg-violet-50"  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`${bg} p-2 rounded-lg`}><Icon size={18} className={color} /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-lg font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-base font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, style }) => (
            <Link key={label} href={href}>
              <div className={`${style} rounded-xl p-4 text-center transition-colors cursor-pointer`}>
                <Icon size={22} className="mx-auto" />
                <p className="mt-2 text-xs font-semibold">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CLASSES EMPTY STATE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">My Classes</h2>
          <Link href="/teacher" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            Manage <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={28} className="text-amber-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-base">No classes yet</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
            Create your first class to start assigning lessons and tracking student performance.
          </p>
          <Link
            href="/teacher"
            className="mt-5 inline-flex items-center gap-2 bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-colors"
          >
            <PlusCircle size={15} /> Create Class
          </Link>
        </div>
      </div>

      {/* RECENT LESSONS EMPTY STATE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">Recent Lessons</h2>
          <Link href="/teacher" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            All Lessons <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
          <CheckCircle2 size={36} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No lessons created yet. Create your first lesson above.</p>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><BarChart2 size={18} className="text-indigo-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">Student Analytics</h3>
          </div>
          <p className="text-xs text-gray-500">
            See detailed performance analytics once students complete lessons.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-100 p-2 rounded-lg"><Clock size={18} className="text-emerald-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">Study Time Tracking</h3>
          </div>
          <p className="text-xs text-gray-500">
            Track how much time students spend on each lesson and subject.
          </p>
        </div>
      </div>

    </div>
  );
}
