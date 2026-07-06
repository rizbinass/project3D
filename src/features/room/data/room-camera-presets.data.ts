import type { CameraState, InteractiveObjectId } from "@/core/types/scene.types";

export const roomFocusPresets: Partial<Record<InteractiveObjectId, CameraState>> = {
  monitor: {
    position: [-0.02, 2.16, -0.98],
    target: [-0.03, 1.9, 1.82],
    fov: 22,
  },
  pc: {
    position: [-0.02, 2.16, -0.98],
    target: [-0.03, 1.9, 1.82],
    fov: 22,
  },
  keyboard: {
    position: [-0.02, 2.16, -0.98],
    target: [-0.03, 1.9, 1.82],
    fov: 22,
  },
  mouse: {
    position: [-0.02, 2.16, -0.98],
    target: [-0.03, 1.9, 1.82],
    fov: 22,
  },
  lamp: {
    position: [1.26, 2.46, -1.08],
    target: [1.56, 1.92, 1.4],
    fov: 30,
  },
  "photo-frame": {
    position: [-2.86, 2.14, -1.34],
    target: [-2.9, 1.72, 3.05],
    fov: 26,
  },
};
