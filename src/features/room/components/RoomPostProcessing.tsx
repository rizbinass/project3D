"use client";

import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { useMemo } from "react";
import { Vector2 } from "three";
import { qualityProfiles } from "@/lib/three/quality";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomPostProcessing() {
  const qualityLevel = useSceneStore((state) => state.qualityLevel);
  const qualityProfile = qualityProfiles[qualityLevel];
  const chromaticOffset = useMemo(() => new Vector2(0.00045, 0.00025), []);
  const cinematicEffectsEnabled = qualityLevel === "ultra";

  if (!qualityProfile.postprocessing) {
    return null;
  }

  return (
    <EffectComposer
      multisampling={qualityLevel === "ultra" ? 2 : 0}
      enableNormalPass={cinematicEffectsEnabled}
    >
      <Bloom
        intensity={qualityLevel === "ultra" ? 0.32 : 0.24}
        luminanceThreshold={0.42}
        luminanceSmoothing={0.82}
        mipmapBlur
      />
      {cinematicEffectsEnabled ? (
        <DepthOfField focusDistance={0.032} focalLength={0.025} bokehScale={1.45} />
      ) : (
        <></>
      )}
      <BrightnessContrast brightness={0.015} contrast={0.055} />
      <HueSaturation saturation={0.035} />
      {cinematicEffectsEnabled ? (
        <ChromaticAberration offset={chromaticOffset} radialModulation modulationOffset={0.15} />
      ) : (
        <></>
      )}
      <Vignette eskil={false} offset={0.28} darkness={0.42} />
    </EffectComposer>
  );
}
