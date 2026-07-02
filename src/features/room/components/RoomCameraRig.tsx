"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import { MathUtils, Vector3 } from "three";
import { cameraPresets, introCameraPreset } from "@/features/room/data/camera-presets.data";
import { useCameraIntro } from "@/features/room/hooks/useCameraIntro";
import { useResponsiveCamera } from "@/features/room/hooks/useResponsiveCamera";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSceneStore } from "@/store/useSceneStore";

const introDurationSeconds = 4.8;

export function RoomCameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const introStartRef = useRef<number | null>(null);
  const introPositionRef = useRef(new Vector3(...introCameraPreset.position));
  const introTargetRef = useRef(new Vector3(...introCameraPreset.target));
  const idlePositionRef = useRef(new Vector3());
  const { camera, size } = useThree();
  const responsiveCamera = useResponsiveCamera();
  const reducedMotion = usePrefersReducedMotion();
  const cameraPresetId = useSceneStore((state) => state.cameraPresetId);
  const sceneStatus = useSceneStore((state) => state.sceneStatus);
  const introComplete = useCameraIntro(sceneStatus === "ready");

  const activePreset = cameraPresets[cameraPresetId];
  const targetPosition = useMemo(
    () =>
      new Vector3(
        activePreset.position[0],
        activePreset.position[1],
        activePreset.position[2] + responsiveCamera.distanceOffset,
      ),
    [activePreset.position, responsiveCamera.distanceOffset],
  );
  const targetLookAt = useMemo(() => new Vector3(...activePreset.target), [activePreset.target]);

  useEffect(() => {
    camera.position.set(...introCameraPreset.position);
    camera.lookAt(...introCameraPreset.target);
  }, [camera]);

  useFrame(({ clock }, delta) => {
    const controls = controlsRef.current;
    const elapsed = clock.getElapsedTime();
    const responsiveFov =
      activePreset.fov + responsiveCamera.fovOffset + (size.width < 640 ? 4 : 0);

    if ("fov" in camera) {
      const nextFov = MathUtils.damp(camera.fov, responsiveFov, 3.2, delta);

      if (Math.abs(camera.fov - nextFov) > 0.001) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    if (!introComplete && !reducedMotion) {
      introStartRef.current ??= elapsed;
      const progress = MathUtils.clamp(
        (elapsed - introStartRef.current) / introDurationSeconds,
        0,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      camera.position.lerpVectors(introPositionRef.current, targetPosition, eased);
      controls?.target.lerpVectors(introTargetRef.current, targetLookAt, eased);
    } else {
      const breathing = Math.sin(elapsed * 0.42) * 0.035;
      idlePositionRef.current.copy(targetPosition);
      idlePositionRef.current.y += breathing;
      camera.position.lerp(idlePositionRef.current, 1 - Math.exp(-delta * 2.8));
      controls?.target.lerp(targetLookAt, 1 - Math.exp(-delta * 3.8));
    }

    controls?.update();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={introCameraPreset.position}
        fov={introCameraPreset.fov}
        near={0.1}
        far={80}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.075}
        enablePan={false}
        enableZoom
        minDistance={responsiveCamera.minDistance}
        maxDistance={responsiveCamera.maxDistance}
        minPolarAngle={Math.PI / 4.4}
        maxPolarAngle={responsiveCamera.maxPolarAngle}
        minAzimuthAngle={-Math.PI / 4.3}
        maxAzimuthAngle={Math.PI / 4.3}
        rotateSpeed={responsiveCamera.rotateSpeed}
        zoomSpeed={0.42}
      />
    </>
  );
}
