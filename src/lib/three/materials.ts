import type { MeshStandardMaterialParameters } from "three";
import { MeshStandardMaterial } from "three";

export const materialDefaults = {
  metalness: 0.35,
  roughness: 0.58,
  emissiveIntensity: 1.2,
} as const;

export const createStandardMaterial = (
  parameters: MeshStandardMaterialParameters,
): MeshStandardMaterial => new MeshStandardMaterial(parameters);
