import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import SiteNav from "@/components/site-nav";

import SocialProofSection from "@/components/sections/social-proof-section";
import AiProjectManagerSection from "@/components/AiProjectManagerSection";
import RosterSection from "@/components/RosterSection";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import PressPreviewSection from "@/components/sections/press-preview-section";
import CtaSection from "@/components/sections/cta-section";
import FooterSection from "@/components/sections/footer-section";
import ProblemScrollStory from "@/components/ProblemScrollStory";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import TextAssistantSection from "@/components/TextAssistantSection";
import { Play } from "lucide-react";
import { FadeUp } from "@/components/audience/fade-up";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <div className="relative">
        <ScrollVideoHero />
      </div>

      <section className="bg-[#eeeeee] pb-24 md:pb-40">
        <FadeUp className="mx-auto max-w-6xl px-6 pb-8 pt-28 md:pb-12 md:pt-40">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl leading-[1.03] text-[#0a0a0a] md:text-5xl lg:text-6xl">
              Built by the people who{" "}
              <span
                className="italic"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#dfff00",
                  textDecorationThickness: "0.12em",
                  textUnderlineOffset: "0.1em",
                }}
              >
                live it.
              </span>
            </h2>
            <button
              type="button"
              className="group inline-flex shrink-0 items-center gap-2.5 font-sans text-[15px] font-medium text-[#0a0a0a] transition-opacity hover:opacity-70 md:pb-2"
            >
              Watch the film
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ background: "#dfff00" }}
              >
                <Play className="h-3 w-3 translate-x-px text-black" fill="currentColor" />
              </span>
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.12} y={44} className="mx-auto w-full max-w-6xl px-6">
          <div
            className="group relative overflow-hidden rounded-[28px]"
            style={{ boxShadow: "0 50px 130px -40px rgba(0,0,0,0.5)" }}
          >
            <img
              src="/DAMAR%20HAMLIN%20thumbnail.png"
              alt="Damar Hamlin, JABA Creative Director"
              className="damar-kenburns w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-12">
              <div>
                <p className="font-display text-base italic text-white/70 md:text-lg">
                  Hear from our Creative Director
                </p>
                <p className="mt-1.5 font-display text-3xl leading-none text-white md:text-4xl">
                  Damar Hamlin
                </p>
                <p className="mt-2.5 font-sans text-[12.5px] tracking-wide text-white/60">
                  Buffalo Bills Safety · JABA Creative Director
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <SocialProofSection />

      {/* Soft curved edge into the dark problem section */}
      <div aria-hidden className="relative bg-[#eeeeee] leading-[0]">
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="block h-7 w-full md:h-10"
        >
          <path
            d="M0,0 L400,0 C 468,0 478,24 540,24 L900,24 C 962,24 972,0 1040,0 L1440,0 L1440,44 L0,44 Z"
            fill="#000"
          />
        </svg>
      </div>

      <ProblemScrollStory />

      {/* Volt divider */}
      <div className="h-1.5 w-full bg-[#dfff00]" />

      <section className="bg-[#eeeeee] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Outer wrapper — character can bleed above */}
          <div className="relative" style={{paddingTop: "160px"}}>
            {/* Rounded container with background scene */}
            <div className="relative overflow-hidden rounded-3xl" style={{aspectRatio: "16/9"}}>
              <img
                src="/meet-jaba-wb.png"
                alt=""
                aria-hidden
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-cover object-bottom"
              />
              {/* Text — bottom right */}
              <div className="absolute bottom-0 right-0 z-10 p-8 md:p-12">
                <LiquidGlassCard
                  glowIntensity="sm"
                  shadowIntensity="md"
                  blurIntensity="md"
                  borderRadius="16px"
                  className="px-6 py-5"
                >
                  <p className="mb-2 text-3xl font-black uppercase tracking-[0.1em] text-white text-center">Meet</p>
                  <img
                    src="/jaba-3d-logo.png"
                    alt="JABA"
                    draggable={false}
                    className="mx-auto h-16 w-auto select-none md:h-20 lg:h-28"
                  />
                  <p className="mt-3 text-sm font-medium text-white/90 md:text-base text-center">
                    The AI layer for athlete management.
                  </p>
                </LiquidGlassCard>
              </div>
            </div>

            {/* Character — outside clip, bleeds upward */}
            <div className="absolute bottom-0 left-8 z-20 md:left-12">
              <div className="absolute bottom-0 left-1/2 z-0 h-5 w-48 -translate-x-1/2 rounded-full bg-black/35 blur-xl" />
              <img
                src="/Jaba_waving_alpha.gif"
                alt="JABA character waving"
                draggable={false}
                className="relative z-10 w-auto select-none"
                style={{height: "700px", marginBottom: "-60px"}}
              />
            </div>
          </div>
        </div>
      </section>

      <TextAssistantSection />

      <AiProjectManagerSection />
      <RosterSection />
      {/* <HowItWorksSection /> */}
      <PressPreviewSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
