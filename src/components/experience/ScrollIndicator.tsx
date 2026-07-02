"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = (): void => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable <= 0 ? 0 : window.scrollY / scrollable);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[var(--z-critical)] h-0.5 w-full bg-transparent"
    >
      <div
        className="bg-accent duration-fast h-full transition-[width]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
