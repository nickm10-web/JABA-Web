import { EmailCaptureGlass } from "@/components/ui/email-capture-glass";

interface ScrollVideoHeroProps {
  idleVideoSrc?: string;
}

export default function ScrollVideoHero({
  idleVideoSrc = "/videos/Video%20BG%20Web_02-3.mp4",
}: ScrollVideoHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        src={idleVideoSrc}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark vignette so the headline stays legible over the video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 20% 30%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-start justify-start pb-24 pl-12 pr-6 pt-32 text-left md:pl-20 md:pt-40 lg:pl-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl leading-[0.92] tracking-[-0.04em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-7xl lg:text-8xl">
            <span className="block">
              Athletes aren't <span className="italic">hard</span>
            </span>
            <span className="block">to work with.</span>
            <span className="block">Your systems are.</span>
          </h1>
        </div>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] [text-wrap:balance] md:text-lg">
          JABA is AI that manages deliverables, deadlines, and follow-ups
          across every athlete partnership, so you never have to chase again.
        </p>

        <div className="mt-8 flex w-full items-center gap-3">
          <EmailCaptureGlass cta="Get early access" />
        </div>
      </div>
    </section>
  );
}
