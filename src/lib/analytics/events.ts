export const analyticsEvents = {
  objectFocused: "object_focused",
  overlayOpened: "overlay_opened",
  overlayClosed: "overlay_closed",
  contactSubmitted: "contact_submitted",
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];
