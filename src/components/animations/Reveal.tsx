"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants } from "@/lib/animation/motion-variants";

export interface RevealProps extends MotionProps {
  children: ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
