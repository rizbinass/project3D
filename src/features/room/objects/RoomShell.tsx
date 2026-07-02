"use client";

import type { MaterialLibrary } from "@/components/three/MaterialLibrary";
import type { GeometryLibrary } from "@/components/three/GeometryLibrary";
import type { RoomMaterialKey } from "@/features/room/data/material-presets.data";
import { roomLayout } from "@/features/room/data/room-layout.data";

interface RoomShellProps {
  materials: MaterialLibrary<RoomMaterialKey>;
  geometries: GeometryLibrary;
}

export function RoomShell({ materials, geometries }: RoomShellProps) {
  const halfWidth = roomLayout.width / 2;
  const halfDepth = roomLayout.depth / 2;
  const halfHeight = roomLayout.height / 2;

  return (
    <group>
      <mesh
        receiveShadow
        geometry={geometries.box}
        material={materials.floor}
        position={[0, -0.02, 0]}
        scale={[roomLayout.width, 0.04, roomLayout.depth]}
      />

      <mesh
        receiveShadow
        geometry={geometries.box}
        material={materials.ceiling}
        position={[0, roomLayout.height, 0]}
        scale={[roomLayout.width, 0.08, roomLayout.depth]}
      />

      <mesh
        receiveShadow
        geometry={geometries.box}
        material={materials.wall}
        position={[0, halfHeight, -halfDepth]}
        scale={[roomLayout.width, roomLayout.height, roomLayout.wallThickness]}
      />

      <mesh
        receiveShadow
        geometry={geometries.box}
        material={materials.wall}
        position={[-halfWidth, halfHeight, 0]}
        scale={[roomLayout.wallThickness, roomLayout.height, roomLayout.depth]}
      />

      <mesh
        receiveShadow
        geometry={geometries.box}
        material={materials.wall}
        position={[halfWidth, halfHeight, 0]}
        scale={[roomLayout.wallThickness, roomLayout.height, roomLayout.depth]}
      />

      <mesh
        material={materials.metal}
        geometry={geometries.box}
        position={[0, 0.12, -halfDepth + 0.08]}
        scale={[roomLayout.width, 0.16, 0.08]}
      />
      <mesh
        material={materials.metal}
        geometry={geometries.box}
        position={[-halfWidth + 0.08, 0.12, 0]}
        scale={[0.08, 0.16, roomLayout.depth]}
      />
      <mesh
        material={materials.metal}
        geometry={geometries.box}
        position={[halfWidth - 0.08, 0.12, 0]}
        scale={[0.08, 0.16, roomLayout.depth]}
      />

      <group position={roomLayout.window.position}>
        <mesh material={materials.glass} geometry={geometries.box} scale={roomLayout.window.size} />
        <mesh
          material={materials.metal}
          geometry={geometries.box}
          position={[0, 0, -1.18]}
          scale={[0.12, 1.64, 0.08]}
        />
        <mesh
          material={materials.metal}
          geometry={geometries.box}
          position={[0, 0, 1.18]}
          scale={[0.12, 1.64, 0.08]}
        />
        <mesh material={materials.metal} geometry={geometries.box} scale={[0.12, 0.08, 2.54]} />
      </group>
    </group>
  );
}
