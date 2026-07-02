import type { SceneQualityLevel } from "@/core/constants/scene.constants";

export interface PerformanceSlice {
  averageFps: number;
  targetDpr: number;
  postprocessingEnabled: boolean;
  shadowQuality: SceneQualityLevel;
  textureQuality: SceneQualityLevel;
  lodLevel: SceneQualityLevel;
  setAverageFps: (averageFps: number) => void;
  setTargetDpr: (targetDpr: number) => void;
  setPostprocessingEnabled: (postprocessingEnabled: boolean) => void;
  setShadowQuality: (shadowQuality: SceneQualityLevel) => void;
  setTextureQuality: (textureQuality: SceneQualityLevel) => void;
  setLodLevel: (lodLevel: SceneQualityLevel) => void;
}

export const createPerformanceSlice = (
  set: (partial: Partial<PerformanceSlice>) => void,
): PerformanceSlice => ({
  averageFps: 60,
  targetDpr: 1.5,
  postprocessingEnabled: true,
  shadowQuality: "high",
  textureQuality: "high",
  lodLevel: "high",
  setAverageFps: (averageFps) => set({ averageFps }),
  setTargetDpr: (targetDpr) => set({ targetDpr }),
  setPostprocessingEnabled: (postprocessingEnabled) => set({ postprocessingEnabled }),
  setShadowQuality: (shadowQuality) => set({ shadowQuality }),
  setTextureQuality: (textureQuality) => set({ textureQuality }),
  setLodLevel: (lodLevel) => set({ lodLevel }),
});
