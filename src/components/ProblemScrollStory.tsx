import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, type Target } from "motion/react";
import CountUp from "react-countup";

const LIME = "#dfff00";

/**
 * Giant standalone stat that counts up each time its beat becomes active.
 * Lives on its own line (never inline in a paragraph) so the changing digits
 * can't rewrap surrounding text. Width is reserved via `widthCh` + tabular
 * digits, so the number is rock-steady while it counts.
 * `fallback` is the static text shown while the beat is off-screen.
 */
function StatNumber({
  live,
  fallback,
  widthCh,
  ...countUp
}: {
  live: boolean;
  fallback: string;
  widthCh: number;
} & React.ComponentProps<typeof CountUp>) {
  return (
    <div
      className="my-3 font-sans text-[5.5rem] font-extrabold leading-none tracking-tight md:my-4 md:text-[8.5rem] lg:text-[10.5rem]"
      style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}
    >
      <span
        className="inline-block text-center"
        style={{ minWidth: `${widthCh}ch` }}
      >
        {live ? <CountUp {...countUp} /> : fallback}
      </span>
    </div>
  );
}

// Quiet sans framing line above the stat (data voice = sans, narrative = serif).
const kicker =
  "font-sans text-base font-medium leading-relaxed text-white/50 [text-wrap:balance] md:text-lg";
// Serif payoff line below the stat.
const support =
  "font-display text-3xl font-light leading-snug text-white [text-wrap:balance] md:text-4xl lg:text-5xl";

type Variant = "zoom" | "slide" | "pop";

const IN: Target = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

// Pose when the beat hasn't been reached yet (future) or already passed (past).
function pose(variant: Variant, where: "future" | "past"): Target {
  const dir = where === "future" ? 1 : -1;
  switch (variant) {
    case "zoom":
      return {
        opacity: 0,
        scale: where === "future" ? 1.25 : 0.8,
        filter: "blur(16px)",
      };
    case "slide":
      return {
        opacity: 0,
        x: 140 * dir,
        filter: "blur(12px)",
      };
    case "pop":
      return {
        opacity: 0,
        scale: 0.55,
        y: 40 * dir,
        filter: "blur(8px)",
      };
  }
}

function Beat({
  active,
  index,
  variant,
  children,
}: {
  active: number;
  index: number;
  variant: Variant;
  children: ReactNode;
}) {
  const target =
    active === index ? IN : pose(variant, index > active ? "future" : "past");

  return (
    <motion.div
      animate={target}
      initial={false}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ pointerEvents: active === index ? "auto" : "none" }}
    >
      <div className="mx-auto max-w-3xl text-center">{children}</div>
    </motion.div>
  );
}

export default function ProblemScrollStory() {
  // -1 until the first sentinel hits center, so beat 1's count-up doesn't
  // run at page load before anyone reaches the section.
  const [active, setActive] = useState(-1);
  const sentinels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sentinels.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black text-white">
        <Beat active={active} index={0} variant="zoom">
          <p className={kicker}>In one decade, athlete marketing grew</p>
          <StatNumber
            live={active === 0}
            fallback="40x"
            widthCh={3.4}
            end={40}
            suffix="x"
            duration={1.6}
          />
          <p className={support}>
            from a $1.7B afterthought to the most valuable media on earth.
          </p>
        </Beat>

        <Beat active={active} index={1} variant="slide">
          <p className={kicker}>
            But deals still run on DMs, spreadsheets, and group chats.
          </p>
          <StatNumber
            live={active === 1}
            fallback="73"
            widthCh={2.6}
            end={73}
            duration={1.2}
          />
          <p className={support}>marketplaces tried to fix it.</p>
          <p className="mt-8 font-display text-4xl font-light leading-snug md:text-5xl lg:text-6xl">
            <span className="text-white/45">Every one</span>{" "}
            <span className="font-bold text-white">failed.</span>
          </p>
        </Beat>

        <Beat active={active} index={2} variant="pop">
          <p className={kicker}>
            A $68B industry. Still running on spreadsheets.
          </p>
          <p
            className="mt-6 font-display text-6xl font-bold md:text-7xl lg:text-8xl"
            style={{ color: LIME }}
          >
            So we fixed it.
          </p>
        </Beat>

        {/* Beat progress dots */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center gap-2.5 transition-opacity duration-500"
          style={{ opacity: active >= 0 ? 1 : 0 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  active === i ? LIME : "rgba(255, 255, 255, 0.22)",
                transform: active === i ? "scale(1.35)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll sentinels — one screen each drives the active beat. */}
      <div className="relative -mt-[100vh]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => {
              sentinels.current[i] = el;
            }}
            className="h-screen"
          />
        ))}
      </div>
    </div>
  );
}
