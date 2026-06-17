import * as React from "react";
import { cn } from "@/lib/utils";

interface WorldBackdropProps {
  /** Asset URL from public/. */
  src: string;
  type?: "image" | "video";
  /** Dark scrim so white text + glass read clearly over the world art. */
  scrim?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Full-bleed JABA-world background (image or video) with a dark gradient
 * scrim. Foreground content is rendered above the scrim.
 */
export function WorldBackdrop({
  src,
  type = "image",
  scrim = true,
  className,
  children,
}: WorldBackdropProps) {
  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      {type === "video" ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {scrim ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.62) 70%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      ) : null}

      <div className="relative">{children}</div>
    </div>
  );
}
