import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/* Real count pulled from socialMedia (contents + roster_contents). Update this
   when the corpus grows — never round up past truth. */
const POSTS = 1574634;

/* 80 tiles dealt into 4 rows that drift in alternating directions. */
const TILES = Array.from({ length: 80 }, (_, i) => `/wall/p${String(i + 1).padStart(2, "0")}.webp`);
const ROWS = [
  { tiles: TILES.slice(0, 20), duration: 92, reverse: false },
  { tiles: TILES.slice(20, 40), duration: 78, reverse: true },
  { tiles: TILES.slice(40, 60), duration: 104, reverse: false },
  { tiles: TILES.slice(60, 80), duration: 86, reverse: true },
];

/** Counts up to `target` once, easing out, when scrolled into view. */
function useCountUp(target: number, run: boolean, ms = 2200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, ms]);
  return value;
}

export default function AthleteInternetSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const posts = useCountUp(POSTS, inView);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black pb-36 pt-52 md:pb-52 md:pt-72">
      {/* Drifting wall of real athlete posts — faded into black at both edges
          so the section melts into the neighbours instead of ending on a row. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-3 md:gap-4"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 22%, #000 62%, rgba(0,0,0,0.35) 84%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 22%, #000 62%, rgba(0,0,0,0.35) 84%, transparent 100%)",
        }}
      >
        {ROWS.map((row, r) => (
          <div key={r} className="flex w-max shrink-0">
            <div
              className="wall-row flex gap-3 md:gap-4"
              style={{ animationDuration: `${row.duration}s`, animationDirection: row.reverse ? "reverse" : "normal" }}
            >
              {[...row.tiles, ...row.tiles].map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-[112px] w-[90px] shrink-0 rounded-lg object-cover md:h-[168px] md:w-[134px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Darken + vignette so the number always reads over the photos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 62% at 50% 50%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.44) 100%), linear-gradient(90deg, #000 0%, transparent 20%, transparent 80%, #000 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p
          className="leading-[0.9] text-[#dfff00]"
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(3.6rem, 12vw, 9.5rem)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {posts.toLocaleString()}
        </p>

        <h2 className="mt-4 font-deck text-3xl leading-[1.08] text-white md:text-5xl">
          posts watched across the athlete internet.
        </h2>

        <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
          JABA reads every post on every platform, so you know what went up,
          what it earned, and whether the brand got what it paid for.
        </p>
      </div>
    </section>
  );
}
