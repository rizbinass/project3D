import { DEFAULT_SCENE_QUALITY } from "@/core/constants/scene.constants";
import type {
  ActiveExperience,
  CameraState,
  InteractiveObjectId,
  TimeMode,
} from "@/core/types/scene.types";
import type { SceneQualityLevel } from "@/core/constants/scene.constants";

export interface SceneSlice {
  focusedObjectId: InteractiveObjectId | null;
  qualityLevel: SceneQualityLevel;
  timeMode: TimeMode;
  activeExperience: ActiveExperience | null;
  previousCameraState: CameraState | null;
  cameraTargetState: CameraState | null;
  setFocusedObjectId: (focusedObjectId: InteractiveObjectId | null) => void;
  setQualityLevel: (qualityLevel: SceneQualityLevel) => void;
  setTimeMode: (timeMode: TimeMode) => void;
  toggleTimeMode: () => void;
  setActiveExperience: (activeExperience: ActiveExperience | null) => void;
  setPreviousCameraState: (previousCameraState: CameraState | null) => void;
  setCameraTargetState: (cameraTargetState: CameraState | null) => void;
}

type SceneSliceSetter = (
  partial: Partial<SceneSlice> | ((state: SceneSlice) => Partial<SceneSlice>),
) => void;

export const createSceneSlice = (set: SceneSliceSetter): SceneSlice => ({
  focusedObjectId: null,
  qualityLevel: DEFAULT_SCENE_QUALITY,
  timeMode: "day",
  activeExperience: null,
  previousCameraState: null,
  cameraTargetState: null,
  setFocusedObjectId: (focusedObjectId) => set({ focusedObjectId }),
  setQualityLevel: (qualityLevel) => set({ qualityLevel }),
  setTimeMode: (timeMode) => set({ timeMode }),
  toggleTimeMode: () => set((state) => ({ timeMode: state.timeMode === "day" ? "night" : "day" })),
  setActiveExperience: (activeExperience) => set({ activeExperience }),
  setPreviousCameraState: (previousCameraState) => set({ previousCameraState }),
  setCameraTargetState: (cameraTargetState) => set({ cameraTargetState }),
});
