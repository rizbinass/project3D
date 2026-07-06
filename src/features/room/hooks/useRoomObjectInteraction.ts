"use client";

import { useCallback } from "react";
import { Box3, Vector3 } from "three";
import { interactionExperienceMap, socialLinks } from "@/features/room/data/room-glb.data";
import type { CameraState, InteractiveObjectId } from "@/core/types/scene.types";
import { getRoomSceneRoot } from "@/features/room/data/room-runtime-camera.data";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useSceneStore } from "@/store/useSceneStore";

const FOCUS_OFFSET = 1.8;
const MIN_FOCUS_DISTANCE = 1.2;

function computeFocusCameraState(meshName: string, isDesk = false): CameraState | null {
  const root = getRoomSceneRoot();
  if (!root) return null;

  const mesh = root.getObjectByName(meshName);
  if (!mesh) return null;

  const box = new Box3().setFromObject(mesh);
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = Math.max(maxDim * FOCUS_OFFSET, MIN_FOCUS_DISTANCE);
  const finalDistance = isDesk ? distance * 1.4 : distance;

  const direction = new Vector3(0.3, 0.25, 1).normalize();
  const position = center.clone().add(direction.multiplyScalar(finalDistance));
  position.y = Math.max(position.y, center.y + size.y * 0.15);

  return {
    position: [position.x, position.y, position.z],
    target: [center.x, center.y, center.z],
    fov: isDesk ? 28 : 32,
  };
}

export const useRoomObjectInteraction = () => {
  const setFocusedObjectId = useSceneStore((state) => state.setFocusedObjectId);
  const activeExperience = useSceneStore((state) => state.activeExperience);
  const setActiveExperience = useSceneStore((state) => state.setActiveExperience);
  const setCameraTargetState = useSceneStore((state) => state.setCameraTargetState);
  const previousCameraState = useSceneStore((state) => state.previousCameraState);
  const setPreviousCameraState = useSceneStore((state) => state.setPreviousCameraState);
  const toggleTimeMode = useSceneStore((state) => state.toggleTimeMode);
  const isInteractionLocked = useInteractionStore((state) => state.isInteractionLocked);
  const setHoveredObjectId = useInteractionStore((state) => state.setHoveredObjectId);
  const setInteractionLocked = useInteractionStore((state) => state.setInteractionLocked);

  const focusObject = useCallback(
    (objectId: InteractiveObjectId): void => {
      if (isInteractionLocked) {
        return;
      }

      if (objectId === "github" || objectId === "instagram" || objectId === "linkedin") {
        window.open(socialLinks[objectId], "_blank", "noopener,noreferrer");
        return;
      }

      setInteractionLocked(true);
      setFocusedObjectId(objectId);

      if (objectId === "lamp") {
        const focusState = computeFocusCameraState("headLamp");
        if (focusState) {
          setCameraTargetState(focusState, { preservePrevious: true });
        }

        window.setTimeout(() => {
          toggleTimeMode();
          setFocusedObjectId(null);
          setInteractionLocked(false);
        }, 1050);

        return;
      }

      const isDesk =
        objectId === "monitor" ||
        objectId === "pc" ||
        objectId === "keyboard" ||
        objectId === "mouse";
      const focusState = computeFocusCameraState(objectId, isDesk);
      const nextExperience = interactionExperienceMap[objectId] ?? null;

      if (focusState) {
        setCameraTargetState(focusState, { preservePrevious: activeExperience === null });
      }

      if (nextExperience) {
        window.setTimeout(() => {
          setActiveExperience(nextExperience);
          setInteractionLocked(false);
        }, 720);
        return;
      }

      setInteractionLocked(false);
    },
    [
      activeExperience,
      isInteractionLocked,
      setActiveExperience,
      setCameraTargetState,
      setFocusedObjectId,
      setInteractionLocked,
      toggleTimeMode,
    ],
  );

  const closeActiveExperience = useCallback(() => {
    if (isInteractionLocked) {
      return;
    }

    if (!previousCameraState) {
      setActiveExperience(null);
      setFocusedObjectId(null);
      return;
    }

    setInteractionLocked(true);
    setActiveExperience(null);
    setFocusedObjectId(null);
    setCameraTargetState(previousCameraState);

    window.setTimeout(() => {
      setPreviousCameraState(null);
      setInteractionLocked(false);
    }, 920);
  }, [
    isInteractionLocked,
    previousCameraState,
    setActiveExperience,
    setCameraTargetState,
    setFocusedObjectId,
    setInteractionLocked,
    setPreviousCameraState,
  ]);

  const clearHover = useCallback(() => setHoveredObjectId(null), [setHoveredObjectId]);

  return {
    focusObject,
    closeActiveExperience,
    setHoveredObjectId,
    clearHover,
  };
};
