export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const blurReveal = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export const defaultTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const staggerContainer = {
  visible: { transition: { staggerChildren: 0.08 } },
};
