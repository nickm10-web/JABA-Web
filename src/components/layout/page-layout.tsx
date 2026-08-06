import FooterSection from "@/components/sections/footer-section";
import SiteNav from "@/components/site-nav";

export default function PageLayout({
  children,
  footerFade,
  bare,
  theme,
}: {
  children: React.ReactNode;
  /** Surface color of the last section, so the footer loop fades out of it. */
  footerFade?: string;
  /** When true, render the page content only — no site nav, no footer. */
  bare?: boolean;
  /** Optional scope class for theming (e.g. an alternate heading font). */
  theme?: string;
}) {
  return (
    <main className={`min-h-screen bg-black text-white${theme ? ` ${theme}` : ""}`}>
      {!bare && <SiteNav />}
      {children}

      {!bare && <FooterSection fadeFrom={footerFade} />}
    </main>
  );
}
