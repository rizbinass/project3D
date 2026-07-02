"use client";

import { useEffect, useState } from "react";
import { useSceneStore } from "@/store/useSceneStore";

export const useRoomBoot = (): boolean => {
  const [ready, setReady] = useState(false);
  const setSceneStatus = useSceneStore((state) => state.setSceneStatus);

  useEffect(() => {
    setSceneStatus("booting");
    const timeout = window.setTimeout(() => {
      setReady(true);
      setSceneStatus("ready");
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [setSceneStatus]);

  return ready;
};
