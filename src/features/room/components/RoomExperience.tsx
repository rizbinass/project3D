"use client";

import { Suspense } from "react";
import { RoomCameraRig } from "./RoomCameraRig";
import { RoomDebugLayer } from "./RoomDebugLayer";
import { RoomDisplaySurfaces } from "./RoomDisplaySurfaces";
import { RoomEnvironment } from "./RoomEnvironment";
import { RoomGlb } from "./RoomGlb";
import { RoomInteractionLayer } from "./RoomInteractionLayer";
import { RoomLighting } from "./RoomLighting";
import { RoomParticles } from "./RoomParticles";
import { RoomPerformanceMonitor } from "./RoomPerformanceMonitor";
import { RoomPostProcessing } from "./RoomPostProcessing";

export function RoomExperience() {
  return (
    <>
      <RoomPerformanceMonitor />
      <RoomCameraRig />
      <Suspense fallback={null}>
        <RoomEnvironment />
        <RoomLighting />
        <RoomGlb />
        <RoomDisplaySurfaces />
        <RoomParticles />
        <RoomInteractionLayer />
        <RoomPostProcessing />
      </Suspense>
      <RoomDebugLayer />
    </>
  );
}
