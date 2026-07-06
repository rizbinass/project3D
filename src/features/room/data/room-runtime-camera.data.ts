import type { CameraState } from "@/core/types/scene.types";
import type { Object3D } from "three";

let fittedRoomCameraState: CameraState | null = null;
let roomSceneRoot: Object3D | null = null;

export const setFittedRoomCameraState = (cameraState: CameraState): void => {
  fittedRoomCameraState = cameraState;
};

export const getFittedRoomCameraState = (): CameraState | null => fittedRoomCameraState;

export const setRoomSceneRoot = (root: Object3D): void => {
  roomSceneRoot = root;
};

export const getRoomSceneRoot = (): Object3D | null => roomSceneRoot;
