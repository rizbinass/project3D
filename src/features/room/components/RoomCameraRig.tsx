"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type ComponentRef } from "react";
import { Vector3 } from "three";
import type { CameraState } from "@/core/types/scene.types";
import { getInitialCameraState } from "@/features/room/data/room-runtime-camera.data";
import { useSceneStore } from "@/store/useSceneStore";

const FALLBACK_CAMERA: CameraState = {
  position: [2.8, 1.6, 4.8],
  target: [0, 1.2, 0],
  fov: 45,
};

const LERP_SPEED = 3.0;

export function RoomCameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  const cameraTargetState = useSceneStore((s) => s.cameraTargetState);
  const previousCameraState = useSceneStore((s) => s.previousCameraState);
  const setPreviousCameraState = useSceneStore((s) => s.setPreviousCameraState);

  // Lerp targets — start at fallback, update when GLB provides computed camera
  const lerpTargetPos = useRef(new Vector3(...FALLBACK_CAMERA.position));
  const lerpTargetLookAt = useRef(new Vector3(...FALLBACK_CAMERA.target));
  const savedCameraState = useRef<CameraState | null>(null);
  const isTransitioningRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // After GLB loads, pick up computed initial camera and transition to it
  useEffect(() => {
    if (!hasInitializedRef.current) {
      const initial = getInitialCameraState();
      if (initial) {
        lerpTargetPos.current.set(...initial.position);
        lerpTargetLookAt.current.set(...initial.target);
        isTransitioningRef.current = true;
        hasInitializedRef.current = true;
      }
    }
  });

  // Handle camera target state changes
  useEffect(() => {
    if (cameraTargetState) {
      // Save current state before focusing
      if (!savedCameraState.current) {
        savedCameraState.current = {
          position: [camera.position.x, camera.position.y, camera.position.z],
          target: controlsRef.current
            ? [
                controlsRef.current.target.x,
                controlsRef.current.target.y,
                controlsRef.current.target.z,
              ]
            : [lerpTargetLookAt.current.x, lerpTargetLookAt.current.y, lerpTargetLookAt.current.z],
          fov: "fov" in camera ? camera.fov : FALLBACK_CAMERA.fov,
        };
        setPreviousCameraState(savedCameraState.current);
      }

      lerpTargetPos.current.set(...cameraTargetState.position);
      lerpTargetLookAt.current.set(...cameraTargetState.target);
      isTransitioningRef.current = true;
    } else if (savedCameraState.current) {
      // Return to saved state
      const returnState = previousCameraState ?? savedCameraState.current;
      lerpTargetPos.current.set(...returnState.position);
      lerpTargetLookAt.current.set(...returnState.target);
      isTransitioningRef.current = true;
      savedCameraState.current = null;
    }
  }, [cameraTargetState, previousCameraState, camera, setPreviousCameraState]);

  // Escape key → return to previous
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const store = useSceneStore.getState();
        if (!store.previousCameraState && !savedCameraState.current) return;

        const returnState =
          store.previousCameraState ?? savedCameraState.current ?? FALLBACK_CAMERA;

        lerpTargetPos.current.set(...returnState.position);
        lerpTargetLookAt.current.set(...returnState.target);
        isTransitioningRef.current = true;

        store.setCameraTargetState(null);
        store.setPreviousCameraState(null);
        savedCameraState.current = null;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ONE useFrame — only lerp during transitions
  useFrame((_, delta) => {
    if (!isTransitioningRef.current) return;

    const controls = controlsRef.current;
    const lerpFactor = 1 - Math.exp(-delta * LERP_SPEED);

    camera.position.lerp(lerpTargetPos.current, lerpFactor);
    controls?.target.lerp(lerpTargetLookAt.current, lerpFactor);
    controls?.update();

    // Check if close enough to stop transitioning
    const posDist = camera.position.distanceTo(lerpTargetPos.current);
    if (posDist < 0.01) {
      isTransitioningRef.current = false;
    }
  });

  const initialCamera = getInitialCameraState() ?? FALLBACK_CAMERA;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={initialCamera.position}
        fov={initialCamera.fov}
        near={0.05}
        far={100}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enabled
        enableDamping
        dampingFactor={0.08}
        enablePan
        panSpeed={0.8}
        enableZoom
        minDistance={1.5}
        maxDistance={12}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.05}
        rotateSpeed={0.7}
        zoomSpeed={0.6}
        target={initialCamera.target}
      />
    </>
  );
}
