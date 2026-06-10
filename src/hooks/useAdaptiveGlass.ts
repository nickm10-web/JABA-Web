import { useEffect, useRef, useState, type RefObject } from "react";

export type GlassTheme = "on-light" | "on-dark";

/** WCAG relative luminance from 0..255 channels. */
function relativeLuminance(r: number, g: number, b: number): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Watches whatever is rendered behind `sampleRef` and returns a glass theme
 * ("on-light" over bright content, "on-dark" over dark content) so a glass
 * surface can keep its frosted look while staying legible.
 *
 * Same-origin <video> elements are sampled via a tiny offscreen canvas so the
 * theme tracks the footage as it plays/scrubs; everything else falls back to
 * the first opaque computed background-color found beneath the sample point.
 */
export function useAdaptiveGlass(
  sampleRef: RefObject<HTMLElement>,
  excludeRef: RefObject<HTMLElement>,
): GlassTheme {
  const [theme, setTheme] = useState<GlassTheme>("on-light");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const target = sampleRef.current;
    if (!target) return;
    if (!canvasRef.current) canvasRef.current = document.createElement("canvas");

    let frame = 0;

    const sampleLuminance = (): number | null => {
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const exclude = excludeRef.current;

      for (const node of document.elementsFromPoint(x, y)) {
        if (node === target) continue;
        if (exclude && exclude.contains(node)) continue;

        // Same-origin video: read the pixels under the sample point.
        if (node instanceof HTMLVideoElement) {
          if (!node.videoWidth || getComputedStyle(node).opacity === "0") continue;
          try {
            const canvas = canvasRef.current!;
            canvas.width = 8;
            canvas.height = 8;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) continue;
            const vr = node.getBoundingClientRect();
            const fx = Math.min(Math.max((x - vr.left) / vr.width, 0), 1);
            const fy = Math.min(Math.max((y - vr.top) / vr.height, 0), 1);
            const box = node.videoWidth * 0.15;
            const sx = Math.min(Math.max(fx * node.videoWidth - box / 2, 0), node.videoWidth - box);
            const sy = Math.min(Math.max(fy * node.videoHeight - box / 2, 0), node.videoHeight - box);
            ctx.drawImage(node, sx, sy, box, box, 0, 0, 8, 8);
            const { data } = ctx.getImageData(0, 0, 8, 8);
            let sum = 0;
            let count = 0;
            for (let i = 0; i < data.length; i += 4) {
              sum += relativeLuminance(data[i], data[i + 1], data[i + 2]);
              count += 1;
            }
            return count ? sum / count : null;
          } catch {
            continue; // tainted/unsupported — fall through to next element
          }
        }

        const match = getComputedStyle(node).backgroundColor.match(/rgba?\(([^)]+)\)/);
        if (match) {
          const parts = match[1].split(",").map((p) => parseFloat(p.trim()));
          const alpha = parts[3] === undefined ? 1 : parts[3];
          if (alpha > 0.5) return relativeLuminance(parts[0], parts[1], parts[2]);
        }
      }
      return null;
    };

    const update = () => {
      frame = 0;
      const lum = sampleLuminance();
      if (lum != null) setTheme(lum < 0.4 ? "on-dark" : "on-light");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const interval = window.setInterval(update, 250); // keep up with playing video

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(interval);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sampleRef, excludeRef]);

  return theme;
}
