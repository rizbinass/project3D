import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export function Section({ spacing = "lg", className, ...props }: SectionProps) {
  return <section className={cn("w-full", spacingClasses[spacing], className)} {...props} />;
}
