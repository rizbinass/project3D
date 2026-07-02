"use client";

import { useEffect, type RefObject } from "react";

export const useOutsideClick = <TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  enabled: boolean,
  onOutsideClick: () => void,
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [enabled, onOutsideClick, ref]);
};
