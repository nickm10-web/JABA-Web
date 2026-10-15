import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import PageLayout from "@/components/layout/page-layout";
import BrandHeroPhone from "@/components/BrandHeroPhone";
import ShortlistForm from "@/components/ShortlistForm";
import SocialProofSection from "@/components/sections/social-proof-section";
import { VoltButton } from "@/components/ui/volt-button";

/* Cold-email destination. Deliberately one page, one ask, and no nav: the link
   arrives in a stranger's inbox, so every exit is a lost reply. */

const STEPS = [
  {
    art: "/step-outreach.webp",
    title: "Find",
    body: "Athletes whose audience already looks like your customer, not whoever has the biggest follower count.",
  },
  {
    art: "/step-manage.webp",
    title: "Run",
    body: "Briefs, deadlines, approvals, and posts, handled over text so nothing sits waiting on someone to log in.",
  },
  {
    art: "/step-report.webp",
    title: "Prove",
    body: "What went up, what it reached, and whether the campaign did what you paid for.",
  },
];

/** Hands the brand to the demo page, which runs the animation on arrival. */
function DemoLaunch() {
  const [brand, setBrand] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const b = brand.trim();
        if (!b) return;
        window.location.href = `/brands-demo.html?brand=${encodeURIComponent(b)}`;
      }}
      className="rounded-[18px] border border-black/10 bg-white p-5 md:p-6"
    >
      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
        See how it works
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full rounded-[12px] border border-black/10 bg-[#fafafa] px-4 py-3 font-sans text-[15px] text-[#11131a] outline-none transition-colors placeholder:text-black/35 focus:border-black/35 sm:flex-1"
          placeholder="Enter your brand"
          aria-label="Enter your brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
 * Same scene and build as the homepage hero: the colonnade vista with the copy
 * sitting on the sky band, and the phone running the thread on the right. The
 * copy is the only thing that changes, because a cold-email visitor arrives
 * knowing nothing about JABA and the scene is what makes it look like a
 * product rather than a form.
 *
 * Copy stays left and the phone fills the right, so there is no empty half.
 */
function BrandsHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#eeeeee]">
      <picture>
        {/* Portrait crop on phones; the 16:9 desktop art loses the scene. */}
        <source media="(max-width: 767px)" srcSet="/hero-world-mobile.webp" />
        <img
          src="/hero-world.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] items-start gap-12 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-6 lg:px-8 lg:pb-0 lg:pt-16">
        {/* Copy, lifted above the hills so it lands on the open sky. */}
        <div className="relative min-w-0 text-center md:text-left lg:-translate-y-20 lg:self-center">
          <img
            src="/jaba-head.webp"
            alt="JABA"
            className="mx-auto h-10 w-auto md:mx-0"
          />

          <h1
            className="mt-8 font-deck text-4xl leading-[1.04] text-white [text-wrap:balance] md:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25)" }}
          >
            <span className="block">Find the athletes who</span>
            <span className="block text-[#dfff00]">actually move your product.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl font-sans text-lg font-bold leading-snug text-white/95 [text-wrap:balance] md:mx-0 md:text-xl"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.3)" }}
          >
            JABA reads the entire athlete internet, so you can see who reaches
            your customer before you spend a dollar.
          </p>

          <div className="mx-auto mt-7 w-full max-w-xl md:mx-0">
            <DemoLaunch />
          </div>

        </div>

        {/* The phone hangs below the box on purpose: the fold crops the tail,
            which is what lets it ride high without growing the section. */}
        <div className="hidden self-start lg:flex lg:justify-end">
          <div className="relative h-[420px] w-[440px] lg:h-[460px] lg:w-[480px]">
            <div className="absolute inset-x-0 top-0 translate-y-[60px] lg:translate-y-[80px]">
              <BrandHeroPhone />
            </div>
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
      <SocialProofSection />

      {/* The proof: the index itself. */}
      <AthleteInternetSection />

      {/* What it looks like to run a campaign. */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center font-deck text-4xl leading-[1.06] md:text-5xl">
            Every campaign, start to finish.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl"
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 25% 0%, rgba(233,232,244,0.95), transparent 62%), linear-gradient(180deg, #f6f6f9 0%, #eceaf3 100%)",
                  }}
                />
                <div className="relative grid flex-1 place-items-center p-6 pb-2 lg:p-8 lg:pb-3">
                  <img
                    src={s.art}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="w-[92%] select-none"
                  />
                </div>
                <div className="relative p-6 pt-4 lg:p-8 lg:pt-5">
                  <h3 className="font-deck text-2xl leading-tight text-[#0a0a0a] lg:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/55 lg:text-base">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The ask again, for anyone who read to the end. */}
      <section className="bg-[#eeeeee] px-6 py-20 text-[#0a0a0a] md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-deck text-4xl leading-[1.05] md:text-5xl">
            See who fits your brand.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg leading-relaxed text-black/60">
            Tell us what you sell and we&rsquo;ll send back a shortlist of
            athletes worth talking to.
          </p>
          <div className="mt-9 text-left">
            <ShortlistForm id="shortlist" />
          </div>
          <p className="mt-10 font-sans text-[13px] text-black/45">
            © {new Date().getFullYear()} JABA ·{" "}
            <a className="underline" href="https://jaba.ai">
              jaba.ai
            </a>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
