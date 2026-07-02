export const loaderExtensions = [".glb", ".gltf", ".ktx2", ".hdr", ".exr"] as const;

export const modelCache = new Map<string, unknown>();

export const textureCache = new Map<string, unknown>();

export const registerCachedAsset = <TAsset>(
  cache: Map<string, unknown>,
  key: string,
  asset: TAsset,
): TAsset => {
  cache.set(key, asset);
  return asset;
};
