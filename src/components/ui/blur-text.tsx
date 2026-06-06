import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface BlurTextProps {
  text: string;
  className?: string;
  delayStep?: number;
  as?: "h1" | "h2" | "p" | "div" | "span";
}

export function BlurText({
  text,
  className,
  delayStep = 0.1,
  as = "h1",
}: BlurTextProps) {
  const words = React.useMemo(() => text.split(" "), [text]);
  const ref = React.useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
          animate={
            isVisible
              ? {
                  opacity: [0, 0.5, 1],
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  y: [50, -5, 0],
                }
              : { opacity: 0, filter: "blur(10px)", y: 50 }
          }
          transition={{
            delay: index * delayStep,
            duration: 0.35,
            ease: "easeOut",
          }}
          className="inline-block will-change-transform"
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
