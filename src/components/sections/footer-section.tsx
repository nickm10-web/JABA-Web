// Deployment-lean footer: the brand loop, the links that actually exist,
// and the copyright line. Nothing else ships until it has a destination.
const footerLinks = [
  { label: "Home", href: "#/" },
  { label: "Press", href: "#/press" },
  { label: "Privacy", href: "#/privacy" },
  { label: "Terms", href: "#/terms" },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Brand loop */}
      <div className="relative">
        <video
          src="/videos/footer-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-[42vh] w-full object-cover md:h-[52vh]"
        />
        {/* Seat the loop into the page: fade from black above, to black below. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <a href="#/" aria-label="JABA home">
          <img
            src="/JABA%20White%201%20(1).png"
            alt="JABA"
            className="h-6 w-auto"
          />
        </a>

        <nav className="flex items-center gap-7 font-sans text-[13px] text-white/55">
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
          className="font-sans text-[11px] tracking-[0.08em] text-white/35"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          © {new Date().getFullYear()} JABA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
