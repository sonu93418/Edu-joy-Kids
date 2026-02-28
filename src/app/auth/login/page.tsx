"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  BookOpen,
  Trophy,
  Rocket,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { safeJson } from "@/lib/utils";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});
type LoginForm = z.infer<typeof loginSchema>;

// SVG decorative floating shapes — no hydration mismatch, no raw emoji
const StarShape = ({
  size = 32,
  color = "#FFD700",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon
      points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
      fill={color}
      opacity="0.9"
    />
  </svg>
);
const SparkleShape = ({
  size = 28,
  color = "#A78BFA",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path
      d="M14 2 L15.5 12.5 L26 14 L15.5 15.5 L14 26 L12.5 15.5 L2 14 L12.5 12.5 Z"
      fill={color}
    />
  </svg>
);
const DiamondShape = ({
  size = 24,
  color = "#34D399",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="12"
      y="1"
      width="15"
      height="15"
      rx="2"
      transform="rotate(45 12 12)"
      fill={color}
      opacity="0.85"
    />
  </svg>
);
const CircleBubble = ({
  size = 20,
  color = "#F472B6",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill={color} opacity="0.7" />
    <circle cx="7" cy="7" r="2.5" fill="white" opacity="0.5" />
  </svg>
);

const FloatingShape = ({
  children,
  x,
  y,
  delay,
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute pointer-events-none select-none drop-shadow-lg"
    style={{ left: x, top: y }}
    animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") ?? "";
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Auto-redirect if already logged in
  const dashboardMap: Record<string, string> = {
    student: "/student",
    parent: "/parent",
    teacher: "/teacher",
    admin: "/admin",
    school_admin: "/school",
  };
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      // Refresh cookies in case they expired while localStorage session remained
      const maxAge = 60 * 60 * 24 * 7;
      if (typeof document !== "undefined") {
        document.cookie = `userRole=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
      }
      router.replace(redirect || dashboardMap[user.role] || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await safeJson<{
        user: any;
        accessToken: string;
        student?: any;
        message?: string;
      }>(res);
      if (!res.ok) throw new Error(result.message || "Login failed");
      login(result.user, result.accessToken, result.student || null);

      // Set cookies so the middleware can verify auth on protected routes
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      document.cookie = `accessToken=${result.accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `userRole=${result.user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;

      toast.success(
        `Welcome back, ${result.user.fullName?.split(" ")[0] ?? "friend"}!`,
      );
      const dashboardMap: Record<string, string> = {
        student: "/student",
        parent: "/parent",
        teacher: "/teacher",
        admin: "/admin",
        school_admin: "/school",
      };
      const dest = redirect || dashboardMap[result.user.role] || "/";
      router.push(dest);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-fuchsia-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingShape x="5%" y="10%" delay={0}>
        <StarShape size={36} color="#FFD700" />
      </FloatingShape>
      <FloatingShape x="90%" y="15%" delay={0.5}>
        <SparkleShape size={30} color="#A78BFA" />
      </FloatingShape>
      <FloatingShape x="8%" y="75%" delay={1}>
        <DiamondShape size={28} color="#34D399" />
      </FloatingShape>
      <FloatingShape x="85%" y="70%" delay={1.5}>
        <CircleBubble size={24} color="#F472B6" />
      </FloatingShape>
      <FloatingShape x="50%" y="5%" delay={0.3}>
        <StarShape size={22} color="#60A5FA" />
      </FloatingShape>
      <FloatingShape x="20%" y="88%" delay={0.8}>
        <SparkleShape size={20} color="#FCD34D" />
      </FloatingShape>
      <FloatingShape x="75%" y="90%" delay={1.2}>
        <DiamondShape size={22} color="#F87171" />
      </FloatingShape>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className="text-2xl font-black">
            <span className="text-edujoy-primary-500">Edu</span>
            <span className="text-fun-purple">Joy</span>
            <span className="text-fun-pink"> Kids</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center shadow-lg"
            >
              <Rocket size={32} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-black text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 mt-1">
              Sign in to continue your adventure
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white focus:border-edujoy-primary-400 focus:outline-none focus:ring-2 focus:ring-edujoy-primary-100 transition-all text-gray-800 font-medium placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white focus:border-edujoy-primary-400 focus:outline-none focus:ring-2 focus:ring-edujoy-primary-100 transition-all text-gray-800 font-medium pr-12 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 accent-edujoy-primary-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-edujoy-primary-500 font-bold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-fun w-full py-4 text-lg font-black disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="spinner w-6 h-6 border-white" />
              ) : (
                <>
                  <Zap size={20} className="text-yellow-300" />
                  Sign In
                </>
              )}
            </motion.button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1L8.8 5.2L13 5.7L9.8 8.7L10.7 13L7 10.8L3.3 13L4.2 8.7L1 5.7L5.2 5.2Z"
                    fill="#FCD34D"
                  />
                </svg>
                Safe &amp; Secure
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="3"
                    y="6"
                    width="8"
                    height="6"
                    rx="1"
                    stroke="#A78BFA"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 6V4.5a2 2 0 014 0V6"
                    stroke="#A78BFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                256-bit SSL
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1.5C3.97 1.5 1.5 3.97 1.5 7s2.47 5.5 5.5 5.5S12.5 10.03 12.5 7 10.03 1.5 7 1.5zm2.4 4.2l-2.8 2.8a.5.5 0 01-.7 0L4.6 7.2a.5.5 0 11.7-.7L6.7 7.9l2.4-2.4a.5.5 0 01.7.7z"
                    fill="#34D399"
                  />
                </svg>
                COPPA Compliant
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-gray-600">
            New here?{" "}
            <Link
              href="/auth/signup"
              className="text-edujoy-primary-500 font-black hover:underline inline-flex items-center gap-1"
            >
              Create Free Account <Sparkles size={14} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
