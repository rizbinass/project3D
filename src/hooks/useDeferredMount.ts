"use client";

import { useEffect, useState } from "react";

export const useDeferredMount = (delay = 1400): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let idleHandle: number | null = null;
    const timeout = window.setTimeout(() => {
      if (window.requestIdleCallback) {
        idleHandle = window.requestIdleCallback(() => setMounted(true), {
          timeout: 900,
        });
        return;
      }

      setMounted(true);
    }, delay);

    return () => {
      window.clearTimeout(timeout);

      if (idleHandle !== null) {
        window.cancelIdleCallback(idleHandle);
      }
    };
  }, [delay]);

  return mounted;
};
