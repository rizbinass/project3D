"use client";

import { Grid, Stats } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { envConfig } from "@/core/config/env.config";

export function RoomDebugLayer() {
  const enabled = process.env.NODE_ENV === "development" && envConfig.roomDebugEnabled;

  if (!enabled) {
    return null;
  }

  return <RoomDebugControls />;
}

function RoomDebugControls() {
  const controls = useControls(
    "Room Debug",
    {
      axes: false,
      grid: false,
      stats: false,
    },
    { collapsed: true },
  );

  return (
    <>
      <Leva collapsed />
      {controls.stats && <Stats />}
      {controls.axes && <axesHelper args={[2]} />}
      {controls.grid && (
        <Grid args={[8, 8]} cellSize={0.5} cellThickness={0.5} sectionSize={2} fadeDistance={12} />
      )}
    </>
  );
}
