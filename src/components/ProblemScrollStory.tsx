import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";

function interpolate(
  p: number,
  input: readonly number[],
  output: readonly number[],
): number {
  if (p <= input[0]) return output[0];
  if (p >= input[input.length - 1]) return output[output.length - 1];
  for (let i = 0; i < input.length - 1; i++) {
    if (p <= input[i + 1]) {
      const t = (p - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[output.length - 1];
}

// Performance note: With ~30 words × 2 beats + ~45 characters × beat 3, this
// section animates roughly 100 motion values per scroll frame. Each
// RevealUnit subscribes to scrollYProgress via useMotionValueEvent and
// writes opacity/filter/transform to its own DOM node, bypassing motion
// v12's WAAPI ScrollTimeline optimization — that optimization tracks
// whole-document scroll and ignores useScroll's target+offset for sections
// deep in the page (same caveat the existing ScrollVideoHero works around).
// If perf becomes an issue on low-end mobile the cheapest fallback is to
// drop the blur filter (opacity/transform are GPU-cheap; blur isn't).

interface StaggeredRevealProps {
  text: string;
  /** Scroll progress motion value driving the reveal. */
  progress: MotionValue<number>;
  /** Scroll range over which the reveal happens, e.g. [0.05, 0.20]. */
  revealRange: [number, number];
  /** Scroll range over which the reveal exits. Omit for no exit. */
  exitRange?: [number, number];
  /** Split by "word" (default) or "char". */
  splitBy?: "word" | "char";
  /** Tailwind className applied to the outer block. */
  className?: string;
}

function RevealUnit({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useMotionValueEvent(progress, "change", (p) => {
    const el = ref.current;
    if (!el) return;
    const [s, e] = range;
    let t: number;
    if (p <= s) t = 0;
    else if (p >= e) t = 1;
    else t = (p - s) / (e - s);
    el.style.opacity = String(t);
    el.style.filter = `blur(${(1 - t) * 6}px)`;
    el.style.transform = `translateY(${(1 - t) * 8}px)`;
  });

  return (
    <span
      ref={ref}
      style={{
        opacity: 0,
        filter: "blur(6px)",
        transform: "translateY(8px)",
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {text}
    </span>
  );
}

function StaggeredExit({
  progress,
  exitRange,
  children,
}: {
  progress: MotionValue<number>;
  exitRange: [number, number];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useMotionValueEvent(progress, "change", (p) => {
    const el = ref.current;
    if (!el) return;
    const [s, e] = exitRange;
    let t: number;
    if (p <= s) t = 1;
    else if (p >= e) t = 0;
    else t = 1 - (p - s) / (e - s);
    el.style.opacity = String(t);
  });

  return (
    <div ref={ref} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}

function StaggeredReveal({
  text,
  progress,
  revealRange,
  exitRange,
  splitBy = "word",
  className,
}: StaggeredRevealProps) {
  const words = text.split(/\s+/);
  const [start, end] = revealRange;
  const span = end - start;
  // Each unit's individual fade window is ~1.8 / N of the beat. Start times
  // are evenly distributed across (revealRange[0], revealRange[1] - window).
  // Higher constant → more overlap between adjacent words; lower → more
  // sequential (typewriter feel). 1.8 reads as "ghosting in one after the
  // next" with minimal overlap.
  const OVERLAP = 1.8;

  let body: ReactNode;

  if (splitBy === "word") {
    const n = words.length;
    const perUnitWindow = span * (OVERLAP / n);
    body = words.map((word, i) => {
      const unitStart = start + (i / n) * (span - perUnitWindow);
      const unitEnd = unitStart + perUnitWindow;
      const display = i < n - 1 ? word + " " : word;
      return (
        <RevealUnit
          key={i}
          text={display}
          progress={progress}
          range={[unitStart, unitEnd]}
        />
      );
    });
  } else {
    // char mode: each character is its own unit, but characters within a
    // word are grouped in a whitespace-nowrap span so words never break
    // across lines.
    const totalChars = words.reduce(
      (sum, w) => sum + Array.from(w).length,
      0,
    );
    const perUnitWindow = span * (OVERLAP / totalChars);
    let charIdx = 0;
    body = words.map((word, wi) => {
      const wordChars = Array.from(word).map((ch, ci) => {
        const globalIdx = charIdx + ci;
        const unitStart =
          start + (globalIdx / totalChars) * (span - perUnitWindow);
        const unitEnd = unitStart + perUnitWindow;
        return (
          <RevealUnit
            key={ci}
            text={ch}
            progress={progress}
            range={[unitStart, unitEnd]}
          />
        );
      });
      charIdx += Array.from(word).length;
      return (
        <span key={wi} className="inline-block whitespace-nowrap">
          {wordChars}
          {wi < words.length - 1 ? (
            <span className="inline-block" style={{ whiteSpace: "pre" }}>
              {" "}
            </span>
          ) : null}
        </span>
      );
    });
  }

  const content = <div className={className}>{body}</div>;

  if (exitRange) {
    return (
      <StaggeredExit progress={progress} exitRange={exitRange}>
        {content}
      </StaggeredExit>
    );
  }

  return content;
}

export default function ProblemScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Card transform phases (driven imperatively for the same reason as the
  // text reveals — motion v12's WAAPI ScrollTimeline optimization ignores
  // useScroll's target+offset for sections deep in the page):
  //   0    → 0.02 hold large + centered (title-card moment)
  //   0.02 → 0.06 shrink + slide upper-right + tilt
  //   0.06 →      parked upper-right for the rest of the section
  // The move finishes before beat 1 begins revealing at 0.06, so the card
  // and the words never animate at the same time. Card stays at full
  // opacity the entire time.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const hint = hintRef.current;
    if (hint) {
      const t = p <= 0 ? 0 : p >= 0.05 ? 1 : p / 0.05;
      hint.style.opacity = String(1 - t);
    }

    const card = cardRef.current;
    if (card) {
      const scale = interpolate(p, [0, 0.02, 0.06], [1, 1, 0.35]);
      const x = interpolate(p, [0, 0.02, 0.06], [0, 0, 30]);
      const y = interpolate(p, [0, 0.02, 0.06], [0, 0, -32]);
      const rotate = interpolate(p, [0, 0.02, 0.06], [0, 0, 7]);
      card.style.transform = `translate(${x}%, ${y}%) scale(${scale}) rotate(${rotate}deg)`;
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[750vh] w-full bg-black md:h-[1050vh]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={cardRef}
          style={{
            transform: "translate(0%, 0%) scale(1) rotate(0deg)",
          }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[16/9] w-[88%] max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(255,200,150,0.12),0_0_0_1px_rgba(255,255,255,0.04)] sm:max-w-3xl"
          >
            <img
              src="/images/website-image-mac.png"
              alt="A vintage Apple Macintosh overgrown with grass, sitting in a meadow, displaying a chaotic athlete deals spreadsheet on its screen"
              className="block h-full w-full select-none object-cover"
              draggable={false}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <StaggeredReveal
            text="In 2016, athlete marketing was a $1.7B afterthought. Then NIL happened, social blew up, and athletes became the most valuable media channels on earth. The market 40x'd in under a decade."
            progress={scrollYProgress}
            revealRange={[0.06, 0.16]}
            exitRange={[0.22, 0.27]}
            splitBy="word"
            className="max-w-4xl px-6 text-center font-display text-2xl leading-tight text-white md:text-4xl lg:text-5xl"
          />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <StaggeredReveal
            text="The tools didn't move. Schools and agencies are still managing millions in deals across DMs, spreadsheets, and group chats. 73 marketplaces tried to fix it. They all failed because they ignored where the work actually happens."
            progress={scrollYProgress}
            revealRange={[0.4, 0.5]}
            exitRange={[0.56, 0.61]}
            splitBy="word"
            className="max-w-4xl px-6 text-center font-display text-2xl leading-tight text-white md:text-4xl lg:text-5xl"
          />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-5xl px-6 text-center text-white">
            <div className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              <StaggeredReveal
                text="A $68B industry."
                progress={scrollYProgress}
                revealRange={[0.76, 0.81]}
                splitBy="char"
                className="block"
              />
              <StaggeredReveal
                text="Still running on spreadsheets."
                progress={scrollYProgress}
                revealRange={[0.86, 0.92]}
                splitBy="char"
                className="block"
              />
            </div>
            <div className="mt-12 md:mt-16">
              <StaggeredReveal
                text="So we fixed it."
                progress={scrollYProgress}
                revealRange={[0.955, 0.985]}
                splitBy="word"
                className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl"
              />
            </div>
          </div>
        </div>

        <div
          ref={hintRef}
          style={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
