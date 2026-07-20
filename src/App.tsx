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

      <SocialProofSection />

      <section className="bg-[#eeeeee] pb-24 md:pb-40">
        <FadeUp className="mx-auto max-w-3xl px-6 pb-14 pt-28 text-center md:pb-24 md:pt-44">
          <p className="font-display text-lg italic text-black/45">
            Built with athletes
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.04] text-[#0a0a0a] md:text-5xl lg:text-6xl">
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
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-black/55 md:text-lg">
            From our Creative Director to every athlete on the platform, JABA is
            shaped by people who know what the business actually takes.
          </p>
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
              <span
                aria-hidden
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16"
              >
                <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
              </span>
            </div>
          </div>
        </FadeUp>
      </section>
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
