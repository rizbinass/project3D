import { cn } from "@/lib/utils/cn";

export interface SpacerProps {
  size?: "4" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "64";
  axis?: "x" | "y";
  className?: string;
}

const sizeClasses = {
  "4": { x: "w-1", y: "h-1" },
  "8": { x: "w-2", y: "h-2" },
  "12": { x: "w-3", y: "h-3" },
  "16": { x: "w-4", y: "h-4" },
  "20": { x: "w-5", y: "h-5" },
  "24": { x: "w-6", y: "h-6" },
  "32": { x: "w-8", y: "h-8" },
  "40": { x: "w-10", y: "h-10" },
  "48": { x: "w-12", y: "h-12" },
  "64": { x: "w-16", y: "h-16" },
} as const;

export function Spacer({ size = "16", axis = "y", className }: SpacerProps) {
  return <div aria-hidden className={cn("shrink-0", sizeClasses[size][axis], className)} />;
}
