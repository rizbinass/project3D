import { readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const publicDirectory = resolve(process.cwd(), "public/assets");
const manifestPath = resolve(process.cwd(), "public/assets/asset-manifest.json");

const kindByExtension = new Map([
  [".glb", "model"],
  [".gltf", "model"],
  [".ktx2", "texture"],
  [".webp", "image"],
  [".avif", "image"],
  [".png", "image"],
  [".jpg", "image"],
  [".jpeg", "image"],
  [".mp4", "video"],
  [".webm", "video"],
  [".mp3", "audio"],
  [".ogg", "audio"],
  [".pdf", "document"],
  [".hdr", "hdri"],
  [".exr", "hdri"],
]);

const collectAssets = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectAssets(path);
    }

    const extension = extname(entry.name).toLowerCase();
    const kind = kindByExtension.get(extension);

    if (!kind) {
      return [];
    }

    const relativePath = `/${relative(resolve(process.cwd(), "public"), path).replaceAll("\\", "/")}`;

    return [
      {
        id: relativePath.replace(/^\/assets\//, "").replace(/\.[^.]+$/, ""),
        kind,
        path: relativePath,
        byteSize: statSync(path).size,
        preloadPriority: "lazy",
      },
    ];
  });

const manifest = collectAssets(publicDirectory);

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated asset manifest with ${manifest.length} entries.`);
