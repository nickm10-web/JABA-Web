import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, X } from "lucide-react";
import CountUp from "react-countup";

const LIME = "#dfff00";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
};

interface StatProps {
  live: boolean;
  icon: ReactNode;
  fallback: string;
  copy: ReactNode;
  delay?: number;
  countUp: React.ComponentProps<typeof CountUp>;
  /** Reserve width for the final value so the count-up never reflows. */
  widthCh: number;
}

function Stat({ live, icon, fallback, copy, delay = 0, countUp, widthCh }: StatProps) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-white/40">{icon}</div>
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
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-20%" });

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-24 text-white">
      <motion.h2
        {...fadeUp}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center font-display text-4xl font-light leading-tight [text-wrap:balance] md:text-5xl lg:text-6xl"
      >
        Athlete marketing became the most valuable media on earth.{" "}
        <span className="text-white/45">The tools never caught up.</span>
      </motion.h2>

      <div
        ref={statsRef}
        className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-14 md:mt-20 md:grid-cols-2 md:gap-10"
      >
        <Stat
          live={statsInView}
          icon={<TrendingUp className="h-7 w-7" strokeWidth={1.5} />}
          fallback="40x"
          widthCh={2.6}
          countUp={{ end: 40, suffix: "x", duration: 1.6 }}
          copy={
            <>
              Growth in one decade, from a $1.7B afterthought to a $68B
              industry.
            </>
          }
        />
        <Stat
          live={statsInView}
          icon={<X className="h-7 w-7" strokeWidth={1.5} />}
          fallback="73"
          widthCh={2}
          delay={0.15}
          countUp={{ end: 73, duration: 1.6 }}
          copy={
            <>
              Marketplaces tried to fix the DMs-and-spreadsheets chaos.{" "}
              <span className="font-semibold text-white">
                Every one failed.
              </span>
            </>
          }
        />
      </div>

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="mt-16 text-center font-display text-5xl font-bold md:mt-20 md:text-6xl lg:text-7xl"
        style={{ color: LIME }}
      >
        So we fixed it.
      </motion.p>
    </section>
  );
}
