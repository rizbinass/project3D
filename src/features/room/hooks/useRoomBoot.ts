"use client";

import { useEffect, useState } from "react";

export const useRoomBoot = (): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return ready;
};
