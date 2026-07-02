import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "4" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "48";
}

const gapClasses = {
  "4": "gap-1",
  "8": "gap-2",
  "12": "gap-3",
  "16": "gap-4",
  "20": "gap-5",
  "24": "gap-6",
  "32": "gap-8",
  "40": "gap-10",
  "48": "gap-12",
};

export function Stack({ gap = "16", className, ...props }: StackProps) {
  return <div className={cn("flex flex-col", gapClasses[gap], className)} {...props} />;
}
