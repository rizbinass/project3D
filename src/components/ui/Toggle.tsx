"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { selectionFrameBase, selectionLabelBase } from "./styles";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn(selectionLabelBase, className)}>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input ref={ref} type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span
          className={cn(
            selectionFrameBase,
            "peer-checked:border-accent peer-checked:bg-accent/30 rounded-full",
          )}
        />
        <span className="bg-text-muted shadow-soft peer-checked:bg-accent relative left-1 size-4 rounded-full transition peer-checked:translate-x-5" />
      </span>
      {label && <span>{label}</span>}
    </label>
  ),
);

Toggle.displayName = "Toggle";
