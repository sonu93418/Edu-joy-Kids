"use client";

import Link from "next/link";
import {
  Users, BookOpen, DollarSign, ShieldCheck, BarChart2,
  TrendingUp, Settings, AlertCircle, CheckCircle2,
  PlusCircle, ArrowRight, UserCheck, Globe,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_ACTIONS = [
  { label: "Manage Users",    href: "/admin", icon: Users,      style: "bg-indigo-600  text-white hover:bg-indigo-700"  },
  { label: "Content Manager", href: "/admin", icon: BookOpen,   style: "bg-emerald-600 text-white hover:bg-emerald-700" },
  { label: "Analytics",       href: "/admin", icon: BarChart2,  style: "bg-violet-600  text-white hover:bg-violet-700"  },
  { label: "Settings",        href: "/admin", icon: Settings,   style: "bg-gray-600    text-white hover:bg-gray-700"    },
];

export default function AdminDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Admin";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-6 text-white">
        <p className="text-slate-400 text-sm font-medium">Platform Admin</p>
        <h1 className="text-2xl font-bold mt-0.5">{firstName}</h1>
        <p className="text-slate-400 text-sm mt-1">
          Full platform management — users, content, billing, and analytics.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <BarChart2 size={14} /> Platform Overview
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <UserCheck size={14} /> Manage Users
          </Link>
        </div>
      </div>

      {/* PLATFORM STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Students",  value: "—", icon: Users,       color: "text-indigo-600",  bg: "bg-indigo-50"  },
          { label: "Total Schools",   value: "—", icon: Globe,       color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Monthly Revenue", value: "—", icon: DollarSign,  color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Active Lessons",  value: "—", icon: BookOpen,    color: "text-violet-600",  bg: "bg-violet-50"  },
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
        <h2 className="text-base font-bold text-gray-800 mb-3">Admin Actions</h2>
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

      {/* RECENT REGISTRATIONS EMPTY STATE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">Recent Registrations</h2>
          <Link href="/admin" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
          <CheckCircle2 size={36} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No new registrations. Connect your database to see live data.</p>
        </div>
      </div>

      {/* SECURITY + HEALTH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-2 rounded-lg"><ShieldCheck size={18} className="text-emerald-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">Security Alerts</h3>
          </div>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle2 size={28} className="text-gray-300 mb-2" />
            <p className="text-xs text-gray-400">No security alerts. System is healthy.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg"><TrendingUp size={18} className="text-indigo-600" /></div>
            <h3 className="font-semibold text-gray-800 text-sm">Content Stats</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Published Lessons", value: "—" },
              { label: "Avg Rating",        value: "—" },
              { label: "Completion Rate",   value: "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
