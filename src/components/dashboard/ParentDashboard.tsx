"use client";

import Link from "next/link";
import {
  Users, BookOpen, CreditCard, Bell, BarChart2,
  MessageSquare, Settings, ChevronRight, ArrowRight,
  GraduationCap, ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";

const QUICK_LINKS = [
  { label: "Child Progress",      href: "/parent",  Icon: BarChart2,    cls: "text-indigo-600 bg-indigo-50"   },
  { label: "Lessons & Subjects",  href: "/parent",  Icon: BookOpen,     cls: "text-blue-600   bg-blue-50"     },
  { label: "Subscription & Billing", href: "/pricing", Icon: CreditCard, cls: "text-emerald-600 bg-emerald-50" },
  { label: "Notifications",       href: "/parent",  Icon: Bell,         cls: "text-amber-600  bg-amber-50"    },
  { label: "Messages",            href: "/parent",  Icon: MessageSquare, cls: "text-rose-600  bg-rose-50"     },
  { label: "Account Settings",    href: "/parent",  Icon: Settings,     cls: "text-gray-600   bg-gray-100"    },
];

const STATS = [
  { label: "Children",        value: "—",     Icon: Users,          ring: "ring-indigo-100", ico: "text-indigo-500",  bg: "bg-indigo-50"  },
  { label: "Lessons Done",    value: "—",     Icon: BookOpen,       ring: "ring-blue-100",   ico: "text-blue-500",    bg: "bg-blue-50"    },
  { label: "Plan",            value: "Free",  Icon: ShieldCheck,    ring: "ring-emerald-100",ico: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Alerts",          value: "—",     Icon: Bell,           ring: "ring-amber-100",  ico: "text-amber-500",   bg: "bg-amber-50"   },
];

export default function ParentDashboard() {
  const { user } = useAuth() as any;
  const firstName = user?.fullName?.split(" ")[0] ?? "Parent";

  return (
    <div className="w-full space-y-5">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Welcome, {firstName}!</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor your child's progress and manage their account.</p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors self-start sm:self-auto"
        >
          <ShieldCheck size={14} /> Upgrade Plan
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

        {/* Left: Children Overview */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Children</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-indigo-50 p-4 rounded-2xl mb-4">
              <GraduationCap size={28} className="text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No children added yet</p>
            <p className="text-xs text-gray-400 max-w-xs">
              Subscribe to a plan to link a student account and start tracking progress.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              View Plans <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Links</h2>
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

          {/* Info card */}
          <div className="bg-indigo-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={14} className="text-indigo-200" />
              <span className="text-sm font-bold">EduJoyKids Premium</span>
            </div>
            <p className="text-xs text-indigo-200 mb-3 leading-relaxed">
              Unlock full access to all subjects, AI tutoring, and detailed progress reports.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 bg-white text-indigo-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              See Plans <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
