import FooterSection from "@/components/sections/footer-section";
import SiteNav from "@/components/site-nav";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteNav />
      {children}

      <FooterSection />
    </main>
  );
}
