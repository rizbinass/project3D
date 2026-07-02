const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

const readBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  return TRUE_VALUES.has(value.trim().toLowerCase());
};

export const envConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Interactive 3D Portfolio Room",
  siteCreator: process.env.NEXT_PUBLIC_SITE_CREATOR ?? "Portfolio Owner",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "",
  analyticsEnabled: readBoolean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS, false),
  audioEnabled: readBoolean(process.env.NEXT_PUBLIC_ENABLE_AUDIO, false),
  debugPanelEnabled: readBoolean(process.env.NEXT_PUBLIC_ENABLE_DEBUG_PANEL, false),
} as const;
