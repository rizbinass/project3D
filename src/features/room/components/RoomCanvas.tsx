"use client";

import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { useThreeRuntimeConfig } from "@/core/providers/ThreeProvider";
import { qualityProfiles } from "@/lib/three/quality";
import { useSceneStore } from "@/store/useSceneStore";
import { RoomExperience } from "./RoomExperience";

export function RoomCanvas() {
  const runtimeConfig = useThreeRuntimeConfig();
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const qualityProfile = qualityProfiles[qualityLevel];

  return (
    <Canvas
      className="h-full w-full"
      dpr={[qualityProfile.dpr[0], qualityProfile.dpr[1]]}
      frameloop={runtimeConfig.frameloop}
      shadows={runtimeConfig.shadows && qualityProfile.shadows}
      gl={{
        ...runtimeConfig.gl,
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.06;
        gl.shadowMap.enabled = runtimeConfig.shadows && qualityProfile.shadows;
      }}
    >
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 7.5, 15]} />
      <RoomExperience />
    </Canvas>
  );
}
