// Deployment-lean footer: the brand loop with the info bar floating on it
// in liquid glass. Only links with real destinations ship.
const footerLinks = [
  { label: "Home", href: "#/" },
  { label: "Press", href: "#/press" },
  { label: "Privacy", href: "#/privacy" },
  { label: "Terms", href: "#/terms" },
];

interface FooterSectionProps {
  /** Color of the page surface above the footer, so the loop fades out of it. */
  fadeFrom?: string;
}

export default function FooterSection({ fadeFrom = "#000000" }: FooterSectionProps) {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <video
        src="/videos/footer-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-[46vh] w-full object-cover md:h-[56vh]"
      />

      {/* Fade the loop out of whatever surface sits above it. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: `linear-gradient(to bottom, ${fadeFrom}, transparent)` }}
      />

      {/* Info bar — liquid glass, floating on the loop. */}
      <div className="footer-glass absolute bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 flex-col items-center gap-4 rounded-2xl px-6 py-4 md:flex-row md:justify-between">
        <a href="#/" aria-label="JABA home">
          <img
            src="/JABA%20White%201%20(1).png"
            alt="JABA"
            className="h-5 w-auto"
          />
        </a>

        <nav className="flex items-center gap-7 font-sans text-[13px] text-white/75">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p
          className="font-sans text-[11px] tracking-[0.08em] text-white/50"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          © {new Date().getFullYear()} JABA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
