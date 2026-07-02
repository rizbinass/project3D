import type { ReactNode } from "react";
import { Card } from "./Card";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  description?: string;
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <Card>
      <p className="text-text-muted text-xs font-medium tracking-[0.16em] uppercase">{label}</p>
      <div className="text-text-primary mt-3 text-3xl font-semibold">{value}</div>
      {description && <p className="text-text-secondary mt-2 text-sm">{description}</p>}
    </Card>
  );
}
