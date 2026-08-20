import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/* Real counts pulled from the socialMedia database. Update these when the
   corpus grows — never round up past truth.
     posts    contents (915,918) + roster_contents (672,089)
     athletes distinct userId across tracked profiles
     brands   brands collection                          [checked 2026-08-13] */
const STATS = [
  { to: 1.5, suffix: "M", label: "posts" },     // 1,588,007
  { to: 48.9, suffix: "K", label: "athletes" }, //    48,933
  { to: 23.8, suffix: "K", label: "brands" },   //    23,755
];

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

/** One counter. Its own component so each gets its own hook call. */
function Stat({ to, suffix, label, run }: { to: number; suffix: string; label: string; run: boolean }) {
  // Counts in tenths so the abbreviated figure animates its decimal too.
  const n = useCountUp(Math.round(to * 10), run);
  return (
    <div className="min-w-0">
      <p
        className="leading-[0.9] text-[#dfff00]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(2.1rem, 6.4vw, 5rem)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {(n / 10).toFixed(1)}
        {suffix}
      </p>
      <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 md:text-[13px]">
        {label}
      </p>
    </div>
  );
}

export default function AthleteInternetSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-black pb-36 pt-52 md:pb-52 md:pt-72">
      {/* Drifting wall of real athlete posts — faded into black at both edges
          so the section melts into the neighbours instead of ending on a row. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-center"
      >
        {/* Mask sits on the rows, not the section. On the section its stops are
            measured against the full padded height, so the bottom fade landed
            in empty space below the last row and the wall just stopped dead. */}
        <div
          className="flex flex-col gap-3 md:gap-4"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 100%)",
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
        <h2 className="font-deck text-4xl leading-[1.06] text-white md:text-6xl">
          JABA watches the entire athlete internet.
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-4 md:mt-12 md:gap-10">
          {STATS.map((s) => (
            <Stat key={s.label} to={s.to} suffix={s.suffix} label={s.label} run={inView} />
          ))}
        </div>

        <p className="mx-auto mt-9 max-w-xl font-sans text-base leading-relaxed text-white/65 md:mt-11 md:text-lg">
          Every post, on every platform, tracked back to the athlete and the
          brand, so you know what went up and whether the brand got what it
          paid for.
        </p>
      </div>
    </section>
  );
}
