"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { selectionFrameBase, selectionLabelBase } from "./styles";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("group", selectionLabelBase, className)}>
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input ref={ref} type="radio" className="peer sr-only" {...props} />
        <span className={cn(selectionFrameBase, "peer-checked:border-accent rounded-full")} />
        <span className="bg-accent relative z-10 size-2 rounded-full opacity-0 transition peer-checked:opacity-100" />
      </span>
      {label && <span>{label}</span>}
    </label>
  ),
);

Radio.displayName = "Radio";
