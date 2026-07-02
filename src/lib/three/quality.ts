import type { SceneQualityLevel } from "@/core/constants/scene.constants";

interface QualityProfile {
  dpr: readonly [number, number];
  shadows: boolean;
  postprocessing: boolean;
  textureScale: number;
}

export const qualityProfiles: Record<SceneQualityLevel, QualityProfile> = {
  low: {
    dpr: [0.75, 1],
    shadows: false,
    postprocessing: false,
    textureScale: 0.5,
  },
  medium: {
    dpr: [1, 1.25],
    shadows: true,
    postprocessing: false,
    textureScale: 0.75,
  },
  high: {
    dpr: [1, 1.75],
    shadows: true,
    postprocessing: true,
    textureScale: 1,
  },
  ultra: {
    dpr: [1.5, 2],
    shadows: true,
    postprocessing: true,
    textureScale: 1,
  },
};
