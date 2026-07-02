"use client";

import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import { useAppStore } from "@/store/useAppStore";
import { useInteractionStore } from "@/store/useInteractionStore";

export function GlobalStoreProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const pointerType = usePointerType();
  const setReducedMotion = useAppStore((state) => state.setReducedMotion);
  const setPointerType = useInteractionStore((state) => state.setPointerType);

  useEffect(() => {
    setReducedMotion(reducedMotion);
  }, [reducedMotion, setReducedMotion]);

  useEffect(() => {
    setPointerType(pointerType);
  }, [pointerType, setPointerType]);

  return children;
}
