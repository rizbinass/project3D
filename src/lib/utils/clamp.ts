export const clamp = (value: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error("Clamp minimum cannot be greater than maximum.");
  }

  return Math.min(Math.max(value, min), max);
};
