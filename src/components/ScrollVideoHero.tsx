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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#dfe9f2]">
      <img
        src={bgSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Soft haze behind the headline zone so ink text reads over clouds. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,244,249,0.55) 0%, rgba(238,244,249,0.25) 30%, rgba(238,244,249,0) 55%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-6 pb-24 pt-24 text-center md:pt-28">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.03em] text-[#101010] [text-wrap:balance] md:text-7xl lg:text-8xl">
            <span className="block">
              Athletes aren't <span className="italic pr-[0.12em]">hard</span> to work with.
            </span>
            <span className="block">Your systems are.</span>
          </h1>
        </div>

        <p className="mt-5 max-w-xl font-sans text-base font-medium leading-7 text-black/70 [text-wrap:balance] md:text-lg">
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
