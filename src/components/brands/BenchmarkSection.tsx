import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * "Then we benchmark it against everything else" — the film's closing
 * argument, which is the one a brand actually buys on: a number means nothing
 * until you know what it beat.
 *
 * Figures are illustrative and the section says so. The bars are drawn from
 * the values rather than hand-placed, so the ranking can never drift from the
 * numbers printed beside it.
 */

const ROWS = [
  { label: "This campaign post", value: 41200, lead: true },
  { label: "Their own unpaid baseline", value: 29400 },
  { label: "Their other sponsored posts", value: 26100 },
  { label: "The brand's other athlete posts", value: 24800 },
  { label: "Same format across the index", value: 21700 },
  { label: "Competing brands, same roster", value: 18300 },
  { label: "Athletes their size, every sport", value: 16400 },
];

const TAKEAWAYS = [
  { value: "+40%", note: "over what they normally get" },
  { value: "+58%", note: "over their other campaigns" },
  { value: "2.3×", note: "what competing brands get on this roster" },
  { value: "0", note: "people had to chase it" },
];

const MAX = Math.max(...ROWS.map((r) => r.value));

export default function BenchmarkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          Then we benchmark it{" "}
          <span className="text-[#dfff00]">against everything else.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/55">
          Against their own unpaid baseline, their other sponsored work,
          competing brands on the same roster, and every athlete their size.
        </p>

        <div ref={ref} className="mt-12 md:mt-16">
          {ROWS.map((r, i) => (
            <div key={r.label} className="py-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={`font-sans text-[13.5px] ${r.lead ? "text-white" : "text-white/45"}`}
                >
                  {r.label}
                </span>
                <span
                  className={`shrink-0 font-sans text-[13.5px] tabular-nums ${
                    r.lead ? "text-[#dfff00]" : "text-white/45"
                  }`}
                >
                  {r.value.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className={`h-full rounded-full ${r.lead ? "bg-[#dfff00]" : "bg-white/20"}`}
                  style={{
                    width: inView ? `${(r.value / MAX) * 100}%` : "0%",
                    transition: "width 900ms cubic-bezier(0.2,0.8,0.2,1)",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {TAKEAWAYS.map((t) => (
            <div key={t.value}>
              <p className="font-deck text-4xl leading-none text-[#dfff00] md:text-5xl">
                {t.value}
              </p>
              <p className="mt-3 font-sans text-[13px] leading-relaxed text-white/45">
                {t.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-[13px] text-white/35">
          Illustrative figures.
        </p>
      </div>
    </section>
  );
}
