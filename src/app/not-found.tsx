"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, BookOpen, Compass } from "lucide-react";

// SVG star — replaces raw ⭐ emoji for hydration-safe, crisp rendering
const SvgStar = ({
  size = 20,
  color = "#FCD34D",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <polygon
      points="10,1 12.3,7.5 19,7.5 13.8,11.8 15.9,18.5 10,14.5 4.1,18.5 6.2,11.8 1,7.5 7.7,7.5"
      fill={color}
    />
  </svg>
);

// Cartoon owl mascot — pure SVG, no emoji, no external assets
const OwlMascot = () => (
  <svg
    width="148"
    height="168"
    viewBox="0 0 160 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="80" cy="120" rx="52" ry="55" fill="#F59E0B" />
    <ellipse cx="80" cy="125" rx="38" ry="42" fill="#FEF3C7" />
    <ellipse
      cx="30"
      cy="115"
      rx="22"
      ry="35"
      fill="#D97706"
      transform="rotate(-20 30 115)"
    />
    <ellipse
      cx="130"
      cy="115"
      rx="22"
      ry="35"
      fill="#D97706"
      transform="rotate(20 130 115)"
    />
    <ellipse cx="80" cy="65" rx="46" ry="44" fill="#F59E0B" />
    <polygon points="52,28 44,8 62,22" fill="#D97706" />
    <polygon points="108,28 116,8 98,22" fill="#D97706" />
    <ellipse cx="80" cy="68" rx="34" ry="32" fill="#FEF3C7" />
    <circle
      cx="64"
      cy="62"
      r="13"
      fill="white"
      stroke="#D97706"
      strokeWidth="2.5"
    />
    <circle
      cx="96"
      cy="62"
      r="13"
      fill="white"
      stroke="#D97706"
      strokeWidth="2.5"
    />
    <circle cx="64" cy="64" r="7" fill="#1E40AF" />
    <circle cx="96" cy="64" r="7" fill="#1E40AF" />
    <circle cx="67" cy="61" r="2.5" fill="white" />
    <circle cx="99" cy="61" r="2.5" fill="white" />
    {/* Sad brows */}
    <path
      d="M55 52 Q64 47 73 52"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M87 52 Q96 47 105 52"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="80,74 74,85 86,85" fill="#F97316" />
    <ellipse cx="65" cy="172" rx="14" ry="6" fill="#D97706" />
    <ellipse cx="95" cy="172" rx="14" ry="6" fill="#D97706" />
    <line
      x1="57"
      y1="172"
      x2="53"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="65"
      y1="172"
      x2="65"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="73"
      y1="172"
      x2="77"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="87"
      y1="172"
      x2="83"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="95"
      y1="172"
      x2="95"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="103"
      y1="172"
      x2="107"
      y2="178"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <ellipse cx="72" cy="118" rx="6" ry="8" fill="#FDE68A" opacity="0.6" />
    <ellipse cx="88" cy="118" rx="6" ry="8" fill="#FDE68A" opacity="0.6" />
  </svg>
);
const MESSAGES = [
  "Oops! This page went on a wild adventure!",
  "Even our owl couldn't track this page down!",
  "This page is playing hide and seek!",
  "The dragon flew away with this page!",
];

const STAR_COLORS = [
  "#FCD34D",
  "#A78BFA",
  "#F472B6",
  "#60A5FA",
  "#34D399",
  "#FB923C",
];

export default function NotFound() {
  const [msg, setMsg] = useState(MESSAGES[0]);
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; delay: number; size: number; color: string }>
  >([]);

  useEffect(() => {
    setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    setStars(
      Array.from({ length: 18 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: 14 + Math.floor(Math.random() * 14),
        color: STAR_COLORS[i % STAR_COLORS.length],
      })),
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-edujoy-primary via-fun-purple to-fun-blue flex items-center justify-center overflow-hidden relative px-4">
      {/* SVG floating stars — crisp, no emoji */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 30, 0],
          }}
          transition={{
            duration: 2.5 + star.delay * 0.3,
            delay: star.delay,
            repeat: Infinity,
          }}
        >
          <SvgStar size={star.size} color={star.color} />
        </motion.div>
      ))}

      <div className="text-center z-10 max-w-lg mx-auto">
        {/* Animated SVG owl mascot */}
        <motion.div
          className="flex justify-center mb-2"
          animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <OwlMascot />
        </motion.div>

        {/* 404 */}
        <motion.div
          className="text-8xl font-black text-white mb-2 leading-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          4<span className="text-yellow-300">0</span>4
        </motion.div>

        <motion.p
          className="text-white/90 text-xl font-bold mb-8 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {msg}
        </motion.p>

        {/* Buttons with Lucide icons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            href="/student"
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-lg px-8 py-4 rounded-2xl border-2 border-white/50 transform hover:scale-105 transition-all duration-200"
          >
            <BookOpen size={20} />
            My Dashboard
          </Link>
        </motion.div>

        {/* Tip card */}
        <motion.div
          className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto border border-white/20 flex items-start gap-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Compass size={18} className="text-yellow-300 flex-shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm">
            <strong className="text-white">Explorer Tip:</strong> Even the best
            adventurers get lost — that&apos;s how they discover new paths!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
