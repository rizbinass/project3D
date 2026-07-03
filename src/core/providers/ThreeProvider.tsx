"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { performanceConfig } from "@/core/config/performance.config";

interface ThreeRuntimeConfig {
  dpr: readonly [number, number];
  shadows: boolean;
  frameloop: "always" | "demand" | "never";
  gl: {
    antialias: boolean;
    alpha: boolean;
    powerPreference: "default" | "high-performance" | "low-power";
  };
}

const ThreeContext = createContext<ThreeRuntimeConfig | null>(null);

export function ThreeProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ThreeRuntimeConfig>(
    () => ({
      dpr: performanceConfig.defaultDpr,
      shadows: true,
      frameloop: "always",
      gl: {
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      },
    }),
    [],
  );

  return <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>;
}

export const useThreeRuntimeConfig = (): ThreeRuntimeConfig => {
  const context = useContext(ThreeContext);

  if (!context) {
    throw new Error("useThreeRuntimeConfig must be used within ThreeProvider.");
  }

  return context;
};
