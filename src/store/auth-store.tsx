"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createContext, useContext, ReactNode } from "react";

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: "student" | "parent" | "teacher" | "admin" | "school_admin";
  isVerified: boolean;
  avatar?: string;
  subscription?: {
    plan: string;
    status: string;
  };
}

interface Student {
  _id: string;
  studentName: string;
  grade: string;
  avatar?: { character: string; accessories?: string[] };
  gamification: {
    level: number;
    totalXP: number;
    coins: number;
    streakDays: number;
  };
}

interface AuthState {
  user: User | null;
  student: Student | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (user: User, accessToken: string, student?: Student) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateStudent: (updates: Partial<Student>) => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      student: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, accessToken, student) => {
        set({
          user,
          student,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          student: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      updateStudent: (updates) => {
        const currentStudent = get().student;
        if (currentStudent) {
          set({ student: { ...currentStudent, ...updates } });
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "edujoykids-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        student: state.student,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Auth context for providers
const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore();

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// API helper hooks
export const useAuthAPI = () => {
  const { accessToken, logout } = useAuth();

  const apiCall = async (url: string, options: RequestInit = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"}/api${url}`,
      {
        ...options,
        headers,
      },
    );

    if (response.status === 401) {
      logout();
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }));
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  };

  return { apiCall };
};
