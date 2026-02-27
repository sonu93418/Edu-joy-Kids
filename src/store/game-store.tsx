"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createContext, useContext, ReactNode } from "react";

export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earnedAt?: Date;
}

interface Streaks {
  current: number;
  best: number;
  lastActiveDate: string | null;
}

interface GameState {
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  streaks: Streaks;
  badges: Badge[];
  achievements: Array<{
    id: string;
    progress: number;
    maxProgress: number;
    isCompleted: boolean;
  }>;
  avatar: { character: string; accessories: string[] };
  selectedTheme: string;
  showConfetti: boolean;
  showLevelUp: boolean;
  showBadgePopup: boolean;
  lastEarnedBadge: Badge | null;
  addXP: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  unlockBadge: (badge: Badge) => void;
  updateStreak: (newStreak: number) => void;
  setAvatar: (character: string) => void;
  setTheme: (themeId: string) => void;
  showConfettiEffect: () => void;
  hideModals: () => void;
  resetDailyProgress: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      currentLevel: 1,
      xpToNextLevel: 200,
      coins: 50,
      gems: 0,
      streaks: { current: 0, best: 0, lastActiveDate: null },
      badges: [],
      achievements: [],
      avatar: { character: "�", accessories: [] },
      selectedTheme: "default",
      showConfetti: false,
      showLevelUp: false,
      showBadgePopup: false,
      lastEarnedBadge: null,

      addXP: (amount, _reason) => {
        const s = get();
        const newTotalXP = s.totalXP + amount;
        let newLevel = s.currentLevel;
        let didLevelUp = false;
        while (newTotalXP >= newLevel * 200) {
          newLevel++;
          didLevelUp = true;
        }
        set({
          totalXP: newTotalXP,
          currentLevel: newLevel,
          xpToNextLevel: newLevel * 200,
          ...(didLevelUp
            ? {
                showLevelUp: true,
                showConfetti: true,
                coins: s.coins + newLevel * 10,
              }
            : {}),
        });
      },

      addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),

      spendCoins: (amount) => {
        if (get().coins >= amount) {
          set((s) => ({ coins: s.coins - amount }));
          return true;
        }
        return false;
      },

      unlockBadge: (badge) => {
        set((s) => ({
          badges: [...s.badges, { ...badge, earnedAt: new Date() }],
          lastEarnedBadge: badge,
          showBadgePopup: true,
          showConfetti: true,
        }));
        setTimeout(() => set({ showBadgePopup: false }), 4000);
      },

      updateStreak: (n) =>
        set((s) => ({
          streaks: {
            current: n,
            best: Math.max(s.streaks.best, n),
            lastActiveDate: new Date().toISOString().split("T")[0],
          },
        })),
      setAvatar: (character) =>
        set((s) => ({ avatar: { ...s.avatar, character } })),
      setTheme: (themeId) => set({ selectedTheme: themeId }),
      showConfettiEffect: () => {
        set({ showConfetti: true });
        setTimeout(() => set({ showConfetti: false }), 4000);
      },
      hideModals: () =>
        set({ showLevelUp: false, showBadgePopup: false, showConfetti: false }),
      resetDailyProgress: () => {},
    }),
    {
      name: "edujoy-game-store",
      partialize: (s) => ({
        totalXP: s.totalXP,
        currentLevel: s.currentLevel,
        xpToNextLevel: s.xpToNextLevel,
        coins: s.coins,
        gems: s.gems,
        streaks: s.streaks,
        badges: s.badges,
        achievements: s.achievements,
        avatar: s.avatar,
        selectedTheme: s.selectedTheme,
      }),
    },
  ),
);

const GameContext = createContext<GameState | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const gameStore = useGameStore();
  return (
    <GameContext.Provider value={gameStore}>{children}</GameContext.Provider>
  );
};

export const useGame = (): GameState => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};

export const calculateLevel = (totalXP: number) =>
  Math.floor(totalXP / 200) + 1;
export const calculateXPForLevel = (level: number) => level * 200;
export const calculateProgress = (totalXP: number, level: number) =>
  Math.min(100, ((totalXP - (level - 1) * 200) / 200) * 100);
