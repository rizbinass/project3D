export const serverEnvConfig = {
  contactEmailTo: process.env.CONTACT_EMAIL_TO ?? "",
  contactEmailFrom: process.env.CONTACT_EMAIL_FROM ?? "",
  contactProviderApiKey: process.env.CONTACT_PROVIDER_API_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  vercelAnalyticsId: process.env.VERCEL_ANALYTICS_ID ?? "",
} as const;
