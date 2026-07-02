"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { controlBase, controlInvalid } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "placeholder:text-text-muted h-11 px-4",
        invalid && controlInvalid,
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
