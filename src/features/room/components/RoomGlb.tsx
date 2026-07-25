"use client";

import { useGLTF } from "@react-three/drei";
import { useCallback, useMemo } from "react";
import { Box3, Color, Light, Mesh, MeshPhysicalMaterial, Vector3, type Object3D } from "three";
import { useDayNightStore } from "@/store/useDayNightStore";

const GLB_PATH = "/assets/models/room2.glb";

const SWITCH_NAMES = new Set(["switchBoard", "switchHolder", "switchLamp"]);

function isGlass(name: string) {
  const lower = name.toLowerCase();
  return lower.includes("glass") || lower.includes("kaca") || lower === "windowblank";
}

export function RoomGLB() {
  const { scene } = useGLTF(GLB_PATH);

  const preparedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.rotation.y = Math.PI;
    cloned.updateMatrixWorld(true);

    cloned.traverse((obj) => {
      if (obj instanceof Light) {
        if (obj.name === "roomLight") {
          (obj as { intensity: number }).intensity = 0;
          return;
        }
      }

      if (!(obj instanceof Mesh)) return;

      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.frustumCulled = false;

      if (obj.name === "doorBlank" || obj.name === "windowBlank") {
        obj.visible = false;
        return;
      }

      if (isGlass(obj.name)) {
        obj.material = new MeshPhysicalMaterial({
          color: "#d8e8f4",
          roughness: 0.02,
          metalness: 0,
          transmission: 0.95,
          transparent: true,
          opacity: 0.3,
          thickness: 0.4,
          envMapIntensity: 2.0,
          ior: 1.52,
          specularIntensity: 1.0,
          specularColor: new Color("#c0d8f0"),
          side: 2,
        });
      } else {
        const mat = obj.material;
        if (mat && "side" in mat) {
          (mat as { side: number }).side = 2;
        }
      }
    });

    return cloned;
  }, [scene]);

  const handleClick = useCallback((e: { stopPropagation: () => void; object: Object3D }) => {
    e.stopPropagation();
    const obj = e.object;

    if (SWITCH_NAMES.has(obj.name)) {
      useDayNightStore.getState().toggle();
      return;
    }

    const bbox = new Box3().setFromObject(obj);
    const size = bbox.getSize(new Vector3());
    console.log(
      "Clicked:",
      obj.name || obj.type,
      "| BBox:",
      size.toArray().map((v) => v.toFixed(3)),
      "| Type:",
      obj.type,
    );
  }, []);

  return <primitive object={preparedScene} onClick={handleClick} />;
}

useGLTF.preload(GLB_PATH);
