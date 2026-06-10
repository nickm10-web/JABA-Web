import { useRef, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { LiquidGlassFilter } from "@/components/ui/liquid-glass-filter";
import { useAdaptiveGlass } from "@/hooks/useAdaptiveGlass";

import SocialProofSection from "@/components/sections/social-proof-section";
import AiProjectManagerSection from "@/components/AiProjectManagerSection";
import RosterSection from "@/components/RosterSection";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import CtaSection from "@/components/sections/cta-section";
import FooterSection from "@/components/sections/footer-section";
import ProblemScrollStory from "@/components/ProblemScrollStory";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import TextAssistantSection from "@/components/TextAssistantSection";
import VideoPlayer from "@/components/ui/video-player";
import { VoltButton } from "@/components/ui/volt-button";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Press", href: "#/press" },
  // Temporarily hidden — pages still live at src/pages/{for-brands,for-schools,for-agencies}.tsx
  // and remain routed in src/router.tsx. Re-add these entries to restore them to the nav.
  // { label: "For Brands", href: "#/for-brands" },
  // { label: "For Schools", href: "#/for-schools" },
  // { label: "For Agencies", href: "#/for-agencies" },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navZoneRef = useRef<HTMLDivElement>(null);
  const navRailRef = useRef<HTMLElement>(null);
  const glassTheme = useAdaptiveGlass(navRailRef, navZoneRef);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <LiquidGlassFilter />
      <div className="relative">
        <div ref={navZoneRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
          <div className="pointer-events-auto mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            <header className="hero-nav-split animate-fade-lift">
              <a
                href="#top"
                className="hero-brand"
                aria-label="JABA home"
              >
                <img
                  src="/JABA%20White%201%20(1).png"
                  alt="JABA"
                  className="hero-brand-logo"
                />
              </a>

              <nav
                ref={navRailRef}
                data-glass={glassTheme}
                className="hero-nav-rail liquid-glass-shell hidden md:inline-flex"
              >
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hero-nav-link"
                  >
                    {item.label}
                  </a>
                ))}
                <VoltButton className="-my-1.5 ml-1" size="lg" icon={<Zap className="h-4 w-4" />}>
                  Book a demo
                </VoltButton>
              </nav>

              <div className="hero-mobile-actions md:hidden">
                <VoltButton icon={<Zap className="h-4 w-4" />}>
                  Book a demo
                </VoltButton>
                <button
                  type="button"
                  className="hero-mobile-menu-button liquid-glass-shell"
                  aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-[18px] w-[18px]" />
                  ) : (
                    <Menu className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>
            </header>

            {isMobileMenuOpen ? (
              <div className="hero-mobile-menu liquid-glass-shell md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hero-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <ScrollVideoHero />
      </div>

      <section className="bg-[#eeeeee] pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="relative mx-auto w-full max-w-4xl">
            <VideoPlayer
              src="/videos/Damar%20Anchor%20Short%20(2).mp4"
              poster="/DAMAR%20HAMLIN%20thumbnail.png"
              attribution={{
                kicker: "Hear from our Creative Director",
                name: "Damar Hamlin",
                role: "Buffalo Bills Safety · JABA Creative Director",
              }}
            />
          </div>
        </div>
      </section>
      <SocialProofSection />
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
      <CtaSection />
      <FooterSection />
    </main>
  );
}
