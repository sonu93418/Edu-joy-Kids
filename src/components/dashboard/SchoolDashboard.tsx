"use client";

import Link from "next/link";
import {
  Users, BookOpen, GraduationCap, BarChart2, TrendingUp,
  Settings, UserPlus, PlusCircle, ArrowRight, CheckCircle2,
  Building2, Star, Clock,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_ACTIONS = [
  { label: "Add Teacher",    href: "/school", icon: UserPlus,       style: "bg-indigo-600  text-white hover:bg-indigo-700"  },
  { label: "Add Students",   href: "/school", icon: GraduationCap,  style: "bg-emerald-600 text-white hover:bg-emerald-700" },
  { label: "Analytics",      href: "/school", icon: BarChart2,      style: "bg-violet-600  text-white hover:bg-violet-700"  },
  { label: "Settings",       href: "/school", icon: Settings,       style: "bg-gray-500    text-white hover:bg-gray-600"    },
];

export default function SchoolDashboard() {
  const { user } = useAuth() as any;
  const schoolName = user?.school?.name ?? user?.fullName ?? "School";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <p className="text-blue-200 text-sm font-medium">School Admin</p>
        <h1 className="text-2xl font-bold mt-0.5">{schoolName}</h1>
        <p className="text-blue-200 text-sm mt-1">
          Manage teachers, students, classes, and school-wide performance.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/school"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <BarChart2 size={14} /> School Analytics
          </Link>
          <Link
            href="/school"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <UserPlus size={14} /> Add Teacher
          </Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Students", value: "—", icon: GraduationCap, color: "text-indigo-600",  bg: "bg-indigo-50"  },
          { label: "Teachers",       value: "—", icon: Users,         color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Classes", value: "—", icon: BookOpen,      color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Avg Score",      value: "—", icon: Star,          color: "text-violet-600",  bg: "bg-violet-50"  },
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

      {/* LICENSE OVERVIEW */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Building2 size={18} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-800 text-sm">License Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Plan",              value: user?.plan ?? "—"      },
            { label: "Students Used",     value: "— / —"                },
            { label: "License Renewal",   value: user?.renewalDate ?? "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Contact support to upgrade your plan or add more seats.
        </p>
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
          <h2 className="text-base font-bold text-gray-800">Class Performance</h2>
          <Link href="/school" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            All Classes <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={28} className="text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-base">No classes configured</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
            Add teachers and create classes to start seeing performance analytics here.
          </p>
          <Link
            href="/school"
            className="mt-5 inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle size={15} /> Get Started
          </Link>
        </div>
      </div>

      {/* BOTTOM INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><TrendingUp size={18} className="text-indigo-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">School-wide Analytics</h3>
          </div>
          <p className="text-xs text-gray-500">
            Detailed reports on engagement, completion rates, and subject performance will appear once classes are active.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-100 p-2 rounded-lg"><Clock size={18} className="text-emerald-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">Attendance &amp; Time</h3>
          </div>
          <p className="text-xs text-gray-500">
            Track study time per student and attendance across all classes in real time.
          </p>
        </div>
      </div>

    </div>
  );
}
