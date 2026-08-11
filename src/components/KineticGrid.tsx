import { useEffect, useRef } from "react";

/**
 * Lattice that warps toward the pointer.
 *
 * Canvas rather than SVG: every node moves independently each frame, which
 * would mean re-laying-out hundreds of DOM elements otherwise. The whole thing
 * idles as a near-invisible grid and only lights up where the cursor is.
 */
const SPACING = 52; // px between nodes
const RADIUS = 340; // how far the pointer's pull reaches
const PULL = 0.32; // fraction of the distance a node travels toward the pointer
const DRIFT_PERIOD = 26000; // ms for the idle drift to cover one cell

export default function KineticGrid({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    let w = 0;
    let h = 0;
    let dpr = 1;
    // Pointer target vs. the eased position actually used, so the warp trails
    // the cursor instead of snapping to it.
    let targetX = -9999;
    let targetY = -9999;
    let px = -9999;
    let py = -9999;
    let strength = 0;
    let targetStrength = 0;
    let frame = 0;
    let visible = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };

    const draw = (time: number) => {
      frame = visible ? requestAnimationFrame(draw) : 0;
      ctx.clearRect(0, 0, w, h);

      // Ease the pointer and its influence so entering/leaving is a fade, not a jump.
      if (px < -9000) {
        px = targetX;
        py = targetY;
      }
      px += (targetX - px) * 0.12;
      py += (targetY - py) * 0.12;
      strength += (targetStrength - strength) * 0.06;

      // Slow diagonal drift keeps the lattice alive with no cursor present.
      const phase = reduce.matches ? 0 : ((time % DRIFT_PERIOD) / DRIFT_PERIOD) * SPACING;
      const cols = Math.ceil(w / SPACING) + 3;
      const rows = Math.ceil(h / SPACING) + 3;

      // Node positions first; lines are drawn from the warped set.
      const pts: { x: number; y: number; lit: number }[][] = [];
      for (let r = 0; r < rows; r++) {
        const row: { x: number; y: number; lit: number }[] = [];
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING - SPACING + phase;
          const by = r * SPACING - SPACING + phase;
          let x = bx;
          let y = by;
          let lit = 0;
          if (strength > 0.01) {
            const dx = px - bx;
            const dy = py - by;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS) {
              // Smooth falloff, strongest at the pointer.
              const f = (1 - dist / RADIUS) ** 1.5 * strength;
              x += dx * f * PULL;
              y += dy * f * PULL;
              lit = f;
            }
          }
          row.push({ x, y, lit });
        }
        pts.push(row);
      }

      // Lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = pts[r][c];
          const right = pts[r][c + 1];
          const down = pts[r + 1]?.[c];
          for (const q of [right, down]) {
            if (!q) continue;
            const lit = Math.max(p.lit, q.lit);
            // Base lattice sits just above invisible; the pointer paints violet in.
            ctx.strokeStyle =
              lit > 0.01
                ? `rgba(124, 58, 237, ${0.06 + lit * 0.85})`
                : "rgba(255, 255, 255, 0.05)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Nodes — only the ones under the pointer's influence are worth drawing.
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = pts[r][c];
          if (p.lit < 0.04) continue;
          ctx.fillStyle = `rgba(147, 78, 255, ${p.lit * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1 + p.lit * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(draw);
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(canvas);

    if (fine.matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} style={style} />;
}
