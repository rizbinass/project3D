import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface IconProps {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  tone?: "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "danger" | "info";
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
  "aria-hidden"?: boolean;
}

const sizeClasses = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

const toneClasses = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
} as const;

export function Icon({
  icon: LucideIcon,
  size = "md",
  tone = "primary",
  strokeWidth = 1.8,
  animated = false,
  className,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <LucideIcon
      aria-hidden={ariaHidden}
      strokeWidth={strokeWidth}
      className={cn(
        "duration-normal ease-standard shrink-0 transition-transform",
        sizeClasses[size],
        toneClasses[tone],
        animated && "group-hover:scale-105 group-active:scale-95",
        className,
      )}
    />
  );
}
