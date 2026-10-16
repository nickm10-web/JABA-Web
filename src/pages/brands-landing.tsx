import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import BenchmarkSection from "@/components/brands/BenchmarkSection";
import BrandWalkthrough from "@/components/brands/BrandWalkthrough";
import ClosingSection from "@/components/brands/ClosingSection";
import FooterSection from "@/components/sections/footer-section";
import MeetJabaSection from "@/components/brands/MeetJabaSection";
import UnlabeledSearchableSection from "@/components/brands/UnlabeledSearchableSection";
import PageLayout from "@/components/layout/page-layout";
import SocialProofSection from "@/components/sections/social-proof-section";
import { VoltButton } from "@/components/ui/volt-button";

/* Cold-email destination. Deliberately one page, one ask, and no nav: the link
   arrives in a stranger's inbox, so every exit is a lost reply. */


/** Hands the brand to the demo page, which plays the walkthrough with it. The
 *  value lives in the hero, so the orbit beside it shows the brand as it's
 *  typed. */
function DemoLaunch({ brand, onBrand }: { brand: string; onBrand: (b: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const b = brand.trim();
        if (!b) return;
        window.location.href = `/brands-demo.html?brand=${encodeURIComponent(b)}`;
      }}
      className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5 md:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40 sm:flex-1"
          placeholder="Enter your brand"
          aria-label="Enter your brand"
          maxLength={40}
          value={brand}
          onChange={(e) => onBrand(e.target.value)}
          required
        />
        <VoltButton type="submit" size="lg">
          Find my athletes
        </VoltButton>
      </div>
    </form>
  );
}

/**
 * Built the way the reference site builds its hero: one world, one rendered
 * display object, the line under it, the ask, and the partners right under the
 * fold.
 *
 * The world is black with a faint volt bloom and a dot-mesh fabric curling in
 * from the right. The display object is the film's own title card: the 3D JABA
 * letters with JABA standing in front of them. Jordon's line is the headline;
 * the advantage Out2Win can't claim is that JABA is already inside the
 * programs that manage the athletes.
 */
function BrandsHero() {
  const [brand, setBrand] = useState("");

  return (
    <section className="relative isolate overflow-hidden bg-black px-6 pb-16 pt-10 text-white md:px-10 md:pb-24 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 18%, rgba(223,255,0,0.10), rgba(223,255,0,0.025) 45%, transparent 75%), radial-gradient(60% 50% at 85% 70%, rgba(110,140,0,0.16), transparent 70%)",
        }}
      />
      <img
        src="/brands/mesh.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[78%] w-full object-cover object-right opacity-90"
      />

      <div className="relative mx-auto max-w-6xl">
        <img src="/jaba-head.webp" alt="JABA" className="h-9 w-auto" />

        <div className="mx-auto mt-6 max-w-4xl text-center md:mt-4">
          {/* The title card: the letters, and JABA stepping in front of them. */}
          <div className="hero-card relative mx-auto aspect-[2000/880] w-full max-w-[52rem]">
            <img
              src="/jaba-3d-logo.png"
              alt=""
              aria-hidden
              className="hero-letters absolute inset-x-0 top-0 w-full"
              style={{ filter: "drop-shadow(0 34px 60px rgba(223,255,0,0.22))" }}
            />
            <div
              aria-hidden
              className="hero-floor absolute bottom-[1%] left-1/2 h-[15%] w-[44%] -translate-x-1/2 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(223,255,0,0.36), rgba(223,255,0,0.08) 55%, transparent)",
                filter: "blur(6px)",
              }}
            />
            <img
              src="/jaba-stand.webp"
              alt="JABA"
              className="hero-jaba absolute bottom-[5%] left-1/2 h-[96%] w-auto"
              style={{ filter: "drop-shadow(0 26px 34px rgba(0,0,0,0.85))" }}
            />
          </div>

          <h1 className="mx-auto mt-8 max-w-3xl font-deck text-4xl leading-[1.05] md:mt-10 md:text-6xl">
            Put your brand into the workflows of the biggest universities and agencies.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-white/60 md:text-xl">
            Let JABA find the perfect fit, then let our AI manage it in our group chat for you.
          </p>
          <div className="mx-auto mt-9 max-w-xl text-left">
            <DemoLaunch brand={brand} onBrand={setBrand} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BrandsLandingPage() {
  return (
    <PageLayout bare>
      <BrandsHero />

      {/* Who already works with JABA. */}
      <SocialProofSection onDark />

      {/* The film's own order from here: who JABA is, what it has read, what
          it can see that a caption cannot, who that turns up, how the work
          gets run, and what the post actually beat. */}
      <MeetJabaSection />

      <AthleteInternetSection />

      <UnlabeledSearchableSection />

      {/* How it works, as Jordon's three acts: the same walkthrough the hero
          opens with the visitor's brand, played here for "your brand". */}
      <section className="bg-black py-20 md:py-28">
        <BrandWalkthrough
          generic
          onFinish={() =>
            document.getElementById("shortlist")?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        />
      </section>

      <BenchmarkSection />

      <ClosingSection />

      {/* The main site's footer, grass and all. Its links are the homepage's
          hash routes, so they're pointed back at the root. */}
      <div aria-hidden className="relative bg-black leading-[0]">
        <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="-mb-px block h-7 w-full translate-y-px md:h-10">
          <path
            d="M0,0 L300,0 C 368,0 378,24 440,24 L1000,24 C 1062,24 1072,0 1140,0 L1440,0 L1440,44 L0,44 Z"
            fill="#eeeeee"
          />
        </svg>
      </div>
      <FooterSection linkBase="/" />
    </PageLayout>
  );
}
