import * as React from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface WorldBackdropProps {
  /** Asset URL from public/. */
  src: string;
  type?: "image" | "video";
  /** Dark scrim so white text + glass read clearly over the world art. */
  scrim?: boolean;
  /** Slow scroll-linked scale/drift on the media. Reduced-motion safe. */
  parallax?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Full-bleed JABA-world background (image or video) with a dark gradient
 * scrim. Foreground content is rendered above the scrim. Optional gentle
 * scroll parallax on the media itself.
 */
export function WorldBackdrop({
  src,
  type = "image",
  scrim = true,
  parallax = false,
  className,
  children,
}: WorldBackdropProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const flat = !parallax || reduce;
  // Slight overscan so the drift never reveals an edge.
  const scale = useTransform(scrollYProgress, [0, 1], flat ? [1.06, 1.06] : [1.06, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], flat ? ["0%", "0%"] : ["-3%", "3%"]);

  const mediaClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden bg-black", className)}>
      {type === "video" ? (
        <motion.video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className={mediaClass}
          style={{ scale, y }}
        />
      ) : (
        <motion.img
          src={src}
          alt=""
          aria-hidden
          className={mediaClass}
          style={{ scale, y }}
        />
      )}

      {scrim ? (
        // Static (no parallax transform) so the gradient's pure-black bottom
        // lines up exactly with the section's clipped bottom edge. Scaling the
        // scrim with the image pushed the 100% black point below the visible
        // area, leaving a faint image seam against the next section.
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.52) 28%, rgba(0,0,0,0.62) 52%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,1) 92%, rgba(0,0,0,1) 100%)",
          }}
        />
      ) : null}

      <div className="relative">{children}</div>
    </div>
  );
}
