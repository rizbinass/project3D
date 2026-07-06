"use client";

import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { qualityProfiles } from "@/lib/three/quality";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomPostProcessing() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const timeMode = useSceneStore((state) => state.timeMode);
  const qualityProfile = qualityProfiles[qualityLevel];
  const bloomIntensity = timeMode === "night" ? 0.35 : 0.18;

  if (!qualityProfile.postprocessing) {
    return null;
  }

  return (
    <EffectComposer multisampling={qualityLevel === "ultra" ? 2 : 0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <BrightnessContrast brightness={0.01} contrast={0.02} />
      <HueSaturation saturation={0.015} />
      <Vignette eskil={false} offset={0.4} darkness={0.18} />
    </EffectComposer>
  );
}
