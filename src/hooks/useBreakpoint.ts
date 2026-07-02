"use client";

import { BREAKPOINTS, type Breakpoint } from "@/core/constants/breakpoint.constants";
import { useMediaQuery } from "./useMediaQuery";

export const useBreakpoint = (breakpoint: Breakpoint): boolean =>
  useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
