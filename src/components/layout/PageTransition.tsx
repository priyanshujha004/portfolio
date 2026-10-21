"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { fadeIn, defaultTransition } from "@/constants/animation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={defaultTransition}
    >
      {children}
    </motion.div>
  );
}
