"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  CheckCircle,
  RefreshCw,
  ArrowRight,
  SendHorizonal,
} from "lucide-react";
import { useAuth } from "@/store/auth-store";
import toast from "react-hot-toast";

// SVG decorative shapes — crisp at all sizes, no emoji
const EnvelopeDecor = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect
      x="2"
      y="8"
      width="32"
      height="22"
      rx="3"
      fill="#60A5FA"
      opacity="0.85"
    />
    <path
      d="M2 11 L18 21 L34 11"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
const StarDecor = ({
  size = 28,
  color = "#FCD34D",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <polygon
      points="14,2 17,10 26,10 19,16 22,25 14,19 6,25 9,16 2,10 11,10"
      fill={color}
    />
  </svg>
);
const CheckDecor = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill="#34D399" opacity="0.9" />
    <path
      d="M8 14 L12 18 L20 10"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const SparkleDecor = ({
  size = 24,
  color = "#A78BFA",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
      fill={color}
    />
  </svg>
);
const DiamondDecor = ({
  size = 22,
  color = "#F472B6",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <rect
      x="11"
      y="1"
      width="14"
      height="14"
      rx="2"
      transform="rotate(45 11 11)"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

const FLOATERS: Array<{
  node: React.ReactNode;
  left: string;
  top: string;
  delay: number;
}> = [
  { node: <EnvelopeDecor size={36} />, left: "8%", top: "15%", delay: 0 },
  { node: <StarDecor size={30} />, left: "85%", top: "12%", delay: 0.4 },
  { node: <DiamondDecor size={26} />, left: "5%", top: "68%", delay: 0.8 },
  { node: <SparkleDecor size={28} />, left: "88%", top: "62%", delay: 1.2 },
  { node: <CheckDecor size={26} />, left: "50%", top: "5%", delay: 0.2 },
];

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (!user?.email) {
      toast.error("No email address found.");
      return;
    }
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend");
      setResent(true);
      toast.success("Verification email resent! Check your inbox.");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to resend email",
      );
    } finally {
      setResending(false);
    }
  };

  const handleContinue = () => {
    const role = user?.role;
    if (role === "teacher" || role === "school_admin") {
      router.push("/teacher");
    } else if (role === "parent") {
      router.push("/parent");
    } else if (role === "student") {
      router.push("/student");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fun-blue/20 via-edujoy-primary-100 to-fun-pink/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* SVG floating decorations — no emoji */}
      {FLOATERS.map(({ node, left, top, delay }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none drop-shadow-md"
          style={{ left, top }}
          animate={{ y: [-10, 10, -10], rotate: [-8, 8, -8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay }}
        >
          {node}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
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

        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-fun-blue/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            {resent ? (
              <CheckCircle className="w-10 h-10 text-green-500" />
            ) : (
              <Mail className="w-10 h-10 text-edujoy-primary-500" />
            )}
          </motion.div>

          <h1 className="text-2xl font-black text-gray-800 mb-2 flex items-center justify-center gap-2">
            <SendHorizonal size={22} className="text-edujoy-primary-500" />
            Check your email!
          </h1>
          <p className="text-gray-500 mb-2">We sent a verification link to:</p>
          {user?.email && (
            <p className="font-semibold text-edujoy-primary-600 mb-6 break-all">
              {user.email}
            </p>
          )}
          <p className="text-sm text-gray-400 mb-8">
            Click the link in the email to verify your account. You can still
            explore the app while you wait.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full py-3 px-6 bg-gradient-to-r from-edujoy-primary-500 to-fun-purple text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            >
              Continue to Dashboard
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResend}
              disabled={resending || resent}
              className="w-full py-3 px-6 border-2 border-edujoy-primary-200 text-edujoy-primary-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-edujoy-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {resending ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Sending...
                </>
              ) : resent ? (
                <>
                  <CheckCircle size={18} />
                  Email Sent!
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  Resend Verification Email
                </>
              )}
            </motion.button>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Wrong account?{" "}
            <Link
              href="/auth/login"
              className="text-edujoy-primary-500 font-semibold hover:underline"
            >
              Sign in with another account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
