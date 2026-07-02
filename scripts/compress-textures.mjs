import { readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const textureDirectories = [
  resolve(process.cwd(), "public/textures"),
  resolve(process.cwd(), "public/assets/textures"),
  resolve(process.cwd(), "public/hdri"),
];
const productionExtensions = new Set([".ktx2", ".webp", ".avif", ".hdr", ".exr"]);
const discouragedExtensions = new Set([".png", ".jpg", ".jpeg"]);
const maxTextureSizeBytes = 8 * 1024 * 1024;

const collectFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });

const files = textureDirectories.flatMap(collectFiles);
const unsupportedFiles = files.filter((file) => {
  const extension = extname(file).toLowerCase();
  return !productionExtensions.has(extension) && !discouragedExtensions.has(extension);
});
const oversizedFiles = files.filter((file) => statSync(file).size > maxTextureSizeBytes);

if (unsupportedFiles.length > 0) {
  console.error(`Unsupported texture files: ${unsupportedFiles.join(", ")}`);
  process.exit(1);
}

if (oversizedFiles.length > 0) {
  console.error(`Texture files exceed 8 MB budget: ${oversizedFiles.join(", ")}`);
  process.exit(1);
}

console.log(`Texture validation passed for ${files.length} files.`);
