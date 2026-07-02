"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomParticles() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const count = qualityLevel === "low" ? 120 : qualityLevel === "medium" ? 220 : 360;
  const pointsRef = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 8;
      values[index * 3 + 1] = Math.random() * 3.2 + 0.25;
      values[index * 3 + 2] = (Math.random() - 0.5) * 6.2;
    }

    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.025;
    pointsRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.018;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#bfefff"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.34}
      />
    </Points>
  );
}
