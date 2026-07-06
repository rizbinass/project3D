"use client";

import { useEffect } from "react";
import type { SceneQualityLevel } from "@/core/constants/scene.constants";
import { useSceneStore } from "@/store/useSceneStore";

const getInitialQuality = (): SceneQualityLevel => {
  if (typeof navigator === "undefined") {
    return "high";
  }

  const memory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const touch = matchMedia("(pointer: coarse)").matches;

  if (memory <= 4 || cores <= 4 || touch) {
    return "medium";
  }

  return "high";
};

export const useSceneQuality = (): SceneQualityLevel => {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const setQualityLevel = useSceneStore((state) => state.setQualityLevel);

  useEffect(() => {
    const quality = getInitialQuality();
    setQualityLevel(quality);
  }, [setQualityLevel]);

  return qualityLevel;
};
