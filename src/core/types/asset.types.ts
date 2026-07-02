export type AssetKind = "model" | "texture" | "image" | "video" | "audio" | "document" | "hdri";

export interface AssetManifestEntry {
  id: string;
  kind: AssetKind;
  path: string;
  preloadPriority: "critical" | "deferred" | "lazy";
  byteSize?: number;
}
