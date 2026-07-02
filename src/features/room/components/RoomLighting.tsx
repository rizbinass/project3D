"use client";

import { lightingPresets } from "@/features/room/data/lighting-presets.data";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomLighting() {
  const sceneStatus = useSceneStore((state) => state.sceneStatus);
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const preset = sceneStatus === "booting" ? lightingPresets.entry : lightingPresets.idle;
  const shadowMapSize = qualityLevel === "ultra" ? 2048 : qualityLevel === "high" ? 1024 : 512;
  const shadowsEnabled = qualityLevel === "high" || qualityLevel === "ultra";

  return (
    <group>
      <ambientLight intensity={preset.ambient} color="#b6d7ff" />
      <directionalLight
        castShadow={shadowsEnabled}
        color="#d8ecff"
        intensity={preset.key}
        position={[-3.5, 5.4, 4.4]}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-bias={-0.00008}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={12}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight color="#77e4ff" intensity={preset.fill} position={[3.6, 2.8, 2.6]} />
      <rectAreaLight
        color="#77e4ff"
        intensity={preset.practical}
        width={5.2}
        height={0.18}
        position={[0, 2.95, -3.45]}
      />
      <pointLight color="#ffdf6e" intensity={0.55} distance={4.5} position={[-3.6, 2.35, -1.4]} />
    </group>
  );
}
