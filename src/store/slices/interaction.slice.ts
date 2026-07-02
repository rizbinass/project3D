import type { PointerType } from "@/core/types/global.types";
import type { InteractiveObjectId } from "@/core/types/scene.types";

export interface InteractionSlice {
  hoveredObjectId: InteractiveObjectId | null;
  pressedObjectId: InteractiveObjectId | null;
  pointerType: PointerType;
  isInteractionLocked: boolean;
  keyboardTargetId: InteractiveObjectId | null;
  setHoveredObjectId: (hoveredObjectId: InteractiveObjectId | null) => void;
  setPressedObjectId: (pressedObjectId: InteractiveObjectId | null) => void;
  setPointerType: (pointerType: PointerType) => void;
  setInteractionLocked: (isInteractionLocked: boolean) => void;
  setKeyboardTargetId: (keyboardTargetId: InteractiveObjectId | null) => void;
}

export const createInteractionSlice = (
  set: (partial: Partial<InteractionSlice>) => void,
): InteractionSlice => ({
  hoveredObjectId: null,
  pressedObjectId: null,
  pointerType: "unknown",
  isInteractionLocked: false,
  keyboardTargetId: null,
  setHoveredObjectId: (hoveredObjectId) => set({ hoveredObjectId }),
  setPressedObjectId: (pressedObjectId) => set({ pressedObjectId }),
  setPointerType: (pointerType) => set({ pointerType }),
  setInteractionLocked: (isInteractionLocked) => set({ isInteractionLocked }),
  setKeyboardTargetId: (keyboardTargetId) => set({ keyboardTargetId }),
});
