"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import { MathUtils, Vector3 } from "three";
import type { CameraState } from "@/core/types/scene.types";
import { getFittedRoomCameraState } from "@/features/room/data/room-runtime-camera.data";
import { useCameraIntro } from "@/features/room/hooks/useCameraIntro";
import { useRoomObjectInteraction } from "@/features/room/hooks/useRoomObjectInteraction";
import { useResponsiveCamera } from "@/features/room/hooks/useResponsiveCamera";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useSceneStore } from "@/store/useSceneStore";

const introDurationSeconds = 4.8;
const LERP_SPEED = 3.5;

export function RoomCameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const introStartRef = useRef<number | null>(null);
  const introPositionRef = useRef(new Vector3());
  const introTargetRef = useRef(new Vector3());
  const lastCameraStateRef = useRef<CameraState | null>(null);
  const idlePositionRef = useRef(new Vector3());
  const { camera, size } = useThree();
  const responsiveCamera = useResponsiveCamera();
  const reducedMotion = usePrefersReducedMotion();
  const { closeActiveExperience } = useRoomObjectInteraction();
  const sceneStatus = useSceneStore((state) => state.sceneStatus);
  const activeExperience = useSceneStore((state) => state.activeExperience);
  const cameraTargetState = useSceneStore((state) => state.cameraTargetState);
  const preservePreviousCameraState = useSceneStore((state) => state.preservePreviousCameraState);
  const setPreviousCameraState = useSceneStore((state) => state.setPreviousCameraState);
  const setCameraTargetState = useSceneStore((state) => state.setCameraTargetState);
  const setTransitioningCamera = useSceneStore((state) => state.setTransitioningCamera);
  const setInteractionLocked = useInteractionStore((state) => state.setInteractionLocked);
  const introComplete = useCameraIntro(sceneStatus === "ready");
  // OrbitControls always enabled - user can always orbit/zoom
  const controlsEnabled = true;

  const fittedCameraState = getFittedRoomCameraState();
  const baseCameraState = useMemo<CameraState>(
    () =>
      fittedCameraState ?? {
        position: [0, 3, 8],
        target: [0, 1, 0],
        fov: 42,
      },
    [fittedCameraState],
  );

  const targetPositionRef = useRef(new Vector3(...baseCameraState.position));
  const targetLookAtRef = useRef(new Vector3(...baseCameraState.target));
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    introPositionRef.current.set(...baseCameraState.position);
    introTargetRef.current.set(...baseCameraState.target);
  }, [baseCameraState.position, baseCameraState.target]);

  useEffect(() => {
    if (cameraTargetState) {
      targetPositionRef.current.set(
        cameraTargetState.position[0],
        cameraTargetState.position[1],
        cameraTargetState.position[2],
      );
      targetLookAtRef.current.set(
        cameraTargetState.target[0],
        cameraTargetState.target[1],
        cameraTargetState.target[2],
      );
      isTransitioningRef.current = true;

      if (preservePreviousCameraState) {
        setPreviousCameraState({
          position: [camera.position.x, camera.position.y, camera.position.z],
          target: controlsRef.current
            ? [
                controlsRef.current.target.x,
                controlsRef.current.target.y,
                controlsRef.current.target.z,
              ]
            : [targetLookAtRef.current.x, targetLookAtRef.current.y, targetLookAtRef.current.z],
          fov: "fov" in camera ? camera.fov : baseCameraState.fov,
        });
      }

      setTransitioningCamera(true);
      setInteractionLocked(true);

      const timeout = window.setTimeout(() => {
        setCameraTargetState(null);
        setTransitioningCamera(false);
        setInteractionLocked(false);
        isTransitioningRef.current = false;
      }, 920);

      return () => window.clearTimeout(timeout);
    } else {
      targetPositionRef.current.set(...baseCameraState.position);
      targetLookAtRef.current.set(...baseCameraState.target);
    }
  }, [
    baseCameraState,
    camera,
    cameraTargetState,
    preservePreviousCameraState,
    setCameraTargetState,
    setInteractionLocked,
    setPreviousCameraState,
    setTransitioningCamera,
  ]);

  useEffect(() => {
    camera.position.set(...baseCameraState.position);
    camera.lookAt(...baseCameraState.target);

    if (controlsRef.current) {
      controlsRef.current.target.set(...baseCameraState.target);
      controlsRef.current.update();
    }
  }, [baseCameraState.position, baseCameraState.target, camera]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeExperience) {
        closeActiveExperience();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeExperience, closeActiveExperience]);

  useFrame(({ clock }, delta) => {
    const controls = controlsRef.current;
    const elapsed = clock.getElapsedTime();
    const targetFov =
      (cameraTargetState?.fov ?? baseCameraState.fov) +
      responsiveCamera.fovOffset +
      (size.width < 640 ? 4 : 0);

    if ("fov" in camera) {
      const nextFov = MathUtils.damp(camera.fov, targetFov, 3.2, delta);
      if (Math.abs(camera.fov - nextFov) > 0.001) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    if (isTransitioningRef.current || cameraTargetState) {
      lastCameraStateRef.current = {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: controls
          ? [controls.target.x, controls.target.y, controls.target.z]
          : [targetLookAtRef.current.x, targetLookAtRef.current.y, targetLookAtRef.current.z],
        fov: "fov" in camera ? camera.fov : targetFov,
      };
    }

    const lerpFactor = 1 - Math.exp(-delta * LERP_SPEED);

    if (!introComplete && !reducedMotion) {
      introStartRef.current ??= elapsed;
      const progress = MathUtils.clamp(
        (elapsed - introStartRef.current) / introDurationSeconds,
        0,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      camera.position.lerpVectors(introPositionRef.current, targetPositionRef.current, eased);
      controls?.target.lerpVectors(introTargetRef.current, targetLookAtRef.current, eased);
    } else {
      const breathing = Math.sin(elapsed * 0.42) * 0.02;
      idlePositionRef.current.copy(targetPositionRef.current);
      idlePositionRef.current.y += breathing;
      camera.position.lerp(idlePositionRef.current, lerpFactor);
      controls?.target.lerp(targetLookAtRef.current, lerpFactor * 1.2);
    }

    controls?.update();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={baseCameraState.position}
        fov={baseCameraState.fov}
        near={0.1}
        far={80}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enabled={controlsEnabled}
        enableDamping
        dampingFactor={0.08}
        enablePan
        panSpeed={0.5}
        enableZoom
        minDistance={2.5}
        maxDistance={14}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 2.8}
        maxAzimuthAngle={Math.PI / 2.8}
        rotateSpeed={0.6}
        zoomSpeed={0.5}
        target={baseCameraState.target}
      />
    </>
  );
}
