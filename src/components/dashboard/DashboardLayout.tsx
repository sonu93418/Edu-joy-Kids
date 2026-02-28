"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Star,
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
    { icon: Star, label: "Subscription", href: "/parent/subscription" },
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, student, logout, isAuthenticated, _hasHydrated } = useAuth();
  const { totalXP, currentLevel, coins, streaks } = useGame();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Auth guard ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!_hasHydrated) return; // wait for localStorage to rehydrate
    if (!isAuthenticated) {
      router.replace(
        `/auth/login?redirect=${encodeURIComponent(pathname ?? "/")}`,
      );
    }
  }, [_hasHydrated, isAuthenticated, pathname, router]);

  // Show full-page spinner until hydration is resolved
  if (!_hasHydrated || (!isAuthenticated && _hasHydrated)) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-2xl font-black">E</span>
          </div>
          <div className="flex gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-edujoy-primary-400 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-fun-purple animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-fun-pink animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  const role = user?.role || "parent";
  const navItems = navsByRole[role] || navsByRole.parent;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}
    // Clear middleware cookies so protected routes block correctly
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "userRole=; path=/; max-age=0; SameSite=Lax";
    logout();
    toast.success("See you soon!");
    router.push("/");
  };

  const roleColors: Record<string, string> = {
    student: "from-edujoy-primary-400 to-fun-purple",
    parent: "from-fun-blue to-fun-purple",
    teacher: "from-fun-green to-fun-blue",
    admin: "from-gray-600 to-gray-800",
    school_admin: "from-fun-orange to-fun-pink",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`p-4 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
      >
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${roleColors[role]} flex items-center justify-center shadow-md`}
        >
          <span className="text-white font-black text-lg">E</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-black"
          >
            <span className="text-edujoy-primary-500">Edu</span>
            <span className="text-fun-purple">Joy</span>
          </motion.span>
        )}
      </div>

      {/* User Info (student specific) */}
      {role === "student" && !collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-2xl bg-gradient-to-r from-edujoy-primary-50 to-fun-purple/10 border border-edujoy-primary-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fun-yellow to-fun-orange flex items-center justify-center overflow-hidden">
              {student?.avatar?.character ? (
                <span className="text-lg select-none">
                  {student.avatar.character}
                </span>
              ) : (
                // Default SVG avatar when no character is set
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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
              <p className="font-bold text-gray-800 text-sm">
                {user?.fullName?.split(" ")[0] ?? ""}
              </p>
              <p className="text-xs text-gray-500">
                Level {currentLevel} Explorer
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-fun-orange font-bold">
              <Zap size={12} /> {totalXP} XP
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold">
              <Coins size={12} /> {coins}
            </span>
            <span className="flex items-center gap-1 text-fun-pink font-bold">
              <Flame size={12} /> {streaks.current}d
            </span>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            (pathname ?? "") === item.href ||
            (item.href !== `/${role}` &&
              (pathname ?? "").startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-sm transition-all group relative ${
                active
                  ? `bg-gradient-to-r ${roleColors[role]} text-white shadow-md`
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {item.badge && !collapsed && (
                <span className="ml-auto bg-fun-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-sm font-bold text-white">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="hidden md:flex flex-col bg-white border-r border-gray-100 shadow-sm overflow-hidden relative z-20"
      >
        <SidebarContent />
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 h-full w-64 bg-white z-40 md:hidden shadow-2xl overflow-y-auto"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="font-black text-gray-800 text-base leading-tight capitalize">
                {navItems.find(
                  (n) =>
                    (pathname ?? "") === n.href ||
                    (n.href !== `/${role}` &&
                      (pathname ?? "").startsWith(n.href)),
                )?.label || "Dashboard"}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {role === "student" && (
              <div className="hidden sm:flex items-center gap-3 text-sm font-bold">
                <span className="flex items-center gap-1 text-fun-orange">
                  <Zap size={14} /> {totalXP}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <Coins size={14} /> {coins}
                </span>
              </div>
            )}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-fun-pink rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
