"use client";

import { useMemo } from "react";
import {
  BoxGeometry,
  CapsuleGeometry,
  ConeGeometry,
  CylinderGeometry,
  TorusGeometry,
  type BufferGeometry,
} from "three";

export interface GeometryLibrary {
  box: BufferGeometry;
  thinBox: BufferGeometry;
  cylinderLow: BufferGeometry;
  cylinderMedium: BufferGeometry;
  cone: BufferGeometry;
  capsule: BufferGeometry;
  torus: BufferGeometry;
}

export const useGeometryLibrary = (): GeometryLibrary =>
  useMemo(
    () => ({
      box: new BoxGeometry(1, 1, 1),
      thinBox: new BoxGeometry(1, 1, 1),
      cylinderLow: new CylinderGeometry(1, 1, 1, 12),
      cylinderMedium: new CylinderGeometry(1, 1, 1, 24),
      cone: new ConeGeometry(1, 1, 20),
      capsule: new CapsuleGeometry(1, 1, 6, 12),
      torus: new TorusGeometry(1, 0.12, 8, 24),
    }),
    [],
  );

export const disposeGeometryLibrary = (geometries: GeometryLibrary): void => {
  Object.values(geometries).forEach((geometry) => geometry.dispose());
};
