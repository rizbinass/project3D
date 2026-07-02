"use client";

import { useEffect, useRef } from "react";

export const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): void => {
  const listenerRef = useRef(listener);

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    const handler = (event: WindowEventMap[K]): void => listenerRef.current(event);

    window.addEventListener(type, handler, options);

    return () => window.removeEventListener(type, handler, options);
  }, [type, options]);
};
