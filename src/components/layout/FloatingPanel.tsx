import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { glassSurface } from "@/components/ui/styles";

export function FloatingPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(glassSurface, "rounded-lg p-4", className)} {...props} />;
}
