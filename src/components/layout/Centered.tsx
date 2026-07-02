import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Centered({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid min-h-dvh place-items-center p-6", className)} {...props} />;
}
