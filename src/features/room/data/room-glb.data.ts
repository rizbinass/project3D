import type { ActiveExperience, InteractiveObjectId } from "@/core/types/scene.types";

export const roomGlbPath = "/assets/models/room.glb";

export const roomHoverScale = 1.04;

export const socialLinks = {
  github: "https://github.com/",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
} as const;

// Mesh name groups used by material mapping and shadow configuration.
// Only windowGlass is currently overridden; everything else stays as GLB exports.
export const roomMeshNameMap = {
  windowGlass: ["windowGlass"],
} as const;

export const meshInteractionMap: Partial<Record<string, InteractiveObjectId>> = {
  monitor: "monitor",
  pc: "pc",
  keyboard: "keyboard",
  Mouse: "mouse",
  headLamp: "lamp",
  boneLamp: "lamp",
  standLamp: "lamp",
  photoFrame: "photo-frame",
  photo: "photo-frame",
  github: "github",
  githubFrame: "github",
  githubLogo: "github",
  instagram: "instagram",
  instagramFrame: "instagram",
  instagramLogo: "instagram",
  linkedin: "linkedin",
  "Curve.083": "linkedin",
};

export const interactionExperienceMap: Partial<Record<InteractiveObjectId, ActiveExperience>> = {
  monitor: "monitor",
  pc: "monitor",
  keyboard: "monitor",
  mouse: "monitor",
  "photo-frame": "photo",
};

export const monitorSceneSections = [
  "Projects",
  "About Me",
  "Experience",
  "Contact",
  "Resume",
] as const;

export const photoPlaceholders = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
] as const;
