import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Replaces the five-row "Why JABA" stack. Those rows were a bullet list in
 * boxes, and five claims in five equal containers give none of them weight.
 * This makes one argument, the strongest, and shows it with two numbers.
 *
 * The figures are the film's travel example: the numbers are real, the athlete
 * is not named. It sits directly before the search results, which carry the
 * same metric, so the cards land already explained.
 */
export default function WrongNumberSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-black px-6 py-24 text-white md:px-10 md:py-36 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          Followers are the wrong number.
        </h2>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 items-end gap-12 md:mt-20 md:grid-cols-2 md:gap-6"
        >
          <div>
            <p
              className="font-deck text-[5.5rem] leading-none text-white/25 md:text-[9rem]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              63.1K
            </p>
            <p className="mt-4 font-sans text-[15px] text-white/40">
              followers
            </p>
          </div>

          <div
            className="transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "250ms",
            }}
          >
            <p
              className="font-deck text-[5.5rem] leading-none text-[#dfff00] md:text-[9rem]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              391K
            </p>
            <p className="mt-4 font-sans text-[15px] text-white/70">
              performs like
            </p>
          </div>
        </div>

        <p className="mt-14 max-w-2xl font-sans text-lg leading-relaxed text-white/55 md:mt-20">
          Performs like is the following an athlete would normally need to earn
          the likes this one actually gets. Priced by follower count, this
          athlete looks a sixth as valuable as their posts really are.
        </p>
        <p className="mt-4 font-sans text-[13px] text-white/30">
          Example athlete. The numbers are real; the name is withheld.
        </p>
      </div>
    </section>
  );
}
