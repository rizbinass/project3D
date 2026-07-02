"use client";

import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { selectionFrameBase, selectionLabelBase } from "./styles";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("group", selectionLabelBase, className)}>
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
        <span
          className={cn(
            selectionFrameBase,
            "peer-checked:border-accent peer-checked:bg-accent rounded-sm",
          )}
        />
        <Icon
          icon={Check}
          size="xs"
          tone="primary"
          className="text-background relative z-10 opacity-0 transition peer-checked:opacity-100"
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  ),
);

Checkbox.displayName = "Checkbox";
