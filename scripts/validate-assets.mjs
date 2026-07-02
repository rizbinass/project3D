import { existsSync } from "node:fs";
import { resolve } from "node:path";

const requiredDirectories = [
  "public/assets/models",
  "public/assets/textures",
  "public/assets/images",
  "public/assets/audio",
  "public/assets/documents",
  "public/models",
  "public/textures",
  "public/hdri",
  "public/audio",
  "public/images",
  "public/fonts",
];

const requiredFiles = [
  "public/icon.png",
  "public/apple-icon.png",
  "public/favicon.ico",
  "public/og-image.jpg",
];

const missingDirectories = requiredDirectories.filter(
  (directory) => !existsSync(resolve(process.cwd(), directory)),
);
const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(process.cwd(), file)));

if (missingDirectories.length > 0) {
  console.error(`Missing asset directories: ${missingDirectories.join(", ")}`);
  process.exit(1);
}

if (missingFiles.length > 0) {
  console.error(`Missing metadata assets: ${missingFiles.join(", ")}`);
  process.exit(1);
}

console.log("Asset validation passed.");
