import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import PageLayout from "@/components/layout/page-layout";
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

export default function BrandsLandingPage() {
  return (
    <PageLayout bare>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#eeeeee] px-6 pb-16 pt-16 text-[#0a0a0a] md:px-10 md:pb-24 md:pt-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <img src="/jaba-head.webp" alt="JABA" className="h-10 w-auto" />

          <h1 className="mt-10 max-w-3xl font-deck text-4xl leading-[1.05] md:mt-12 md:text-6xl">
            Find the athletes who actually move your product.
          </h1>

          <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-black/60 md:text-xl">
            JABA reads the entire athlete internet, so you can see who reaches
            your customer before you spend a dollar.
          </p>

          <div className="mt-9 max-w-xl md:mt-10">
            <DemoLaunch />
          </div>
        </div>
      </section>

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
