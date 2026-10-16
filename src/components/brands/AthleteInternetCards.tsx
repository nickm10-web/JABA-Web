import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * "JABA watches the entire athlete internet", from Nick's mock but on black: five
 * cards for the five things JABA reads (posts, interviews, articles,
 * backgrounds, bios) fanned over a soft sky glow, then the index counts.
 *
 * Every card carries believable content instead of placeholder bars, and the
 * counts are the same real ones the homepage uses (socialMedia, 2026-08-13).
 * The homepage keeps its own dark version in AthleteInternetSection.
 */

const STATS = [
  { to: 1.5, suffix: "M", label: "Posts" }, //     1,588,007
  { to: 48.9, suffix: "K", label: "Athletes" }, //    48,933
  { to: 23.8, suffix: "K", label: "Brands" }, //      23,755
];

function useCountUp(target: number, run: boolean, ms = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, ms]);
  return value;
}

function Stat({ to, suffix, label, run }: { to: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(Math.round(to * 10), run);
  return (
    <div className="text-center">
      <p
        className="mx-auto min-w-[5ch] font-sans font-medium leading-none tracking-[-0.05em] text-[#dfff00]"
        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontVariantNumeric: "tabular-nums" }}
      >
        {(n / 10).toFixed(1)}
        {suffix}
      </p>
      <p className="mt-1 font-sans text-[14px] text-white/60 md:text-[16px]">{label}</p>
    </div>
  );
}

/* Each card is a different piece of the athlete internet, built in that
   thing's own format (a post, an interview, an article, a profile, the
   brand activity around it) rather than five copies of one card. The athlete
   and the brands are made up. */
const SHELL = "relative flex h-full flex-col overflow-hidden rounded-[20px] text-[#0a0a0a] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]";

function Icon({ d, className = "h-[18px] w-[18px]" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* Left to right; the fan's tilt comes from the slot, so the middle card
   always sits straight. */
const FAN = [
  { tilt: "-4deg", y: "18px" },
  { tilt: "-1.5deg", y: "6px" },
  { tilt: "0deg", y: "0px" },
  { tilt: "1.5deg", y: "6px" },
  { tilt: "4deg", y: "18px" },
];

const CARDS = [
  {
    key: "posts",
    label: "Posts",
    node: (
      <div className={`${SHELL} bg-white`}>
        <div className="flex items-center gap-2 px-3 py-2.5">
          <img src="/brands/athlete.webp" alt="" aria-hidden className="h-6 w-6 rounded-full object-cover object-[36%_35%]" />
          <p className="font-sans text-[12.5px] font-semibold">marcus.hill</p>
          <span className="ml-auto font-sans text-[15px] leading-none text-black/40">···</span>
        </div>
        <img src="/brands/sneakers.webp" alt="" aria-hidden className="min-h-0 w-full flex-1 object-cover object-[50%_72%]" />
        <div className="px-3 pb-3 pt-2">
          <div className="flex items-center gap-3 text-black/80">
            <Icon d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
            <Icon d="M20 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.2A8 8 0 0 1 20 12Z" />
            <Icon d="m22 3-9.5 9.5M22 3l-6.5 18-3-8.5-8.5-3L22 3Z" />
          </div>
          <p className="mt-1.5 truncate font-sans text-[12px] leading-snug text-black/75">
            <span className="font-semibold text-black">marcus.hill</span> Early run before class.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "interviews",
    label: "Interviews",
    node: (
      <div className={`${SHELL} bg-[#f7f3ec] p-4`}>
        <p className="font-sans text-[11.5px] text-black/45">From the interview</p>
        <p className="mt-2 font-display text-[22px] leading-[1.12] text-[#1a1a1a]">
          &ldquo;Film at six, then coffee with my sister. Every game day.&rdquo;
        </p>
        <div className="relative mt-auto overflow-hidden rounded-[12px]">
          <img src="/brands/mic.webp" alt="" aria-hidden className="h-[5.5rem] w-full object-cover" />
          <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1 pr-3 backdrop-blur">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-white">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden>
                <path d="M7 5v14l12-7Z" />
              </svg>
            </span>
            <span className="flex h-4 flex-1 items-center gap-[2px]">
              {[5, 9, 6, 12, 8, 14, 10, 7, 13, 9, 5, 11, 8, 13, 6, 10, 12, 7].map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-black/40" style={{ height: h }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "profile",
    label: "Athlete profiles",
    node: (
      <div className={`${SHELL} bg-[#dfff00] p-4`}>
        <div className="flex items-center gap-3">
          <img src="/brands/athlete.webp" alt="" aria-hidden className="h-12 w-12 rounded-full object-cover object-[36%_35%]" />
          <div>
            <p className="font-sans text-[16px] font-semibold leading-tight tracking-[-0.02em]">Marcus Hill</p>
            <p className="font-sans text-[12px] text-black/55">Guard · Basketball</p>
          </div>
        </div>
        <div className="mt-3 flex flex-1 flex-col justify-center divide-y divide-black/10">
          {[
            ["Hometown", "Chicago, Illinois", "M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
            ["Interests", "Gaming, cooking", "M6 11h4M8 9v4M15 12h.01M18 10h.01M7 6h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7 2.6L14 14h-4l-1 .6A4 4 0 0 1 2 12v-1a5 5 0 0 1 5-5Z"],
            ["Off the field", "Runs a youth camp", "M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8"],
          ].map(([t, v, d]) => (
            <div key={t} className="flex items-center gap-3 py-2.5">
              <Icon d={d} className="h-[18px] w-[18px] text-black/70" />
              <div className="min-w-0">
                <p className="font-sans text-[11px] leading-tight text-black/50">{t}</p>
                <p className="font-sans text-[14px] font-medium leading-tight">{v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "articles",
    label: "Articles",
    node: (
      <div className={`${SHELL} bg-white p-4`}>
        <div className="flex items-center justify-between">
          <p className="font-display text-[15px] leading-none">Campus Weekly</p>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-black/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </div>
        <img src="/brands/laces.webp" alt="" aria-hidden className="mt-3 h-[6.5rem] w-full rounded-[10px] object-cover object-[60%_65%]" />
        <p className="mt-3 font-display text-[24px] leading-none">Beyond the game</p>
        <p className="mt-1.5 font-sans text-[12.5px] leading-snug text-black/60">How athletes build community off the field.</p>
        <p className="mt-auto font-sans text-[11px] text-black/40">4 min read</p>
      </div>
    ),
  },
  {
    /* The kinds of signal JABA really logs (started advertising, product
       launches, retail expansion are its three most common), shown with
       made-up brands rather than real ones. */
    key: "signals",
    label: "Brand signals",
    node: (
      <div className={`${SHELL} bg-white p-4`}>
        <div className="flex flex-1 flex-col justify-center divide-y divide-black/10">
          {[
            ["Started advertising", "Tidewater Hydration starts TikTok ads", "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1ZM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"],
            ["Product launch", "Northpeak drops a $99 recovery band", "m21 8-9-5-9 5 9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8"],
            ["Retail expansion", "Crisp Pantry snacks land in 800 stores", "M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6"],
          ].map(([t, v, d]) => (
            <div key={t} className="flex items-start gap-2.5 py-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/[0.05]">
                <Icon d={d} className="h-4 w-4 text-black/75" />
              </span>
              <div className="min-w-0">
                <p className="font-sans text-[12.5px] font-semibold leading-tight">{t}</p>
                <p className="mt-0.5 font-sans text-[12px] leading-snug text-black/60">{v}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-sans text-[10.5px] text-black/35">Example signals</p>
      </div>
    ),
  },
];

/* Behind the cards: the old drifting wall of real posts, blurred back, with
   the rest of the athlete internet dealt in between them (a quote, a
   headline, a bio line), so the background is everything JABA reads. */
const POSTS = Array.from({ length: 80 }, (_, i) => `/wall/p${String(i + 1).padStart(2, "0")}.webp`);
const SNIPPETS: { kind: string; text: string }[] = [
  { kind: "Interview", text: "\u201cFilm at six, then coffee with my sister.\u201d" },
  { kind: "Article", text: "Beyond the game" },
  { kind: "Bio", text: "Senior guard. Chicago raised." },
  { kind: "Hometown", text: "Chicago, Illinois" },
  { kind: "Post", text: "Game day fit check." },
  { kind: "Off the field", text: "Runs a youth camp" },
  { kind: "Interview", text: "\u201cMy mom still does my laundry.\u201d" },
  { kind: "Article", text: "The walk-on who stayed" },
  { kind: "Interests", text: "Gaming, cooking" },
  { kind: "Bio", text: "Pre-med. Point guard." },
  { kind: "Post", text: "Early run before class." },
  { kind: "Podcast", text: "Episode 14: Senior night" },
];
type Tile = { src: string } | { kind: string; text: string };
const WALL: { tiles: Tile[]; duration: number; reverse: boolean }[] = [0, 1, 2, 3].map((r) => {
  const tiles: Tile[] = [];
  POSTS.slice(r * 20, r * 20 + 20).forEach((src, i) => {
    tiles.push({ src });
    if (i % 3 === 1) tiles.push(SNIPPETS[(r * 7 + i) % SNIPPETS.length]);
  });
  return { tiles, duration: [96, 82, 108, 90][r], reverse: r % 2 === 1 };
});

function Wall() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden"
      style={{
        /* On the section-sized layer, not the rows: the rows run taller than
           the section, so a fade measured on them lands out of sight. */
        maskImage: "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
      }}
    >
      <div className="flex flex-col gap-3 md:gap-4" style={{ filter: "blur(3px)" }}>
        {WALL.map((row, r) => (
          <div key={r} className="flex w-max shrink-0">
            <div
              className="wall-row flex gap-3 md:gap-4"
              style={{ animationDuration: `${row.duration}s`, animationDirection: row.reverse ? "reverse" : "normal" }}
            >
              {[...row.tiles, ...row.tiles].map((t, i) =>
                "src" in t ? (
                  <img
                    key={i}
                    src={t.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-[150px] w-[120px] shrink-0 rounded-lg object-cover md:h-[190px] md:w-[152px]"
                  />
                ) : (
                  <div
                    key={i}
                    className="flex h-[150px] w-[150px] shrink-0 flex-col justify-between rounded-lg bg-[#1b1b1b] p-4 md:h-[190px] md:w-[190px]"
                  >
                    <p className="font-sans text-[12px] text-white/45">{t.kind}</p>
                    <p className="font-sans text-[17px] leading-snug tracking-[-0.01em] text-white/85">{t.text}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pushed back so the headline, cards and counts always read over it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 65% at 50% 50%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.4) 100%), linear-gradient(90deg, #000 0%, transparent 18%, transparent 82%, #000 100%)",
        }}
      />
    </div>
  );
}

export default function AthleteInternetCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative isolate overflow-hidden bg-black px-6 pb-12 pt-16 text-white md:px-10 md:pb-10 md:pt-16 lg:px-12">
      <Wall />
      {/* The homepage's curved seam, drawn inside the section so the wall runs
          right up under the light section above instead of starting below it. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-7 w-full md:h-10"
      >
        <path d="M0,0 L300,0 C 368,0 378,24 440,24 L1000,24 C 1062,24 1072,0 1140,0 L1440,0 Z" fill="#eeeeee" />
      </svg>

      <div className="relative mx-auto max-w-6xl text-center">
        <h2
          className="font-sans font-normal leading-[1] tracking-[-0.045em]"
          style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
        >
          JABA watches the entire
          <span className="block">athlete internet.</span>
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-sans text-[16px] text-white/85 md:text-[18px]"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
        >
          Athlete content, brand activity, and new partnerships. All connected.
        </p>
      </div>

      {/* The fan. */}
      <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
        <div className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-4">
          {CARDS.map((c, i) => (
            <div
              key={c.key}
              className="w-[15rem] shrink-0 snap-center md:w-auto md:[transform:rotate(var(--tilt))_translateY(var(--y))]"
              style={{ "--tilt": FAN[i].tilt, "--y": FAN[i].y } as React.CSSProperties}
            >
              <p className="mb-2.5 pl-1 font-sans text-[14px] font-medium text-white/85">{c.label}</p>
              <div className="h-[21rem] md:h-[17.25rem]">{c.node}</div>
            </div>
          ))}
        </div>
      </div>


      <div ref={ref} className="relative mx-auto mt-10 grid max-w-6xl grid-cols-3 md:mt-12">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={inView} />
        ))}
      </div>
    </section>
  );
}
