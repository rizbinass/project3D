import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Sidebar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn(
        "border-border bg-surface w-full p-4 lg:min-h-dvh lg:w-80 lg:border-r",
        className,
      )}
      {...props}
    />
  );
}
