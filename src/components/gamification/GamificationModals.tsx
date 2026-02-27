'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/store/game-store';

// Confetti component using canvas
export function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showConfetti } = useGame();

  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number; rotation: number; rotSpeed: number }> = [];
    const colors = ['#FFE924', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
      });
    }

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
      tick++;
      if (tick < 180) animId = requestAnimationFrame(animate);
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
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

// Level Up Modal
export function LevelUpModal() {
  const { showLevelUp, currentLevel, hideModals } = useGame();

  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          onClick={hideModals}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1.2, 1.1, 1.1, 1] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-8xl mb-4"
            >
              🌟
            </motion.div>
            <h2 className="text-3xl font-black text-gray-800 mb-1">Level Up!</h2>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-edujoy-primary-400 to-fun-purple text-white px-6 py-3 rounded-2xl font-black text-2xl mb-4 shadow-lg">
              Level {currentLevel}
            </div>
            <p className="text-gray-500 mb-6">Amazing! You&apos;ve reached a new level. Keep learning to unlock more rewards!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={hideModals}
              className="btn-fun w-full py-3 font-black"
            >
              🚀 Keep Going!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Badge Earned Popup — small toast-style
export function BadgePopup() {
  const { showBadgePopup, lastEarnedBadge, hideModals } = useGame();

  return (
    <AnimatePresence>
      {showBadgePopup && lastEarnedBadge && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[1001] bg-white rounded-2xl shadow-fun-lg border-2 border-yellow-200 p-4 max-w-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-fun-orange flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
              {lastEarnedBadge.emoji}
            </div>
            <div>
              <p className="text-xs font-bold text-yellow-600 mb-0.5">🏆 New Badge Earned!</p>
              <p className="font-black text-gray-800">{lastEarnedBadge.name}</p>
              <p className="text-xs text-gray-400">{lastEarnedBadge.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// XP Toast — floating XP gain indicator
export function XPToast({ xp, visible }: { xp: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -60, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed bottom-20 right-8 z-[1002] bg-gradient-to-r from-fun-orange to-yellow-400 text-white font-black text-lg px-4 py-2 rounded-2xl shadow-lg pointer-events-none"
        >
          +{xp} XP ⚡
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global Gamification Modals Wrapper
export function GamificationModals() {
  return (
    <>
      <ConfettiEffect />
      <LevelUpModal />
      <BadgePopup />
    </>
  );
}
