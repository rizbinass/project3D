"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { Color, Light, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Vector3, type Object3D } from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { getMaterialForMesh } from "@/config/meshColors";
import { useDayNightStore } from "@/store/useDayNightStore";

RectAreaLightUniformsLib.init();

const GLB_PATH = "/assets/models/room2.glb";

const SWITCH_NAMES = new Set(["switchBoard", "switchHolder", "switchLamp"]);
const LERP_SPEED = 0.08;
const DIST_THRESHOLD = 0.05;

function hasMaterialName(obj: Object3D, name: string): boolean {
  if (!(obj instanceof Mesh)) return false;
  const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
  return mats.some((m) => (m as { name?: string }).name === name);
}

function isMonitor(obj: Object3D): boolean {
  const target = obj.name.toLowerCase().includes("monitor") ? obj : obj.parent;
  if (!target) return false;
  if (target.name.toLowerCase().includes("monitor")) return true;
  return hasMaterialName(target, "lcdMonitor");
}

function isGlass(name: string) {
  const lower = name.toLowerCase();
  return lower.includes("glass") || lower.includes("kaca") || lower === "windowblank";
}

export function RoomGLB() {
  const { scene } = useGLTF(GLB_PATH);
  const isNight = useDayNightStore((s) => s.isNight);
  const zoomRef = useRef(false);
  const zoomPos = useRef(new Vector3());
  const zoomLook = useRef(new Vector3());

  const camera = useThree((s) => s.camera);

  function findMaterialIndex(mesh: Mesh, name: string): number {
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (let i = 0; i < mats.length; i++) {
      if (mats[i]?.name === name) return i;
    }
    return -1;
  }

  function replaceMaterialByIndex(mesh: Mesh, index: number, mat: MeshBasicMaterial | MeshStandardMaterial) {
    if (Array.isArray(mesh.material)) {
      mesh.material[index] = mat;
    } else {
      mesh.material = mat;
    }
  }

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
        return;
      }

      if (obj.name === "crayonMug") {
        obj.material = new MeshPhysicalMaterial({
          color: "#e8e4e0",
          roughness: 0.05,
          metalness: 0,
          transmission: 0.85,
          transparent: true,
          opacity: 0.35,
          thickness: 0.2,
          envMapIntensity: 1.5,
          ior: 1.45,
          side: 2,
        });
        return;
      }

      if (obj.name === "beerTop") {
        obj.material = new MeshPhysicalMaterial({
          color: "#d4a84a",
          roughness: 0.1,
          metalness: 0,
          transmission: 0.6,
          transparent: true,
          opacity: 0.6,
          thickness: 0.3,
          envMapIntensity: 1.5,
          ior: 1.5,
          side: 2,
        });
        return;
      }

      if (obj.name === "bottle") {
        obj.material = new MeshPhysicalMaterial({
          color: "#1a3a2a",
          roughness: 0.2,
          metalness: 0,
          transmission: 0.5,
          transparent: true,
          opacity: 0.6,
          thickness: 0.4,
          envMapIntensity: 1.5,
          ior: 1.5,
          side: 2,
        });
        return;
      }

      const lcdIdx = findMaterialIndex(obj, "lcdMonitor");
      if (lcdIdx !== -1) {
        replaceMaterialByIndex(obj, lcdIdx, new MeshBasicMaterial({ color: "#ffffff", side: 2 }));
      }

      const colorRule = getMaterialForMesh(obj.name);
      if (colorRule) {
        obj.material = new MeshStandardMaterial({ ...colorRule, side: 2 });
        return;
      }

      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      if (mats[0] && "side" in mats[0]) {
        (mats[0] as { side: number }).side = 2;
      }
    });

    return cloned;
  }, [scene]);

  useFrame((state) => {
    const { camera, controls } = state;
    if (!controls || !zoomRef.current) return;
    const ctrls = controls as unknown as { enabled: boolean; minDistance: number; target: Vector3; update: () => void };

    ctrls.enabled = false;
    ctrls.minDistance = 0;
    camera.position.lerp(zoomPos.current, LERP_SPEED);
    ctrls.target.lerp(zoomLook.current, LERP_SPEED);

    if (camera.position.distanceTo(zoomPos.current) < DIST_THRESHOLD) {
      camera.position.copy(zoomPos.current);
      ctrls.target.copy(zoomLook.current);
      ctrls.enabled = true;
      ctrls.update();
      zoomRef.current = false;
    }
  });

  const handleClick = useCallback((e: { stopPropagation: () => void; object: Object3D }) => {
    e.stopPropagation();
    console.log("clicked:", e.object.name, "| parent:", e.object.parent?.name);
    const obj = e.object;

    if (SWITCH_NAMES.has(obj.name)) {
      useDayNightStore.getState().toggle();
      return;
    }

    if (isMonitor(obj)) {
      const worldPos = new Vector3();
      obj.getWorldPosition(worldPos);
      zoomLook.current.copy(worldPos);
      const dir = new Vector3().subVectors(camera.position, worldPos).normalize();
      zoomPos.current.copy(worldPos).add(dir.multiplyScalar(0.8));
      zoomRef.current = true;
    }
  }, []);

  return (
    <>
      <primitive object={preparedScene} onClick={handleClick} />
      <rectAreaLight
        args={["#bdab44", 1.2, 0.6, 0.5]}
        position={[1.15, 1.396, 0.862]}
        rotation-x={-Math.PI / 2}
        intensity={isNight ? 1.2 : 0}
        visible={isNight}
      />
    </>
  );
}

useGLTF.preload(GLB_PATH);
