import type { ReactNode } from "react";

export function AccessibilityLayer({ children }: { children: ReactNode }) {
  return <div id="accessibility-layer">{children}</div>;
}
