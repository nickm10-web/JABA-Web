import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

import BrandStorySection from "@/components/sections/brand-story-section";
import SocialProofSection from "@/components/sections/social-proof-section";
import ProblemSection from "@/components/sections/problem-section";
import ProductShowcaseSection from "@/components/sections/product-showcase-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import AudienceSection from "@/components/sections/audience-section";
import TractionSection from "@/components/sections/traction-section";
import CtaSection from "@/components/sections/cta-section";
import FooterSection from "@/components/sections/footer-section";
import { VoltButton } from "@/components/ui/volt-button";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "For Brands", href: "#/for-brands" },
  { label: "For Schools", href: "#/for-schools" },
  { label: "For Agencies", href: "#/for-agencies" },
  { label: "Press", href: "#/press" },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate min-h-screen overflow-hidden">
        <img
          src="/webhero1.png"
          alt="A retro CRT television on a grassy hill inside a bright utopian sports campus framed by white pillars."
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center brightness-[1.02] contrast-95 saturate-[0.94] sm:scale-[1.03]"
        />
        <div className="hero-atmosphere absolute inset-0 -z-20" />
        <div className="hero-grain absolute inset-0 -z-10" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8">
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

            <nav className="hero-nav-rail liquid-glass-shell hidden md:inline-flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hero-nav-link"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hero-nav-cta hidden md:flex">
              <VoltButton icon={<Zap className="h-4 w-4" />}>
                Book a demo
              </VoltButton>
            </div>

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

          <div
            id="top"
            className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-start pt-10 text-center sm:pt-12 lg:pt-14"
          >
            <h1 className="mt-2 font-display text-[2.9rem] leading-[0.88] tracking-[-0.06em] text-slate-950 drop-shadow-[0_2px_10px_rgba(255,255,255,0.18)] sm:text-[4.35rem] lg:text-[5.55rem]">
              <span className="block">
                Athletes aren't <span className="italic">hard</span>
              </span>
              <span className="block">to work with.</span>
              <span className="block">Your systems are.</span>
            </h1>

            <p className="mt-4 max-w-[700px] text-[0.98rem] leading-7 text-slate-900/72 [text-wrap:balance] sm:text-[1.06rem]">
              JABA is AI that manages deliverables, deadlines, and follow-ups
              across every athlete partnership — so you never have to chase
              again.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <VoltButton
                icon={<Zap className="h-4 w-4" />}
              >
                See JABA in action
              </VoltButton>
            </div>
          </div>

        </div>
      </section>

      <BrandStorySection />
      <SocialProofSection />
      <ProblemSection />
      <ProductShowcaseSection />
      <HowItWorksSection />
      <AudienceSection />
      <TractionSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
