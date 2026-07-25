"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Color } from "three";
import { useDayNightStore } from "@/store/useDayNightStore";

const DAY_BG = new Color("#87CEEB");
const NIGHT_BG = new Color("#080c12");
const _lerped = new Color();

export function Background() {
  const { scene } = useThree();
  const isNight = useDayNightStore((s) => s.isNight);

  const target = useMemo(() => (isNight ? NIGHT_BG : DAY_BG), [isNight]);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-delta * 3);
    _lerped.copy(scene.background as Color).lerp(target, t);
    (scene.background as Color).copy(_lerped);
  });

  return null;
}
