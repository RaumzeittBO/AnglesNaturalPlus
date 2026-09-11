export const TRANSITIONS = {
  soft: { type: "spring", stiffness: 120, damping: 20 },
  snappy: { type: "spring", stiffness: 260, damping: 25 },
  editorial: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  gentle: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.editorial,
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};