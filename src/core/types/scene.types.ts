import type { SceneQualityLevel } from "@/core/constants/scene.constants";

export type SceneStatus = "idle" | "booting" | "ready" | "transitioning" | "suspended";

export type RoomZone = "entry" | "projects" | "skills" | "about" | "contact" | "resume";

export type InteractiveObjectId =
  "monitor" | "keyboard" | "laptop" | "plant" | "window" | "books" | "clock";

export type CameraPresetId =
  | "entry"
  | "idle"
  | "focused-projects"
  | "focused-skills"
  | "focused-about"
  | "focused-contact"
  | "focused-resume"
  | "focused-certificates"
  | "focused-experience";

export interface SceneStateSnapshot {
  status: SceneStatus;
  activeZone: RoomZone;
  focusedObjectId: InteractiveObjectId | null;
  cameraPresetId: CameraPresetId;
  qualityLevel: SceneQualityLevel;
}
