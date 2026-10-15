import { useRef, useState } from "react";

import BrandMatchDemo from "@/components/BrandMatchDemo";

import AthleteInternetSection from "@/components/AthleteInternetSection";
import PageLayout from "@/components/layout/page-layout";
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

/** The one ask on the page. Brand plus email, so the reply can be specific. */
function ShortlistForm({ id }: { id?: string }) {
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brand,
          email,
          source: "brands-landing",
          company_website: honeypot,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setBrand("");
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div id={id} className="rounded-[18px] border border-black/10 bg-white p-6 md:p-7">
        <p className="font-deck text-2xl text-[#0a0a0a]">Got it.</p>
        <p className="mt-2 max-w-md font-sans text-[15px] leading-relaxed text-black/60">
          We&rsquo;ll put a shortlist together and send it over. No call needed to
          see it.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      className="rounded-[18px] border border-black/10 bg-white p-5 md:p-6"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          className="w-full rounded-[12px] border border-black/10 bg-[#fafafa] px-4 py-3 font-sans text-[15px] text-[#11131a] outline-none transition-colors placeholder:text-black/35 focus:border-black/35 md:flex-1"
          placeholder="Your brand"
          aria-label="Your brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full rounded-[12px] border border-black/10 bg-[#fafafa] px-4 py-3 font-sans text-[15px] text-[#11131a] outline-none transition-colors placeholder:text-black/35 focus:border-black/35 md:flex-1"
          placeholder="Work email"
          aria-label="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Honeypot: offscreen and skipped by tab order, so only bots fill it. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <VoltButton type="submit" size="lg">
          {status === "sending" ? "Sending…" : "Get my athlete shortlist"}
        </VoltButton>
        <span className="font-sans text-[13px] text-black/45">
          Free, and no call required.
        </span>
      </div>

      {status === "error" && (
        <p className="mt-3 font-sans text-[13px] text-[#b4231f]">
          Something went wrong. Email us at{" "}
          <a className="underline" href="mailto:hello@jaba.ai">
            hello@jaba.ai
          </a>
          .
        </p>
      )}
    </form>
  );
}

export default function BrandsLandingPage() {
  const askRef = useRef<HTMLDivElement>(null);

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

          <div className="mt-10 md:mt-12">
            <BrandMatchDemo
              onUnlock={() =>
                askRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            />
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
          <div ref={askRef} className="mt-9 text-left">
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
