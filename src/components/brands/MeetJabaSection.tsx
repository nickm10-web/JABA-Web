import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Meet JABA: one beat, not a slideshow. JABA waves, his name lands, and the
 * film's line sits under it.
 *
 * The earlier version spent five scroll beats walking the film's four pillars
 * with a table-of-contents rail and a close-up per pillar. Every one of those
 * pillars is shown working further down the page (the index, the match, the
 * group chat, the report), so here the character only has to say hello.
 */
export default function MeetJabaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="relative overflow-hidden bg-[#eeeeee] px-6 py-24 text-[#0a0a0a] md:px-10 md:py-32">
      <div ref={ref} className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="relative h-[19rem] w-[14rem] md:h-[26rem] md:w-[19.5rem]">
          <div
            aria-hidden
            className="absolute inset-[-12%] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.95), transparent)" }}
          />
          {/* An animation with real transparency: on a light page the black
              video background would need a blend that washes JABA out. */}
          <img
            src="/meet/jaba-wave.webp"
            alt="JABA waving"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 18}px)`,
              filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.14))",
            }}
          />
        </div>

        <h2
          className="mt-6 font-deck text-5xl leading-none transition-all duration-700 ease-out md:text-7xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: `translateY(${inView ? 0 : 14}px)`,
            transitionDelay: inView ? "250ms" : "0ms",
          }}
        >
          Meet JABA.
        </h2>
        <p
          className="mt-5 font-sans text-lg text-black/55 transition-opacity duration-700 md:text-xl"
          style={{ opacity: inView ? 1 : 0, transitionDelay: inView ? "500ms" : "0ms" }}
        >
          The bridge between athletes and influencers.
        </p>
      </div>
    </section>
  );
}
