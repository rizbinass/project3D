"use client";

import { Clone, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import {
  Box3,
  Color,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import {
  setRoomSceneRoot,
  setInitialCameraState,
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

// Only window glass needs a custom material. Everything else stays as GLB exports.
const createRoomMaterials = () => ({
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
  // Only override materials that need special treatment.
  // Everything else stays exactly as exported from Blender.
  if (nameMatches(name, roomMeshNameMap.windowGlass)) return "glass";
  return null;
}

export function RoomGlb() {
  const hoveredObjectId = useInteractionStore((state) => state.hoveredObjectId);
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
      // ponytail: frustumCulled=false prevents clipping on objects
      // whose world-space bounding boxes are stale after the PI rotation.
      mesh.frustumCulled = false;

      // Only override photo placeholder, window glass, and mirror.
      // Everything else stays exactly as exported from Blender.
      if (mesh.name === "photo") {
        mesh.material = new MeshStandardMaterial({
          map: placeholderPhotoTexture,
          roughness: 0.88,
          metalness: 0,
        });
        return;
      }

      if (mesh.name === "mirror") {
        mesh.visible = false;
        return;
      }

      const materialKey = mapMaterialKey(mesh.name);
      if (materialKey) {
        mesh.material = materials[materialKey].clone();
      }
    });

    return cloned;
  }, [materials, scene]);

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
    setRoomSceneRoot(preparedScene);

    // Compute initial camera from GLB bounding box
    const bbox = new Box3().setFromObject(preparedScene);
    const center = bbox.getCenter(new Vector3());
    const size = bbox.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 1.6;

    // Position camera outside the room, looking toward center
    const direction = new Vector3(0.5, 0.35, 1).normalize();
    const position = center.clone().add(direction.multiplyScalar(distance));
    position.y = Math.max(center.y + size.y * 0.25, bbox.min.y + size.y * 0.6);

    setInitialCameraState({
      position: [position.x, position.y, position.z],
      target: [center.x, center.y, center.z],
      fov: 45,
    });

    forEachMesh(preparedScene, (mesh) => {
      if (!interactiveNames.has(mesh.name)) {
        return;
      }

      mesh.userData.interactive = true;
      mesh.userData.objectId = meshInteractionMap[mesh.name];
    });
  }, [interactiveNames, preparedScene]);

  const _tempScale = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const dampAlpha = 1 - Math.exp(-delta * 10);

    animatedInteractiveMeshes.forEach((mesh) => {
      if (!mesh.userData.interactive || !mesh.userData.objectId) {
        return;
      }

      const active =
        hoveredObjectId === mesh.userData.objectId || focusedObjectId === mesh.userData.objectId;
      const targetScale = active ? roomHoverScale : 1;
      _tempScale.set(targetScale, targetScale, targetScale);
      mesh.scale.lerp(_tempScale, dampAlpha);
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
