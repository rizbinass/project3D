import { create } from "zustand";
import { createOverlaySlice, type OverlaySlice } from "./slices/overlay.slice";

export const useOverlayStore = create<OverlaySlice>()((set) => createOverlaySlice(set));
