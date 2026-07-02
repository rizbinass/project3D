import { X } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { IconButton } from "./IconButton";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
}

export function Chip({
  className,
  children,
  onRemove,
  removeLabel = "Remove",
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "border-border bg-surface text-text-secondary inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-sm",
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <IconButton
          icon={X}
          label={removeLabel}
          variant="ghost"
          size="circle"
          className="-mr-2 size-6"
          onClick={onRemove}
        />
      )}
    </span>
  );
}
