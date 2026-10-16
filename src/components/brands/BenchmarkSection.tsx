import { useEffect, useRef, useState } from "react";

/**
 * "We benchmark it against everything else," as bars drawn to scale.
 *
 * Scrolling lands one benchmark at a time, lowest first, each bar longer than
 * the last, so the rows build into a staircase down the page. Then the post's
 * own bar runs past every one of them in volt, a guide drops from its end so
 * you can see how far short each falls, and the film's three ratios appear
 * beside the bars they were measured against.
 *
 * The earlier version struck through a list of numbers and closed on four stat
 * tiles. A struck list reads as clutter, and none of it showed how much bigger
 * the post was. Bars at true scale do that on sight.
 *
 * All figures and lines are the film's. Bars are drawn from the values, so the
 * picture can never disagree with the numbers printed on it.
 */

type Row = { label: string; value: number; ratio?: string; post?: boolean };

const ROWS: Row[] = [
  { label: "Athletes their size, every sport", value: 16400 },
  { label: "Competing brands, same roster", value: 18300, ratio: "2.3×" },
  { label: "Same format across the index", value: 21700 },
  { label: "The brand's other athlete posts", value: 24800 },
  { label: "Their other sponsored posts", value: 26100, ratio: "+58%" },
  { label: "Their own unpaid baseline", value: 29400, ratio: "+40%" },
  { label: "This campaign post", value: 41200, post: true },
];

const MAX = Math.max(...ROWS.map((r) => r.value));
const CLIMAX = ROWS.length - 1;
const BEAT_VH = 50;

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
    <section className="relative bg-black text-white" style={{ height: `${100 + ROWS.length * BEAT_VH}vh` }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
        {ROWS.map((_, i) => (
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

        <div className="relative mx-auto w-full max-w-6xl">
          {/* Header across the full width, so nothing leaves half the frame
              empty under a short headline. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12">
            <h2 className="font-deck text-3xl leading-[1.04] md:text-5xl">
              We benchmark it against everything else.
            </h2>
            <p className="hidden font-sans text-[14px] leading-relaxed text-white/50 md:block md:text-[16px]">
              Against their own unpaid baseline, their other sponsored work, the brand&rsquo;s
              other athlete posts, competing brands on the same roster, the same format across
              the whole index, and every athlete their size.
            </p>
          </div>

          {/* The bars. Every bar sits in the same fixed-width track, so length
              is the value and nothing else. Values and the film's ratios live
              in the reserved gutter to the right; the guide marks the post's
              length, which is the full track. */}
          <div className="mt-8 pr-16 md:mt-12 md:pr-28">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-2 -top-2 right-0 w-px transition-opacity duration-700"
                style={{
                  opacity: climax ? 1 : 0,
                  transitionDelay: climax ? "900ms" : "0ms",
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 50%, transparent 0)",
                  backgroundSize: "1px 6px",
                }}
              />

              <div className="space-y-3 md:space-y-4">
                {ROWS.map((r, i) => {
                  const shown = i <= active;
                  const latest = i === active && !r.post;
                  const pct = (r.value / MAX) * 100;
                  return (
                    <div
                      key={r.label}
                      className="relative transition-opacity duration-500"
                      style={{ opacity: shown ? (r.post || latest || climax ? 1 : 0.55) : 0 }}
                    >
                      <span
                        className={`font-sans text-[13px] md:text-[16px] ${
                          r.post ? "font-semibold text-white" : "text-white/70"
                        }`}
                      >
                        {r.label}
                      </span>

                      <div className={`relative mt-1.5 ${r.post ? "h-5 md:h-9" : "h-3 md:h-5"}`}>
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full transition-colors duration-500 ${
                            r.post ? "bg-[#dfff00]" : latest ? "bg-white/75" : "bg-white/40"
                          }`}
                          style={{
                            width: shown ? `${pct}%` : "0%",
                            transition: `width ${r.post ? 1100 : 700}ms cubic-bezier(0.16,1,0.3,1)`,
                            boxShadow: r.post ? "0 0 28px rgba(223,255,0,0.35)" : undefined,
                          }}
                        />
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-sans font-bold transition-opacity duration-500 ${
                            r.post ? "text-[15px] md:text-[22px]" : "text-[12.5px] md:text-[16px]"
                          } ${
                            r.post ? "text-[#dfff00]" : "text-white/80"
                          }`}
                          style={{
                            left: `calc(${pct}% + 12px)`,
                            fontVariantNumeric: "tabular-nums",
                            opacity: shown ? 1 : 0,
                            transitionDelay: shown ? `${r.post ? 750 : 380}ms` : "0ms",
                          }}
                        >
                          {r.value.toLocaleString()}
                        </span>

                        {/* The ratio the film states for this benchmark,
                            in the gutter, once the post has beaten it. */}
                        {r.ratio && (
                          <span
                            className="absolute top-1/2 -right-16 w-14 -translate-y-1/2 text-right font-sans text-[16px] font-extrabold text-white transition-opacity duration-500 md:-right-28 md:w-24 md:text-[28px]"
                            style={{
                              opacity: climax ? 1 : 0,
                              transitionDelay: climax ? "1100ms" : "0ms",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {r.ratio}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="mt-8 grid grid-cols-[auto_1fr] items-baseline gap-4 transition-all duration-700 md:mt-12 md:gap-6"
            style={{
              opacity: climax ? 1 : 0,
              transform: `translateY(${climax ? 0 : 10}px)`,
              transitionDelay: climax ? "1400ms" : "0ms",
            }}
          >
            <p className="font-sans text-4xl font-extrabold leading-none md:text-6xl">0</p>
            <p className="max-w-xl font-sans text-[14px] leading-relaxed text-white/60 md:text-[17px]">
              people had to chase it. The post is matched to the approved asset and the deliverable
              closes itself.
            </p>
          </div>

          <p className="mt-5 font-sans text-[11.5px] text-white/25">Illustrative figures.</p>
        </div>
      </div>
    </section>
  );
}
