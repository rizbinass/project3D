import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";

export interface SpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-9",
} as const;

export function Spinner({ label = "Loading", size = "md", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Icon icon={Loader2} className={cn("animate-spin", sizeClasses[size])} />
    </span>
  );
}
