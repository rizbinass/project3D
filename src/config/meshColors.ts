import type { MeshStandardMaterialParameters } from "three";

export interface MeshColorRule {
  match: RegExp;
  material: MeshStandardMaterialParameters;
}

export const meshColors: MeshColorRule[] = [
  { match: /^pot$/, material: { color: "#2a3a4a", roughness: 0.6, metalness: 0.1 } },
  { match: /^mug$/, material: { color: "#e8e8e8", roughness: 0.4, metalness: 0 } },
  { match: /^box$/, material: { color: "#786044", roughness: 0.8, metalness: 0 } },
];

export function getMaterialForMesh(name: string): MeshStandardMaterialParameters | null {
  for (const rule of meshColors) {
    if (rule.match.test(name)) {
      return rule.material;
    }
  }
  return null;
}
