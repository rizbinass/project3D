import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  children,
  className,
}: FormFieldProps) {
  const descriptionId = description ? `${htmlFor}-description` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={htmlFor} className="text-text-primary text-sm font-medium">
        {label}
      </label>
      {children}
      {description && (
        <p id={descriptionId} className="text-text-muted text-xs leading-5">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-danger text-xs leading-5">
          {error}
        </p>
      )}
    </div>
  );
}
