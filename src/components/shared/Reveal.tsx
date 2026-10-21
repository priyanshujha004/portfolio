"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, defaultTransition } from "@/constants/animation";
import type { ReactNode } from "react";

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
}: {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
