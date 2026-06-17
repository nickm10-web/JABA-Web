import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance; smaller for nested/secondary elements. */
  y?: number;
}

/**
 * The JABA fade-up: opacity + small upward drift, eased, once. Honors
 * prefers-reduced-motion (fades only, no travel). The shared entrance for
 * the audience pages.
 */
export function FadeUp({ delay = 0, y = 28, children, ...props }: FadeUpProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
