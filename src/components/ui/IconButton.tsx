"use client";

import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { Button, type ButtonVariant } from "./Button";
import { Icon } from "./Icon";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  variant?: ButtonVariant;
  size?: "icon" | "circle";
  loading?: boolean;
}

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "icon",
  loading,
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      title={label}
      variant={variant}
      size={size}
      loading={loading}
      {...props}
    >
      {!loading && <Icon icon={icon} animated />}
    </Button>
  );
}
