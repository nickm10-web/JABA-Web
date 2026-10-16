import { useState } from "react";

/**
 * The brands hero, built from Nick's mock: a framed sky, a light headline, a
 * glass brand field, and an arc of product cards drifting under it that walks
 * from discovery to delivery.
 *
 * Card copy is the mock's. Photo cards use crops from the index cut to the
 * object (sneakers, a ring, a barbell, a golf club), so no athlete's face sits
 * next to a campaign claim; generated product shots would sharpen them.
 *
 * The brand field takes a website, as the mock asks, and hands the demo a name
 * cut from it ("celsius.com" becomes "Celsius").
 */

const BOOKING = "https://calendly.com/jordon-jaba/jaba";

function brandFrom(input: string) {
  const raw = input.trim();
  if (!/[.\/]/.test(raw)) return raw;
  const host = raw.replace(/^[a-z]+:\/\//i, "").replace(/^www\./i, "").split(/[/?#]/)[0];
  const name = host.split(".")[0] || raw;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const CARD = "relative h-full w-full overflow-hidden rounded-[18px] bg-white text-[#0a0a0a] shadow-[0_26px_50px_-22px_rgba(8,40,96,0.55)]";
const TITLE = "font-sans text-[15px] font-medium leading-tight tracking-[-0.01em]";

function Chip({ children, icon }: { children?: React.ReactNode; icon?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-full bg-[#f1f3f6] px-3 py-2 font-sans text-[12px] text-black/70">
      <span className="flex items-center gap-1.5">
        {icon && (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        )}
        {children}
      </span>
      <span className="text-[14px] leading-none text-black/40">+</span>
    </div>
  );
}

/* Seven cards, left to right: what JABA sees, how it searches, the fit, the
   campaign itself at the centre, then the group chat, the work moving, and
   the report. */
const CARDS: { key: string; tall?: boolean; node: React.ReactNode }[] = [
  {
    key: "collage",
    node: (
      <div className={`${CARD} grid grid-cols-2 gap-1 bg-white p-1`}>
        {["ring", "barbell", "sneakers", "club"].map((n) => (
          <img key={n} src={`/brands/${n}.webp`} alt="" aria-hidden className="h-full w-full rounded-[12px] object-cover" />
        ))}
      </div>
    ),
  },
  {
    key: "fit",
    node: (
      <div className={`${CARD} p-4`}>
        <p className={TITLE}>Find your fit</p>
        <div className="mt-4 space-y-2">
          <Chip icon />
          <Chip>Basketball</Chip>
          <Chip>Chicago</Chip>
        </div>
      </div>
    ),
  },
  {
    key: "connection",
    node: (
      <div className={`${CARD} flex flex-col p-4`}>
        <p className={TITLE}>A natural connection</p>
        <img src="/brands/sneakers.webp" alt="" aria-hidden className="mt-3 h-24 w-full rounded-[10px] object-cover object-[72%_60%]" />
        <p className="mt-auto font-sans text-[12px] leading-snug text-black/60">Already wearing your category</p>
      </div>
    ),
  },
  {
    key: "studio",
    tall: true,
    node: (
      <div className={`${CARD} flex flex-col bg-[#0f2a14] p-4 text-white`}>
        <img src="/brands/grass.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />
        <div className="relative flex items-start justify-between gap-2">
          <p className="font-sans text-[19px] font-medium leading-tight tracking-[-0.01em]">
            Your brand.
            <br />
            Their everyday.
          </p>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/70">
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="relative mt-auto font-sans text-[12px] font-medium text-white/85">Campaign studio</p>
      </div>
    ),
  },
  {
    key: "group",
    node: (
      <div className={`${CARD} p-4`}>
        <div className="flex items-start justify-between">
          <p className={`${TITLE} text-[13.5px]`}>
            Campaign
            <br />
            group
          </p>
          <div className="flex -space-x-1.5">
            {["#f0a35e", "#6f7bd6", "#2fb67c"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-[14px] bg-[#2f80ff] px-2.5 py-1.5 font-sans text-[11px] text-white">First concept is ready.</span>
        </div>
        <p className="mt-0.5 text-right font-sans text-[9px] text-black/35">9:41 AM</p>
        <span className="mt-1.5 inline-block rounded-[14px] bg-[#eceef1] px-2.5 py-1.5 font-sans text-[11px] text-black/75">
          Love this direction.
        </span>
        <p className="mt-0.5 font-sans text-[9px] text-black/35">9:43 AM</p>
        <span className="mt-1.5 inline-flex gap-1 rounded-[14px] bg-[#eceef1] px-2.5 py-2">
          {[0, 1, 2].map((d) => (
            <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full" style={{ animationDelay: `${d * 0.2}s` }} />
          ))}
        </span>
      </div>
    ),
  },
  {
    key: "motion",
    node: (
      <div className={`${CARD} p-4`}>
        <p className={TITLE}>Campaign in motion</p>
        <div className="mt-4 space-y-3">
          {[
            ["Brief approved", true],
            ["Content scheduled", true],
            ["Report ready", false],
          ].map(([label, done]) => (
            <div key={label as string} className="flex items-center gap-2 border-b border-black/[0.06] pb-2.5 font-sans text-[12px] text-black/70 last:border-0">
              <span
                className={`grid h-4 w-4 place-items-center rounded-full ${done ? "bg-[#22b35e] text-white" : "border border-black/25"}`}
              >
                {done && (
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden>
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                )}
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "insights",
    node: (
      <div className={`${CARD} flex flex-col p-4`}>
        <p className={TITLE}>
          Audience
          <br />
          insights
        </p>
        <div className="mt-auto flex h-20 items-end gap-1.5">
          {[0.28, 0.42, 0.36, 0.6, 0.78, 1].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[3px] bg-[#2f80ff]" style={{ height: `${h * 100}%`, opacity: 0.45 + i * 0.1 }} />
          ))}
        </div>
      </div>
    ),
  },
];

const STEP = 10.5; // degrees between cards on the arc
const R = 1150; // arc radius, px

export default function SkyHero() {
  const [site, setSite] = useState("");

  return (
    <section className="bg-[#eeeeee] p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[22px] text-white md:rounded-[28px]">
        <img src="/brands/sky.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />

        <div className="relative px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-7">
          {/* Nav: two anchors down the page and the one exit that converts. */}
          <nav className="flex items-center justify-between">
            <img src="/jaba-head.webp" alt="JABA" className="h-10 w-auto drop-shadow-[0_6px_10px_rgba(10,40,90,0.25)] md:h-11" />
            <div className="hidden items-center gap-10 font-sans text-[13px] font-medium text-white/90 md:flex">
              <a href="#how" className="transition-opacity hover:opacity-70">How it works</a>
              <a href="#network" className="transition-opacity hover:opacity-70">Our network</a>
            </div>
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#dfff00] px-5 py-2.5 font-sans text-[13px] font-semibold text-[#0a0a0a] transition-transform hover:-translate-y-px"
            >
              Book a demo
            </a>
          </nav>

          <div className="mx-auto mt-10 max-w-6xl text-center md:mt-12">
            <h1
              className="font-sans font-light leading-[0.98] tracking-[-0.045em]"
              style={{ fontSize: "clamp(2.4rem, 4.9vw, 4.4rem)" }}
            >
              Find your athletes.
              <span className="block text-white/75">Build and manage your next campaign.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[16px] leading-relaxed text-white/90 md:text-[18px]">
              Connect with athletes through the universities and agencies already using JABA. We handle the
              campaign from there.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const b = brandFrom(site).slice(0, 40);
                if (b) window.location.href = `/brands-demo.html?brand=${encodeURIComponent(b)}`;
              }}
              className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                className="h-14 w-full rounded-full border border-white/45 bg-white/15 px-6 font-sans text-[15px] text-white outline-none backdrop-blur-md transition-colors placeholder:text-white/75 focus:border-white sm:flex-1"
                placeholder="Enter your brand's website"
                aria-label="Enter your brand's website"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                required
              />
              <button
                type="submit"
                className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#dfff00] pl-6 pr-2 font-sans text-[15px] font-semibold text-[#0a0a0a] transition-transform hover:-translate-y-px"
              >
                Find my athletes
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0a] text-white">
                  <Arrow className="h-4 w-4" />
                </span>
              </button>
            </form>
          </div>

          {/* The arc. Cards sit on a cylinder seen from outside, so the edges
              turn away. */}
          <div className="arc-stage relative mx-auto mt-10 h-[130px] sm:h-[160px] md:mt-12 md:h-[200px] lg:h-[260px]">
            <div className="arc-scale absolute left-1/2 top-0">
              <div className="arc" style={{ transform: `translateZ(-${R}px)` }}>
                {CARDS.map((c, i) => {
                  const k = i - (CARDS.length - 1) / 2;
                  return (
                    <div
                      key={c.key}
                      className="arc-card absolute"
                      style={{
                        width: c.tall ? 196 : 176,
                        height: c.tall ? 230 : 210,
                        marginLeft: c.tall ? -98 : -88,
                        top: c.tall ? 0 : 12,
                        transform: `rotateY(${k * STEP}deg) translateZ(${R}px)`,
                      }}
                    >
                      {c.node}
                      {c.key === "insights" && (
                        <img
                          src="/jaba-head.webp"
                          alt=""
                          aria-hidden
                          className="absolute -right-4 -top-5 h-11 w-auto rotate-12 drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center font-sans text-[16px] text-white [text-shadow:0_1px_14px_rgba(20,60,120,0.55)] md:mt-6">From discovery to delivery.</p>
        </div>
      </div>
    </section>
  );
}
