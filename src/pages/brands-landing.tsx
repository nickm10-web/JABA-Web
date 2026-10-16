import AthleteInternetSection from "@/components/AthleteInternetSection";
import BenchmarkSection from "@/components/brands/BenchmarkSection";
import BrandWalkthrough from "@/components/brands/BrandWalkthrough";
import SkyHero from "@/components/brands/SkyHero";
import StorySection from "@/components/brands/StorySection";
import ClosingSection from "@/components/brands/ClosingSection";
import FooterSection from "@/components/sections/footer-section";
import MeetJabaSection from "@/components/brands/MeetJabaSection";
import UnlabeledSearchableSection from "@/components/brands/UnlabeledSearchableSection";
import PageLayout from "@/components/layout/page-layout";

/* Cold-email destination. One page, one ask: the nav only jumps within the
   page or to a demo call, since the link arrives in a stranger's inbox. */

/** The homepage's curved seam, between whichever two surfaces meet. */
function Seam({ from, to }: { from: string; to: string }) {
  return (
    <div aria-hidden className="relative leading-[0]" style={{ background: from }}>
      <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="-mb-px block h-7 w-full translate-y-px md:h-10">
        <path
          d="M0,0 L300,0 C 368,0 378,24 440,24 L1000,24 C 1062,24 1072,0 1140,0 L1440,0 L1440,44 L0,44 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

export default function BrandsLandingPage() {
  return (
    <PageLayout bare>
      <SkyHero />

      <StorySection />

      {/* Who already works with JABA. */}

      {/* The film's own order from here: who JABA is, what it has read, what
          it can see that a caption cannot, who that turns up, how the work
          gets run, and what the post actually beat. */}
      <MeetJabaSection />

      {/* The index runs dark: a wall of real posts reads best on black. */}
      <Seam from="#eeeeee" to="#000" />
      <AthleteInternetSection />

      <UnlabeledSearchableSection />

      {/* How it works, as Jordon's three acts: the same walkthrough the hero
          opens with the visitor's brand, played here for "your brand". */}
      <Seam from="#000" to="#eeeeee" />
      <section id="how" className="bg-[#eeeeee] py-20 md:py-28">
        <BrandWalkthrough
          generic
          tone="light"
          onFinish={() =>
            document.getElementById("shortlist")?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        />
      </section>

      {/* The report runs dark too: volt bars need black to carry. */}
      <Seam from="#eeeeee" to="#000" />
      <BenchmarkSection />
      <Seam from="#000" to="#eeeeee" />

      <ClosingSection />

      {/* The main site's footer, grass and all. Its links are the homepage's
          hash routes, so they're pointed back at the root. */}
      {/* The main site's footer scene, grass and all, without its link
          columns: on a cold-email page they'd only be exits. */}
      <FooterSection sceneOnly />
    </PageLayout>
  );
}
