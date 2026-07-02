"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomEnvironment() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const shadowsEnabled = qualityLevel !== "low";

  return (
    <>
      <Environment preset="city" environmentIntensity={0.38} />
      {shadowsEnabled && (
        <ContactShadows
          opacity={0.34}
          scale={8.4}
          blur={2.6}
          far={4.8}
          resolution={qualityLevel === "medium" ? 512 : 1024}
          position={[0, 0.012, 0]}
        />
      )}
    </>
  );
}
