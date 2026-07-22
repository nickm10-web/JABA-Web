import FooterSection from "@/components/sections/footer-section";
import SiteNav from "@/components/site-nav";

export default function PageLayout({
  children,
  footerFade,
  bare,
}: {
  children: React.ReactNode;
  /** Surface color of the last section, so the footer loop fades out of it. */
  footerFade?: string;
  /** When true, render the page content only — no site nav, no footer. */
  bare?: boolean;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      {!bare && <SiteNav />}
      {children}

      {!bare && <FooterSection fadeFrom={footerFade} />}
    </main>
  );
}
