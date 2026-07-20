import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const LIME = "#dfff00";

/**
 * The problem, told as a short editorial beat: a headline lands, the story
 * fills in, then the room dims and the lime payoff takes the light.
 */
export default function ProblemScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25%" });
  const [climax, setClimax] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setClimax(true), 1700);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-white"
    >
      {/* Living grid: faint lines with soft lights drifting over them so the
          panel subtly shifts and breathes instead of sitting flat black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "radial-gradient(82% 72% at 50% 44%, #000 0%, transparent 86%)",
          WebkitMaskImage:
            "radial-gradient(82% 72% at 50% 44%, #000 0%, transparent 86%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[6%] h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.10), transparent)",
          filter: "blur(28px)",
          mixBlendMode: "screen",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["-8%", "46%", "12%", "-8%"], y: ["0%", "26%", "48%", "0%"] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[4%] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(223,255,0,0.07), transparent)",
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["8%", "-34%", "-6%", "8%"], y: ["10%", "-18%", "-40%", "10%"] }
        }
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain over the whole section. */}
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl font-light leading-[1.08] [text-wrap:balance] md:text-5xl lg:text-6xl"
        >
          Athlete marketing became the most valuable media on earth.{" "}
          <span className="text-white/40">The tools never caught up.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-9 max-w-2xl font-sans text-lg leading-relaxed text-white/80 [text-wrap:balance] md:mt-12 md:text-xl"
        >
          In one decade it grew 40x, from a $1.7B afterthought to a $68B
          industry. Seventy-three marketplaces tried to tame the chaos of DMs
          and spreadsheets, and every one of them failed.
        </motion.p>

        <div className="relative mt-12 md:mt-16">
          {/* Soft lime glow that warms up behind the payoff. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={climax ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 top-1/2 h-64 w-[34rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(223,255,0,0.10), transparent 70%)",
              filter: "blur(24px)",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={climax ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-5xl font-bold leading-none md:text-6xl lg:text-7xl"
            style={{ color: LIME }}
          >
            So we fixed it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
