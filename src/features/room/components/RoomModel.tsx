"use client";

import { disposeGeometryLibrary, useGeometryLibrary } from "@/components/three/GeometryLibrary";
import { useMaterialLibrary } from "@/components/three/MaterialLibrary";
import { roomMaterialPresets } from "@/features/room/data/material-presets.data";
import { RoomShell } from "@/features/room/objects/RoomShell";
import { WorkspacePropsGroup } from "@/features/room/objects/WorkspaceProps";
import { useEffect } from "react";

export function RoomModel() {
  const materials = useMaterialLibrary(roomMaterialPresets);
  const geometries = useGeometryLibrary();

  useEffect(
    () => () => {
      disposeGeometryLibrary(geometries);
    },
    [geometries],
  );

  return (
    <group>
      <RoomShell materials={materials} geometries={geometries} />
      <WorkspacePropsGroup materials={materials} geometries={geometries} />
    </group>
  );
}
