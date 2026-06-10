import FooterSection from "@/components/sections/footer-section";
import SiteNav from "@/components/site-nav";

export default function PageLayout({
  children,
  footerFade,
}: {
  children: React.ReactNode;
  /** Surface color of the last section, so the footer loop fades out of it. */
  footerFade?: string;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteNav />
      {children}

      <FooterSection fadeFrom={footerFade} />
    </main>
  );
}
