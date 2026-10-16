import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import BenchmarkSection from "@/components/brands/BenchmarkSection";
import Eyebrow from "@/components/brands/Eyebrow";
import HeroScan from "@/components/brands/HeroScan";
import WrongNumberSection from "@/components/brands/WrongNumberSection";
import MeetJabaSection from "@/components/brands/MeetJabaSection";
import RightAthletesSection from "@/components/brands/RightAthletesSection";
import UnlabeledSearchableSection from "@/components/brands/UnlabeledSearchableSection";
import PageLayout from "@/components/layout/page-layout";
import ShortlistForm from "@/components/ShortlistForm";
import TextAssistantSection from "@/components/TextAssistantSection";
import type { ChatMessage } from "@/components/ChatPhone";
import SocialProofSection from "@/components/sections/social-proof-section";
import { VoltButton } from "@/components/ui/volt-button";

/* Cold-email destination. Deliberately one page, one ask, and no nav: the link
   arrives in a stranger's inbox, so every exit is a lost reply. */


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
      className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5 md:p-6"
    >
      <Eyebrow tone="muted">See how it works</Eyebrow>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40 sm:flex-1"
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

/* The brand's side of the same thread the homepage shows. Dana runs the
   campaign, Maya is the athlete, and the point of the exchange is that the
   brand never has to chase anyone. Fictional people, fictional campaign. */
const BRAND_THREAD: ChatMessage[] = [
  { sender: "casey", name: "Dana", text: "we need the launch post live Friday" },
  { sender: "brielle", name: "Maya", text: "i thought that was next week \u{1F605}" },
  {
    sender: "jaba",
    name: "JABA",
    text: "Friday 9am. I resent Maya the brief and the usage terms, both signed.",
  },
  {
    sender: "jaba",
    name: "JABA",
    text: "Draft's with you for approval. I'll post on schedule and send the recap.",
    reaction: { emoji: "\u{1F44D}", fromMe: true },
  },
  { sender: "casey", name: "Dana", text: "didn't have to chase anyone", reaction: { emoji: "\u2764\uFE0F" } },
];

/**
 * Copy on the left, the product working on the right. The centred version was
 * type on a glow with nothing to look at; the homepage hero works because the
 * phone sits beside the copy, and this page's equivalent is the scan.
 */
function BrandsHero() {
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

        <div className="mt-12 grid grid-cols-1 items-center gap-16 md:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <Eyebrow>JABA for brands</Eyebrow>
            <h1 className="mt-5 max-w-xl font-deck text-4xl leading-[1.04] md:text-6xl">
              Athlete brand campaigns, managed for you.
            </h1>
            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/55 md:text-xl">
              JABA reads the entire athlete internet, so you can see who reaches
              your customer before you spend a dollar.
            </p>
            <div className="mt-9 max-w-lg">
              <DemoLaunch />
            </div>
          </div>

          <HeroScan />
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

      <WrongNumberSection />

      <RightAthletesSection />

      <TextAssistantSection
        tone="dark"
        eyebrow={<Eyebrow>The campaign</Eyebrow>}
        awaitHandoff={false}
        messages={BRAND_THREAD}
        heading={
<>We run it, brief to post.</>
        }
        body="Quality control on every asset before you see it, and the chasing when something doesn't happen. JABA notices and texts the right person."
      />

      <BenchmarkSection />

      {/* The ask again, for anyone who read to the end. */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-deck text-4xl leading-[1.05] md:text-5xl">
            See who fits your brand.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg leading-relaxed text-white/55">
            Tell us what you sell and we&rsquo;ll send back the athletes worth
            talking to.
          </p>
          <div className="mt-9 text-left">
            <ShortlistForm id="shortlist" tone="dark" />
          </div>
          <p className="mt-10 font-sans text-[13px] text-white/35">
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
