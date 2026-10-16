import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * "Followers are the wrong number," shown as a size rather than stated as two
 * figures. The account you see sits inside the account it performs like, both
 * circles drawn to scale by area, and the bigger one grows out of the smaller
 * when the section arrives.
 *
 * The first version set the two numbers side by side on black. With nothing
 * relating them, the dim one read as disabled and half the frame was empty.
 *
 * It also carries the search example that used to be three stat cards. Those
 * were a dashboard wireframe (skeleton bars for names, one stat grid three
 * times) and they repeated this exact argument with this exact athlete. The
 * one line worth keeping, the yacht trip, is the evidence, so it lives here.
 *
 * Figures are the film's travel example: real numbers, athlete not named.
 */

const FOLLOWERS = 63.1;
const PERFORMS = 391;
// Areas to scale, so diameters scale by the square root of the ratio.
const SMALL = Math.sqrt(FOLLOWERS / PERFORMS); // ≈ 0.40 of the large circle

export default function WrongNumberSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section className="bg-black px-6 py-24 text-white md:px-10 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div>
          <h2 className="max-w-xl font-deck text-4xl leading-[1.04] md:text-6xl">
            Followers are the wrong number.
          </h2>
          <p className="mt-7 max-w-md font-sans text-lg leading-relaxed text-white/55 md:text-xl">
            A travel brand asked for athletes who already post their trips. This
            one has 63.1K followers, and their most-liked post isn&rsquo;t
            basketball. It&rsquo;s a yacht trip in Greece, at 588K likes.
          </p>
          <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-white md:text-xl">
            Their posts earn what an account of 391K normally does. Priced by
            followers, they cost a sixth of what they deliver.
          </p>
          <p className="mt-8 font-sans text-[12.5px] text-white/30">
            Example athlete: the numbers are real, the name is withheld. Circles
            drawn to scale.
          </p>
        </div>

        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem]">
          {/* The account it performs like. Grows out of the small one, from
              the shared bottom edge, so it reads as the same account, bigger. */}
          <div
            className="absolute inset-0 rounded-full border border-[#dfff00]/60"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(223,255,0,0.10), rgba(223,255,0,0.02) 62%, transparent 72%)",
              boxShadow: "0 0 80px -20px rgba(223,255,0,0.35)",
              transformOrigin: "50% 100%",
              transform: `scale(${inView ? 1 : SMALL})`,
              opacity: inView ? 1 : 0,
              transition:
                "transform 1300ms cubic-bezier(0.16,1,0.3,1) 500ms, opacity 400ms ease-out 500ms",
            }}
          />

          <div
            className="absolute inset-x-0 top-[17%] text-center transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 14}px)`,
              transitionDelay: inView ? "1300ms" : "0ms",
            }}
          >
            <p
              className="font-sans font-extrabold leading-none tracking-[-0.03em] text-[#dfff00]"
              style={{ fontSize: "clamp(3.6rem, 8vw, 6.5rem)", fontVariantNumeric: "tabular-nums" }}
            >
              391K
            </p>
            <p
              className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/60"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              Performs like
            </p>
          </div>

          {/* The account you see, sitting on the bottom edge of the big one. */}
          <div
            className="absolute bottom-0 left-1/2 flex aspect-square -translate-x-1/2 flex-col items-center justify-center rounded-full border border-white/35 bg-white/[0.05] transition-opacity duration-500"
            style={{ width: `${SMALL * 100}%`, opacity: inView ? 1 : 0 }}
          >
            <p
              className="font-sans font-extrabold leading-none tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)", fontVariantNumeric: "tabular-nums" }}
            >
              63.1K
            </p>
            <p
              className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              Followers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
