import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";

const inputDirectories = [
  resolve(process.cwd(), "public/textures"),
  resolve(process.cwd(), "public/assets/textures"),
  resolve(process.cwd(), "public/hdri"),
];
const outputDirectory = resolve(process.cwd(), "public/assets/textures/compressed");
const imageExtensions = new Set([".png", ".jpg", ".jpeg"]);
const productionExtensions = new Set([".ktx2", ".webp", ".avif", ".hdr", ".exr"]);
const maxTextureSizeBytes = 8 * 1024 * 1024;
const maxDimension = 2048;

const collectFiles = (directory) => {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return path === outputDirectory ? [] : collectFiles(path);
    }

    return [path];
  });
};

const files = inputDirectories.flatMap(collectFiles);
const unsupportedFiles = files.filter((file) => {
  const extension = extname(file).toLowerCase();
  return !productionExtensions.has(extension) && !imageExtensions.has(extension);
});

if (unsupportedFiles.length > 0) {
  console.error(`Unsupported texture files: ${unsupportedFiles.join(", ")}`);
  process.exit(1);
}

mkdirSync(outputDirectory, { recursive: true });

const sourceImages = files.filter((file) => imageExtensions.has(extname(file).toLowerCase()));

await Promise.all(
  sourceImages.map(async (file) => {
    const name = basename(file, extname(file));
    const output = join(outputDirectory, `${name}.webp`);

    await sharp(file)
      .resize({
        width: maxDimension,
        height: maxDimension,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 6 })
      .toFile(output);

    if (statSync(output).size > maxTextureSizeBytes) {
      throw new Error(`Compressed texture exceeds 8 MB budget: ${output}`);
    }
  }),
);

const oversizedProductionFiles = files.filter(
  (file) =>
    productionExtensions.has(extname(file).toLowerCase()) &&
    statSync(file).size > maxTextureSizeBytes,
);

if (oversizedProductionFiles.length > 0) {
  console.error(`Texture files exceed 8 MB budget: ${oversizedProductionFiles.join(", ")}`);
  process.exit(1);
}

console.log(`Texture compression completed for ${sourceImages.length} source image(s).`);
