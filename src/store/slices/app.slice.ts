import type { DeviceTier, ResolvedTheme } from "@/core/types/global.types";

export interface AppSlice {
  isBooted: boolean;
  hasSeenExperience: boolean;
  reducedMotion: boolean;
  audioEnabled: boolean;
  deviceTier: DeviceTier;
  resolvedTheme: ResolvedTheme;
  setBooted: (isBooted: boolean) => void;
  setHasSeenExperience: (hasSeenExperience: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setAudioEnabled: (audioEnabled: boolean) => void;
  setDeviceTier: (deviceTier: DeviceTier) => void;
  setResolvedTheme: (resolvedTheme: ResolvedTheme) => void;
}

export const createAppSlice = (set: (partial: Partial<AppSlice>) => void): AppSlice => ({
  isBooted: false,
  hasSeenExperience: false,
  reducedMotion: false,
  audioEnabled: false,
  deviceTier: "high",
  resolvedTheme: "dark",
  setBooted: (isBooted) => set({ isBooted }),
  setHasSeenExperience: (hasSeenExperience) => set({ hasSeenExperience }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setDeviceTier: (deviceTier) => set({ deviceTier }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
});
