export const isBrowser = (): boolean => typeof window !== "undefined";

export const supportsWebGL = (): boolean => {
  if (!isBrowser()) {
    return false;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

  return Boolean(context);
};
