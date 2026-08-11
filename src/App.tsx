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
import DamarFilmCard from "@/components/DamarFilmCard";
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
          <DamarFilmCard />
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
