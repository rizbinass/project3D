import { create } from "zustand";
import { createAppSlice, type AppSlice } from "./slices/app.slice";

export const useAppStore = create<AppSlice>()((set) => createAppSlice(set));
