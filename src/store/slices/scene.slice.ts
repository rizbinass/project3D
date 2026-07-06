import { DEFAULT_CAMERA_PRESET_ID, DEFAULT_SCENE_QUALITY } from "@/core/constants/scene.constants";
import type {
  ActiveExperience,
  CameraState,
  CameraPresetId,
  InteractiveObjectId,
  RoomZone,
  SceneStatus,
  TimeMode,
} from "@/core/types/scene.types";
import type { SceneQualityLevel } from "@/core/constants/scene.constants";

export interface SceneSlice {
  sceneStatus: SceneStatus;
  activeZone: RoomZone;
  focusedObjectId: InteractiveObjectId | null;
  cameraPresetId: CameraPresetId;
  qualityLevel: SceneQualityLevel;
  isTransitioningCamera: boolean;
  timeMode: TimeMode;
  activeExperience: ActiveExperience | null;
  previousCameraState: CameraState | null;
  cameraTargetState: CameraState | null;
  preservePreviousCameraState: boolean;
  setSceneStatus: (sceneStatus: SceneStatus) => void;
  setActiveZone: (activeZone: RoomZone) => void;
  setFocusedObjectId: (focusedObjectId: InteractiveObjectId | null) => void;
  setCameraPresetId: (cameraPresetId: CameraPresetId) => void;
  setQualityLevel: (qualityLevel: SceneQualityLevel) => void;
  setTransitioningCamera: (isTransitioningCamera: boolean) => void;
  setTimeMode: (timeMode: TimeMode) => void;
  toggleTimeMode: () => void;
  setActiveExperience: (activeExperience: ActiveExperience | null) => void;
  setPreviousCameraState: (previousCameraState: CameraState | null) => void;
  setCameraTargetState: (
    cameraTargetState: CameraState | null,
    options?: { preservePrevious?: boolean },
  ) => void;
}

type SceneSliceSetter = (
  partial: Partial<SceneSlice> | ((state: SceneSlice) => Partial<SceneSlice>),
) => void;

export const createSceneSlice = (set: SceneSliceSetter): SceneSlice => ({
  sceneStatus: "idle",
  activeZone: "entry",
  focusedObjectId: null,
  cameraPresetId: DEFAULT_CAMERA_PRESET_ID,
  qualityLevel: DEFAULT_SCENE_QUALITY,
  isTransitioningCamera: false,
  timeMode: "day",
  activeExperience: null,
  previousCameraState: null,
  cameraTargetState: null,
  preservePreviousCameraState: false,
  setSceneStatus: (sceneStatus) => set({ sceneStatus }),
  setActiveZone: (activeZone) => set({ activeZone }),
  setFocusedObjectId: (focusedObjectId) => set({ focusedObjectId }),
  setCameraPresetId: (cameraPresetId) => set({ cameraPresetId }),
  setQualityLevel: (qualityLevel) => set({ qualityLevel }),
  setTransitioningCamera: (isTransitioningCamera) => set({ isTransitioningCamera }),
  setTimeMode: (timeMode) => set({ timeMode }),
  toggleTimeMode: () => set((state) => ({ timeMode: state.timeMode === "day" ? "night" : "day" })),
  setActiveExperience: (activeExperience) => set({ activeExperience }),
  setPreviousCameraState: (previousCameraState) => set({ previousCameraState }),
  setCameraTargetState: (cameraTargetState, options) =>
    set({
      cameraTargetState,
      preservePreviousCameraState: options?.preservePrevious ?? false,
    }),
});
