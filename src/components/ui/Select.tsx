"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { controlBase, controlInvalid } from "./styles";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, invalid, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          controlBase,
          "h-11 appearance-none px-4 pr-10",
          invalid && controlInvalid,
          className,
        )}
        {...props}
      >
        {children}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        icon={ChevronDown}
        size="sm"
        tone="muted"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
      />
    </div>
  ),
);

Select.displayName = "Select";
