
import { VoltButton } from "@/components/ui/volt-button";

// Only links with real destinations ship. For Schools / For Agencies are
// parked until those pages are ready for launch.
const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "#/" },
      { label: "Press", href: "#/press" },
      { label: "Contact", href: "#/contact" },
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

const socials: Array<{ label: string; href: string; path?: string; node?: React.ReactNode }> = [
    {
    label: "Instagram",
    href: "https://www.instagram.com/jaba.ai",
    node: (
      <g fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@GETJABA",
    path: "M23.5 6.9a3 3 0 0 0-2.1-2.13C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.4.52A3 3 0 0 0 .5 6.9C0 8.8 0 12 0 12s0 3.2.5 5.1a3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13C24 15.2 24 12 24 12s0-3.2-.5-5.1ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/jaba-ai",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
];

interface FooterSectionProps {
  /** Color of the page surface above the footer, kept for call-site compat. */
  fadeFrom?: string;
}

/**
 * Light footer strip, then the JABA world with the wordmark standing in it:
 * sky at the back, giant translucent wordmark in the middle, and a cutout of
 * the grass foreground (footer-grass.webp, masked out of the same art) pasted
 * over the letters' feet so the type reads as part of the landscape.
 */
export default function FooterSection({ fadeFrom: _fadeFrom }: FooterSectionProps) {
  return (
    <footer className="bg-[#eeeeee] text-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-24 lg:px-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div className="col-span-2 max-w-sm sm:col-span-3 md:col-span-1">
            <a href="#/" aria-label="JABA home" className="inline-flex">
              <img src="/jaba-head.webp" alt="JABA" className="h-9 w-auto" />
            </a>
            <p className="mt-5 font-deck text-2xl leading-snug">
              The operating layer for athlete marketing.
            </p>
            <p className="mt-3 max-w-xs font-sans text-[13.5px] leading-relaxed text-black/60">
              JABA finds the deals, writes the outreach, and tracks every
              campaign to close, for schools and agencies alike.
            </p>
            <div className="mt-6 flex">
              <VoltButton
                onClick={() =>
                  window.open("https://calendly.com/jordon-jaba/jaba", "_blank", "noopener,noreferrer")
                }
              >
                Book a demo
              </VoltButton>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/25 text-black/70 transition-colors hover:border-black hover:text-black"
                >
                  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
                    {s.node ?? <path d={s.path} />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-black/45">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-[14px] text-black/65 transition-colors hover:text-black"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright, centred like the reference. Lifted above the strip's
            mist (z) because the strip pulls up underneath it. */}
        <p
          className="relative z-30 pb-10 pt-12 text-center font-sans text-[12.5px] font-semibold text-black/70 md:pt-14"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          © {new Date().getFullYear()} JABA.
        </p>
      </div>

      {/* ── The world sign-off ── */}
      {/* Fixed aspect crops the scene to its lower band: the full art is 72%
          sky, which left the logo swimming. Bottom-anchored cover keeps the
          grass line and lets the crop eat sky only. The strip pulls up over
          the copyright (negative margin) so the fade owns the hand-off — the
          © line sits inside the mist rather than above a visible seam. */}
      <div aria-hidden className="relative -mt-16 aspect-[2/1] w-full overflow-hidden leading-[0] md:-mt-20 md:aspect-[2.6/1]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2/5"
          style={{
            background:
              "linear-gradient(to bottom, #eeeeee 0%, #eeeeee 18%, rgba(238,238,238,0.88) 42%, rgba(238,238,238,0.55) 66%, rgba(238,238,238,0.22) 85%, transparent 100%)",
          }}
        />
        <img
          src="/hero-world.webp"
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover object-bottom"
          draggable={false}
        />

        {/* Middle: the 3D wordmark, feet in the grass. Bottom offset tucks it
            behind the foreground cutout's crest. Full opacity: unlike the flat
            white mark, the volt render carries its own depth and dims badly. */}
        <img
          src="/jaba-3d-logo.png"
          alt=""
          draggable={false}
          className="absolute bottom-[7%] left-1/2 z-10 w-[88%] -translate-x-1/2 select-none"
        />

        {/* Front: grass cutout from the same art, same width, bottom-aligned,
            so its pixels land exactly on the back layer's. */}
        <img
          src="/footer-grass.webp"
          alt=""
          draggable={false}
          className="absolute bottom-0 left-0 z-20 w-full select-none"
        />
      </div>
    </footer>
  );
}
