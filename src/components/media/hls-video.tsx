import Hls from "hls.js";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface HlsVideoProps {
  src: string;
  poster?: string;
  className?: string;
  desaturate?: boolean;
}

export function HlsVideo({
  src,
  poster,
  className,
  desaturate = false,
}: HlsVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={cn(className)}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      style={desaturate ? { filter: "saturate(0)" } : undefined}
    />
  );
}
