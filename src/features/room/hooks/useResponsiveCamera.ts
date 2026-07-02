"use client";

import { useMemo } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export interface ResponsiveCameraConfig {
  fovOffset: number;
  distanceOffset: number;
  maxPolarAngle: number;
  minDistance: number;
  maxDistance: number;
  rotateSpeed: number;
}

export const useResponsiveCamera = (): ResponsiveCameraConfig => {
  const isLarge = useBreakpoint("lg");
  const isUltraWide = useBreakpoint("3xl");

  return useMemo(
    () => ({
      fovOffset: isLarge ? (isUltraWide ? -2 : 0) : 5,
      distanceOffset: isLarge ? 0 : 1.3,
      maxPolarAngle: isLarge ? Math.PI / 2.12 : Math.PI / 2.28,
      minDistance: isLarge ? 3.2 : 4.2,
      maxDistance: isLarge ? 8.4 : 9.4,
      rotateSpeed: isLarge ? 0.34 : 0.24,
    }),
    [isLarge, isUltraWide],
  );
};
