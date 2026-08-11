
import { VoltButton } from "@/components/ui/volt-button";

const LIME = "#dfff00";

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
            "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.22) 30%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.26) 100%)",
        }}
      />
      {/* Fade out of whatever surface sits above the footer — tall and eased
          so the surface melts into the scene instead of banding. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-44"
        style={{
          background: `linear-gradient(to bottom, ${fadeFrom} 0%, color-mix(in srgb, ${fadeFrom} 62%, transparent) 35%, color-mix(in srgb, ${fadeFrom} 24%, transparent) 65%, color-mix(in srgb, ${fadeFrom} 6%, transparent) 85%, transparent 100%)`,
        }}
      />

      <div
        className="relative mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-24 lg:px-12"
        // Shadow rather than a heavier scrim: the loop stays bright and the
        // type still holds up over the sky.
        style={{ textShadow: "0 1px 14px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.45)" }}
      >
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div className="col-span-2 max-w-sm sm:col-span-3 md:col-span-1">
            <a href="#/" aria-label="JABA home" className="inline-flex">
              <img src="/deck/jaba-wordmark.png" alt="JABA" className="h-7 w-auto md:h-8" />
            </a>
            <p className="mt-5 font-deck text-2xl leading-snug text-white">
              The operating layer for athlete marketing.
            </p>
            <p className="mt-3 max-w-xs font-sans text-[13.5px] leading-relaxed text-white/80">
              JABA finds the deals, writes the outreach, and tracks every
              campaign to close, for schools and agencies alike.
            </p>
            <div className="mt-6 flex">
              <VoltButton surface="dark">Book a demo</VoltButton>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
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
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-[14px] text-white/85 transition-colors hover:text-white"
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
            className="font-sans text-[12px] text-white/80"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            © {new Date().getFullYear()} JABA. All rights reserved.
          </p>
          <p className="font-sans text-[12px] text-white/80">
            Built for the people who manage athletes.
          </p>
        </div>
      </div>
    </footer>
  );
}
