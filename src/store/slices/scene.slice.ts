import { DEFAULT_CAMERA_PRESET_ID, DEFAULT_SCENE_QUALITY } from "@/core/constants/scene.constants";
import type {
  CameraPresetId,
  InteractiveObjectId,
  RoomZone,
  SceneStatus,
} from "@/core/types/scene.types";
import type { SceneQualityLevel } from "@/core/constants/scene.constants";

export interface SceneSlice {
  sceneStatus: SceneStatus;
  activeZone: RoomZone;
  focusedObjectId: InteractiveObjectId | null;
  cameraPresetId: CameraPresetId;
  qualityLevel: SceneQualityLevel;
  isTransitioningCamera: boolean;
  setSceneStatus: (sceneStatus: SceneStatus) => void;
  setActiveZone: (activeZone: RoomZone) => void;
  setFocusedObjectId: (focusedObjectId: InteractiveObjectId | null) => void;
  setCameraPresetId: (cameraPresetId: CameraPresetId) => void;
  setQualityLevel: (qualityLevel: SceneQualityLevel) => void;
  setTransitioningCamera: (isTransitioningCamera: boolean) => void;
}

export const createSceneSlice = (set: (partial: Partial<SceneSlice>) => void): SceneSlice => ({
  sceneStatus: "idle",
  activeZone: "entry",
  focusedObjectId: null,
  cameraPresetId: DEFAULT_CAMERA_PRESET_ID,
  qualityLevel: DEFAULT_SCENE_QUALITY,
  isTransitioningCamera: false,
  setSceneStatus: (sceneStatus) => set({ sceneStatus }),
  setActiveZone: (activeZone) => set({ activeZone }),
  setFocusedObjectId: (focusedObjectId) => set({ focusedObjectId }),
  setCameraPresetId: (cameraPresetId) => set({ cameraPresetId }),
  setQualityLevel: (qualityLevel) => set({ qualityLevel }),
  setTransitioningCamera: (isTransitioningCamera) => set({ isTransitioningCamera }),
});
