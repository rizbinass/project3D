export type RoomMaterialKey =
  | "wall"
  | "floor"
  | "ceiling"
  | "wood"
  | "metal"
  | "plastic"
  | "glass"
  | "fabric"
  | "rubber"
  | "led"
  | "screen"
  | "plant"
  | "ceramic";

export interface RoomMaterialPreset {
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  transmission?: number;
}

export const roomMaterialPresets: Record<RoomMaterialKey, RoomMaterialPreset> = {
  wall: { color: "#111820", roughness: 0.88, metalness: 0.02 },
  floor: { color: "#16120f", roughness: 0.58, metalness: 0.05 },
  ceiling: { color: "#090d12", roughness: 0.9, metalness: 0.02 },
  wood: { color: "#7b5a42", roughness: 0.48, metalness: 0.03 },
  metal: { color: "#8a96a3", roughness: 0.34, metalness: 0.78 },
  plastic: { color: "#10151d", roughness: 0.62, metalness: 0.08 },
  glass: {
    color: "#bceeff",
    roughness: 0.08,
    metalness: 0,
    transparent: true,
    opacity: 0.36,
    transmission: 0.32,
  },
  fabric: { color: "#20242d", roughness: 0.92, metalness: 0 },
  rubber: { color: "#07090c", roughness: 0.78, metalness: 0.02 },
  led: {
    color: "#77e4ff",
    roughness: 0.24,
    metalness: 0,
    emissive: "#77e4ff",
    emissiveIntensity: 2.4,
  },
  screen: {
    color: "#07131c",
    roughness: 0.18,
    metalness: 0,
    emissive: "#5bdcff",
    emissiveIntensity: 0.62,
  },
  plant: { color: "#2f8f5b", roughness: 0.78, metalness: 0 },
  ceramic: { color: "#e4e7ec", roughness: 0.5, metalness: 0 },
};
