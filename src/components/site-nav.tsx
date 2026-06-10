import { useRef, useState } from "react";
import { Menu, X, Zap } from "lucide-react";

import { LiquidGlassFilter } from "@/components/ui/liquid-glass-filter";
import { VoltButton } from "@/components/ui/volt-button";
import { useAdaptiveGlass } from "@/hooks/useAdaptiveGlass";

const navItems = [
  { label: "Home", href: "#/" },
  { label: "Press", href: "#/press" },
  // Temporarily hidden — pages still live at src/pages/{for-brands,for-schools,for-agencies}.tsx
  // and remain routed in src/router.tsx. Re-add these entries to restore them to the nav.
  // { label: "For Brands", href: "#/for-brands" },
  // { label: "For Schools", href: "#/for-schools" },
  // { label: "For Agencies", href: "#/for-agencies" },
];

/**
 * The one site nav. Used verbatim on the homepage and every subpage so
 * navigation never changes shape between routes.
 */
export default function SiteNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navZoneRef = useRef<HTMLDivElement>(null);
  const navRailRef = useRef<HTMLElement>(null);
  const glassTheme = useAdaptiveGlass(navRailRef, navZoneRef);

  return (
    <>
      <LiquidGlassFilter />
      <div ref={navZoneRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <header className="hero-nav-split animate-fade-lift">
            <a href="#/" className="hero-brand" aria-label="JABA home">
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
                <a key={item.label} href={item.href} className="hero-nav-link">
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
    </>
  );
}
