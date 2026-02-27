'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthProvider } from '@/store/auth-store'
import { GameProvider } from '@/store/game-store'
import { AudioProvider } from '@/store/audio-store'
import { GamificationModals } from '@/components/gamification/GamificationModals'

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
      })
  )

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
  )
}