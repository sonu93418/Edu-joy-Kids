"use client";

import { create } from "zustand";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { Howl, Howler } from "howler";

interface AudioState {
  // Settings
  isMuted: boolean;
  volume: number;
  musicVolume: number;
  sfxVolume: number;

  // Current playing
  currentMusic: Howl | null;
  currentMusicName: string | null;

  // Audio instances
  sounds: Map<string, Howl>;

  // Actions
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  playSound: (
    soundName: string,
    options?: { volume?: number; loop?: boolean },
  ) => void;
  playMusic: (
    musicName: string,
    options?: { volume?: number; loop?: boolean },
  ) => void;
  stopMusic: () => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
  preloadSounds: () => void;
}

// Sound library - these would be actual audio files in production
const SOUND_LIBRARY = {
  // UI Sounds
  click: "/sounds/ui/click.mp3",
  hover: "/sounds/ui/hover.mp3",
  success: "/sounds/ui/success.mp3",
  error: "/sounds/ui/error.mp3",
  notification: "/sounds/ui/notification.mp3",

  // Game Sounds
  xp_gain: "/sounds/game/xp_gain.mp3",
  level_up: "/sounds/game/level_up.mp3",
  coin_collect: "/sounds/game/coin_collect.mp3",
  badge_unlock: "/sounds/game/badge_unlock.mp3",
  correct_answer: "/sounds/game/correct_answer.mp3",
  wrong_answer: "/sounds/game/wrong_answer.mp3",
  lesson_complete: "/sounds/game/lesson_complete.mp3",

  // Character Sounds
  mascot_cheer: "/sounds/character/mascot_cheer.mp3",
  mascot_encourage: "/sounds/character/mascot_encourage.mp3",

  // Ambient Music
  menu_music: "/sounds/music/menu_theme.mp3",
  learning_music: "/sounds/music/learning_theme.mp3",
  game_music: "/sounds/music/game_theme.mp3",

  // Educational Sounds
  letter_sound_a: "/sounds/education/letter_a.mp3",
  letter_sound_b: "/sounds/education/letter_b.mp3",
  number_1: "/sounds/education/number_1.mp3",
  number_2: "/sounds/education/number_2.mp3",

  // Fun Effects
  applause: "/sounds/effects/applause.mp3",
  celebration: "/sounds/effects/celebration.mp3",
  magic_sparkle: "/sounds/effects/magic_sparkle.mp3",
  pop: "/sounds/effects/pop.mp3",
};

const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  isMuted: false,
  volume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  currentMusic: null,
  currentMusicName: null,
  sounds: new Map(),

  // Actions
  setMuted: (muted: boolean) => {
    Howler.mute(muted);
    set({ isMuted: muted });
  },

  setVolume: (volume: number) => {
    Howler.volume(volume);
    set({ volume });
  },

  setMusicVolume: (volume: number) => {
    const currentMusic = get().currentMusic;
    if (currentMusic) {
      currentMusic.volume(volume);
    }
    set({ musicVolume: volume });
  },

  setSfxVolume: (volume: number) => {
    set({ sfxVolume: volume });
  },

  playSound: (soundName: string, options = {}) => {
    const { isMuted, sfxVolume, sounds } = get();

    if (isMuted) return;

    let sound = sounds.get(soundName);

    if (!sound) {
      const soundUrl = SOUND_LIBRARY[soundName as keyof typeof SOUND_LIBRARY];
      if (!soundUrl) {
        console.warn(`Sound not found: ${soundName}`);
        return;
      }

      sound = new Howl({
        src: [soundUrl],
        volume: (options.volume || 1) * sfxVolume,
        loop: options.loop || false,
        preload: true,
      });

      sounds.set(soundName, sound);
      set({ sounds: new Map(sounds) });
    }

    sound.volume((options.volume || 1) * sfxVolume);
    sound.play();
  },

  playMusic: (musicName: string, options = {}) => {
    const { isMuted, musicVolume, currentMusic, sounds } = get();

    if (isMuted) return;

    // Stop current music if playing
    if (currentMusic) {
      currentMusic.stop();
    }

    let music = sounds.get(musicName);

    if (!music) {
      const musicUrl = SOUND_LIBRARY[musicName as keyof typeof SOUND_LIBRARY];
      if (!musicUrl) {
        console.warn(`Music not found: ${musicName}`);
        return;
      }

      music = new Howl({
        src: [musicUrl],
        volume: (options.volume || 1) * musicVolume,
        loop: options.loop !== false, // Default to loop for music
        preload: true,
      });

      sounds.set(musicName, music);
    }

    music.volume((options.volume || 1) * musicVolume);
    music.play();

    set({
      currentMusic: music,
      currentMusicName: musicName,
      sounds: new Map(sounds),
    });
  },

  stopMusic: () => {
    const currentMusic = get().currentMusic;
    if (currentMusic) {
      currentMusic.stop();
      set({ currentMusic: null, currentMusicName: null });
    }
  },

  pauseMusic: () => {
    const currentMusic = get().currentMusic;
    if (currentMusic) {
      currentMusic.pause();
    }
  },

  resumeMusic: () => {
    const currentMusic = get().currentMusic;
    if (currentMusic) {
      currentMusic.play();
    }
  },

  preloadSounds: () => {
    const { sounds } = get();

    // Preload common sounds
    const commonSounds = [
      "click",
      "hover",
      "success",
      "error",
      "xp_gain",
      "level_up",
      "coin_collect",
      "correct_answer",
      "wrong_answer",
    ];

    commonSounds.forEach((soundName) => {
      if (!sounds.has(soundName)) {
        const soundUrl = SOUND_LIBRARY[soundName as keyof typeof SOUND_LIBRARY];
        if (soundUrl) {
          const sound = new Howl({
            src: [soundUrl],
            preload: true,
          });
          sounds.set(soundName, sound);
        }
      }
    });

    set({ sounds: new Map(sounds) });
  },
}));

// Audio context for providers
const AudioContext = createContext<AudioState | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioStore = useAudioStore();

  // Preload common sounds once on mount only.
  // Using getState() gives us a stable reference that won't trigger re-runs.
  useEffect(() => {
    useAudioStore.getState().preloadSounds();
  }, []);

  return (
    <AudioContext.Provider value={audioStore}>{children}</AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

// Convenient hooks for common audio actions
export const useSoundEffect = () => {
  const { playSound } = useAudio();

  const playClick = () => playSound("click");
  const playHover = () => playSound("hover", { volume: 0.3 });
  const playSuccess = () => playSound("success");
  const playError = () => playSound("error");
  const playXPGain = () => playSound("xp_gain");
  const playLevelUp = () => playSound("level_up");
  const playCoinCollect = () => playSound("coin_collect");
  const playCorrectAnswer = () => playSound("correct_answer");
  const playWrongAnswer = () => playSound("wrong_answer");

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playXPGain,
    playLevelUp,
    playCoinCollect,
    playCorrectAnswer,
    playWrongAnswer,
  };
};

export const useBackgroundMusic = () => {
  const { playMusic, stopMusic, pauseMusic, resumeMusic } = useAudio();

  const playMenuMusic = () =>
    playMusic("menu_music", { loop: true, volume: 0.3 });
  const playLearningMusic = () =>
    playMusic("learning_music", { loop: true, volume: 0.2 });
  const playGameMusic = () =>
    playMusic("game_music", { loop: true, volume: 0.4 });

  return {
    playMenuMusic,
    playLearningMusic,
    playGameMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
  };
};
