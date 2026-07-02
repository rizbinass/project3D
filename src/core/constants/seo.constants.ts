import { APP_DESCRIPTION, APP_NAME } from "./app.constants";

export const SEO_DEFAULTS = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  ogImagePath: "/og-image.jpg",
  twitterCard: "summary_large_image",
} as const;
