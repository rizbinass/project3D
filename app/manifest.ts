import type { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "3D Portfolio",
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    categories: ["portfolio", "productivity", "design", "developer"],
    background_color: "#05070a",
    theme_color: "#05070a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Open Portfolio Room",
        short_name: "Room",
        description: "Launch the interactive 3D portfolio workspace.",
        url: "/",
        icons: [{ src: "/icon.png", sizes: "512x512" }],
      },
    ],
  };
}
