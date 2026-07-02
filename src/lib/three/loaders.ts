import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import type { WebGLRenderer } from "three";

export const loaderExtensions = [".glb", ".gltf", ".drc", ".ktx2", ".hdr", ".exr"] as const;

export const decoderPaths = {
  draco: "/draco/",
  basis: "/basis/",
} as const;

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

export const createDracoLoader = (): DRACOLoader => {
  const loader = new DRACOLoader();
  loader.setDecoderPath(decoderPaths.draco);
  loader.setDecoderConfig({ type: "wasm" });

  return loader;
};

export const createKtx2Loader = (renderer: WebGLRenderer): KTX2Loader => {
  const loader = new KTX2Loader();
  loader.setTranscoderPath(decoderPaths.basis);
  loader.detectSupport(renderer);

  return loader;
};

export const createOptimizedGltfLoader = (renderer: WebGLRenderer): GLTFLoader => {
  const dracoLoader = createDracoLoader();
  const ktx2Loader = createKtx2Loader(renderer);
  const loader = new GLTFLoader();

  loader.setDRACOLoader(dracoLoader);
  loader.setKTX2Loader(ktx2Loader);

  return loader;
};

export const disposeOptimizedGltfLoader = (loader: GLTFLoader): void => {
  loader.dracoLoader?.dispose();
  loader.ktx2Loader?.dispose();
};
