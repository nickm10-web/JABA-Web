import { useRef } from "react";

import { LiquidGlassFilter } from "@/components/ui/liquid-glass-filter";
import { VoltButton } from "@/components/ui/volt-button";
import { useAdaptiveGlass } from "@/hooks/useAdaptiveGlass";

// Nav links are parked for launch — For Schools / For Agencies come back once
// those pages are reworked. Routes in src/router.tsx stay live for direct URLs.

/**
 * The one site nav. Used verbatim on the homepage and every subpage so
 * navigation never changes shape between routes.
 */
export default function SiteNav() {
  const navZoneRef = useRef<HTMLDivElement>(null);
  // Each item samples what is directly behind *it*. Sampling the header once
  // meant the logo took its colour from whatever sat mid-screen — so it went
  // white over a dark hero bubble while sitting on light grey itself.
  const signInRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const signInTheme = useAdaptiveGlass(signInRef, navZoneRef);
  const ctaTheme = useAdaptiveGlass(ctaRef, navZoneRef);

  return (
    <>
      <LiquidGlassFilter />
      <div ref={navZoneRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <header className="hero-nav-split animate-fade-lift">
            <a href="#/" className="hero-brand" aria-label="JABA home">
              {/* Full-colour mascot head: reads on light and dark alike, so it
                  skips the adaptive invert the wordmark needed. */}
              <img
                src="/jaba-head.webp"
                alt="JABA"
                className="h-9 w-auto sm:h-10 lg:h-11"
              />
            </a>

            <div className="flex items-center gap-2.5">
              <a
                ref={signInRef}
                href="https://jaba.live"
                target="_blank"
                rel="noopener noreferrer"
                data-glass={signInTheme}
                className="hero-signin"
              >
                Sign in
              </a>
              <div ref={ctaRef}>
                <VoltButton
                  surface={ctaTheme === "on-dark" ? "dark" : "light"}
                  onClick={() => window.open("https://calendly.com/jordon-jaba/jaba", "_blank", "noopener,noreferrer")}
                >
                  Book a demo
                </VoltButton>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
