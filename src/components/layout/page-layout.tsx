import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { VoltButton } from "@/components/ui/volt-button";
import FooterSection from "@/components/sections/footer-section";

const navItems = [
  { label: "Home", href: "#/" },
  { label: "Press", href: "#/press" },
  // Temporarily hidden, matching the homepage nav (see src/App.tsx).
  // { label: "For Brands", href: "#/for-brands" },
  // { label: "For Schools", href: "#/for-schools" },
  // { label: "For Agencies", href: "#/for-agencies" },
];

function useCurrentHash() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentHash = useCurrentHash();

  const isActive = (href: string) => {
    if (href === "#/") return currentHash === "#/" || currentHash === "#" || currentHash === "";
    return currentHash === href;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <header className="page-nav">
        <div className="page-nav-inner">
          <a href="#/" className="page-nav-brand" aria-label="JABA home">
            <img
              src="/JABA%20White%201%20(1).png"
              alt="JABA"
              className="page-nav-logo"
            />
          </a>

          {/* Same nav rail as the homepage hero (src/App.tsx), pinned dark. */}
          <nav
            data-glass="on-dark"
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

          <div className="flex items-center gap-3 md:hidden">
            <VoltButton icon={<Zap className="h-4 w-4" />}>
              Book a demo
            </VoltButton>
            <button
              type="button"
              className="page-mobile-menu-btn"
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="page-mobile-menu md:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`page-mobile-link ${isActive(item.href) ? "page-mobile-link-active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {children}

      <FooterSection />
    </main>
  );
}
