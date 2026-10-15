import { useRef } from "react";
import { useInView } from "motion/react";

import Eyebrow from "@/components/brands/Eyebrow";

/**
 * "And we tell you what it beat." The closing argument, and the one a brand
 * actually buys on: a number means nothing until you know what it beat.
 *
 * Built as a product surface rather than a chart on a page. The first version
 * was bars on a black background, which reads as a deck slide; this is the
 * report itself, a dark panel floating on a light section the way the rest of
 * the site stages its product shots.
 *
 * Bars are drawn from the values, so the ranking can never drift from the
 * numbers printed beside it.
 */

const HERO = { value: 41200, label: "This campaign post", delta: "+40%" };

const ROWS = [
  { label: "Their own unpaid baseline", value: 29400 },
  { label: "Their other sponsored posts", value: 26100 },
  { label: "The brand's other athlete posts", value: 24800 },
  { label: "Same format across the index", value: 21700 },
  { label: "Competing brands, same roster", value: 18300 },
  { label: "Athletes their size, every sport", value: 16400 },
];

const TAKEAWAYS = [
  { value: "+58%", note: "over their other campaigns" },
  { value: "2.3×", note: "what competing brands get on this roster" },
  { value: "0", note: "people had to chase it" },
];

export default function BenchmarkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const bar = (v: number) => `${(v / HERO.value) * 100}%`;

  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Eyebrow>The report</Eyebrow>
        <h2 className="mt-5 max-w-2xl font-deck text-4xl leading-[1.06] md:text-5xl">
          And we tell you{" "}
          <span className="text-[#dfff00]">what it beat.</span>
        </h2>
        <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-white/55">
          Every post is scored against their own unpaid baseline, their other
          sponsored work, competing brands on the same roster, and every athlete
          their size.
        </p>

        {/* The report, staged like the product shots elsewhere on the site. */}
        <div
          ref={ref}
          className="mt-12 overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-[#17171c] to-[#0e0e12] text-white shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)] md:mt-16"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 md:px-8">
            <div className="flex items-center gap-2.5">
              <img src="/jaba-face.png" alt="" aria-hidden className="h-6 w-6 rounded-full" />
              <span className="font-sans text-[13px] font-semibold">Campaign report</span>
            </div>
            <span className="font-sans text-[12px] text-white/35">Spring drop</span>
          </div>

          <div className="grid gap-10 p-6 md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:p-8 lg:p-10">
            {/* The headline number, with what it beat stated next to it. */}
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#dfff00]">
                {HERO.label}
              </p>
              <p
                className="mt-4 font-deck text-6xl leading-none md:text-7xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {HERO.value.toLocaleString()}
              </p>
              <p className="mt-3 font-sans text-[14px] text-white/40">engagements</p>

              <div className="mt-7 inline-flex items-baseline gap-2 rounded-full bg-[#dfff00]/10 px-4 py-2">
                <span className="font-deck text-xl text-[#dfff00]">{HERO.delta}</span>
                <span className="font-sans text-[13px] text-white/55">
                  over what they normally get
                </span>
              </div>
            </div>

            {/* What it beat, in order. */}
            <div className="self-center">
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <span className="font-sans text-[13.5px] text-white">{HERO.label}</span>
                <span className="shrink-0 font-sans text-[13.5px] tabular-nums text-[#dfff00]">
                  {HERO.value.toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-[#dfff00]"
                  style={{
                    width: inView ? "100%" : "0%",
                    transition: "width 1s cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                />
              </div>

              <div className="mt-6 space-y-4">
                {ROWS.map((r, i) => (
                  <div key={r.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-[13px] text-white/45">{r.label}</span>
                      <span className="shrink-0 font-sans text-[13px] tabular-nums text-white/45">
                        {r.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="h-full rounded-full bg-white/25"
                        style={{
                          width: inView ? bar(r.value) : "0%",
                          transition: "width 900ms cubic-bezier(0.2,0.8,0.2,1)",
                          transitionDelay: `${120 + i * 90}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-3">
            {TAKEAWAYS.map((t) => (
              <div
                key={t.value}
                className="border-b border-white/[0.08] px-6 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8"
              >
                <p className="font-deck text-3xl leading-none text-[#dfff00]">{t.value}</p>
                <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-white/45">
                  {t.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 font-sans text-[13px] text-white/35">Illustrative figures.</p>
      </div>
    </section>
  );
}
