import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: "4" | "8" | "12" | "16" | "20" | "24" | "32";
  direction?: "row" | "col";
  wrap?: boolean;
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};
const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};
const gapClasses = {
  "4": "gap-1",
  "8": "gap-2",
  "12": "gap-3",
  "16": "gap-4",
  "20": "gap-5",
  "24": "gap-6",
  "32": "gap-8",
};

export function Flex({
  align = "stretch",
  justify = "start",
  gap = "16",
  direction = "row",
  wrap = false,
  className,
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        wrap && "flex-wrap",
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        className,
      )}
      {...props}
    />
  );
}
