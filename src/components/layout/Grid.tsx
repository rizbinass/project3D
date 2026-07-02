import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "16" | "24" | "32";
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  auto: "grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]",
} as const;

const gapClasses = {
  "16": "gap-4",
  "24": "gap-6",
  "32": "gap-8",
} as const;

export function Grid({ columns = "auto", gap = "24", className, ...props }: GridProps) {
  return (
    <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)} {...props} />
  );
}
