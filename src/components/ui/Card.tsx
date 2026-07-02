import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { cardSurface, glassSurface } from "./styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        cardSurface,
        "p-6",
        interactive && "duration-normal hover:shadow-medium transition hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function GlassCard({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        glassSurface,
        "relative overflow-hidden rounded-lg p-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[var(--glass-reflection)] before:content-['']",
        interactive &&
          "duration-normal transition hover:-translate-y-0.5 hover:bg-[var(--glass-hover)]",
        className,
      )}
      {...props}
    />
  );
}
