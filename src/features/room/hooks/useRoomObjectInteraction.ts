"use client";

import { useCallback } from "react";
import type { InteractiveObjectId } from "@/core/types/scene.types";
import { interactiveObjects } from "@/features/room/data/interactive-objects.data";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useOverlayStore } from "@/store/useOverlayStore";
import { useSceneStore } from "@/store/useSceneStore";

export const useRoomObjectInteraction = () => {
  const openOverlay = useOverlayStore((state) => state.openOverlay);
  const setCameraPresetId = useSceneStore((state) => state.setCameraPresetId);
  const setFocusedObjectId = useSceneStore((state) => state.setFocusedObjectId);
  const setHoveredObjectId = useInteractionStore((state) => state.setHoveredObjectId);

  const focusObject = useCallback(
    (objectId: InteractiveObjectId): void => {
      const object = interactiveObjects[objectId];
      setFocusedObjectId(objectId);
      setCameraPresetId(object.cameraPresetId);
      window.setTimeout(() => openOverlay(object.overlayId), 420);
    },
    [openOverlay, setCameraPresetId, setFocusedObjectId],
  );

  const clearHover = useCallback(() => setHoveredObjectId(null), [setHoveredObjectId]);

  return {
    focusObject,
    setHoveredObjectId,
    clearHover,
  };
};
