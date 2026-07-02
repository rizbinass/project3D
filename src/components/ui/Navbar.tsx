import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Navbar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "border-border bg-surface flex min-h-14 items-center justify-between gap-4 border-b px-[var(--spacing-container)]",
        className,
      )}
      {...props}
    />
  );
}
