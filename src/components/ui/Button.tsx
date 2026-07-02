"use client";

import { Loader2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import { focusRing } from "./styles";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger" | "success" | "warning";
export type ButtonSize = "sm" | "md" | "lg" | "icon" | "circle";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-background shadow-soft hover:bg-text-secondary",
  secondary: "bg-surface text-text-primary hover:bg-card",
  outline: "border border-border bg-transparent text-text-primary hover:bg-surface",
  ghost: "bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary",
  glass:
    "border border-[var(--glass-border)] bg-glass text-text-primary shadow-glass backdrop-blur-[var(--glass-blur)] hover:bg-[var(--glass-hover)]",
  danger: "bg-danger text-background shadow-soft hover:brightness-110",
  success: "bg-success text-background shadow-soft hover:brightness-110",
  warning: "bg-warning text-background shadow-soft hover:brightness-105",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-3 text-sm",
  md: "h-11 gap-2.5 px-4 text-sm",
  lg: "h-12 gap-3 px-5 text-base",
  icon: "size-10 p-0",
  circle: "size-11 rounded-full p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "group duration-normal ease-standard inline-flex items-center justify-center rounded-md font-medium tracking-normal transition select-none disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <Icon icon={Loader2} size="sm" className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  ),
);

Button.displayName = "Button";
