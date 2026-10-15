import { useState } from "react";


import AthleteInternetSection from "@/components/AthleteInternetSection";
import PageLayout from "@/components/layout/page-layout";
import ShortlistForm from "@/components/ShortlistForm";
import TextAssistantSection from "@/components/TextAssistantSection";
import type { ChatMessage } from "@/components/ChatPhone";
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

      {/* The proof: the index itself. */}
      <AthleteInternetSection />

      {/* What running it actually feels like, between the index and the steps:
          it also breaks up two black sections that otherwise ran together. */}
      <TextAssistantSection
        awaitHandoff={false}
        messages={BRAND_THREAD}
        heading={
          <>
            Your campaign runs in texts.
            <span className="block text-black/60">No portal.</span>
            <span className="block text-black/60">No chasing.</span>
          </>
        }
        body="Briefs, approvals, deadlines, and the recap, handled in one thread."
      />

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
