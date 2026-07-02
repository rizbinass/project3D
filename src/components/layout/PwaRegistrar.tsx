"use client";

import { useEffect } from "react";

export function PwaRegistrar() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator) ||
      window.location.protocol !== "https:"
    ) {
      return;
    }

    const registerServiceWorker = async (): Promise<void> => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Service worker registration failed", error);
        }
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
