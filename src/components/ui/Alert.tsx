import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title: string;
  description?: string;
}

const toneClasses = {
  info: "border-info/30 bg-info/10 text-info",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
} as const;

const toneIcons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const;

export function Alert({ tone = "info", title, description, className, ...props }: AlertProps) {
  return (
    <div
      role="status"
      className={cn("flex gap-3 rounded-lg border p-4", toneClasses[tone], className)}
      {...props}
    >
      <Icon icon={toneIcons[tone]} tone={tone} className="mt-0.5" />
      <div>
        <p className="text-text-primary text-sm font-medium">{title}</p>
        {description && <p className="text-text-secondary mt-1 text-sm leading-6">{description}</p>}
      </div>
    </div>
  );
}
