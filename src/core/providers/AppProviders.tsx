"use client";

import type { ReactNode } from "react";
import { AnimationProvider } from "./AnimationProvider";
import { GlobalStoreProvider } from "./GlobalStoreProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ThreeProvider } from "./ThreeProvider";
import { PwaRegistrar } from "@/components/layout/PwaRegistrar";
import { ToastProvider } from "@/components/ui/Toast";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <GlobalStoreProvider>
        <AnimationProvider>
          <ThreeProvider>
            <SmoothScrollProvider>
              <ToastProvider>
                <PwaRegistrar />
                {children}
              </ToastProvider>
            </SmoothScrollProvider>
          </ThreeProvider>
        </AnimationProvider>
      </GlobalStoreProvider>
    </ThemeProvider>
  );
}
