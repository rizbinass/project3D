import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const inputDirectories = [
  resolve(process.cwd(), "public/models"),
  resolve(process.cwd(), "public/assets/models"),
];
const outputDirectory = resolve(process.cwd(), "public/assets/models/optimized");
const allowedExtensions = new Set([".glb", ".gltf"]);
const maxModelSizeBytes = 5 * 1024 * 1024;

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
const sourceModels = files.filter((file) => allowedExtensions.has(extname(file).toLowerCase()));
const invalidFiles = files.filter((file) => !allowedExtensions.has(extname(file).toLowerCase()));

if (invalidFiles.length > 0) {
  console.error(`Unsupported model files: ${invalidFiles.join(", ")}`);
  process.exit(1);
}

mkdirSync(outputDirectory, { recursive: true });

sourceModels.forEach((file) => {
  const name = basename(file, extname(file));
  const output = join(outputDirectory, `${name}.optimized.glb`);
  const result = spawnSync(
    "pnpm",
    [
      "exec",
      "gltf-transform",
      "optimize",
      file,
      output,
      "--compress",
      "draco",
      "--texture-compress",
      "ktx2",
      "--texture-size",
      "2048",
    ],
    { stdio: "inherit", shell: process.platform === "win32" },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  if (statSync(output).size > maxModelSizeBytes) {
    console.error(`Optimized model exceeds 5 MB budget: ${output}`);
    process.exit(1);
  }
});

console.log(`Model optimization completed for ${sourceModels.length} file(s).`);
