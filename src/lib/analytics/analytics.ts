import { analyticsConfig } from "@/core/config/analytics.config";
import type { AnalyticsEventName } from "./events";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null;
}

export const trackEvent = (name: AnalyticsEventName, payload: AnalyticsPayload = {}): void => {
  if (!analyticsConfig.enabled || typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("portfolio-analytics", {
      detail: {
        name,
        payload,
      },
    }),
  );
};
