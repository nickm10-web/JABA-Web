import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const LIME = "#dfff00";

/**
 * The problem, told as a short editorial beat: a headline lands, the story
 * fills in, then the room dims and the lime payoff takes the light.
 */
export default function ProblemScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25%" });
  const [climax, setClimax] = useState(false);

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
          className="mt-9 max-w-xl font-sans text-base leading-relaxed text-white/55 [text-wrap:balance] md:mt-12 md:text-lg"
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
