import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import CountUp from "react-countup";

const LIME = "#dfff00";

/** Growth curve that draws itself: the $1.7B -> $68B arc. */
function Sparkline({ live }: { live: boolean }) {
  return (
    <svg viewBox="0 0 120 40" className="h-9 w-28" fill="none" aria-hidden>
      <motion.path
        d="M2 38 C 36 36, 64 31, 84 22 C 98 15.5, 110 7, 118 3"
        stroke={LIME}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={live ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.circle
        cx="118"
        cy="3"
        r="2.5"
        fill={LIME}
        initial={{ opacity: 0 }}
        animate={live ? { opacity: 1 } : {}}
        transition={{ delay: 1.9, duration: 0.3 }}
      />
    </svg>
  );
}

/** 73 hairline ticks, one per marketplace, flickering in and dying off. */
function TickGraveyard({ live }: { live: boolean }) {
  return (
    <div className="flex h-9 items-end gap-px" aria-hidden>
      {Array.from({ length: 73 }, (_, i) => (
        <motion.span
          key={i}
          className="w-px bg-white"
          style={{ height: 10 + ((i * 13) % 18) }}
          initial={{ opacity: 0 }}
          animate={live ? { opacity: [0, 0.7, 0.12] } : {}}
          transition={{
            duration: 1.7,
            times: [0, 0.3, 1],
            // 37 is coprime with 73: pseudo-random death order, no two neighbors together.
            delay: 0.4 + ((i * 37) % 73) * 0.012,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

interface StatProps {
  live: boolean;
  viz: ReactNode;
  fallback: string;
  copy: ReactNode;
  delay?: number;
  countUp: React.ComponentProps<typeof CountUp>;
  /** Reserve width for the final value so the count-up never reflows. */
  widthCh: number;
}

function Stat({ live, viz, fallback, copy, delay = 0, countUp, widthCh }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={live ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      {viz}
      <div
        className="mt-4 font-sans text-7xl font-extrabold leading-none tracking-tight md:text-8xl lg:text-9xl"
        style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}
      >
        <span className="inline-block" style={{ minWidth: `${widthCh}ch` }}>
          {live ? <CountUp {...countUp} /> : fallback}
        </span>
      </div>
      <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/55 [text-wrap:balance] md:text-base">
        {copy}
      </p>
    </motion.div>
  );
}

export default function ProblemScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25%" });
  // Stage direction: headline + stats land, counts run, THEN the room dims
  // and the punchline takes the light.
  const [climax, setClimax] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setClimax(true), 2400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-white"
    >
      {/* Ghost type, clipped by the right edge. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute -right-[5vw] top-[4%] select-none font-sans text-[23vw] font-extrabold leading-none tracking-tighter"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.055)" }}
      >
        $68B
      </motion.div>

      {/* Film grain over the whole section. */}
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center font-display text-4xl font-light leading-tight [text-wrap:balance] md:text-5xl lg:text-6xl"
        >
          Athlete marketing became the most valuable media on earth.{" "}
          <span className="text-white/45">The tools never caught up.</span>
        </motion.h2>

        <motion.div
          // A transient beat, not a state: dip while the punchline enters,
          // then come back to full so the section never reads as faded.
          animate={{ opacity: climax ? [1, 0.45, 1] : 1 }}
          transition={{ duration: 2.4, times: [0, 0.3, 1], ease: "easeInOut" }}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-14 md:mt-20 md:grid-cols-2 md:gap-10"
        >
          <Stat
            live={inView}
            viz={<Sparkline live={inView} />}
            fallback="40x"
            widthCh={2.6}
            delay={0.15}
            countUp={{ end: 40, suffix: "x", duration: 1.6, delay: 0.5 }}
            copy={
              <>
                Growth in one decade, from a $1.7B afterthought to a $68B
                industry.
              </>
            }
          />
          <Stat
            live={inView}
            viz={<TickGraveyard live={inView} />}
            fallback="73"
            widthCh={2}
            delay={0.3}
            countUp={{ end: 73, duration: 1.6, delay: 0.5 }}
            copy={
              <>
                Marketplaces tried to fix the DMs-and-spreadsheets chaos.{" "}
                <span className="font-semibold text-white">
                  Every one failed.
                </span>
              </>
            }
          />
        </motion.div>

        <div className="relative mt-16 md:mt-20">
          {/* Soft lime glow that warms up behind the punchline. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={climax ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 top-1/2 h-72 w-[38rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(223,255,0,0.09), transparent 70%)",
              filter: "blur(24px)",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={climax ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center font-display text-5xl font-bold md:text-6xl lg:text-7xl"
            style={{ color: LIME }}
          >
            So we fixed it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
