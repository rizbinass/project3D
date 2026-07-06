import type { ActiveExperience, InteractiveObjectId } from "@/core/types/scene.types";

export const roomGlbPath = "/assets/models/room.glb";

export const roomHoverScale = 1.04;

export const socialLinks = {
  github: "https://github.com/",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
} as const;

export const roomMeshNameMap = {
  wall: ["wall"],
  floor: ["floor"],
  desk: ["table", "Base", "Top", "Feet", "Drawer.top", "Drawer.mid", "Drawer.bottom"],
  chair: ["Chair"],
  monitor: ["monitor"],
  pc: ["pc"],
  keyboard: ["keyboard"],
  mouse: ["Mouse"],
  lamp: ["headLamp", "boneLamp", "standLamp"],
  mirrorFrame: ["mirrorFrame"],
  mirror: ["mirror"],
  github: ["github", "githubFrame", "githubLogo"],
  instagram: ["instagram", "instagramFrame", "instagramLogo"],
  linkedin: ["linkedin", "linkedinFrame", "Curve.083"],
  door: ["doorBlock", "doorFrame", "doorHolder"],
  windowFrame: ["windowFrame"],
  windowGlass: ["windowGlass"],
  plantPot: ["ashtray"],
  plantLeaves: ["cigarrete"],
  photoFrame: ["photoFrame"],
  photo: ["photo"],
  logo: [
    "letterR",
    "letterI2",
    "letterZ",
    "letterB",
    "letterI1",
    "letterN",
    "letterS1",
    "letterA",
    "letterS2",
  ],
  actionFigure: ["actionFigure"],
  books: ["papan"],
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
