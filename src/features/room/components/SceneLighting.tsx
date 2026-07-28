"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type DirectionalLight, type AmbientLight } from "three";
import { useDayNightStore } from "@/store/useDayNightStore";

export function SceneLighting() {
  const isNight = useDayNightStore((s) => s.isNight);
  const ambientRef = useRef<AmbientLight>(null);
  const directionalRef = useRef<DirectionalLight>(null);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-delta * 3);

    if (ambientRef.current) {
      const current = ambientRef.current.intensity;
      const target = isNight ? 0.05 : 0.5;
      ambientRef.current.intensity = current + (target - current) * t;
    }

    if (directionalRef.current) {
      const current = directionalRef.current.intensity;
      const target = isNight ? 0.08 : 0.8;
      directionalRef.current.intensity = current + (target - current) * t;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight ref={directionalRef} position={[5, 5, 5]} intensity={0.8} />
    </>
  );
}
