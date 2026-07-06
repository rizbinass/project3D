import type { CameraPresetId, InteractiveObjectId } from "@/core/types/scene.types";
import type { OverlayId } from "@/store/slices/overlay.slice";

export interface InteractiveObjectDefinition {
  id: InteractiveObjectId;
  overlayId: OverlayId;
  cameraPresetId: CameraPresetId;
  label: string;
}

export const interactiveObjects: Record<InteractiveObjectId, InteractiveObjectDefinition> = {
  monitor: {
    id: "monitor",
    overlayId: "projects",
    cameraPresetId: "focused-projects",
    label: "Projects",
  },
  keyboard: {
    id: "keyboard",
    overlayId: "skills",
    cameraPresetId: "focused-skills",
    label: "Skills",
  },
  laptop: {
    id: "laptop",
    overlayId: "resume",
    cameraPresetId: "focused-resume",
    label: "Resume",
  },
  plant: {
    id: "plant",
    overlayId: "about",
    cameraPresetId: "focused-about",
    label: "About",
  },
  window: {
    id: "window",
    overlayId: "contact",
    cameraPresetId: "focused-contact",
    label: "Contact",
  },
  books: {
    id: "books",
    overlayId: "certificates",
    cameraPresetId: "focused-certificates",
    label: "Certificates",
  },
  clock: {
    id: "clock",
    overlayId: "experience",
    cameraPresetId: "focused-experience",
    label: "Experience",
  },
  pc: {
    id: "pc",
    overlayId: "projects",
    cameraPresetId: "focused-projects",
    label: "Projects",
  },
  mouse: {
    id: "mouse",
    overlayId: "projects",
    cameraPresetId: "focused-projects",
    label: "Projects",
  },
  lamp: {
    id: "lamp",
    overlayId: "about",
    cameraPresetId: "focused-about",
    label: "Lamp",
  },
  "photo-frame": {
    id: "photo-frame",
    overlayId: "about",
    cameraPresetId: "focused-about",
    label: "Photo",
  },
  github: {
    id: "github",
    overlayId: "projects",
    cameraPresetId: "focused-projects",
    label: "GitHub",
  },
  instagram: {
    id: "instagram",
    overlayId: "about",
    cameraPresetId: "focused-about",
    label: "Instagram",
  },
  linkedin: {
    id: "linkedin",
    overlayId: "experience",
    cameraPresetId: "focused-experience",
    label: "LinkedIn",
  },
};
