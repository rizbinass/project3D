"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  PointLight,
  RectAreaLight,
} from "three";
import { useSceneStore } from "@/store/useSceneStore";

const dayAmbientColor = new Color("#e8e0d4");
const nightAmbientColor = new Color("#1a2540");
const dayHemiSky = new Color("#c8dff0");
const dayHemiGround = new Color("#8a7a6a");
const nightHemiSky = new Color("#0d1a30");
const nightHemiGround = new Color("#1a1410");
const daySunColor = new Color("#fff4e0");
const nightMoonColor = new Color("#8eb2ff");
const dayFill = new Color("#b8d0e8");
const nightFill = new Color("#2a5090");
const daySunPosition: [number, number, number] = [3.5, 5.4, -4.4];
const nightMoonPosition: [number, number, number] = [-4.6, 4.1, 2.8];

export function RoomLighting() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const timeMode = useSceneStore((state) => state.timeMode);
  const shadowMapSize = qualityLevel === "ultra" ? 2048 : qualityLevel === "high" ? 1024 : 512;
  const shadowsEnabled = qualityLevel === "high" || qualityLevel === "ultra";
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const isNight = timeMode === "night";
    const t = 1 - Math.exp(-delta * 3);

    const ambient = group.getObjectByName("ambient-light") as AmbientLight | null;
    const hemi = group.getObjectByName("hemi-light") as HemisphereLight | null;
    const sun = group.getObjectByName("sun-light") as DirectionalLight | null;
    const fill = group.getObjectByName("fill-light") as DirectionalLight | null;
    const strip = group.getObjectByName("strip-light") as RectAreaLight | null;
    const practical = group.getObjectByName("practical-light") as PointLight | null;
    const rim = group.getObjectByName("rim-light") as PointLight | null;
    const windowLight = group.getObjectByName("window-light") as DirectionalLight | null;

    if (ambient) {
      ambient.intensity = MathUtils.damp(ambient.intensity, isNight ? 0.15 : 0.6, 3, delta);
      ambient.color.lerp(isNight ? nightAmbientColor : dayAmbientColor, t);
    }

    if (hemi) {
      hemi.intensity = MathUtils.damp(hemi.intensity, isNight ? 0.25 : 0.8, 3, delta);
      hemi.color.lerp(isNight ? nightHemiSky : dayHemiSky, t);
      hemi.groundColor.lerp(isNight ? nightHemiGround : dayHemiGround, t);
    }

    if (sun) {
      sun.intensity = MathUtils.damp(sun.intensity, isNight ? 0.6 : 3.2, 3, delta);
      sun.color.lerp(isNight ? nightMoonColor : daySunColor, t);
      const [x, y, z] = isNight ? nightMoonPosition : daySunPosition;
      sun.position.set(
        MathUtils.damp(sun.position.x, x, 3, delta),
        MathUtils.damp(sun.position.y, y, 3, delta),
        MathUtils.damp(sun.position.z, z, 3, delta),
      );
    }

    if (fill) {
      fill.intensity = MathUtils.damp(fill.intensity, isNight ? 0.7 : 1.6, 3.2, delta);
      fill.color.lerp(isNight ? nightFill : dayFill, t);
    }

    if (strip) {
      strip.intensity = MathUtils.damp(strip.intensity, isNight ? 3.5 : 0.4, 3.4, delta);
    }

    if (practical) {
      practical.intensity = MathUtils.damp(practical.intensity, isNight ? 2.2 : 0.15, 3.4, delta);
    }

    if (rim) {
      rim.intensity = MathUtils.damp(rim.intensity, isNight ? 0.8 : 0.3, 3, delta);
    }

    if (windowLight) {
      windowLight.intensity = MathUtils.damp(windowLight.intensity, isNight ? 0.4 : 2.0, 3, delta);
      windowLight.color.lerp(isNight ? nightMoonColor : new Color("#e0f0ff"), t);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight name="ambient-light" intensity={0.6} color={dayAmbientColor} />
      <hemisphereLight name="hemi-light" args={[dayHemiSky, dayHemiGround, 0.8]} />
      <directionalLight
        name="sun-light"
        castShadow={shadowsEnabled}
        color={daySunColor}
        intensity={3.2}
        position={daySunPosition}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-bias={-0.0002}
        shadow-normalBias={0.04}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight
        name="fill-light"
        color={dayFill}
        intensity={1.6}
        position={[-3.6, 2.8, -2.6]}
      />
      <rectAreaLight
        name="strip-light"
        color="#e8e0f0"
        intensity={0.4}
        width={5.2}
        height={0.18}
        position={[0, 2.95, 3.45]}
      />
      <pointLight
        name="practical-light"
        color="#ffe8b0"
        intensity={0.15}
        distance={6}
        position={[1.55, 2.22, 1.48]}
      />
      <pointLight
        name="rim-light"
        color="#d0e0ff"
        intensity={0.3}
        distance={8}
        position={[-2.5, 3.5, -1.5]}
      />
      <directionalLight
        name="window-light"
        color="#e0f0ff"
        intensity={2.0}
        position={[3.8, 2.5, 2.0]}
        castShadow={false}
      />
    </group>
  );
}
