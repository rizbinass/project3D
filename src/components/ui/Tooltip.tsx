"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "z-tooltip border-border bg-card text-text-secondary shadow-floating pointer-events-none absolute bottom-full left-1/2 mb-2 max-w-xs -translate-x-1/2 rounded-sm border px-2.5 py-1.5 text-xs whitespace-nowrap",
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
