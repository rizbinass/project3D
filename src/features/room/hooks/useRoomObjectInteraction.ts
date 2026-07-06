"use client";

import { useCallback } from "react";
import { Box3, Quaternion, Vector3 } from "three";
import { interactionExperienceMap, socialLinks } from "@/features/room/data/room-glb.data";
import type { CameraState, InteractiveObjectId } from "@/core/types/scene.types";
import { getRoomSceneRoot } from "@/features/room/data/room-runtime-camera.data";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useSceneStore } from "@/store/useSceneStore";

interface FocusProfile {
  forwardFactor: number;
  upFactor: number;
  distanceMultiplier: number;
  fov: number;
}

const focusProfiles: Partial<Record<InteractiveObjectId, FocusProfile>> = {
  monitor: { forwardFactor: 1.0, upFactor: 0.2, distanceMultiplier: 1.5, fov: 28 },
  keyboard: { forwardFactor: 1.0, upFactor: 0.5, distanceMultiplier: 1.2, fov: 28 },
  mouse: { forwardFactor: 1.0, upFactor: 0.4, distanceMultiplier: 1.0, fov: 28 },
  pc: { forwardFactor: 1.0, upFactor: 0.3, distanceMultiplier: 1.4, fov: 32 },
  "photo-frame": { forwardFactor: 1.0, upFactor: 0.0, distanceMultiplier: 1.3, fov: 32 },
  lamp: { forwardFactor: 0.8, upFactor: 0.4, distanceMultiplier: 1.2, fov: 32 },
  window: { forwardFactor: 1.0, upFactor: 0.1, distanceMultiplier: 1.6, fov: 38 },
  books: { forwardFactor: 1.0, upFactor: 0.3, distanceMultiplier: 1.3, fov: 34 },
  plant: { forwardFactor: 0.9, upFactor: 0.5, distanceMultiplier: 1.2, fov: 34 },
  clock: { forwardFactor: 1.0, upFactor: 0.2, distanceMultiplier: 1.4, fov: 34 },
};

const defaultFocusProfile: FocusProfile = {
  forwardFactor: 1.0,
  upFactor: 0.3,
  distanceMultiplier: 1.3,
  fov: 32,
};

const CLIP_MARGIN = 0.3;
const reusableForward = new Vector3();
const reusableUp = new Vector3();
const reusableQuat = new Quaternion();

function isInsideBbox(point: Vector3, bbox: Box3, margin: number): boolean {
  return (
    point.x > bbox.min.x - margin &&
    point.x < bbox.max.x + margin &&
    point.y > bbox.min.y - margin &&
    point.y < bbox.max.y + margin &&
    point.z > bbox.min.z - margin &&
    point.z < bbox.max.z + margin
  );
}

function clampOutsideBbox(position: Vector3, bbox: Box3, center: Vector3, margin: number): Vector3 {
  if (!isInsideBbox(position, bbox, margin)) {
    return position;
  }

  const toCamera = position.clone().sub(center).normalize();
  const size = bbox.getSize(new Vector3());
  const radius = Math.max(size.x, size.y, size.z) * 0.5;

  return center.clone().add(toCamera.multiplyScalar(radius + margin));
}

function computeFocusCameraState(
  meshName: string,
  objectId: InteractiveObjectId,
): CameraState | null {
  const root = getRoomSceneRoot();
  if (!root) return null;

  const mesh = root.getObjectByName(meshName);
  if (!mesh) return null;

  const profile = focusProfiles[objectId] ?? defaultFocusProfile;

  // Get world transform
  const worldPos = new Vector3();
  mesh.getWorldPosition(worldPos);
  mesh.getWorldQuaternion(reusableQuat);

  // Get object's forward and up directions in world space
  const forward = reusableForward.set(0, 0, -1).applyQuaternion(reusableQuat).normalize();
  const up = reusableUp.set(0, 1, 0).applyQuaternion(reusableQuat).normalize();

  // Compute bounding box for distance calculation
  const box = new Box3().setFromObject(mesh);
  const size = box.getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * profile.distanceMultiplier;

  // Compute approach direction: -forward (toward screen/front) + up offset
  const approach = forward
    .clone()
    .multiplyScalar(-profile.forwardFactor)
    .add(up.clone().multiplyScalar(profile.upFactor))
    .normalize();

  // Compute camera position
  const position = worldPos.clone().add(approach.multiplyScalar(distance));

  // Prevent clipping: ensure position is outside scene bounding box
  const sceneBox = new Box3().setFromObject(root);
  const sceneCenter = sceneBox.getCenter(new Vector3());
  const clamped = clampOutsideBbox(position, sceneBox, sceneCenter, CLIP_MARGIN);

  return {
    position: [clamped.x, clamped.y, clamped.z],
    target: [worldPos.x, worldPos.y, worldPos.z],
    fov: profile.fov,
  };
}

export const useRoomObjectInteraction = () => {
  const setFocusedObjectId = useSceneStore((s) => s.setFocusedObjectId);
  const setActiveExperience = useSceneStore((s) => s.setActiveExperience);
  const setCameraTargetState = useSceneStore((s) => s.setCameraTargetState);
  const setPreviousCameraState = useSceneStore((s) => s.setPreviousCameraState);
  const toggleTimeMode = useSceneStore((s) => s.toggleTimeMode);
  const setHoveredObjectId = useInteractionStore((s) => s.setHoveredObjectId);

  const focusObject = useCallback(
    (objectId: InteractiveObjectId): void => {
      // Social icons → open link
      if (objectId === "github" || objectId === "instagram" || objectId === "linkedin") {
        window.open(socialLinks[objectId], "_blank", "noopener,noreferrer");
        return;
      }

      // Lamp → immediate toggle, no camera focus
      if (objectId === "lamp") {
        toggleTimeMode();
        return;
      }

      setFocusedObjectId(objectId);

      // Compute focus target from mesh world transform
      const meshName = objectId === "photo-frame" ? "photoFrame" : objectId;
      const focusState = computeFocusCameraState(meshName, objectId);
      const nextExperience = interactionExperienceMap[objectId] ?? null;

      if (focusState) {
        setCameraTargetState(focusState);
      }

      if (nextExperience) {
        window.setTimeout(() => setActiveExperience(nextExperience), 720);
      }
    },
    [setFocusedObjectId, setCameraTargetState, setActiveExperience, toggleTimeMode],
  );

  const closeActiveExperience = useCallback(() => {
    setActiveExperience(null);
    setFocusedObjectId(null);

    // Return to previous state
    const previousState = useSceneStore.getState().previousCameraState;
    if (previousState) {
      setCameraTargetState(previousState);
      window.setTimeout(() => {
        setPreviousCameraState(null);
        setCameraTargetState(null);
      }, 950);
    } else {
      setCameraTargetState(null);
    }
  }, [setActiveExperience, setFocusedObjectId, setCameraTargetState, setPreviousCameraState]);

  const clearHover = useCallback(() => setHoveredObjectId(null), [setHoveredObjectId]);

  return {
    focusObject,
    closeActiveExperience,
    setHoveredObjectId,
    clearHover,
  };
};
