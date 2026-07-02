"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const useCameraIntro = (enabled: boolean): boolean => {
  const reducedMotion = usePrefersReducedMotion();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      setComplete(true);
      return;
    }

    const timeout = window.setTimeout(() => setComplete(true), 5200);
    return () => window.clearTimeout(timeout);
  }, [enabled, reducedMotion]);

  return complete;
};
