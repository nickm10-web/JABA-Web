import { useRef } from "react";
import { useInView } from "motion/react";

import ShortlistForm from "@/components/ShortlistForm";

/**
 * The close, staged as the film's title card: the 3D JABA letters with JABA
 * standing in front of them, arms open, on a volt floor of light. A giant word
 * with an object in front of it is the strongest closing pattern in the CTA
 * references, and this is JABA's own version of it.
 *
 * The headline and line under it are the existing brands page's closing copy.
 */
export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-16 pt-24 text-white md:px-10 md:pt-32 lg:px-12">
      <div ref={ref} className="relative mx-auto max-w-5xl">
        {/* The title card. The letters rise, then JABA steps in front. */}
        <div className="relative mx-auto aspect-[2000/900] w-full max-w-4xl">
          <img
            src="/jaba-3d-logo.png"
            alt=""
            aria-hidden
            className="absolute inset-x-0 top-0 w-full transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translateY(${inView ? 0 : 30}px)`,
              filter: "drop-shadow(0 30px 50px rgba(223,255,0,0.18))",
            }}
          />

          {/* Floor light under his feet, so he stands on something. */}
          <div
            aria-hidden
            className="absolute bottom-[2%] left-1/2 h-[16%] w-[46%] -translate-x-1/2 rounded-[50%] transition-opacity duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transitionDelay: inView ? "500ms" : "0ms",
              background: "radial-gradient(closest-side, rgba(223,255,0,0.32), rgba(223,255,0,0.08) 55%, transparent)",
              filter: "blur(6px)",
            }}
          />

          <img
            src="/jaba-stand.webp"
            alt="JABA"
            className="absolute bottom-[6%] left-1/2 h-[92%] w-auto -translate-x-1/2 transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translate(-50%, ${inView ? 0 : 40}px)`,
              transitionDelay: inView ? "350ms" : "0ms",
              filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.85))",
            }}
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center md:mt-14">
          <h2 className="font-deck text-4xl leading-[1.05] md:text-5xl">
            Ready to run campaigns without the chaos?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg leading-relaxed text-white/55">
            See how JABA helps brand teams execute athlete partnerships at scale.
          </p>
          <div className="mt-9 text-left">
            <ShortlistForm id="shortlist" tone="dark" />
          </div>
          <p className="mt-12 font-sans text-[13px] text-white/35">
            © {new Date().getFullYear()} JABA ·{" "}
            <a className="underline" href="https://jaba.ai">
              jaba.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
