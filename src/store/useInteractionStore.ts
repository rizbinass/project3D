import { create } from "zustand";
import { createInteractionSlice, type InteractionSlice } from "./slices/interaction.slice";

export const useInteractionStore = create<InteractionSlice>()((set) => createInteractionSlice(set));
