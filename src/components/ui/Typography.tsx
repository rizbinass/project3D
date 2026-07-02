import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TypographyVariant =
  | "display-xl"
  | "display-l"
  | "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption"
  | "overline"
  | "code";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "code";
  variant?: TypographyVariant;
  children: ReactNode;
}

const variantClasses: Record<TypographyVariant, string> = {
  "display-xl": "text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-normal",
  "display-l": "text-[clamp(3rem,6vw,6rem)] font-semibold leading-none tracking-normal",
  "heading-xl": "text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-tight tracking-normal",
  "heading-l": "text-[clamp(1.875rem,3vw,3rem)] font-semibold leading-tight tracking-normal",
  "heading-m": "text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-tight tracking-normal",
  "heading-s": "text-xl font-semibold leading-snug tracking-normal",
  "body-lg": "text-lg leading-8 text-text-secondary",
  "body-md": "text-base leading-7 text-text-secondary",
  "body-sm": "text-sm leading-6 text-text-secondary",
  caption: "text-xs leading-5 text-text-muted",
  overline: "text-[0.6875rem] font-semibold uppercase leading-5 tracking-[0.16em] text-text-muted",
  code: "font-mono text-sm leading-6 text-accent",
};

export function Typography({
  as: Component = "p",
  variant = "body-md",
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
