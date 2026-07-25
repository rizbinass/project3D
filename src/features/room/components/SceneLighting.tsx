"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type DirectionalLight, type AmbientLight, type RectAreaLight } from "three";
import { useDayNightStore } from "@/store/useDayNightStore";

export function SceneLighting() {
  const isNight = useDayNightStore((s) => s.isNight);
  const ambientRef = useRef<AmbientLight>(null);
  const directionalRef = useRef<DirectionalLight>(null);
  const rectRef = useRef<RectAreaLight>(null);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-delta * 3);
    const target = isNight ? 0 : 1;

    if (ambientRef.current) {
      const current = ambientRef.current.intensity;
      ambientRef.current.intensity = current + (target * 0.5 - current) * t;
    }

    if (directionalRef.current) {
      const current = directionalRef.current.intensity;
      directionalRef.current.intensity = current + (target * 0.8 - current) * t;
    }

    if (rectRef.current) {
      const current = rectRef.current.intensity;
      rectRef.current.intensity = current + ((isNight ? 5 : 0) - current) * t;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight ref={directionalRef} position={[5, 5, 5]} intensity={0.8} />
      <rectAreaLight
        ref={rectRef}
        position={[0, 2.2, 0.5]}
        width={1.5}
        height={0.1}
        intensity={0}
        color="#ffe4c4"
      />
    </>
  );
}
