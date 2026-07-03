"use client";

import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let cleanup: (() => void) | null = null;
    let mounted = true;
    let animationFrame = 0;

    const startSmoothScroll = async (): Promise<void> => {
      const { default: Lenis } = await import("lenis");

      if (!mounted) {
        return;
      }

      const lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      const raf = (time: number): void => {
        lenis.raf(time);
        animationFrame = window.requestAnimationFrame(raf);
      };

      animationFrame = window.requestAnimationFrame(raf);
      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        lenis.destroy();
      };
    };

    void startSmoothScroll();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [reducedMotion]);

  return children;
}
