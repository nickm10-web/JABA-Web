import { useRef } from "react";
import { useInView } from "motion/react";

import Eyebrow from "@/components/brands/Eyebrow";

/**
 * "JABA makes the unlabeled searchable" — the claim that nothing else on the
 * site makes, and the one a brand cannot get anywhere else.
 *
 * Every tile is a real post from the index paired with something genuinely in
 * the frame, and the box is placed on that thing. Both were read off the
 * images one at a time: a tag that does not match its photo, or a box floating
 * over empty grass, makes the claim look fake rather than illustrative.
 *
 * Each tile plays the scan rather than arriving finished — sweep, lock, label,
 * then everything outside the box falls away. A grid that is already done
 * reads as a screenshot; a grid that resolves reads as a machine working.
 *
 * Boxes are percentages of the TILE, not of the source image: object-cover
 * centre-crops every photo to 4:5, so coordinates taken off the original file
 * land in the wrong place. These were checked by drawing each box onto the
 * exact 4:5 crop the browser renders, one tile at a time.
 */

export type Tile = {
  src: string;
  tag: string;
  /** [left, top, width, height] as percentages of the frame. */
  box: [number, number, number, number];
};

export const TILES: Tile[] = [
  { src: "/wall/p72.webp", tag: "SUV", box: [0, 36, 70, 62] },
  { src: "/wall/p15.webp", tag: "private jet", box: [0, 0, 56, 86] },
  { src: "/wall/p71.webp", tag: "championship ring", box: [36, 60, 28, 24] },
  { src: "/wall/p60.webp", tag: "barbell", box: [2, 2, 90, 38] },
  { src: "/wall/p04.webp", tag: "bouquet", box: [36, 6, 35, 24] },
  { src: "/wall/p08.webp", tag: "golf club", box: [9, 6, 34, 55] },
  { src: "/wall/p28.webp", tag: "toddler", box: [24, 14, 44, 68] },
  { src: "/wall/p42.webp", tag: "formal dress", box: [37, 34, 26, 64] },
  { src: "/wall/p21.webp", tag: "sundress", box: [29, 25, 33, 38] },
  { src: "/wall/p74.webp", tag: "tailored suit", box: [3, 21, 60, 58] },
  { src: "/wall/p49.webp", tag: "smartphone", box: [27, 35, 26, 38] },
  { src: "/wall/p30.webp", tag: "streetwear", box: [22, 18, 46, 35] },
];

export const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "left-0 bottom-0 border-b-2 border-l-2",
  "right-0 bottom-0 border-b-2 border-r-2",
];

export default function UnlabeledSearchableSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>The index</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          JABA makes the{" "}
          <span className="text-[#dfff00]">unlabeled searchable.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/55">
          Posts and individual video frames, scanned for the brands, products,
          settings and behaviors that never appear in the caption.
        </p>

        <div
          ref={ref}
          className={`mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:gap-4 lg:grid-cols-4 ${
            inView ? "is-scanning" : ""
          }`}
        >
          {TILES.map((t, i) => {
            const [l, top, w, h] = t.box;
            // Each tile starts a little after the one before it, so the grid
            // resolves as a pass rather than all at once.
            const delay = `${i * 170}ms`;
            return (
              <div
                key={t.tag}
                className="scan-tile relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#111]"
                style={{ ["--d" as string]: delay }}
              >
                <img
                  src={t.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                {/* Sweep: one pass of the frame before anything is claimed. */}
                <span aria-hidden className="scan-sweep pointer-events-none absolute inset-x-0 h-[22%]" />

                {/* Everything outside the box falls away once it locks, which
                    is what makes the find read as a find. */}
                {([
                  { top: 0, left: 0, right: 0, height: `${top}%` },
                  { top: `${top + h}%`, left: 0, right: 0, bottom: 0 },
                  { top: `${top}%`, left: 0, width: `${l}%`, height: `${h}%` },
                  { top: `${top}%`, left: `${l + w}%`, right: 0, height: `${h}%` },
                ] as React.CSSProperties[]).map((pos, k) => (
                  <span
                    key={k}
                    aria-hidden
                    className="scan-dim pointer-events-none absolute bg-black"
                    style={pos}
                  />
                ))}

                {/* The box, on the thing itself. */}
                <span
                  aria-hidden
                  className="scan-box pointer-events-none absolute"
                  style={{ left: `${l}%`, top: `${top}%`, width: `${w}%`, height: `${h}%` }}
                >
                  {CORNERS.map((c) => (
                    <span
                      key={c}
                      className={`absolute h-4 w-4 border-[#dfff00] md:h-5 md:w-5 ${c}`}
                    />
                  ))}
                </span>

                <span
                  className="scan-tag absolute bottom-3 left-3 rounded-full bg-[#dfff00] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]"
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                >
                  {t.tag}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-8 font-sans text-[13px] text-white/35">
          Real posts from the index, with one example of what the scan returns
          on each.
        </p>
      </div>
    </section>
  );
}
