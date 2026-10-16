import { useEffect, useState } from "react";

import { CORNERS, TILES, type Tile } from "@/components/brands/UnlabeledSearchableSection";

/**
 * The hero's artifact: one real post at a time, scanned. The sweep passes, the
 * box locks onto the object, the label lands, then the next post takes its
 * place. It is the page's strongest claim, shown working in the first frame
 * instead of asserted in the fourth section.
 *
 * Same tiles and coordinates as the grid below, so the two can never disagree.
 * Two cards sit behind the live one as the next posts in the queue.
 *
 * Timers, not animation frames, drive the cycle, and the scan itself is the
 * shared CSS: the preview pane is often backgrounded, where rAF stops.
 */

const QUEUE = ["SUV", "private jet", "championship ring", "formal dress", "barbell"]
  .map((tag) => TILES.find((t) => t.tag === tag))
  .filter((t): t is Tile => Boolean(t));

const HOLD_MS = 3600;

export default function HeroScan() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % QUEUE.length), HOLD_MS);
    return () => clearInterval(t);
  }, []);

  const at = (k: number) => QUEUE[(i + k) % QUEUE.length];
  const live = at(0);
  const [l, top, w, h] = live.box;

  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px] lg:w-[360px]">
      {/* The queue: the next two posts, set back and turned slightly. */}
      {[2, 1].map((k) => (
        <div
          key={`ghost-${k}`}
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-[18px] border border-white/10 bg-[#111]"
          style={{
            transform: `translate(${k * 22}px, ${-k * 14}px) rotate(${k * 3.5}deg) scale(${1 - k * 0.05})`,
            opacity: 0.55 - k * 0.18,
          }}
        >
          <img src={at(k).src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}

      {/* The live frame. Re-keyed per post so the scan plays from the top. */}
      <div
        key={live.src}
        className="is-scanning scan-tile relative aspect-[4/5] overflow-hidden rounded-[18px] border border-white/10 bg-[#111] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]"
        style={{ ["--d" as string]: "120ms" }}
      >
        <img src={live.src} alt="" aria-hidden className="h-full w-full object-cover" />

        <span aria-hidden className="scan-sweep pointer-events-none absolute inset-x-0 h-[22%]" />

        {([
          { top: 0, left: 0, right: 0, height: `${top}%` },
          { top: `${top + h}%`, left: 0, right: 0, bottom: 0 },
          { top: `${top}%`, left: 0, width: `${l}%`, height: `${h}%` },
          { top: `${top}%`, left: `${l + w}%`, right: 0, height: `${h}%` },
        ] as React.CSSProperties[]).map((pos, k) => (
          <span key={k} aria-hidden className="scan-dim pointer-events-none absolute bg-black" style={pos} />
        ))}

        <span
          aria-hidden
          className="scan-box pointer-events-none absolute"
          style={{ left: `${l}%`, top: `${top}%`, width: `${w}%`, height: `${h}%` }}
        >
          {CORNERS.map((c) => (
            <span key={c} className={`absolute h-5 w-5 border-[#dfff00] ${c}`} />
          ))}
        </span>

        <span
          className="scan-tag absolute bottom-3.5 left-3.5 rounded-full bg-[#dfff00] px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          {live.tag}
        </span>
      </div>

      <p
        className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-white/35"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        Frame by frame, not just the caption
      </p>
    </div>
  );
}
