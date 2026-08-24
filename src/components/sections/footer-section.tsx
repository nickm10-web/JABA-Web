
import { useEffect, useRef } from "react";

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

/** Back to front. Each layer starts lower AND larger, settling to its resting
 *  place as the footer is revealed; the nearer it is, the more of both.
 *
 *  The scale is what makes the separation work. Translation alone has to get
 *  huge to read at all, and at that size the near grass simply leaves the frame
 *  and the opening state looks emptier rather than deeper. Scale is anchored to
 *  the bottom, so a layer can only ever grow past the edges, never uncover
 *  them, which is what lets the spread go this far and stay composed. Everything settles to 0, so the composition at rest
 *  is the tuned one and the parallax only plays on the way in. */
const LAYERS = [
  // Sky is the anchor: it must not move, or the hills have nothing to move
  // against and the whole thing reads as one image sliding.
  { src: "/footer/sky.webp", className: "z-0", depth: 0, scale: 0 },
  { src: "/footer/hill-back.webp", className: "z-[1]", depth: 30, scale: 0.055 },
  // Furthest prop: first thing to go when there is no room for it.
  { src: "/footer/hill-rotunda.webp", className: "z-[2] hidden sm:block", depth: 52, scale: 0.1 },
  { src: "/footer/hill-mac.webp", className: "z-[3]", depth: 80, scale: 0.155 },
];

interface FooterSectionProps {
  /** Color of the page surface above the footer, kept for call-site compat. */
  fadeFrom?: string;
}

/**
 * Light footer strip, then the JABA world as a depth stack: sky, three hill
 * layers, the 3D wordmark, and the foreground grass over its feet. Splitting
 * the art into layers (rather than one flat image) is what lets the logo sit
 * inside the landscape and lets the far props drop out on small screens.
 */
export default function FooterSection({ fadeFrom: _fadeFrom }: FooterSectionProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  /* Parallax, driven straight off the scene's own rect.
     Written by hand rather than with a scroll-linked motion value because the
     scene is absolutely positioned inside an overflow-clipped, aspect-ratio
     box, and the library's cached measurement of that never advanced past 0.
     Reading the rect each frame is immune to when the lazy images land.
     Transforms are set on the nodes directly, so a scroll frame costs no React
     render, and an observer parks the loop whenever the footer is off screen.
     The loop is rAF-driven rather than scroll-event-driven because the scene
     has to stay glued to a rect that moves with smooth scrolling. */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(scene.querySelectorAll<HTMLElement>("[data-depth]"));
    let frame = 0;
    let live = false;

    const apply = () => {
      frame = 0;
      const r = scene.getBoundingClientRect();
      // 0 as the scene's top reaches the fold, 1 once its bottom has.
      const raw = (window.innerHeight - r.top) / (r.height || 1);
      const p = Math.min(Math.max(raw, 0), 1);
      const away = 1 - p; // 1 while the footer is arriving, 0 once it has
      for (const el of els) {
        const d = Number(el.dataset.depth) || 0;
        const sc = Number(el.dataset.scale) || 0;
        const t = `translate3d(0, ${(d * away).toFixed(2)}px, 0)`;
        el.style.transform = sc ? `${t} scale(${(1 + sc * away).toFixed(4)})` : t;
      }
    };

    const tick = () => {
      apply();
      frame = live ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        live = e.isIntersecting;
        if (live && !frame) frame = requestAnimationFrame(tick);
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(scene);

    // Deliberately not applying on mount. With no inline transform the layers
    // render at rest, which is the tuned composition, so if this driver never
    // gets to run (hidden tab, throttled rAF, an observer that never fires) the
    // footer degrades to correct-and-static rather than frozen at full offset.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      live = false;
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
      {/* Two boxes on purpose. The outer one is the crop window: it decides how
          much of the scene the footer shows. The inner one carries the art's own
          aspect ratio, full width and bottom-anchored, so every layer AND the
          logo live in one coordinate space. Percentages inside it therefore mean
          the same thing at every breakpoint, instead of drifting as the window's
          aspect changes. */}
      <div
        aria-hidden
        className="relative -mt-16 aspect-[1.55/1] w-full overflow-hidden leading-[0] md:-mt-24 md:aspect-[2.35/1]"
      >
        {/* Mist hand-off from the grey footer into the sky. Height is bounded by
            the mac + mascot, whose crest sits at (1 - 0.3165 x aspect) of the
            window: 25.6% on desktop, so the old 45% band was washing the mascot
            out at ~40% grey. 16% clears it, and the sky's own top is pale enough
            that the shorter blend still leaves no seam. Mobile's taller window
            puts the crest at 50.9%, so it can afford a longer fade. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[34%] md:h-[16%]"
          style={{
            background:
              "linear-gradient(to bottom, #eeeeee 0%, #eeeeee 14%, rgba(238,238,238,0.75) 30%, rgba(238,238,238,0.46) 50%, rgba(238,238,238,0.23) 70%, rgba(238,238,238,0.09) 85%, transparent 100%)",
          }}
        />

        <div ref={sceneRef} className="absolute inset-x-0 bottom-0 aspect-[2000/1309]">
          {LAYERS.map((l) => (
            <img
              key={l.src}
              src={l.src}
              alt=""
              draggable={false}
              loading="lazy"
              data-depth={l.depth}
              data-scale={l.scale}
              style={{ transformOrigin: "50% 100%" }}
              className={`absolute inset-0 h-full w-full select-none will-change-transform ${l.className}`}
            />
          ))}

          {/* Sits between the mac hill and the front grass, so the grass laps
              over the letters' feet and the mark reads as standing in the
              landscape rather than pasted on top of it.

              The widths are capped, not chosen by eye. The mark's top lands at
              (bottom% + width/2.238) of the scene, and the mac + mascot crest
              at 48.3%; at the 62% that looked right on mobile the mark reached
              47.7% and buried the mascot. 48% keeps it clear with room to spare. */}
          {/* Centring lives on the wrapper so the parallax owns the image's
              transform outright; both on one node would fight. */}
          <div className="absolute bottom-[18%] left-1/2 z-20 w-[48%] -translate-x-1/2 md:bottom-[17%] md:w-[38%]">
            <img
              src="/footer/logo-3d.webp"
              alt=""
              draggable={false}
              loading="lazy"
              data-depth={115}
              data-scale={0.17}
              style={{ transformOrigin: "50% 100%" }}
              className="w-full select-none will-change-transform"
            />
          </div>

          <img
            src="/footer/grass-front.webp"
            alt=""
            draggable={false}
            loading="lazy"
            data-depth={120}
            data-scale={0.24}
            style={{ transformOrigin: "50% 100%" }}
            className="absolute inset-0 z-20 h-full w-full select-none will-change-transform"
          />
        </div>
      </div>

    </footer>
  );
}
