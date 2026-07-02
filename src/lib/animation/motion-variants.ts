import { DURATIONS, EASINGS } from "@/core/constants/animation.constants";

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.standard,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.exit,
    },
  },
} as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.emphasized,
    },
  },
} as const;

export const slideVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.standard,
    },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.exit,
    },
  },
} as const;

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.emphasized,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.exit,
    },
  },
} as const;

export const rotateVariants = {
  idle: { rotate: 0 },
  active: {
    rotate: 180,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.standard,
    },
  },
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.04,
    },
  },
} as const;

export const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

export const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.emphasized,
    },
  },
  tap: { scale: 0.98 },
} as const;

export const parallaxDefaults = {
  offset: 40,
  ease: EASINGS.standard,
} as const;
