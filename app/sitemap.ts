import type { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
