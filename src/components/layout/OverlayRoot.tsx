import type { ReactNode } from "react";

export function OverlayRoot({ children }: { children: ReactNode }) {
  return <div id="overlay-root">{children}</div>;
}
