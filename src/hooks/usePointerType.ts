"use client";

import { useEffect, useState } from "react";
import type { PointerType } from "@/core/types/global.types";

export const usePointerType = (): PointerType => {
  const [pointerType, setPointerType] = useState<PointerType>("unknown");

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent): void => {
      setPointerType(event.pointerType === "" ? "unknown" : (event.pointerType as PointerType));
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return pointerType;
};
