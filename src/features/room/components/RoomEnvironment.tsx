"use client";

import { ContactShadows, Environment, Sky, Stars } from "@react-three/drei";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomEnvironment() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const timeMode = useSceneStore((state) => state.timeMode);
  const shadowsEnabled = qualityLevel !== "low";
  const isNight = timeMode === "night";

  return (
    <>
      <Environment
        preset={isNight ? "night" : "city"}
        environmentIntensity={isNight ? 0.22 : 0.38}
      />
      <Sky
        distance={450000}
        sunPosition={isNight ? [0.25, 0.08, -1] : [2, 1, 0.5]}
        inclination={isNight ? 0.49 : 0.56}
        azimuth={0.18}
        mieCoefficient={isNight ? 0.002 : 0.005}
        mieDirectionalG={0.8}
        rayleigh={isNight ? 0.35 : 2.1}
        turbidity={isNight ? 1.4 : 6}
      />
      {isNight ? (
        <Stars radius={80} depth={60} count={2000} factor={4} saturation={0} fade speed={0.25} />
      ) : null}
      {shadowsEnabled ? (
        <ContactShadows
          opacity={isNight ? 0.22 : 0.34}
          scale={8.4}
          blur={2.6}
          far={4.8}
          resolution={qualityLevel === "medium" ? 512 : 1024}
          position={[0, 0.012, 0]}
        />
      ) : null}
    </>
  );
}
