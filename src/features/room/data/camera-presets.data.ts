import type { CameraPresetId } from "@/core/types/scene.types";

export interface CameraPreset {
  id: CameraPresetId;
  position: readonly [number, number, number];
  target: readonly [number, number, number];
  fov: number;
  duration: number;
}

export const cameraPresets: Record<CameraPresetId, CameraPreset> = {
  entry: {
    id: "entry",
    position: [0, 2.2, 9.4],
    target: [0, 1.45, 0],
    fov: 42,
    duration: 4.8,
  },
  idle: {
    id: "idle",
    position: [3.8, 2.35, 6.4],
    target: [0, 1.28, -0.35],
    fov: 38,
    duration: 2.2,
  },
  "focused-projects": {
    id: "focused-projects",
    position: [-3.2, 2.1, 3.2],
    target: [-2.9, 1.45, -1.6],
    fov: 34,
    duration: 1.6,
  },
  "focused-skills": {
    id: "focused-skills",
    position: [2.8, 2.0, 3.1],
    target: [2.35, 1.3, -1.7],
    fov: 34,
    duration: 1.6,
  },
  "focused-about": {
    id: "focused-about",
    position: [-1.8, 2.2, 2.4],
    target: [-0.8, 1.55, -2.3],
    fov: 36,
    duration: 1.8,
  },
  "focused-contact": {
    id: "focused-contact",
    position: [2.6, 1.8, 2.1],
    target: [2.85, 1.05, -1.2],
    fov: 32,
    duration: 1.7,
  },
  "focused-resume": {
    id: "focused-resume",
    position: [0.5, 1.9, 2.2],
    target: [0.1, 1.08, -0.55],
    fov: 32,
    duration: 1.5,
  },
  "focused-photography": {
    id: "focused-photography",
    position: [-3.1, 1.65, 2.25],
    target: [-3.25, 0.72, 1.95],
    fov: 32,
    duration: 1.5,
  },
  "focused-certificates": {
    id: "focused-certificates",
    position: [-3.25, 2.18, 1.05],
    target: [-3.25, 2.05, -3.25],
    fov: 35,
    duration: 1.6,
  },
  "focused-experience": {
    id: "focused-experience",
    position: [2.45, 2.25, 1.7],
    target: [3.1, 2.38, -3.52],
    fov: 30,
    duration: 1.5,
  },
  "focused-music": {
    id: "focused-music",
    position: [-2.45, 1.55, 2.1],
    target: [-2.55, 1.06, -1.9],
    fov: 32,
    duration: 1.5,
  },
};

export const introCameraPreset = {
  position: [0, 2.6, 11.8] as const,
  target: [0, 1.5, -0.4] as const,
  fov: 48,
};
