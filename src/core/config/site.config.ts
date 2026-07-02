import { APP_DESCRIPTION, APP_LOCALE, APP_NAME } from "@/core/constants/app.constants";
import { envConfig } from "./env.config";

export const siteConfig = {
  name: envConfig.siteName || APP_NAME,
  description: APP_DESCRIPTION,
  locale: APP_LOCALE,
  url: envConfig.siteUrl,
  creator: envConfig.siteCreator,
} as const;
