"use client";

import Link from "next/link";
import {
  Users, BookOpen, Clock, Trophy, Bell, AlertCircle,
  Plus, ChevronRight, TrendingUp, MessageSquare, ArrowRight,
  UserPlus, BarChart2, Shield, CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_LINKS = [
  { label: "Add Child",          href: "/parent",           icon: UserPlus,      style: "bg-indigo-600 text-white hover:bg-indigo-700"  },
  { label: "View Reports",       href: "/parent",           icon: BarChart2,     style: "bg-emerald-600 text-white hover:bg-emerald-700" },
  { label: "Parental Controls",  href: "/parent",           icon: Shield,        style: "bg-amber-500  text-white hover:bg-amber-600"   },
  { label: "Messages",           href: "/parent",           icon: MessageSquare, style: "bg-violet-600 text-white hover:bg-violet-700"  },
];

export default function ParentDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Parent";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <p className="text-emerald-200 text-sm font-medium">Welcome back</p>
        <h1 className="text-2xl font-bold mt-0.5">{firstName}</h1>
        <p className="text-emerald-200 text-sm mt-1">
          Monitor your children's learning progress and set parental controls.
        </p>
        <div className="mt-4">
          <Link
            href="/parent"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <Plus size={14} /> Add Child Account
          </Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Children",       value: "—",  icon: Users,   color: "text-indigo-600",  bg: "bg-indigo-50"  },
          { label: "Lessons Today",  value: "—",  icon: BookOpen,color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Study Time",     value: "—",  icon: Clock,   color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Badges Earned",  value: "—",  icon: Trophy,  color: "text-violet-600",  bg: "bg-violet-50"  },
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
          {QUICK_LINKS.map(({ label, href, icon: Icon, style }) => (
            <Link key={label} href={href}>
              <div className={`${style} rounded-xl p-4 text-center transition-colors cursor-pointer`}>
                <Icon size={22} className="mx-auto" />
                <p className="mt-2 text-xs font-semibold">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* NO CHILDREN EMPTY STATE */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users size={28} className="text-emerald-600" />
        </div>
        <h3 className="font-bold text-gray-800 text-base">No children added yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
          Add your child's account to start tracking their learning progress, set safe-browsing controls, and receive weekly reports.
        </p>
        <Link
          href="/parent"
          className="mt-5 inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <UserPlus size={15} /> Add Child Account
        </Link>
      </div>

      {/* ALERTS PANEL */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-amber-500" />
            <h2 className="text-sm font-bold text-gray-800">Alerts &amp; Notifications</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <CheckCircle2 size={32} className="text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No alerts right now. You're all caught up!</p>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <TrendingUp size={18} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Progress Reports</h3>
          </div>
          <p className="text-xs text-gray-500">
            Weekly progress reports will appear here once your child starts learning.
          </p>
          <Link href="/parent" className="mt-3 inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline">
            Learn more <ArrowRight size={12} />
          </Link>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <AlertCircle size={18} className="text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Safe Learning</h3>
          </div>
          <p className="text-xs text-gray-500">
            Configure content filters, time limits, and approved subjects for your child's account.
          </p>
          <Link href="/parent" className="mt-3 inline-flex items-center gap-1 text-xs text-amber-600 font-semibold hover:underline">
            Configure <ArrowRight size={12} />
          </Link>
        </div>
      </div>

    </div>
  );
}
