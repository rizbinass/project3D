"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useIsMounted } from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils/cn";
import { IconButton } from "./IconButton";
import { overlaySurface } from "./styles";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  side?: "left" | "right" | "bottom";
}

const sideClasses = {
  left: "left-0 top-0 h-dvh w-full max-w-md",
  right: "right-0 top-0 h-dvh w-full max-w-md",
  bottom: "bottom-0 left-0 max-h-[88dvh] w-full rounded-t-xl",
} as const;

const sideInitial = {
  left: { x: "-100%" },
  right: { x: "100%" },
  bottom: { y: "100%" },
} as const;

export function Drawer({ open, onOpenChange, title, children, side = "right" }: DrawerProps) {
  const mounted = useIsMounted();
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEscapeKey(open, close);
  useFocusTrap(drawerRef, open);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="z-modal bg-overlay fixed inset-0 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={close}
        >
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={cn(
              overlaySurface,
              "fixed overflow-auto p-6",
              side !== "bottom" && "border-l",
              sideClasses[side],
            )}
            initial={sideInitial[side]}
            animate={{ x: 0, y: 0 }}
            exit={sideInitial[side]}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id={titleId} className="text-text-primary text-lg font-semibold">
                {title}
              </h2>
              <IconButton icon={X} label="Close drawer" onClick={close} />
            </div>
            <div className="mt-6">{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
