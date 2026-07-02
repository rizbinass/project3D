"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export type CursorState = "idle" | "hover" | "click" | "loading" | "interactive" | "disabled";

export function CustomCursor({ state = "idle" }: { state?: CursorState }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(event.pointerType === "mouse");
    };
    const handlePointerLeave = (): void => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={cn(
        "border-accent duration-fast pointer-events-none fixed z-[var(--z-critical)] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-[width,height,opacity,background-color]",
        state === "hover" && "bg-accent/10 size-7",
        state === "click" && "bg-accent size-3",
        state === "loading" && "border-warning size-8 animate-pulse",
        state === "interactive" && "border-accent bg-accent/15 size-9",
        state === "disabled" && "border-danger opacity-40",
      )}
      style={{ left: position.x, top: position.y }}
    />
  );
}
