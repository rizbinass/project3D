import { create } from "zustand";

interface DayNightStore {
  isNight: boolean;
  toggle: () => void;
}

export const useDayNightStore = create<DayNightStore>((set) => ({
  isNight: false,
  toggle: () => set((state) => ({ isNight: !state.isNight })),
}));
