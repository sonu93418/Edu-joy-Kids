"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  GraduationCap,
  Building2,
  Rocket,
  Lock,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { safeJson } from "@/lib/utils";
import toast from "react-hot-toast";

const ROLES = [
  {
    id: "parent",
    Icon: Users,
    color: "text-fun-blue",
    bg: "bg-fun-blue/10",
    label: "Parent / Guardian",
    desc: "Monitor your child's progress",
  },
  {
    id: "teacher",
    Icon: GraduationCap,
    color: "text-fun-green",
    bg: "bg-fun-green/10",
    label: "Teacher",
    desc: "Manage your class & lessons",
  },
  {
    id: "school_admin",
    Icon: Building2,
    color: "text-fun-orange",
    bg: "bg-fun-orange/10",
    label: "School Admin",
    desc: "Oversee the entire school",
  },
];

// Reusable SVG decorative shapes
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

const signupSchema = z
  .object({
    firstName: z.string().min(2, "At least 2 characters"),
    lastName: z.string().min(2, "At least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must have uppercase")
      .regex(/[0-9]/, "Must have a number"),
    confirmPassword: z.string(),
    role: z.enum(["parent", "teacher", "school_admin"]),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "parent" | "teacher" | "school_admin"
  >("parent");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "parent" },
  });

  const nextStep = async () => {
    const valid = await trigger(["firstName", "lastName", "email"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: SignupForm) => {
    try {
      // Backend expects fullName (not firstName/lastName), and excludes confirmPassword/agreeTerms
      const payload = {
        fullName: `${data.firstName.trim()} ${data.lastName.trim()}`,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const result = await safeJson<{
        user: any;
        accessToken: string;
        error?: string;
        message?: string;
      }>(res);
      if (!res.ok)
        throw new Error(
          result.error || result.message || "Registration failed",
        );
      login(result.user, result.accessToken, undefined);
      toast.success("Account created! Check your email to verify.");
      router.push("/auth/verify");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fun-pink/20 via-edujoy-primary-100 to-fun-blue/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* SVG floating decorations */}
      {(
        [
          {
            node: <StarShape size={34} color="#FCD34D" />,
            left: "5%",
            top: "20%",
            delay: 0,
          },
          {
            node: <SparkleShape size={28} color="#A78BFA" />,
            left: "90%",
            top: "10%",
            delay: 0.4,
          },
          {
            node: <DiamondShape size={26} color="#34D399" />,
            left: "3%",
            top: "60%",
            delay: 0.8,
          },
          {
            node: <CircleBubble size={24} color="#F472B6" />,
            left: "88%",
            top: "65%",
            delay: 1.2,
          },
          {
            node: <StarShape size={20} color="#60A5FA" />,
            left: "50%",
            top: "5%",
            delay: 0.2,
          },
          {
            node: <SparkleShape size={18} color="#FCD34D" />,
            left: "75%",
            top: "88%",
            delay: 1.5,
          },
        ] as Array<{
          node: React.ReactNode;
          left: string;
          top: string;
          delay: number;
        }>
      ).map(({ node, left, top, delay }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none hero-float"
          style={{ left, top, animationDelay: `${delay}s` }}
        >
          {node}
        </div>
      ))}

      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className="text-2xl font-black">
            <span className="text-edujoy-primary-500">Edu</span>
            <span className="text-fun-purple">Joy</span>
            <span className="text-fun-pink"> Kids</span>
          </span>
        </Link>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s
                    ? "bg-edujoy-primary-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 2 && (
                <div
                  className={`w-16 h-1 rounded-full transition-all ${step > s ? "bg-edujoy-primary-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="card-fun p-8">
          <div>
            {step === 1 && (
            <div>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-edujoy-primary-400 to-fun-purple flex items-center justify-center shadow-lg">
                    <Rocket size={28} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-gray-800">
                    Create Your Account
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Step 1: Basic Information
                  </p>
                </div>

                {/* Role selector */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    I am a...
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role.id as typeof selectedRole);
                          setValue(
                            "role",
                            role.id as "parent" | "teacher" | "school_admin",
                          );
                        }}
                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                          selectedRole === role.id
                            ? "border-edujoy-primary-400 bg-edujoy-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl ${role.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <role.Icon size={20} className={role.color} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">
                            {role.label}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {role.desc}
                          </div>
                        </div>
                        {selectedRole === role.id && (
                          <CheckCircle
                            size={18}
                            className="ml-auto text-edujoy-primary-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      placeholder="Jane"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none text-sm font-medium"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-0.5">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      placeholder="Doe"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none text-sm font-medium"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-0.5">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none text-sm font-medium"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-fun w-full py-3 font-black flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

          {step === 2 && (
            <div>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-fun-purple to-fun-pink flex items-center justify-center shadow-lg">
                    <Lock size={28} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-gray-800">
                    Secure Your Account
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Step 2: Create a Password
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none text-sm font-medium pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-0.5">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      placeholder="Repeat your password"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-edujoy-primary-400 focus:outline-none text-sm font-medium"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-0.5">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeTerms")}
                      className="mt-0.5 w-4 h-4 accent-edujoy-primary-500"
                    />
                    <span className="text-xs text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-edujoy-primary-500 font-bold hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-edujoy-primary-500 font-bold hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-xs">
                      {errors.agreeTerms.message}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 btn-fun py-3 font-black disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="spinner w-5 h-5 border-white" />
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sparkles size={16} /> Create Account
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-edujoy-primary-500 font-black hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
