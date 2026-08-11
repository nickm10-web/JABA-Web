import SiteNav from "@/components/site-nav";

import SocialProofSection from "@/components/sections/social-proof-section";
import AiProjectManagerSection from "@/components/AiProjectManagerSection";
import RosterSection from "@/components/RosterSection";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import PressPreviewSection from "@/components/sections/press-preview-section";
import CtaSection from "@/components/sections/cta-section";
import FooterSection from "@/components/sections/footer-section";
import ProblemScrollStory from "@/components/ProblemScrollStory";
import AthleteInternetSection from "@/components/AthleteInternetSection";
import InTheMiddleSection from "@/components/InTheMiddleSection";
import PhoneHandoff from "@/components/PhoneHandoff";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import TextAssistantSection from "@/components/TextAssistantSection";
import { Play } from "lucide-react";
import { FadeUp } from "@/components/audience/fade-up";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PhoneHandoff />
      <div className="relative">
        <ScrollVideoHero />
      </div>

      {/* Bottom padding must outrun the Damar card's 130px shadow so the next
          section's opaque background never slices it into a visible seam. */}
      <section className="bg-[#eeeeee] pb-16 md:pb-40">
        {/* Extra bottom room on desktop: Damar's cutout overhangs the card top. */}
        <FadeUp className="mx-auto max-w-6xl px-6 pb-8 pt-24 md:pb-24 md:pt-32">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-deck text-4xl leading-[1.03] text-[#0a0a0a] md:text-5xl lg:text-6xl">
              Built by the people
              <br />
              who{" "}
              <img
                src="/live-it.png"
                alt="live it."
                className="inline-block h-[1.24em] w-auto translate-y-[0.25em] align-baseline"
              />
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.12} y={44} className="mx-auto w-full max-w-6xl px-6">
          {/* The card clips the top 12.5% of the photo; a pixel-aligned cutout of
              Damar sits outside that clip, masked to just that sliver, so his
              head reads as breaking out above the card. Both images share the
              same box and animation so the ken-burns never drifts apart. */}
          <div className="group relative">
            <div
              className="relative aspect-[4/4.4] overflow-hidden rounded-[28px] shadow-[0_16px_40px_-22px_rgba(0,0,0,0.45)] md:aspect-[2000/984] md:shadow-[0_50px_130px_-40px_rgba(0,0,0,0.5)]"
            >
              <img
                src="/DAMAR%20HAMLIN%20thumbnail.png"
                alt="Damar Hamlin, JABA Creative Director"
                className="damar-kenburns absolute inset-0 h-full w-full object-cover object-bottom md:inset-auto md:bottom-0 md:left-0 md:h-auto"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
              />
            {/* Centered play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="flex h-12 w-12 -translate-y-8 items-center justify-center rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 md:translate-y-0"
                style={{ background: "#dfff00" }}
              >
                <Play className="h-6 w-6 translate-x-0.5 text-black md:h-7 md:w-7" fill="currentColor" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-12">
              <div>
                <p className="font-display text-sm italic text-white/70 md:text-lg">
                  Hear from our Creative Director
                </p>
                <p className="mt-1.5 font-display text-2xl leading-none text-white md:text-4xl">
                  Damar Hamlin
                </p>
                <p className="mt-2.5 font-sans text-[12.5px] tracking-wide text-white/60">
                  Buffalo Bills Safety · JABA Creative Director
                </p>
              </div>
              </div>
            </div>

            <img
              src="/damar-cutout.png"
              alt=""
              aria-hidden
              className="damar-kenburns pointer-events-none absolute bottom-0 left-0 hidden w-full md:block"
              style={{
                maskImage: "linear-gradient(to bottom, #000 0 15%, transparent 16.5%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 0 15%, transparent 16.5%)",
              }}
            />
          </div>
        </FadeUp>
      </section>

      <SocialProofSection />

      {/* Soft curved edge into the dark problem section */}
      <div aria-hidden className="relative bg-[#eeeeee] leading-[0]">
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="-mb-px block h-7 w-full translate-y-px md:h-10"
        >
          <path
            d="M0,0 L300,0 C 368,0 378,24 440,24 L1000,24 C 1062,24 1072,0 1140,0 L1440,0 L1440,44 L0,44 Z"
            fill="#000"
          />
        </svg>
      </div>

      <ProblemScrollStory />

      {/* Volt divider */}
      <div className="h-1.5 w-full bg-[#dfff00]" />

      {/* Meet JABA — deck-style black card, no scene background so the intro lands */}
      <section className="meets deck bg-[#eeeeee] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="meetbox">
              <video className="walkvid" autoPlay muted loop playsInline aria-label="JABA character walking in">
                <source src="/deck/jaba-walk.mp4" type="video/mp4" />
              </video>
              <div className="meettext">
                <h2 className="font-deck text-4xl leading-[1.06] text-white md:text-6xl">Meet JABA.</h2>
                <p className="em font-deck mt-4 text-2xl md:mt-5 md:text-[2.1rem]">
                  The AI layer for athlete management.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <InTheMiddleSection />

      <TextAssistantSection />

      <AthleteInternetSection />

      <AiProjectManagerSection />
      <RosterSection />
      {/* <HowItWorksSection /> */}

      {/* Volt divider out of the dark agents block into the light press band */}
      <div className="h-1.5 w-full bg-[#dfff00]" />
      <PressPreviewSection />
      <CtaSection />
      <FooterSection fadeFrom="#eeeeee" />
    </main>
  );
}
