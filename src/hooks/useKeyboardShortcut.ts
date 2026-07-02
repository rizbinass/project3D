"use client";

import { useEventListener } from "./useEventListener";

interface KeyboardShortcutOptions {
  key: string;
  enabled?: boolean;
  onMatch: (event: KeyboardEvent) => void;
}

export const useKeyboardShortcut = ({
  key,
  enabled = true,
  onMatch,
}: KeyboardShortcutOptions): void => {
  useEventListener("keydown", (event) => {
    if (!enabled || event.key.toLowerCase() !== key.toLowerCase()) {
      return;
    }

    onMatch(event);
  });
};
