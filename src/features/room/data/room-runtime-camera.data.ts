import type { CameraState } from "@/core/types/scene.types";
import type { Object3D } from "three";

let roomSceneRoot: Object3D | null = null;
let initialCameraState: CameraState | null = null;

export const setRoomSceneRoot = (root: Object3D): void => {
  roomSceneRoot = root;
};

export const getRoomSceneRoot = (): Object3D | null => roomSceneRoot;

export const setInitialCameraState = (state: CameraState): void => {
  initialCameraState = state;
};

export const getInitialCameraState = (): CameraState | null => initialCameraState;
