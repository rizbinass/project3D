export const SCENE_QUALITY_LEVELS = ["low", "medium", "high", "ultra"] as const;

export const DEFAULT_SCENE_QUALITY = "high";
export const DEFAULT_CAMERA_PRESET_ID = "entry";

export type SceneQualityLevel = (typeof SCENE_QUALITY_LEVELS)[number];
