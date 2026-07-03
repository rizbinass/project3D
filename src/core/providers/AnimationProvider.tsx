"use client";

import { useEffect, type ReactNode } from "react";
import { DURATIONS } from "@/core/constants/animation.constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

export function AnimationProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const setReducedMotion = useAppStore((state) => state.setReducedMotion);

  useEffect(() => {
    let mounted = true;
    setReducedMotion(reducedMotion);

    const configureGsap = async (): Promise<void> => {
      const { gsap } = await import("gsap");

      if (!mounted) {
        return;
      }

      gsap.defaults({
        duration: reducedMotion ? DURATIONS.fast : DURATIONS.normal,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    void configureGsap();

    return () => {
      mounted = false;
    };
  }, [reducedMotion, setReducedMotion]);

  return children;
}
