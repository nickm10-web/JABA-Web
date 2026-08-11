import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import KineticGrid from "@/components/KineticGrid";

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
      {/* Kinetic lattice: idles almost invisible, warps violet toward the cursor. */}
      <KineticGrid
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          maskImage: "radial-gradient(92% 82% at 50% 44%, #000 0%, transparent 94%)",
          WebkitMaskImage: "radial-gradient(92% 82% at 50% 44%, #000 0%, transparent 94%)",
        }}
      />

      {/* Film grain over the whole section. */}
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-deck text-4xl leading-[1.08] [text-wrap:balance] md:text-5xl lg:text-6xl"
        >
          Athlete marketing became the most valuable media on earth.{" "}
          <span className="deck-italic text-white/40">The tools never caught up.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-9 max-w-2xl font-sans text-xl leading-relaxed text-white/80 [text-wrap:balance] md:mt-12 md:text-2xl"
        >
          76 marketplaces tried to fix it. All failed because they ignored the
          workflow.
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
            className="relative"
          >
            {/* One line on desktop; stacked on phones so the punchline
                doesn't shrink to smaller than the copy above it. */}
            <img
              src="/so-we-fixed-it.png"
              alt="So we fixed it."
              className="mx-auto hidden w-[min(88vw,760px)] md:block"
            />
            <img
              src="/so-we-fixed-it-stacked.png"
              alt="So we fixed it."
              className="mx-auto w-[86vw] max-w-[380px] md:hidden"
            />
          </motion.p>
        </div>
      </div>
    </section>
  );
}
