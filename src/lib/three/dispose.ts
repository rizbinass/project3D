import type { Material, Object3D, Texture } from "three";
import { BufferGeometry } from "three";

const disposeMaterial = (material: Material): void => {
  Object.values(material).forEach((value) => {
    if (value && typeof value === "object" && "isTexture" in value) {
      (value as Texture).dispose();
    }
  });

  material.dispose();
};

export const disposeObject3D = (object: Object3D): void => {
  object.traverse((child) => {
    if ("geometry" in child && child.geometry instanceof BufferGeometry) {
      child.geometry.dispose();
    }

    if ("material" in child) {
      const material = child.material as Material | Material[] | undefined;

      if (Array.isArray(material)) {
        material.forEach(disposeMaterial);
        return;
      }

      if (material) {
        disposeMaterial(material);
      }
    }
  });
};
