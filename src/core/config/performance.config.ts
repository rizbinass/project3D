export const performanceConfig = {
  defaultDpr: [1, 1.75] as const,
  lowPowerDpr: [0.75, 1] as const,
  fpsSampleSize: 90,
  lowFpsThreshold: 35,
  recoveryFpsThreshold: 52,
} as const;
