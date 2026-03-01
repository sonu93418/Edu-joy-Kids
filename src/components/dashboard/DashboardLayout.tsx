"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Trophy,
  MessageCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Zap,
  Flame,
  Coins,
  Menu,
  X,
  BarChart2,
  Users,
  GraduationCap,
  Shield,
  Building2,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { useGame } from "@/store/game-store";
import toast from "react-hot-toast";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
};

const navsByRole: Record<string, NavItem[]> = {
  student: [
    { icon: Home, label: "Home", href: "/student" },
    { icon: BookOpen, label: "Learn", href: "/student/learn" },
    { icon: Trophy, label: "Achievements", href: "/student/achievements" },
    { icon: BarChart2, label: "Progress", href: "/student/progress" },
    { icon: MessageCircle, label: "AI Tutor", href: "/student/ai-tutor" },
    { icon: Settings, label: "Settings", href: "/student/settings" },
  ],
  parent: [
    { icon: Home, label: "Dashboard", href: "/parent" },
    { icon: Users, label: "My Children", href: "/parent/children" },
    { icon: BarChart2, label: "Reports", href: "/parent/reports" },
    { icon: Shield, label: "Safety", href: "/parent/safety" },
    { icon: Settings, label: "Settings", href: "/parent/settings" },
  ],
  teacher: [
    { icon: Home, label: "Dashboard", href: "/teacher" },
    { icon: GraduationCap, label: "My Classes", href: "/teacher/classes" },
    { icon: BookOpen, label: "Lessons", href: "/teacher/lessons" },
    { icon: Users, label: "Students", href: "/teacher/students" },
    { icon: BarChart2, label: "Analytics", href: "/teacher/analytics" },
    { icon: Settings, label: "Settings", href: "/teacher/settings" },
  ],
  admin: [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BookOpen, label: "Content", href: "/admin/content" },
    { icon: Building2, label: "Schools", href: "/admin/schools" },
    { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
    { icon: Shield, label: "Security", href: "/admin/security" },
  ],
  school_admin: [
    { icon: Home, label: "Overview", href: "/school" },
    { icon: Users, label: "Teachers", href: "/school/teachers" },
    { icon: GraduationCap, label: "Students", href: "/school/students" },
    { icon: BarChart2, label: "Reports", href: "/school/reports" },
    { icon: Building2, label: "Settings", href: "/school/settings" },
  ],
};

const roleGradients: Record<string, string> = {
  student: "from-indigo-500 to-violet-600",
  parent: "from-blue-500  to-indigo-600",
  teacher: "from-emerald-500 to-teal-600",
  admin: "from-gray-600  to-gray-800",
  school_admin: "from-orange-500 to-pink-500",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, student, logout, isAuthenticated, _hasHydrated } =
    useAuth() as any;
  const { totalXP, currentLevel, coins, streaks } = useGame() as any;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Safety: treat hydration as complete after 3 s even if Zustand callback misfires
  const [forceHydrated, setForceHydrated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setForceHydrated(true), 3000);
    return () => clearTimeout(t);
  }, []);
  const isHydrated = _hasHydrated || forceHydrated;

  /* ── Auth guard ── */
  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace(
        `/auth/login?redirect=${encodeURIComponent(pathname ?? "/")}`,
      );
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Spinner while hydrating */
  if (!isHydrated || (!isAuthenticated && isHydrated)) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-2xl font-black">E</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const role = user?.role ?? "parent";
  const navItems = navsByRole[role] ?? navsByRole.parent;
  const gradient = roleGradients[role] ?? roleGradients.parent;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "userRole=; path=/; max-age=0; SameSite=Lax";
    logout();
    toast.success("See you soon!");
    router.push("/");
  };

  const isActive = (href: string) =>
    (pathname ?? "") === href ||
    (href !== `/${role}` && (pathname ?? "").startsWith(href));

  /* ── Shared sidebar content ── */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`p-4 flex items-center gap-3 ${!mobile && collapsed ? "justify-center" : ""}`}
      >
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow`}
        >
          <span className="text-white font-black text-base">E</span>
        </div>
        {(mobile || !collapsed) && (
          <span className="text-lg font-black leading-none">
            <span className="text-indigo-600">Edu</span>
            <span className="text-violet-600">Joy</span>
          </span>
        )}
      </div>

      {/* Student quick stats */}
      {role === "student" && (mobile || !collapsed) && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
            >
              {student?.avatar?.character ? (
                <span className="text-base select-none">
                  {student.avatar.character}
                </span>
              ) : (
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="5.5" fill="white" opacity="0.9" />
                  <ellipse
                    cx="14"
                    cy="24"
                    rx="9"
                    ry="6"
                    fill="white"
                    opacity="0.75"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-none">
                {user?.fullName?.split(" ")[0] ?? ""}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Level {currentLevel} Explorer
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <Zap size={11} /> {totalXP} XP
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold">
              <Coins size={11} /> {coins}
            </span>
            <span className="flex items-center gap-1 text-rose-500 font-bold">
              <Flame size={11} /> {(streaks as any)?.current ?? 0}d
            </span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all group relative
                ${
                  active
                    ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }
                ${!mobile && collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {(mobile || !collapsed) && <span>{item.label}</span>}
              {item.badge && (mobile || !collapsed) && (
                <span className="ml-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {/* Tooltip when collapsed */}
              {!mobile && collapsed && (
                <div className="absolute left-full ml-2.5 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-2 border-t border-gray-100">
        {(mobile || !collapsed) && (
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {user?.fullName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2) ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {role.replace("_", " ")}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 font-semibold text-sm transition-all ${!mobile && collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={16} />
          {(mobile || !collapsed) && "Sign Out"}
        </button>
      </div>
    </div>
  );

  const currentLabel =
    navItems.find((n) => isActive(n.href))?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Desktop Sidebar (CSS width transition — no framer-motion) ── */}
      <aside
        className="hidden md:flex flex-col bg-white border-r border-gray-100 shadow-sm overflow-hidden relative z-20 flex-shrink-0"
        style={{ width: collapsed ? 72 : 256, transition: "width 0.2s ease" }}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* ── Mobile overlay backdrop ── */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-200 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Sidebar drawer ── */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white z-40 md:hidden shadow-2xl overflow-y-auto transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent mobile />
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-800 p-1"
            >
              <Menu size={22} />
            </button>
            <h2 className="font-bold text-gray-800 text-base capitalize">
              {currentLabel}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {role === "student" && (
              <div className="hidden sm:flex items-center gap-3 text-sm font-bold">
                <span className="flex items-center gap-1 text-amber-500">
                  <Zap size={13} /> {totalXP}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <Coins size={13} /> {coins}
                </span>
              </div>
            )}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
