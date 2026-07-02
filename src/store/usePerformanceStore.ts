import { create } from "zustand";
import { createPerformanceSlice, type PerformanceSlice } from "./slices/performance.slice";

export const usePerformanceStore = create<PerformanceSlice>()((set) => createPerformanceSlice(set));
