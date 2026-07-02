export type OverlayId =
  | "projects"
  | "skills"
  | "about"
  | "contact"
  | "resume"
  | "photography"
  | "certificates"
  | "experience"
  | "music";

export interface OverlaySlice {
  activeOverlay: OverlayId | null;
  isOverlayOpen: boolean;
  lastOpenedOverlay: OverlayId | null;
  openOverlay: (activeOverlay: OverlayId) => void;
  closeOverlay: () => void;
}

export const createOverlaySlice = (
  set: (partial: Partial<OverlaySlice>) => void,
): OverlaySlice => ({
  activeOverlay: null,
  isOverlayOpen: false,
  lastOpenedOverlay: null,
  openOverlay: (activeOverlay) =>
    set({ activeOverlay, isOverlayOpen: true, lastOpenedOverlay: activeOverlay }),
  closeOverlay: () => set({ activeOverlay: null, isOverlayOpen: false }),
});
