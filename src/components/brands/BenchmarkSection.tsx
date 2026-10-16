import { useEffect, useRef, useState } from "react";

import Eyebrow from "@/components/brands/Eyebrow";

/**
 * "And we tell you what it beat," as a climb rather than a dashboard.
 *
 * Scrolling walks up through what the post was up against, lowest first. Each
 * benchmark takes the stage, then drops into a ranked board beneath it, so the
 * board fills from the bottom up. At the top the campaign post lands in volt
 * and strikes through every number under it, one after another: the section's
 * title, shown literally.
 *
 * The first version was a rounded card with a big number, a bar list and
 * three stat tiles, seven volt elements in one view. Here volt is spent once,
 * on the climax.
 *
 * Every value sits in a fixed slot, so nothing reflows as beats change.
 * Figures are illustrative and the section says so.
 */

const BENCHMARKS = [
  { label: "Athletes their size, every sport", value: 16400 },
  { label: "Competing brands, same roster", value: 18300 },
  { label: "Same format across the index", value: 21700 },
  { label: "The brand's other athlete posts", value: 24800 },
  { label: "Their other sponsored posts", value: 26100 },
  { label: "Their own unpaid baseline", value: 29400 },
];
const POST = { label: "This campaign post", value: 41200 };

const STAGE = [...BENCHMARKS, POST];
const CLIMAX = STAGE.length - 1;
const BEAT_VH = 55;

const TAKEAWAYS = [
  { value: "+40%", note: "over what they normally get" },
  { value: "+58%", note: "over their other campaigns" },
  { value: "2.3×", note: "what competing brands get on this roster" },
  { value: "0", note: "people had to chase it" },
];

const MONO = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

export default function BenchmarkSection() {
  const [active, setActive] = useState(0);
  const sentinels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sentinels.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const climax = active === CLIMAX;

  return (
    <section
      className="relative bg-black text-white"
      style={{ height: `${100 + STAGE.length * BEAT_VH}vh` }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
        {STAGE.map((_, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => {
              sentinels.current[i] = el;
            }}
            style={{ height: `${BEAT_VH}vh` }}
          />
        ))}
      </div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-10 lg:px-12">
        <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

        {/* Columns align at the top, so "The report" and the stage label share
            one line and the headline sits level with the number. */}
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          <div>
            <Eyebrow tone="muted">The report</Eyebrow>
            <h2 className="mt-4 max-w-sm font-deck text-3xl leading-[1.04] md:text-5xl lg:mt-6">
              We benchmark it against everything else.
            </h2>
            <p className="mt-5 hidden max-w-sm font-sans text-[15px] leading-relaxed text-white/45 lg:block">
              Every post is scored against their own baseline, their other
              sponsored work, competing brands on the same roster, and every
              athlete their size.
            </p>
          </div>

          <div className="relative">
            {/* The glow that warms up behind the winner, as on the homepage. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-[36rem] max-w-[95vw] rounded-full transition-opacity duration-1000"
              style={{
                opacity: climax ? 1 : 0,
                background: "radial-gradient(ellipse, rgba(223,255,0,0.12), transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            {/* Centre stage: one number at a time, each in the same fixed slot. */}
            <div className="relative h-[7.5rem] md:h-[11.5rem]">
              {STAGE.map((s, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <div
                    key={s.label}
                    aria-hidden={!on}
                    className="absolute inset-x-0 top-0 ease-out"
                    // The outgoing number clears before the next arrives, so
                    // two values never sit on top of each other mid-change.
                    style={{
                      opacity: on ? 1 : 0,
                      transform: `translateY(${on ? 0 : past ? -26 : 26}px)`,
                      transition: on
                        ? "opacity 420ms ease-out 180ms, transform 520ms cubic-bezier(0.2,0.8,0.2,1) 180ms"
                        : "opacity 200ms ease-in, transform 260ms ease-in",
                    }}
                  >
                    <p
                      className={`text-[11px] uppercase tracking-[0.2em] ${
                        i === CLIMAX ? "text-white" : "text-white/45"
                      }`}
                      style={MONO}
                    >
                      {s.label}
                    </p>
                    <p
                      className={`mt-3 font-sans font-extrabold leading-none tracking-[-0.03em] ${
                        i === CLIMAX ? "text-[#dfff00]" : "text-white"
                      }`}
                      style={{
                        fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.value.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* The board, ranked highest first. Each number you pass slides in
                at the top and pushes the rest down, so the board always sits
                flush under the stage, and every row strikes through when the
                post lands. Rows open on grid-rows rather than height, so
                nothing above the board ever moves. */}
            <ol className="mt-5 border-t border-white/10 md:mt-10">
              {[...BENCHMARKS].reverse().map((b, j) => {
                const idx = BENCHMARKS.length - 1 - j;
                const shown = idx < active;
                return (
                  <li
                    key={b.label}
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                    style={{
                      gridTemplateRows: shown ? "1fr" : "0fr",
                      opacity: shown ? (climax ? 0.4 : 0.65) : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="relative flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-2 md:py-2.5">
                        <span className="font-sans text-[13.5px] text-white/80">{b.label}</span>
                        <span
                          className="font-sans text-[15px] font-bold text-white"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {b.value.toLocaleString()}
                        </span>
                        {/* Struck through when the post lands, top row first. */}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-1/2 h-px origin-left bg-white transition-transform duration-500 ease-out"
                          style={{
                            transform: `scaleX(${climax ? 1 : 0})`,
                            transitionDelay: climax ? `${300 + j * 110}ms` : "0ms",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* The takeaways arrive after the strikes, in white: volt is
                already spent on the winning number. */}
            <div
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 transition-all md:mt-8 md:gap-y-5 duration-700 ease-out sm:grid-cols-4"
              style={{
                opacity: climax ? 1 : 0,
                transform: `translateY(${climax ? 0 : 12}px)`,
                transitionDelay: climax ? "1100ms" : "0ms",
              }}
            >
              {TAKEAWAYS.map((t) => (
                <div key={t.value}>
                  <p
                    className="font-sans text-2xl font-extrabold leading-none text-white"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {t.value}
                  </p>
                  <p className="mt-2 font-sans text-[12.5px] leading-snug text-white/45">{t.note}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-sans text-[12px] text-white/25">Illustrative figures.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
