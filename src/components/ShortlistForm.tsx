import { useState } from "react";

import { VoltButton } from "@/components/ui/volt-button";

/**
 * The one ask on the brands pages. Brand plus email, so the reply can be
 * specific instead of a generic "thanks for your interest".
 *
 * `brand` prefills the field, which is how the demo page hands over what the
 * visitor already typed: asking for it twice is how you lose the reply.
 *
 * `tone` only swaps the palette. The demo page is dark, the landing page is
 * light, and the behaviour must stay identical between them.
 */
export default function ShortlistForm({
  id,
  brand: initialBrand = "",
  tone = "light",
}: {
  id?: string;
  brand?: string;
  tone?: "light" | "dark";
}) {
  const [brand, setBrand] = useState(initialBrand);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const dark = tone === "dark";
  const shell = dark
    ? "rounded-[18px] border border-white/10 bg-white/[0.04] p-5 md:p-6"
    : "rounded-[18px] border border-black/10 bg-white p-5 md:p-6";
  const field = dark
    ? "w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40 md:flex-1"
    : "w-full rounded-[12px] border border-black/10 bg-[#fafafa] px-4 py-3 font-sans text-[15px] text-[#11131a] outline-none transition-colors placeholder:text-black/35 focus:border-black/35 md:flex-1";
  const muted = dark ? "text-white/45" : "text-black/45";

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
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div id={id} className={shell}>
        <p className={`font-deck text-2xl ${dark ? "text-white" : "text-[#0a0a0a]"}`}>
          Got it.
        </p>
        <p className={`mt-2 max-w-md font-sans text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-black/60"}`}>
          We&rsquo;ll put a shortlist together and send it over. No call needed
          to see it.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={submit} className={shell}>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          className={field}
          placeholder="Your brand"
          aria-label="Your brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
        <span className={`font-sans text-[13px] ${muted}`}>
          Free, and no call required.
        </span>
      </div>

      {status === "error" && (
        <p className="mt-3 font-sans text-[13px] text-[#ff6b67]">
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
