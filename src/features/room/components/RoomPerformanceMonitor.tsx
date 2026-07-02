"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useSceneStore } from "@/store/useSceneStore";
import { usePerformanceStore } from "@/store/usePerformanceStore";

export function RoomPerformanceMonitor() {
  const setQualityLevel = useSceneStore((state) => state.setQualityLevel);
  const setAverageFps = usePerformanceStore((state) => state.setAverageFps);

  return (
    <>
      <AdaptiveDpr pixelated />
      <PerformanceMonitor
        onIncline={({ fps }) => {
          setAverageFps(fps);
          if (fps > 54) {
            setQualityLevel("high");
          }
        }}
        onDecline={({ fps }) => {
          setAverageFps(fps);
          if (fps < 38) {
            setQualityLevel("medium");
          }
        }}
        onFallback={() => setQualityLevel("low")}
      />
    </>
  );
}
