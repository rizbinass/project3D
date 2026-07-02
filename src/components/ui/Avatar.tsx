import type { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
} as const;

export function Avatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface text-text-secondary inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border font-medium",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <Image src={src} alt={alt} width={96} height={96} className="size-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
