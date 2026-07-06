export interface PerformanceSlice {
  averageFps: number;
  setAverageFps: (averageFps: number) => void;
}

export const createPerformanceSlice = (
  set: (partial: Partial<PerformanceSlice>) => void,
): PerformanceSlice => ({
  averageFps: 60,
  setAverageFps: (averageFps) => set({ averageFps }),
});
