"use client";

import { Clone, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import {
  Box3,
  Color,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import type { CameraState } from "@/core/types/scene.types";
import { createStandardMaterial } from "@/lib/three/materials";
import {
  setFittedRoomCameraState,
  setRoomSceneRoot,
} from "@/features/room/data/room-runtime-camera.data";
import {
  meshInteractionMap,
  roomGlbPath,
  roomHoverScale,
  roomMeshNameMap,
} from "@/features/room/data/room-glb.data";
import { useRoomObjectInteraction } from "@/features/room/hooks/useRoomObjectInteraction";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useSceneStore } from "@/store/useSceneStore";

const placeholderPhotoTexture = new TextureLoader().load(
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  (texture) => {
    texture.colorSpace = SRGBColorSpace;
  },
);
placeholderPhotoTexture.colorSpace = SRGBColorSpace;

const cyanGlow = "#53d7ff";
const fitDirection = new Vector3(0.52, 0.34, 1);

const createRoomMaterials = () => ({
  wall: createStandardMaterial({ color: "#f5f0e8", roughness: 0.92, metalness: 0.02 }),
  floor: createStandardMaterial({ color: "#c9a97a", roughness: 0.55, metalness: 0.06 }),
  desk: createStandardMaterial({ color: "#5a3921", roughness: 0.48, metalness: 0.1 }),
  door: createStandardMaterial({ color: "#6b4a30", roughness: 0.5, metalness: 0.08 }),
  chairLeather: createStandardMaterial({ color: "#1a1a1e", roughness: 0.68, metalness: 0.02 }),
  brushedAluminum: createStandardMaterial({ color: "#d0d4d8", roughness: 0.18, metalness: 0.95 }),
  matteBlack: createStandardMaterial({ color: "#1c1c20", roughness: 0.72, metalness: 0.2 }),
  brass: createStandardMaterial({ color: "#c49a42", roughness: 0.25, metalness: 0.98 }),
  glass: new MeshPhysicalMaterial({
    color: "#d8e8f4",
    roughness: 0.02,
    metalness: 0,
    transmission: 0.97,
    transparent: true,
    opacity: 0.25,
    thickness: 0.4,
    envMapIntensity: 2.0,
    ior: 1.52,
    specularIntensity: 1.0,
    specularColor: new Color("#c0d8f0"),
    side: 2,
  }),
  plantPot: createStandardMaterial({ color: "#f0ece4", roughness: 0.2, metalness: 0.02 }),
  leaves: createStandardMaterial({ color: "#4a7a42", roughness: 0.82, metalness: 0.01 }),
  bookMuted: createStandardMaterial({ color: "#8a7a72", roughness: 0.78, metalness: 0.03 }),
  logoBody: createStandardMaterial({ color: "#12141a", roughness: 0.3, metalness: 0.18 }),
  screenOff: createStandardMaterial({
    color: "#0c1018",
    roughness: 0.22,
    metalness: 0.08,
    emissive: "#0a1420",
    emissiveIntensity: 0.06,
  }),
  rgb: createStandardMaterial({
    color: "#142838",
    roughness: 0.18,
    metalness: 0.15,
    emissive: "#42d6ff",
    emissiveIntensity: 0.08,
  }),
});

function forEachMesh(root: Object3D, visit: (mesh: Mesh) => void) {
  root.traverse((object) => {
    if (object instanceof Mesh) {
      visit(object);
    }
  });
}

function nameMatches(name: string, candidates: readonly string[]) {
  const lower = name.toLowerCase();
  return candidates.some((candidate) => candidate.toLowerCase() === lower);
}

function mapMaterialKey(name: string) {
  if (nameMatches(name, roomMeshNameMap.wall)) return "wall";
  if (nameMatches(name, roomMeshNameMap.floor)) return "floor";
  if (nameMatches(name, roomMeshNameMap.desk)) return "desk";
  if (nameMatches(name, roomMeshNameMap.chair)) return "chairLeather";
  if (nameMatches(name, roomMeshNameMap.monitor)) return "screenOff";
  if (nameMatches(name, roomMeshNameMap.pc)) return "matteBlack";
  if (nameMatches(name, roomMeshNameMap.keyboard) || nameMatches(name, roomMeshNameMap.mouse))
    return "rgb";
  if (nameMatches(name, roomMeshNameMap.lamp)) return "brass";
  if (nameMatches(name, roomMeshNameMap.door)) return "door";
  if (nameMatches(name, roomMeshNameMap.windowFrame)) return "brushedAluminum";
  if (nameMatches(name, roomMeshNameMap.windowGlass)) return "glass";
  if (nameMatches(name, roomMeshNameMap.plantPot)) return "plantPot";
  if (nameMatches(name, roomMeshNameMap.plantLeaves)) return "leaves";
  if (nameMatches(name, roomMeshNameMap.books)) return "bookMuted";
  if (nameMatches(name, roomMeshNameMap.logo)) return "logoBody";
  if (nameMatches(name, roomMeshNameMap.photoFrame)) return "desk";
  if (nameMatches(name, roomMeshNameMap.photo)) return "screenOff";
  if (
    nameMatches(name, roomMeshNameMap.github) ||
    nameMatches(name, roomMeshNameMap.instagram) ||
    nameMatches(name, roomMeshNameMap.linkedin)
  ) {
    return "matteBlack";
  }
  return null;
}

function computeFittedCameraState(root: Object3D): CameraState {
  const bounds = new Box3().setFromObject(root);
  const center = bounds.getCenter(new Vector3());
  const size = bounds.getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const radius = size.length() * 0.35;
  const direction = fitDirection.clone().normalize();
  const position = center.clone().add(direction.multiplyScalar(radius * 2.1 + maxDim * 0.6));

  position.y = Math.max(center.y + size.y * 0.22, bounds.min.y + size.y * 0.62);
  position.z = Math.max(position.z, bounds.max.z + size.z * 0.15);

  const target = center.clone();
  target.y = bounds.min.y + size.y * 0.44;

  return {
    position: [position.x, position.y, position.z],
    target: [target.x, target.y, target.z],
    fov: 42,
  };
}

export function RoomGlb() {
  const hoveredObjectId = useInteractionStore((state) => state.hoveredObjectId);
  const activeExperience = useSceneStore((state) => state.activeExperience);
  const timeMode = useSceneStore((state) => state.timeMode);
  const focusedObjectId = useSceneStore((state) => state.focusedObjectId);
  const { focusObject, setHoveredObjectId, clearHover } = useRoomObjectInteraction();
  const { scene } = useGLTF(roomGlbPath);
  const materials = useMemo(() => createRoomMaterials(), []);
  const interactiveNames = useMemo(() => new Set(Object.keys(meshInteractionMap)), []);
  const isPointerOverInteractive = hoveredObjectId !== null;

  useCursor(isPointerOverInteractive);

  const preparedScene = useMemo(() => {
    const cloned = scene.clone(true);

    // The GLB has every node rotated 180° around Y (quaternion [0,-1,0,0]).
    // This flips the room so the camera sees the exterior wall.
    // Rotate back by PI around Y so the interior workspace faces +Z (toward camera).
    cloned.rotation.y = Math.PI;
    cloned.updateMatrixWorld(true);

    forEachMesh(cloned, (mesh) => {
      mesh.castShadow = !nameMatches(mesh.name, roomMeshNameMap.windowGlass);
      mesh.receiveShadow = true;
      mesh.frustumCulled = true;

      if (mesh.name === "photo") {
        mesh.material = new MeshStandardMaterial({
          map: placeholderPhotoTexture,
          roughness: 0.88,
          metalness: 0,
        });
        return;
      }

      const materialKey = mapMaterialKey(mesh.name);
      if (!materialKey) {
        return;
      }

      if (mesh.name === "actionFigure") {
        return;
      }

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((part, index) => {
          if (mesh.name === "pc" && index === 1) {
            return materials.rgb.clone();
          }
          if (mesh.name === "keyboard" && index >= 3) {
            return materials.rgb.clone();
          }
          return materials[materialKey].clone();
        });
      } else if (mesh.name === "mirror") {
        mesh.visible = false;
      } else {
        mesh.material = materials[materialKey].clone();
      }
    });

    return cloned;
  }, [materials, scene]);

  const fittedCameraState = useMemo(() => computeFittedCameraState(preparedScene), [preparedScene]);

  const animatedInteractiveMeshes = useMemo(() => {
    const meshes: Mesh[] = [];

    forEachMesh(preparedScene, (mesh) => {
      if (mesh.userData.interactive && mesh.userData.objectId) {
        meshes.push(mesh);
      }
    });

    return meshes;
  }, [preparedScene]);

  const mirrorData = useMemo(() => {
    const mirror = preparedScene.getObjectByName("mirror");

    if (!(mirror instanceof Mesh)) {
      return null;
    }

    mirror.updateWorldMatrix(true, false);
    const size = new Vector3();
    const center = new Vector3();
    new Box3().setFromObject(mirror).getSize(size);
    new Box3().setFromObject(mirror).getCenter(center);

    return {
      position: center.toArray() as [number, number, number],
      scale: [Math.max(size.x, 0.35), Math.max(size.y, 0.35), 1] as [number, number, number],
      rotation: [mirror.rotation.x, mirror.rotation.y, mirror.rotation.z] as [
        number,
        number,
        number,
      ],
    };
  }, [preparedScene]);

  const handlePointer = useCallback(
    (object: Object3D, entering: boolean) => {
      const target = object.name in meshInteractionMap ? meshInteractionMap[object.name] : null;

      if (!target) {
        return;
      }

      if (entering) {
        setHoveredObjectId(target);
      } else {
        clearHover();
      }
    },
    [clearHover, setHoveredObjectId],
  );

  useEffect(() => {
    setFittedRoomCameraState(fittedCameraState);
    setRoomSceneRoot(preparedScene);

    forEachMesh(preparedScene, (mesh) => {
      if (!interactiveNames.has(mesh.name)) {
        return;
      }

      mesh.userData.interactive = true;
      mesh.userData.objectId = meshInteractionMap[mesh.name];
    });
  }, [fittedCameraState, interactiveNames, preparedScene]);

  useFrame((_, delta) => {
    const dampAlpha = 1 - Math.exp(-delta * 10);

    animatedInteractiveMeshes.forEach((mesh) => {
      if (!mesh.userData.interactive || !mesh.userData.objectId) {
        return;
      }

      const isHovered = hoveredObjectId === mesh.userData.objectId;
      const isFocused = focusedObjectId === mesh.userData.objectId;
      const active = isHovered || isFocused;
      const targetScale = active ? roomHoverScale : 1;
      mesh.scale.lerp(new Vector3(targetScale, targetScale, targetScale), dampAlpha);

      // Subtle emissive highlight on hover for interactive objects
      const applyEmissive = (
        mat: MeshStandardMaterial,
        baseIntensity: number,
        hoverBoost: number,
      ) => {
        if (!mat.emissive) return;
        const target = active ? baseIntensity + hoverBoost : baseIntensity;
        mat.emissiveIntensity = MathUtils.damp(mat.emissiveIntensity, target, 6, delta);
      };

      if (mesh.name === "monitor" && mesh.material instanceof MeshStandardMaterial) {
        const base = activeExperience === "monitor" || timeMode === "night" ? 1.25 : 0.06;
        applyEmissive(mesh.material, base, 0.3);
      }

      if (
        (mesh.name === "keyboard" || mesh.name === "Mouse" || mesh.name === "pc") &&
        Array.isArray(mesh.material)
      ) {
        mesh.material.forEach((part) => {
          if (!(part instanceof MeshStandardMaterial)) return;
          const rgbActive = timeMode === "night" || activeExperience === "monitor";
          part.emissive.set(cyanGlow);
          const base = rgbActive ? 0.85 : 0.06;
          applyEmissive(part, base, 0.25);
        });
      }

      if (nameMatches(mesh.name, roomMeshNameMap.logo)) {
        const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
        if (material instanceof MeshStandardMaterial) {
          material.emissive.set(cyanGlow);
          const base = timeMode === "night" ? 0.92 : 0.06;
          applyEmissive(material, base, 0.3);
        }
      }

      // Emissive highlight for non-LED interactive objects on hover
      if (
        !nameMatches(mesh.name, roomMeshNameMap.logo) &&
        mesh.name !== "monitor" &&
        mesh.name !== "keyboard" &&
        mesh.name !== "Mouse" &&
        mesh.name !== "pc" &&
        mesh.material instanceof MeshStandardMaterial &&
        active
      ) {
        if (!mesh.userData.baseEmissiveIntensity) {
          mesh.userData.baseEmissiveIntensity = mesh.material.emissiveIntensity;
        }
        mesh.material.emissive.set("#ffffff");
        mesh.material.emissiveIntensity = MathUtils.damp(
          mesh.material.emissiveIntensity,
          0.12,
          6,
          delta,
        );
      } else if (
        mesh.material instanceof MeshStandardMaterial &&
        mesh.userData.baseEmissiveIntensity !== undefined &&
        !active
      ) {
        mesh.material.emissiveIntensity = MathUtils.damp(
          mesh.material.emissiveIntensity,
          mesh.userData.baseEmissiveIntensity,
          6,
          delta,
        );
      }
    });
  });

  useEffect(
    () => () => {
      Object.values(materials).forEach((material) => material.dispose());
    },
    [materials],
  );

  return (
    <group>
      <Clone
        object={preparedScene}
        onClick={(event) => {
          event.stopPropagation();
          const object = event.object as Object3D;
          const target = meshInteractionMap[object.name];
          if (target) {
            focusObject(target);
          }
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          handlePointer(event.object as Object3D, true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          handlePointer(event.object as Object3D, false);
        }}
      />
      {mirrorData ? (
        <mesh
          position={mirrorData.position}
          rotation={mirrorData.rotation}
          scale={mirrorData.scale}
        >
          <planeGeometry args={[1, 1]} />
          <MeshReflectorMaterial
            blur={[256, 128]}
            mixStrength={2.0}
            mixContrast={1.0}
            resolution={1024}
            mirror={0.92}
            metalness={0.12}
            roughness={0.04}
            color="#dce4ec"
            depthScale={0.12}
            minDepthThreshold={0.6}
            maxDepthThreshold={1.2}
            reflectorOffset={0.01}
          />
        </mesh>
      ) : null}
    </group>
  );
}

useGLTF.preload(roomGlbPath);
