"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { APP_THEME_STORAGE_KEY } from "@/core/constants/app.constants";
import type { ResolvedTheme, ThemeMode } from "@/core/types/global.types";
import { useAppStore } from "@/store/useAppStore";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
  if (mode !== "system") {
    return mode;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const setResolvedTheme = useAppStore((state) => state.setResolvedTheme);
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [resolvedTheme, setResolvedThemeState] = useState<ResolvedTheme>("dark");

  const applyTheme = useCallback(
    (nextMode: ThemeMode): void => {
      const nextResolvedTheme = resolveTheme(nextMode);
      document.documentElement.dataset.theme = nextResolvedTheme;
      document.documentElement.classList.toggle("dark", nextResolvedTheme === "dark");
      setResolvedThemeState(nextResolvedTheme);
      setResolvedTheme(nextResolvedTheme);
    },
    [setResolvedTheme],
  );

  const setMode = useCallback(
    (nextMode: ThemeMode): void => {
      window.localStorage.setItem(APP_THEME_STORAGE_KEY, nextMode);
      setModeState(nextMode);
      applyTheme(nextMode);
    },
    [applyTheme],
  );

  useEffect(() => {
    const storedMode = window.localStorage.getItem(APP_THEME_STORAGE_KEY) as ThemeMode | null;
    const initialMode = storedMode ?? "dark";
    setModeState(initialMode);
    applyTheme(initialMode);
  }, [applyTheme]);

  useEffect(() => {
    if (mode !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (): void => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme, mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
};
