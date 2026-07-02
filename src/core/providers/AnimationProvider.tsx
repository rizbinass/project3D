"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { DURATIONS } from "@/core/constants/animation.constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

export function AnimationProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const setReducedMotion = useAppStore((state) => state.setReducedMotion);

  useEffect(() => {
    setReducedMotion(reducedMotion);
    gsap.defaults({
      duration: reducedMotion ? DURATIONS.fast : DURATIONS.normal,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [reducedMotion, setReducedMotion]);

  return children;
}
