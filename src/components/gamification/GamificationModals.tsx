"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Star, X } from "lucide-react";
import { useGame } from "@/store/game-store";

/* ── Confetti (canvas only — no framer-motion needed) ── */
export function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showConfetti } = useGame() as any;

  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = [
      "#FFE924",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
    ];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    }));

    let animId: number;
    let tick = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
        ctx.restore();
      });
      if (++tick < 180) animId = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [showConfetti]);

  if (!showConfetti) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

/* ── Level-Up Modal ── */
export function LevelUpModal() {
  const { showLevelUp, currentLevel, hideModals } = useGame() as any;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showLevelUp) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [showLevelUp]);

  if (!showLevelUp) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-opacity duration-200 bg-black/60 backdrop-blur-sm ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={hideModals}
    >
      <div
        className={`bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-7xl mb-4 animate-bounce select-none">🌟</div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Level Up!</h2>
        <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xl mb-4 shadow">
          <Star size={18} className="fill-white" /> Level {currentLevel}
        </div>
        <p className="text-gray-500 text-sm mb-6">
          Amazing! You&apos;ve reached a new level. Keep learning to unlock more
          rewards!
        </p>
        <button
          onClick={hideModals}
          className="w-full py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          🚀 Keep Going!
        </button>
      </div>
    </div>
  );
}

/* ── Badge Earned Popup ── */
export function BadgePopup() {
  const { showBadgePopup, lastEarnedBadge, hideModals } = useGame() as any;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showBadgePopup) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [showBadgePopup]);

  if (!showBadgePopup || !lastEarnedBadge) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[1001] bg-white rounded-2xl shadow-xl border-2 border-yellow-200 p-4 max-w-xs transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}`}
    >
      <button
        onClick={hideModals}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={14} />
      </button>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
          {lastEarnedBadge.emoji}
        </div>
        <div>
          <p className="text-xs font-bold text-yellow-600 mb-0.5 flex items-center gap-1">
            <Trophy size={11} /> New Badge Earned!
          </p>
          <p className="font-black text-gray-800 text-sm">
            {lastEarnedBadge.name}
          </p>
          <p className="text-xs text-gray-400">{lastEarnedBadge.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ── XP Float Toast ── */
export function XPToast({ xp, visible }: { xp: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-20 right-8 z-[1002] bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-black text-lg px-4 py-2 rounded-2xl shadow-lg pointer-events-none animate-xp-float">
      +{xp} XP ⚡
    </div>
  );
}

/* ── Root wrapper ── */
export function GamificationModals() {
  return (
    <>
      <ConfettiEffect />
      <LevelUpModal />
      <BadgePopup />
    </>
  );
}
