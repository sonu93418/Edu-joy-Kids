"use client";

import Link from "next/link";
import {
  Users, BookOpen, BarChart2, ShieldCheck, Bell,
  CreditCard, Settings, ChevronRight, ArrowRight,
  TrendingUp, Database,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_LINKS = [
  { label: "Users",          href: "/admin", Icon: Users,       cls: "text-indigo-600 bg-indigo-50"   },
  { label: "Content",        href: "/admin", Icon: BookOpen,    cls: "text-blue-600   bg-blue-50"     },
  { label: "Analytics",      href: "/admin", Icon: BarChart2,   cls: "text-violet-600 bg-violet-50"   },
  { label: "Subscriptions",  href: "/admin", Icon: CreditCard,  cls: "text-emerald-600 bg-emerald-50" },
  { label: "Notifications",  href: "/admin", Icon: Bell,        cls: "text-amber-600  bg-amber-50"    },
  { label: "Settings",       href: "/admin", Icon: Settings,    cls: "text-gray-600   bg-gray-100"    },
];

const STATS = [
  { label: "Total Users",    value: "—",   Icon: Users,      ring: "ring-indigo-100",  ico: "text-indigo-500",  bg: "bg-indigo-50"   },
  { label: "Active Today",   value: "—",   Icon: TrendingUp, ring: "ring-emerald-100", ico: "text-emerald-500", bg: "bg-emerald-50"  },
  { label: "Revenue",        value: "—",   Icon: CreditCard, ring: "ring-blue-100",    ico: "text-blue-500",    bg: "bg-blue-50"     },
  { label: "Lessons",        value: "—",   Icon: BookOpen,   ring: "ring-violet-100",  ico: "text-violet-500",  bg: "bg-violet-50"   },
];

export default function AdminDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Admin";

  return (
    <div className="w-full space-y-5">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, {firstName}. Here's your platform overview.</p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors self-start sm:self-auto"
        >
          <Database size={14} /> Full Report
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map(({ label, value, Icon, ring, ico, bg }) => (
          <div key={label} className={`bg-white rounded-xl border border-gray-100 ring-1 ${ring} p-4 flex items-center gap-3`}>
            <div className={`${bg} p-2.5 rounded-xl flex-shrink-0`}>
              <Icon size={18} className={ico} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-medium truncate">{label}</p>
              <p className="text-base font-bold text-gray-900 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Platform Activity</h2>
            <Link href="/admin" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              Full report <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-50 p-4 rounded-2xl mb-4">
              <BarChart2 size={28} className="text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No data yet</p>
            <p className="text-xs text-gray-400 max-w-xs">
              User registrations, lesson completions, and revenue charts will appear here once data is available.
            </p>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Navigation</h2>
            <div className="space-y-1">
              {QUICK_LINKS.map(({ label, href, Icon, cls }) => (
                <Link key={label} href={href}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cls}`}>
                      <Icon size={13} />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{label}</span>
                    <ChevronRight size={13} className="ml-auto text-gray-300 group-hover:text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* System status */}
          <div className="bg-gray-800 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={14} className="text-green-400" />
              <span className="text-sm font-bold">System Status</span>
            </div>
            <div className="space-y-1.5 mt-3">
              {[
                { label: "API",      status: "Operational" },
                { label: "Database", status: "Operational" },
                { label: "Auth",     status: "Operational" },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
