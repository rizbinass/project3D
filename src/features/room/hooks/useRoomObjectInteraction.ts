"use client";

import { useCallback, useEffect, useRef } from "react";
import type { InteractiveObjectId } from "@/core/types/scene.types";
import { interactiveObjects } from "@/features/room/data/interactive-objects.data";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useOverlayStore } from "@/store/useOverlayStore";
import { useSceneStore } from "@/store/useSceneStore";

export const useRoomObjectInteraction = () => {
  const openDelayRef = useRef<number | null>(null);
  const openOverlay = useOverlayStore((state) => state.openOverlay);
  const setCameraPresetId = useSceneStore((state) => state.setCameraPresetId);
  const setFocusedObjectId = useSceneStore((state) => state.setFocusedObjectId);
  const setHoveredObjectId = useInteractionStore((state) => state.setHoveredObjectId);

  const focusObject = useCallback(
    (objectId: InteractiveObjectId): void => {
      const object = interactiveObjects[objectId];
      setFocusedObjectId(objectId);
      setCameraPresetId(object.cameraPresetId);

      if (openDelayRef.current) {
        window.clearTimeout(openDelayRef.current);
      }

      openDelayRef.current = window.setTimeout(() => openOverlay(object.overlayId), 420);
    },
    [openOverlay, setCameraPresetId, setFocusedObjectId],
  );

  const clearHover = useCallback(() => setHoveredObjectId(null), [setHoveredObjectId]);

  useEffect(
    () => () => {
      if (openDelayRef.current) {
        window.clearTimeout(openDelayRef.current);
      }
    },
    [],
  );

  return {
    focusObject,
    setHoveredObjectId,
    clearHover,
  };
};
