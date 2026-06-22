import { Zap } from "lucide-react";

import { VoltButton } from "@/components/ui/volt-button";

const LIME = "#dfff00";

// Only links with real destinations ship.
const columns = [
  {
    title: "Platform",
    links: [
      { label: "For Schools", href: "#/for-schools" },
      { label: "For Agencies", href: "#/for-agencies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "#/" },
      { label: "Press", href: "#/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#/privacy" },
      { label: "Terms of service", href: "#/terms" },
    ],
  },
];

interface FooterSectionProps {
  /** Color of the page surface above the footer, so the loop fades out of it. */
  fadeFrom?: string;
}

export default function FooterSection({ fadeFrom = "#000000" }: FooterSectionProps) {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* World loop bleeding into the footer. */}
      <video
        src="/videos/footer-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim for legibility over the loop. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 24%, rgba(0,0,0,0.46) 52%, rgba(0,0,0,0.34) 72%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Fade out of whatever surface sits above the footer. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: `linear-gradient(to bottom, ${fadeFrom}, transparent)` }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-24 lg:px-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div className="col-span-2 max-w-sm sm:col-span-3 md:col-span-1">
            <a href="#/" aria-label="JABA home" className="inline-flex">
              <img src="/JABA%20White%201%20(1).png" alt="JABA" className="h-9 w-auto" />
            </a>
            <p className="mt-5 font-display text-2xl leading-snug text-white">
              The operating layer for athlete marketing.
            </p>
            <p className="mt-3 max-w-xs font-sans text-[13.5px] leading-relaxed text-white/55">
              JABA finds the deals, writes the outreach, and tracks every
              campaign to close, for schools and agencies alike.
            </p>
            <div className="mt-6">
              <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-[14px] text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pb-16 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p
            className="font-sans text-[12px] text-white/45"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            © {new Date().getFullYear()} JABA. All rights reserved.
          </p>
          <p className="font-sans text-[12px] text-white/45">
            Built for the people who move the game.
          </p>
        </div>
      </div>
    </footer>
  );
}
