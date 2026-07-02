import { useId } from "react";

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function Progress({ value, max = 100, label, className }: ProgressProps) {
  const labelId = useId();
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {label && (
        <div id={labelId} className="text-text-secondary mb-2 text-sm">
          {label}
        </div>
      )}
      <div
        role="progressbar"
        aria-labelledby={label ? labelId : undefined}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="bg-surface h-2 overflow-hidden rounded-full"
      >
        <div
          className="bg-accent duration-slow h-full rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
