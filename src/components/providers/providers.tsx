"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/store/auth-store";
import { GameProvider } from "@/store/game-store";
import { AudioProvider } from "@/store/audio-store";

// Lazy-load so gamification modals are NOT bundled into the critical layout chunk
const GamificationModals = dynamic(
  () =>
    import("@/components/gamification/GamificationModals").then((m) => ({
      default: m.GamificationModals,
    })),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameProvider>
          <AudioProvider>
            {children}
            <GamificationModals />
          </AudioProvider>
        </GameProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
