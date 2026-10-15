import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import BenchmarkSection from "@/components/brands/BenchmarkSection";
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
      className="rounded-[18px] border border-black/10 bg-white p-5 md:p-6"
    >
      <p className="text-center font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
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
 * Plain light hero. The scene art and the phone both came out: the phone was
 * telling a scheduling story to someone who came here to find athletes, and
 * without it the scene left half the fold empty.
 *
 * Centred, because there is no right-hand column any more and everything below
 * this is centred too.
 */
function BrandsHero() {
  return (
    <section className="relative overflow-hidden bg-[#eeeeee] px-6 pb-16 pt-16 text-[#0a0a0a] md:px-10 md:pb-24 md:pt-20 lg:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <img src="/jaba-head.webp" alt="JABA" className="mx-auto h-10 w-auto" />

        <h1 className="mx-auto mt-10 max-w-3xl font-deck text-4xl leading-[1.05] md:mt-12 md:text-6xl">
          Athlete brand campaigns, managed for you.
        </h1>

        <p className="mx-auto mt-5 max-w-xl font-sans text-lg leading-relaxed text-black/60 md:text-xl">
          JABA reads the entire athlete internet, so you can see who reaches
          your customer before you spend a dollar.
        </p>

        <div className="mx-auto mt-9 max-w-xl md:mt-10">
          <DemoLaunch />
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

      {/* The film's own order from here: who JABA is, what it has read, what
          it can see that a caption cannot, who that turns up, how the work
          gets run, and what the post actually beat. */}
      <MeetJabaSection />

      <AthleteInternetSection />

      <UnlabeledSearchableSection />

      <RightAthletesSection />

      <TextAssistantSection
        awaitHandoff={false}
        messages={BRAND_THREAD}
        heading={
          <>
            Then we run it,
            <span className="block text-black/60">start to finish.</span>
          </>
        }
        body="Quality control on every asset before you see it, and the chasing when something doesn't happen. JABA notices and texts the right person."
      />

      <BenchmarkSection />

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
