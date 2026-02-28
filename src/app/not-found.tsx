"use client";

import Link from "next/link";
import { Home, BookOpen, Compass } from "lucide-react";

const OwlMascot = () => (
  <svg
    width="140"
    height="160"
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
  </svg>
);

const STARS = [
  {
    left: "8%",
    top: "12%",
    color: "#FCD34D",
    size: 20,
    delay: "0s",
    dur: "3s",
  },
  {
    left: "88%",
    top: "10%",
    color: "#A78BFA",
    size: 16,
    delay: "0.5s",
    dur: "2.5s",
  },
  {
    left: "5%",
    top: "45%",
    color: "#F472B6",
    size: 18,
    delay: "1s",
    dur: "3.5s",
  },
  {
    left: "92%",
    top: "42%",
    color: "#60A5FA",
    size: 14,
    delay: "1.5s",
    dur: "2.8s",
  },
  {
    left: "15%",
    top: "75%",
    color: "#34D399",
    size: 16,
    delay: "0.8s",
    dur: "3.2s",
  },
  {
    left: "82%",
    top: "72%",
    color: "#FB923C",
    size: 20,
    delay: "2s",
    dur: "2.6s",
  },
  {
    left: "50%",
    top: "5%",
    color: "#FCD34D",
    size: 14,
    delay: "1.2s",
    dur: "3s",
  },
  {
    left: "25%",
    top: "90%",
    color: "#A78BFA",
    size: 12,
    delay: "2.5s",
    dur: "2.8s",
  },
  {
    left: "70%",
    top: "88%",
    color: "#F472B6",
    size: 14,
    delay: "0.3s",
    dur: "3.4s",
  },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative px-4"
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
      }}
    >
      {/* Inline keyframes */}
      <style>{`
        @keyframes nf-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50%       { opacity: 1;   transform: scale(1.4) rotate(20deg); }
        }
        @keyframes nf-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes nf-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes nf-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-twinkle { animation: nf-twinkle var(--dur, 3s) ease-in-out var(--delay, 0s) infinite; }
        .nf-float   { animation: nf-float 2.8s ease-in-out infinite; }
        .nf-pop     { animation: nf-pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        .nf-fade1   { animation: nf-fadein 0.5s ease 0.2s both; }
        .nf-fade2   { animation: nf-fadein 0.5s ease 0.4s both; }
        .nf-fade3   { animation: nf-fadein 0.5s ease 0.7s both; }
      `}</style>

      {/* Floating stars */}
      {STARS.map((s, i) => (
        <svg
          key={i}
          className="absolute pointer-events-none nf-twinkle"
          style={
            {
              left: s.left,
              top: s.top,
              "--delay": s.delay,
              "--dur": s.dur,
            } as React.CSSProperties
          }
          width={s.size}
          height={s.size}
          viewBox="0 0 20 20"
          fill={s.color}
        >
          <polygon points="10,1 12.3,7.5 19,7.5 13.8,11.8 15.9,18.5 10,14.5 4.1,18.5 6.2,11.8 1,7.5 7.7,7.5" />
        </svg>
      ))}

      <div className="text-center z-10 max-w-lg mx-auto">
        {/* Floating owl */}
        <div className="flex justify-center mb-2 nf-float">
          <OwlMascot />
        </div>

        {/* 404 */}
        <div className="text-8xl font-black text-white mb-2 leading-none nf-pop">
          4<span className="text-yellow-300">0</span>4
        </div>

        <p className="text-white/90 text-xl font-bold mb-8 max-w-sm mx-auto nf-fade1">
          Oops! This page went on a wild adventure!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center nf-fade2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-gray-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all"
          >
            <Home size={20} /> Go Home
          </Link>
          <Link
            href="/student"
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-lg px-8 py-4 rounded-2xl border-2 border-white/50 transition-all"
          >
            <BookOpen size={20} /> My Dashboard
          </Link>
        </div>

        {/* Tip */}
        <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto border border-white/20 flex items-start gap-3 text-left nf-fade3">
          <Compass size={18} className="text-yellow-300 flex-shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm">
            <strong className="text-white">Explorer Tip:</strong> Even the best
            adventurers get lost — that&apos;s how they discover new paths!
          </p>
        </div>
      </div>
    </div>
  );
}
