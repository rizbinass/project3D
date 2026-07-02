import { envConfig } from "./env.config";

export const analyticsConfig = {
  enabled: envConfig.analyticsEnabled,
  id: envConfig.analyticsId,
} as const;
