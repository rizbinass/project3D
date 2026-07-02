import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-[var(--container-reading)]",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[var(--container-page)]",
  full: "max-w-none",
} as const;

export function Container({ size = "xl", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-[var(--spacing-container)]", sizeClasses[size], className)}
      {...props}
    />
  );
}
