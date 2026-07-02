import { readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const modelDirectories = [
  resolve(process.cwd(), "public/models"),
  resolve(process.cwd(), "public/assets/models"),
];
const allowedExtensions = new Set([".glb", ".gltf"]);
const maxModelSizeBytes = 5 * 1024 * 1024;

const collectFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });

const files = modelDirectories.flatMap(collectFiles);
const invalidFiles = files.filter((file) => !allowedExtensions.has(extname(file).toLowerCase()));
const oversizedFiles = files.filter((file) => statSync(file).size > maxModelSizeBytes);

if (invalidFiles.length > 0) {
  console.error(`Unsupported model files: ${invalidFiles.join(", ")}`);
  process.exit(1);
}

if (oversizedFiles.length > 0) {
  console.error(`Model files exceed 5 MB budget: ${oversizedFiles.join(", ")}`);
  process.exit(1);
}

console.log(`Model validation passed for ${files.length} files.`);
