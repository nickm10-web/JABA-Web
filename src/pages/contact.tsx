import { useState } from "react";

import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";

const BOOKING_URL = "https://calendly.com/jordon-jaba/jaba";
// Shared inbox, not a personal address: this is the only address the page
// exposes, and it is shown solely as a fallback when the form fails.
const INBOX = "hello@jaba.ai";

const WHO = [
  {
    title: "Athletic departments",
    body: "Run NIL across your whole roster without adding headcount.",
  },
  {
    title: "Agencies and collectives",
    body: "Keep every athlete, brand, and deliverable moving in one thread.",
  },
  {
    title: "Brands",
    body: "Work with athletes directly, and see what the campaign actually earned.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "contact", company_website: honeypot }),
      });
      if (!res.ok) throw new Error("send failed");
      setName("");
      setEmail("");
      setMessage("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-[12px] border border-black/12 bg-white px-4 py-3 font-sans text-[15px] text-[#11131a] outline-none transition-colors placeholder:text-black/35 focus:border-black/35";

  return (
    <PageLayout footerFade="#eeeeee">
      {/* Black masthead so the fixed nav sits on its native surface. */}
      <section className="bg-black px-6 pb-16 pt-36 text-white md:px-10 md:pb-20 md:pt-44 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-deck text-4xl leading-[1.05] md:text-6xl">
            Contact us.
          </h1>
          <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-white/60 md:text-xl">
            Questions about JABA, or want to see it on your roster? Get in
            touch.
          </p>
        </div>
      </section>

      <section className="bg-[#eeeeee] px-6 py-16 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16">
          {/* Form */}
          <div>
            <h2 className="font-deck text-2xl text-[#0a0a0a] md:text-3xl">
              Send us a message
            </h2>
            <form onSubmit={send} className="mt-6 space-y-3">
              <input
                className={field}
                placeholder="Name"
                aria-label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className={field}
                placeholder="Work email"
                aria-label="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className={`${field} min-h-[132px] resize-y`}
                placeholder="How can we help?"
                aria-label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
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
              <div className="flex items-center gap-3 pt-1">
                <VoltButton>
                  {status === "sending" ? "Sending…" : status === "done" ? "Sent ✓" : "Send"}
                </VoltButton>
                {status === "error" && (
                  <p className="font-sans text-[13px] text-[#b4231f]">
                    Something went wrong. Email us at{" "}
                    <a className="underline" href={`mailto:${INBOX}`}>{INBOX}</a>.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Direct routes */}
          <div className="md:pt-14">
            <div className="rounded-[16px] border border-black/10 bg-white p-6">
              <p className="font-deck text-xl text-[#0a0a0a]">Book a demo</p>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-black/60">
                Pick a time that works and we&rsquo;ll walk you through JABA.
              </p>
              <div className="mt-5">
                <VoltButton href={BOOKING_URL}>Book a demo</VoltButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bg-[#eeeeee] px-6 pb-24 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl border-t border-black/10 pt-12">
          <div className="grid gap-8 md:grid-cols-3">
            {WHO.map((w) => (
              <div key={w.title}>
                <p className="font-deck text-lg text-[#0a0a0a]">{w.title}</p>
                <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-black/55">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
