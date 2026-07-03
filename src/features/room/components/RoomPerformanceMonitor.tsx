"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useCallback, useRef } from "react";
import { useSceneStore } from "@/store/useSceneStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";

const fpsStoreUpdateThreshold = 2;
const qualityRecoveryFps = 56;
const qualityDeclineFps = 40;

export function RoomPerformanceMonitor() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const setQualityLevel = useSceneStore((state) => state.setQualityLevel);
  const setAverageFps = usePerformanceStore((state) => state.setAverageFps);
  const lastStoredFpsRef = useRef(0);

  const updateAverageFps = useCallback(
    (fps: number) => {
      if (Math.abs(fps - lastStoredFpsRef.current) < fpsStoreUpdateThreshold) {
        return;
      }

      lastStoredFpsRef.current = fps;
      setAverageFps(fps);
    },
    [setAverageFps],
  );

  return (
    <>
      <AdaptiveDpr pixelated={false} />
      <PerformanceMonitor
        onIncline={({ fps }) => {
          updateAverageFps(fps);
          if (fps > qualityRecoveryFps && qualityLevel === "medium") {
            setQualityLevel("high");
          }
        }}
        onDecline={({ fps }) => {
          updateAverageFps(fps);
          if (fps < qualityDeclineFps && qualityLevel === "high") {
            setQualityLevel("medium");
          }
        }}
        onFallback={() => setQualityLevel("low")}
      />
    </>
  );
}
