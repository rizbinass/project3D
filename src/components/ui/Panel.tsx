import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { floatingSurface } from "./styles";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(floatingSurface, "rounded-xl p-6", className)} {...props} />;
}

export function PanelHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 flex items-start justify-between gap-4", className)} {...props} />
  );
}

export function PanelBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-text-secondary text-sm leading-6", className)} {...props} />;
}
