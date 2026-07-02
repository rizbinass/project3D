import { create } from "zustand";
import { createSceneSlice, type SceneSlice } from "./slices/scene.slice";

export const useSceneStore = create<SceneSlice>()((set) => createSceneSlice(set));
