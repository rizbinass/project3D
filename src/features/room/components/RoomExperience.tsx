"use client";

import { Suspense } from "react";
import { RoomCameraRig } from "./RoomCameraRig";
import { RoomDebugLayer } from "./RoomDebugLayer";
import { RoomEnvironment } from "./RoomEnvironment";
import { RoomInteractionLayer } from "./RoomInteractionLayer";
import { RoomLighting } from "./RoomLighting";
import { RoomModel } from "./RoomModel";
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
        <RoomModel />
        <RoomParticles />
        <RoomInteractionLayer />
        <RoomPostProcessing />
      </Suspense>
      <RoomDebugLayer />
    </>
  );
}
