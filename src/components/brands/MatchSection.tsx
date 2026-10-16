import { useEffect, useRef, useState } from "react";

/**
 * "We find the right athletes," shown as JABA making a match.
 *
 * The athlete on one side, the brand on the other, JABA between them. Each
 * scroll beat draws one reason across: what she already posts, through JABA,
 * to what the brand is built around. When all four are in, JABA trades the
 * reading glasses for the lightbulb and the match lands.
 *
 * Every line is the film's, from its "what she and the brand already share"
 * beat. The film notes the athlete is illustrative: real numbers, changed
 * name. Its stand-in photo is not reused here, so the athlete is shown by name
 * and numbers alone.
 *
 * One volt element per beat: the reason being drawn, then the match itself.
 */

const REASONS = [
  { label: "Moment", athlete: "New puppy, first summer", brand: "The first year with a dog" },
  { label: "Format", athlete: "Photo posts, no script", brand: "Real owners, real dogs" },
  { label: "Setting", athlete: "River, beach, back field", brand: "Outdoors, every day" },
  { label: "Behaviour", athlete: "Already posts her dog", brand: "Owners who show their dog" },
];

const BEATS = REASONS.length + 2; // intro, four reasons, the match
const MATCH = BEATS - 1;
const BEAT_VH = 60;

export default function MatchSection() {
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

  const matched = active === MATCH;
  // Reason i is drawn on beat i + 1 and stays drawn after.
  const drawn = (i: number) => active >= i + 1;
  const current = (i: number) => active === i + 1;

  return (
    <section className="relative bg-black text-white" style={{ height: `${100 + BEATS * BEAT_VH}vh` }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
        {Array.from({ length: BEATS }).map((_, i) => (
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
          <h2 className="text-center font-deck text-2xl leading-[1.04] md:text-5xl">We find the right athletes.</h2>
          <p className="mt-2 text-center font-sans text-[13px] text-white/50 md:mt-3 md:text-lg">
            We look for what she and the brand already share.
          </p>

          {/* The two sides, with JABA between them doing the matching. */}
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:mt-10 md:gap-10">
            <div className="text-right">
              <p className="font-deck text-lg leading-tight md:text-5xl">Sloane Vega</p>
              <p className="mt-1 font-sans text-[11.5px] text-white/45 md:mt-1.5 md:text-[15px]">Wisconsin, softball</p>
              <p className="mt-0.5 hidden font-sans text-[13px] text-white/45 md:block md:text-[15px]">20,546 average likes</p>
            </div>

            <div className="relative h-20 w-20 md:h-52 md:w-52">
              {/* A ring that pulses each time a reason lands, so the work
                  visibly passes through JABA. */}
              <span
                key={active}
                aria-hidden
                className="match-pulse absolute inset-0 rounded-full border"
                style={{ borderColor: active > 0 ? "rgba(223,255,0,0.55)" : "rgba(255,255,255,0.12)" }}
              />
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)" }}
              />
              <img
                src="/meet/data.webp"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain p-[6%] transition-all duration-500"
                style={{ opacity: matched ? 0 : 1, transform: `scale(${matched ? 0.9 : 1})` }}
              />
              <img
                src="/meet/creative.webp"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain p-[6%] transition-all duration-500"
                style={{ opacity: matched ? 1 : 0, transform: `scale(${matched ? 1 : 0.9})` }}
              />
            </div>

            <div className="text-left">
              <p className="font-deck text-lg leading-tight md:text-5xl">A pet food brand</p>
              <p className="mt-1 font-sans text-[11.5px] text-white/45 md:mt-1.5 md:text-[15px]">Example</p>
              <p className="mt-0.5 hidden font-sans text-[13px] text-white/45 md:block md:text-[15px]">
                No athlete program on record
              </p>
            </div>
          </div>

          {/* The reasons. Each row draws from her side, through the centre
              column under JABA, to the brand's side. */}
          <div className="mt-5 space-y-0.5 md:mt-12 md:space-y-1">
            {REASONS.map((r, i) => {
              const on = drawn(i);
              const now = current(i);
              const line = now ? "#dfff00" : "rgba(255,255,255,0.22)";
              return (
                <div
                  key={r.label}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-1 md:gap-10 md:py-2.5"
                >
                  <p
                    className="text-right font-sans text-[12px] leading-snug transition-all duration-500 md:text-[20px]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: `translateX(${on ? 0 : -14}px)`,
                      color: now ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {r.athlete}
                  </p>

                  <div className="relative flex h-6 w-[4.5rem] items-center justify-center md:h-7 md:w-52">
                    <span
                      aria-hidden
                      className="absolute left-0 right-1/2 top-1/2 origin-left transition-transform duration-500 ease-out"
                      style={{ height: now ? 2 : 1, background: line, transform: `scaleX(${on ? 1 : 0})` }}
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 right-0 top-1/2 origin-left transition-transform duration-500 ease-out"
                      style={{
                        height: now ? 2 : 1,
                        background: line,
                        transform: `scaleX(${on ? 1 : 0})`,
                        transitionDelay: on ? "260ms" : "0ms",
                      }}
                    />
                    <span
                      className="relative bg-black px-1.5 font-sans text-[10px] transition-opacity duration-500 md:px-2.5 md:text-[14px]"
                      style={{ opacity: on ? 1 : 0, color: now ? "#fff" : "rgba(255,255,255,0.45)" }}
                    >
                      {r.label}
                    </span>
                  </div>

                  <p
                    className="font-sans text-[12px] leading-snug transition-all duration-500 md:text-[20px]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: `translateX(${on ? 0 : 14}px)`,
                      color: now ? "#fff" : "rgba(255,255,255,0.6)",
                      transitionDelay: on ? "380ms" : "0ms",
                    }}
                  >
                    {r.brand}
                  </p>
                </div>
              );
            })}
          </div>

          {/* The match. */}
          <div
            className="mx-auto mt-6 max-w-3xl text-center transition-all duration-700 ease-out md:mt-12"
            style={{ opacity: matched ? 1 : 0, transform: `translateY(${matched ? 0 : 14}px)` }}
          >
            <p className="font-deck text-lg leading-snug md:text-3xl">
              Sloane already posts what the brand is built around:{" "}
              <span className="text-[#dfff00]">the first year with a dog.</span>
            </p>
            <p className="mx-auto mt-3 hidden max-w-2xl font-sans text-[13px] leading-relaxed text-white/50 sm:block md:text-[15px]">
              She got a black lab puppy this summer and has posted it three times since June. Those
              posts earned two to three times her usual likes, and no pet brand paid for any of them.
            </p>
          </div>

          <p className="mt-4 text-center font-sans text-[10.5px] text-white/25 md:mt-8 md:text-[11.5px]">
            Illustrative athlete. The numbers are real; the name and school are changed.
          </p>
        </div>
      </div>
    </section>
  );
}
