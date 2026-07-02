"use client";

import { useEffect, useMemo } from "react";
import type { MeshStandardMaterial } from "three";
import { createStandardMaterial } from "@/lib/three/materials";

export interface MaterialPreset {
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

export type MaterialLibrary<TKey extends string = string> = Record<TKey, MeshStandardMaterial>;

export const useMaterialLibrary = <TKey extends string>(
  presets: Record<TKey, MaterialPreset>,
): MaterialLibrary<TKey> => {
  const materials = useMemo(() => {
    const entries = Object.entries(presets).map(([key, preset]) => [
      key,
      createStandardMaterial({
        color: (preset as MaterialPreset).color,
        roughness: (preset as MaterialPreset).roughness,
        metalness: (preset as MaterialPreset).metalness,
        emissive: (preset as MaterialPreset).emissive,
        emissiveIntensity: (preset as MaterialPreset).emissiveIntensity,
        transparent: (preset as MaterialPreset).transparent,
        opacity: (preset as MaterialPreset).opacity,
      }),
    ]);

    return Object.fromEntries(entries) as MaterialLibrary<TKey>;
  }, [presets]);

  useEffect(
    () => () => {
      Object.values(materials).forEach((material) => {
        (material as MeshStandardMaterial).dispose();
      });
    },
    [materials],
  );

  return materials;
};
