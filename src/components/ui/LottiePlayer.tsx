'use client';

import { useEffect, useRef, useState } from 'react';

interface LottiePlayerProps {
  /** Path to the Lottie JSON animation file under /public */
  src: string;
  /** Width of the animation container */
  width?: number | string;
  /** Height of the animation container */
  height?: number | string;
  /** Whether the animation loops */
  loop?: boolean;
  /** Whether to autoplay on mount */
  autoplay?: boolean;
  /** Speed multiplier (1 = normal) */
  speed?: number;
  /** Called when animation completes a loop */
  onComplete?: () => void;
  className?: string;
}

/**
 * Lightweight Lottie player that lazy-loads lottie-web only in the browser.
 * Usage: <LottiePlayer src="/animations/star.json" width={120} height={120} />
 *
 * Place Lottie JSON files in /public/animations/
 */
export default function LottiePlayer({
  src,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  speed = 1,
  onComplete,
  className,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<{ destroy: () => void; setSpeed: (s: number) => void } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    import('lottie-web')
      .then((mod) => {
        if (cancelled || !containerRef.current) return;

        const lottie = mod.default;

        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          path: src,
        });

        anim.setSpeed(speed);
        if (onComplete) anim.addEventListener('complete', onComplete);

        animRef.current = anim as { destroy: () => void; setSpeed: (s: number) => void };
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [src, loop, autoplay, speed, onComplete]);

  if (error) {
    // Graceful fallback — just empty space so layout doesn't break
    return <div style={{ width, height }} className={className} aria-hidden />;
  }

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className={className}
      aria-hidden
    />
  );
}

/**
 * Pre-wired animations for common EduJoy moments.
 * Assumes JSON files exist at /public/animations/<name>.json
 */
export function CelebrationLottie({ size = 200 }: { size?: number }) {
  return <LottiePlayer src="/animations/celebration.json" width={size} height={size} loop={false} />;
}

export function StarLottie({ size = 80 }: { size?: number }) {
  return <LottiePlayer src="/animations/star.json" width={size} height={size} />;
}

export function LoadingLottie({ size = 120 }: { size?: number }) {
  return <LottiePlayer src="/animations/loading.json" width={size} height={size} />;
}

export function OwlLottie({ size = 160 }: { size?: number }) {
  return <LottiePlayer src="/animations/owl.json" width={size} height={size} />;
}
