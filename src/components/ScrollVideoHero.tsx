import { EmailCaptureGlass } from "@/components/ui/email-capture-glass";

interface ScrollVideoHeroProps {
  bgSrc?: string;
}

/**
 * Static hero: the JABA-world colonnade vista with centered ink copy in the
 * open sky band. (The image is bright, so the copy runs dark, mirroring the
 * light-section rules.)
 */
export default function ScrollVideoHero({
  bgSrc = "/hero2.png",
}: ScrollVideoHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f7f8fa]">
      <img
        src={bgSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          // Feather just the bottom edge so the foreground grass stays visible
          // but the hard cut into the next section softens away.
          maskImage:
            "linear-gradient(to bottom, #000 90%, rgba(0,0,0,0.35) 97%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 90%, rgba(0,0,0,0.35) 97%, transparent 100%)",
        }}
      />

      {/* Light haze behind the headline zone so dark ink reads over the busy
          sky + mountains. Feathers out before the mascot so the scene stays vivid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,245,250,0.82) 0%, rgba(240,245,250,0.66) 26%, rgba(240,245,250,0.34) 46%, rgba(240,245,250,0) 64%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-6 pb-24 pt-36 text-center md:pt-44">
        <div className="max-w-4xl">
          <h1
            className="font-display text-4xl leading-[0.98] tracking-[-0.03em] text-[#101010] [text-wrap:balance] md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 1px 26px rgba(255,255,255,0.75), 0 1px 4px rgba(255,255,255,0.6)" }}
          >
            <span className="block">
              Athletes aren't <span className="italic pr-[0.12em]">hard</span> to work with.
            </span>
            <span className="block">Your systems are.</span>
          </h1>
        </div>

        <p
          className="mt-5 max-w-xl font-sans text-base font-semibold leading-7 text-black/75 [text-wrap:balance] md:text-lg"
          style={{ textShadow: "0 1px 16px rgba(255,255,255,0.85)" }}
        >
          JABA is AI that manages deliverables, deadlines, and follow-ups
          across every athlete partnership, so you never have to chase again.
        </p>

        <div className="mt-6 flex w-full max-w-xl items-center justify-center gap-3">
          <EmailCaptureGlass className="on-light" cta="Get early access" />
        </div>
      </div>
    </section>
  );
}
