import { useEffect, useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import BenchmarkSection from "@/components/brands/BenchmarkSection";
import PartnerOrbit, { PARTNERS } from "@/components/brands/PartnerOrbit";
import BrandWalkthrough from "@/components/brands/BrandWalkthrough";
import ClosingSection from "@/components/brands/ClosingSection";
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
 * Jordon's line: the advantage Out2Win can't claim is that JABA is already
 * inside the programs that manage the athletes. The orbit beside it shows
 * exactly that, with the visitor's brand at the centre as they type it.
 *
 * Partners connect one at a time on arrival; after that a signal keeps moving
 * from partner to partner so the network reads as live, not as a diagram.
 */
function BrandsHero() {
  const [brand, setBrand] = useState("");
  const [linked, setLinked] = useState(0);
  const [highlight, setHighlight] = useState(-1);

  useEffect(() => {
    let n = 0;
    let travel = 0;
    const connect = window.setInterval(() => {
      n += 1;
      setLinked(n);
      setHighlight(n - 1);
      if (n >= PARTNERS.length) {
        clearInterval(connect);
        let h = n - 1;
        travel = window.setInterval(() => {
          h = (h + 1) % PARTNERS.length;
          setHighlight(h);
        }, 900);
      }
    }, 320);
    return () => {
      clearInterval(connect);
      clearInterval(travel);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-20 pt-12 text-white md:px-10 md:pb-28 md:pt-14 lg:px-12">
      {/* Volt ambient light from above. Volt is far hotter than white at the
          same opacity, so this stays low and falls off early: it should read
          as light in the room, not as a lamp behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(223,255,0,0.13) 0%, rgba(223,255,0,0.05) 40%, rgba(223,255,0,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <img src="/jaba-head.webp" alt="JABA" className="h-9 w-auto" />

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <h1 className="max-w-2xl font-deck text-4xl leading-[1.04] md:text-6xl">
              Put your brand into the workflows of the biggest universities and agencies.
            </h1>
            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/55 md:text-xl">
              Let JABA find the perfect fit, then let our AI manage it in our group chat for you.
            </p>
            <div className="mt-9 max-w-lg">
              <DemoLaunch brand={brand} onBrand={setBrand} />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[25rem] lg:max-w-[30rem]">
            <PartnerOrbit brand={brand.trim() || "Your brand"} linked={linked} highlight={highlight} />
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
          opens with the visitor's brand, played here for "your brand". The
          hero already played act one, so this opens on act two. */}
      <section className="bg-black py-20 md:py-28">
        <BrandWalkthrough
          generic
          startAct={1}
          onFinish={() =>
            document.getElementById("shortlist")?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        />
      </section>

      <BenchmarkSection />

      <ClosingSection />
    </PageLayout>
  );
}
