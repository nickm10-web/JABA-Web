import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { VoltButton } from "@/components/ui/volt-button";
import FooterSection from "@/components/sections/footer-section";

const navItems = [
  { label: "Platform", href: "#/" },
  { label: "For Brands", href: "#/for-brands" },
  { label: "For Schools", href: "#/for-schools" },
  { label: "For Agencies", href: "#/for-agencies" },
  { label: "Press", href: "#/press" },
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

          <nav className="page-nav-pill liquid-glass-shell hidden md:inline-flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`page-nav-link ${isActive(item.href) ? "page-nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <VoltButton icon={<Zap className="h-4 w-4" />}>
              Book a demo
            </VoltButton>
          </div>

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
