import type { PointerType } from "@/core/types/global.types";
import type { InteractiveObjectId } from "@/core/types/scene.types";

export interface InteractionSlice {
  hoveredObjectId: InteractiveObjectId | null;
  pointerType: PointerType;
  setHoveredObjectId: (hoveredObjectId: InteractiveObjectId | null) => void;
  setPointerType: (pointerType: PointerType) => void;
}

type InteractionSliceSetter = (
  partial: Partial<InteractionSlice> | ((state: InteractionSlice) => Partial<InteractionSlice>),
) => void;

export const createInteractionSlice = (set: InteractionSliceSetter): InteractionSlice => ({
  hoveredObjectId: null,
  pointerType: "unknown",
  setHoveredObjectId: (hoveredObjectId) => set({ hoveredObjectId }),
  setPointerType: (pointerType) => set({ pointerType }),
});
