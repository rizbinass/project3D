"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  Euler,
  Matrix4,
  Quaternion,
  Vector3,
  type BufferGeometry,
  type Group,
  type InstancedMesh,
  type Material,
  type Mesh,
} from "three";
import type { GeometryLibrary } from "@/components/three/GeometryLibrary";
import type { MaterialLibrary } from "@/components/three/MaterialLibrary";
import type { InteractiveObjectId } from "@/core/types/scene.types";
import type { RoomMaterialKey } from "@/features/room/data/material-presets.data";
import { roomLayout } from "@/features/room/data/room-layout.data";
import { useRoomObjectInteraction } from "@/features/room/hooks/useRoomObjectInteraction";
import { useInteractionStore } from "@/store/useInteractionStore";

interface WorkspaceProps {
  materials: MaterialLibrary<RoomMaterialKey>;
  geometries: GeometryLibrary;
}

interface InstanceTransform {
  position: readonly [number, number, number];
  scale: readonly [number, number, number];
  rotation?: readonly [number, number, number];
}

interface InstancedPrimitiveProps {
  geometry: BufferGeometry;
  material: Material;
  instances: readonly InstanceTransform[];
  castShadow?: boolean;
  receiveShadow?: boolean;
}

function InstancedPrimitive({
  geometry,
  material,
  instances,
  castShadow = false,
  receiveShadow = false,
}: InstancedPrimitiveProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const matrix = useMemo(() => new Matrix4(), []);
  const position = useMemo(() => new Vector3(), []);
  const quaternion = useMemo(() => new Quaternion(), []);
  const scale = useMemo(() => new Vector3(), []);
  const euler = useMemo(() => new Euler(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    instances.forEach((instance, index) => {
      position.set(...instance.position);
      scale.set(...instance.scale);
      euler.set(...(instance.rotation ?? [0, 0, 0]));
      quaternion.setFromEuler(euler);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [euler, instances, matrix, position, quaternion, scale]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, instances.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      frustumCulled
    />
  );
}

interface InteractiveGroupProps {
  id: InteractiveObjectId;
  children: React.ReactNode;
}

function InteractiveGroup({ id, children }: InteractiveGroupProps) {
  const groupRef = useRef<Group>(null);
  const scaleRef = useRef(new Vector3(1, 1, 1));
  const hoveredObjectId = useInteractionStore((state) => state.hoveredObjectId);
  const { focusObject, setHoveredObjectId, clearHover } = useRoomObjectInteraction();
  const hovered = hoveredObjectId === id;

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetScale = hovered ? 1.045 : 1;
    scaleRef.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleRef.current, 1 - Math.exp(-delta * 12));
  });

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        focusObject(id);
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
        setHoveredObjectId(id);
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "default";
        clearHover();
      }}
    >
      {children}
    </group>
  );
}

function DeskSetup({ materials, geometries }: WorkspaceProps) {
  const lampRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    materials.screen.emissiveIntensity = 0.62 + Math.sin(elapsed * 1.4) * 0.04;

    if (lampRef.current) {
      lampRef.current.rotation.z = Math.sin(elapsed * 0.45) * 0.012;
    }
  });

  return (
    <group position={roomLayout.desk.position}>
      <mesh
        castShadow
        receiveShadow
        geometry={geometries.box}
        material={materials.wood}
        scale={roomLayout.desk.size}
      />
      <InstancedPrimitive
        geometry={geometries.cylinderLow}
        material={materials.metal}
        castShadow
        instances={[
          { position: [-1.9, -0.52, -0.45], scale: [0.045, 1.05, 0.045] },
          { position: [1.9, -0.52, -0.45], scale: [0.045, 1.05, 0.045] },
          { position: [-1.9, -0.52, 0.45], scale: [0.045, 1.05, 0.045] },
          { position: [1.9, -0.52, 0.45], scale: [0.045, 1.05, 0.045] },
        ]}
      />

      <group position={[0, 0.55, -0.22]}>
        <InteractiveGroup id="monitor">
          <mesh
            castShadow
            geometry={geometries.box}
            material={materials.plastic}
            position={[0, 0.32, 0]}
            scale={[2.35, 0.86, 0.08]}
          />
          <mesh
            geometry={geometries.box}
            material={materials.screen}
            position={[0, 0.32, 0.046]}
            scale={[2.16, 0.68, 0.012]}
          />
        </InteractiveGroup>
        <mesh
          geometry={geometries.box}
          material={materials.metal}
          position={[0, -0.16, -0.02]}
          scale={[0.12, 0.44, 0.08]}
        />
        <mesh
          geometry={geometries.box}
          material={materials.metal}
          position={[0, -0.42, 0]}
          scale={[0.7, 0.045, 0.32]}
        />
      </group>

      <InteractiveGroup id="keyboard">
        <mesh
          geometry={geometries.box}
          material={materials.rubber}
          position={[-0.45, 0.15, 0.34]}
          scale={[1.05, 0.05, 0.28]}
        />
      </InteractiveGroup>
      <mesh
        geometry={geometries.capsule}
        material={materials.rubber}
        position={[0.95, 0.15, 0.36]}
        scale={[0.12, 0.18, 0.12]}
      />
      <InteractiveGroup id="laptop">
        <mesh
          geometry={geometries.box}
          material={materials.metal}
          position={[1.55, 0.22, -0.05]}
          rotation={[0, -0.18, 0]}
          scale={[0.78, 0.06, 0.52]}
        />
        <mesh
          geometry={geometries.box}
          material={materials.screen}
          position={[1.45, 0.43, -0.26]}
          rotation={[-0.65, -0.18, 0]}
          scale={[0.74, 0.42, 0.025]}
        />
      </InteractiveGroup>

      <group ref={lampRef} position={[-1.72, 0.24, -0.05]}>
        <mesh
          geometry={geometries.cylinderLow}
          material={materials.metal}
          position={[0, 0.28, 0]}
          scale={[0.035, 0.58, 0.035]}
        />
        <mesh
          geometry={geometries.cylinderLow}
          material={materials.metal}
          position={[0.18, 0.62, 0]}
          rotation={[0, 0, 0.7]}
          scale={[0.035, 0.58, 0.035]}
        />
        <mesh
          geometry={geometries.cone}
          material={materials.led}
          position={[0.38, 0.8, 0]}
          scale={[0.18, 0.28, 0.18]}
        />
      </group>

      <mesh
        geometry={geometries.cylinderMedium}
        material={materials.ceramic}
        position={[1.35, 0.16, 0.22]}
        scale={[0.12, 0.22, 0.1]}
      />
    </group>
  );
}

function Chair({ materials, geometries }: WorkspaceProps) {
  return (
    <group position={[0, 0.58, -0.2]}>
      <mesh
        castShadow
        geometry={geometries.box}
        material={materials.fabric}
        position={[0, 0, 0.9]}
        scale={[1.05, 0.16, 0.9]}
      />
      <mesh
        castShadow
        geometry={geometries.box}
        material={materials.fabric}
        position={[0, 0.62, 1.24]}
        rotation={[-0.18, 0, 0]}
        scale={[1.02, 1.1, 0.16]}
      />
      <mesh
        castShadow
        geometry={geometries.cylinderLow}
        material={materials.metal}
        position={[0, -0.42, 0.9]}
        scale={[0.055, 0.82, 0.055]}
      />
      <mesh
        geometry={geometries.cylinderLow}
        material={materials.metal}
        position={[0, -0.82, 0.9]}
        scale={[0.46, 0.04, 0.46]}
      />
    </group>
  );
}

function ShelfAndDecor({ materials, geometries }: WorkspaceProps) {
  const plantRef = useRef<Group>(null);
  const clockHandRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (plantRef.current) {
      plantRef.current.rotation.z = Math.sin(elapsed * 0.55) * 0.025;
    }

    if (clockHandRef.current) {
      clockHandRef.current.rotation.z = -elapsed * 0.045;
    }
  });

  return (
    <group>
      <group position={[-3.25, 1.85, -3.48]}>
        <mesh geometry={geometries.box} material={materials.wood} scale={[2.2, 0.12, 0.34]} />
        <InteractiveGroup id="books">
          <InstancedPrimitive
            geometry={geometries.box}
            material={materials.plastic}
            instances={[
              { position: [-0.78, 0.22, 0], scale: [0.16, 0.42, 0.24] },
              { position: [-0.28, 0.22, 0], scale: [0.16, 0.47, 0.24] },
              { position: [0.36, 0.22, 0], scale: [0.16, 0.52, 0.24] },
            ]}
          />
          <InstancedPrimitive
            geometry={geometries.box}
            material={materials.wood}
            instances={[
              { position: [-0.52, 0.22, 0], scale: [0.16, 0.445, 0.24] },
              { position: [0.12, 0.22, 0], scale: [0.16, 0.495, 0.24] },
            ]}
          />
        </InteractiveGroup>
        <mesh
          geometry={geometries.box}
          material={materials.metal}
          position={[0.9, 0.26, 0]}
          scale={[0.34, 0.34, 0.24]}
        />
      </group>

      <InteractiveGroup id="plant">
        <group ref={plantRef} position={[3.35, 0.28, -3.05]}>
          <mesh
            geometry={geometries.cylinderMedium}
            material={materials.ceramic}
            position={[0, 0.18, 0]}
            scale={[0.26, 0.36, 0.2]}
          />
          <InstancedPrimitive
            geometry={geometries.capsule}
            material={materials.plant}
            instances={[
              { position: [-0.3, 0.62, 0], rotation: [0.55, 0, -0.3], scale: [0.055, 0.55, 0.055] },
              {
                position: [-0.12, 0.62, 0],
                rotation: [0.67, 0, -0.12],
                scale: [0.055, 0.55, 0.055],
              },
              { position: [0.12, 0.62, 0], rotation: [0.79, 0, 0.12], scale: [0.055, 0.55, 0.055] },
              { position: [0.3, 0.62, 0], rotation: [0.91, 0, 0.3], scale: [0.055, 0.55, 0.055] },
            ]}
          />
        </group>
      </InteractiveGroup>

      <InteractiveGroup id="clock">
        <group position={[3.1, 2.38, -3.52]}>
          <mesh
            geometry={geometries.cylinderMedium}
            material={materials.metal}
            scale={[0.34, 0.04, 0.34]}
          />
          <mesh
            ref={clockHandRef}
            geometry={geometries.box}
            material={materials.led}
            position={[0, 0, 0.035]}
            scale={[0.025, 0.28, 0.02]}
          />
        </group>
      </InteractiveGroup>
    </group>
  );
}

function AmbientDecorations({ materials, geometries }: WorkspaceProps) {
  return (
    <group>
      <mesh
        geometry={geometries.box}
        material={materials.led}
        position={[0, 0.08, -3.52]}
        scale={[7.8, 0.045, 0.05]}
      />
      <InteractiveGroup id="window">
        <mesh
          geometry={geometries.box}
          material={materials.glass}
          position={[-4.38, 1.85, -1.9]}
          scale={[0.05, 1.45, 2.2]}
        />
      </InteractiveGroup>
      <mesh
        geometry={geometries.box}
        material={materials.fabric}
        position={[-4.32, 1.85, -0.36]}
        scale={[0.04, 1.8, 0.12]}
      />
    </group>
  );
}

export function WorkspacePropsGroup({ materials, geometries }: WorkspaceProps) {
  return (
    <group>
      <DeskSetup materials={materials} geometries={geometries} />
      <Chair materials={materials} geometries={geometries} />
      <ShelfAndDecor materials={materials} geometries={geometries} />
      <AmbientDecorations materials={materials} geometries={geometries} />
    </group>
  );
}
