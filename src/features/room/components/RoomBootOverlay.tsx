"use client";

import { AnimatePresence, motion } from "framer-motion";

export function RoomBootOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="z-overlay bg-background pointer-events-none absolute inset-0 grid place-items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        >
          <div className="grid justify-items-center gap-5">
            <div className="bg-surface h-1 w-44 overflow-hidden rounded-full">
              <motion.div
                className="bg-accent h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
              />
            </div>
            <p className="text-text-secondary text-sm">Initializing workspace</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
