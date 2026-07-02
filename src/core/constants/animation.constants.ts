export const DURATIONS = {
  instant: 0,
  fast: 0.16,
  normal: 0.26,
  slow: 0.44,
  verySlow: 0.72,
  cinematic: 1.2,
} as const;

export const EASINGS = {
  standard: [0.2, 0, 0, 1],
  easeIn: [0.32, 0, 0.67, 0],
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  emphasized: [0.16, 1, 0.3, 1],
  exit: [0.32, 0, 0.67, 0],
} as const;
