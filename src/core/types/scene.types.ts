export type SceneStatus = "idle" | "booting" | "ready" | "transitioning" | "suspended";

export type TimeMode = "day" | "night";

export type ActiveExperience = "monitor" | "photo";

export interface CameraState {
  position: readonly [number, number, number];
  target: readonly [number, number, number];
  fov: number;
}

export type InteractiveObjectId =
  | "monitor"
  | "keyboard"
  | "plant"
  | "window"
  | "books"
  | "clock"
  | "pc"
  | "mouse"
  | "lamp"
  | "photo-frame"
  | "github"
  | "instagram"
  | "linkedin";
