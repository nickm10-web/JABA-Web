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
   thing's own format (a post, an interview, a profile, an article, a bio)
   rather than five copies of one card. All five are one made-up athlete so
   they read as a single story. */
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
    node: (
      <div className={`${SHELL} bg-white p-4`}>
        <div className="flex items-center gap-2.5">
          <img src="/brands/mic.webp" alt="" aria-hidden className="h-9 w-9 rounded-[8px] object-cover" />
          <div className="min-w-0">
            <p className="truncate font-sans text-[12.5px] font-semibold leading-tight">The Locker Room Pod</p>
            <p className="font-sans text-[11.5px] leading-tight text-black/50">Episode 14</p>
          </div>
        </div>
        <p className="mt-4 font-sans text-[19px] font-medium leading-[1.18] tracking-[-0.02em]">
          &ldquo;Film at six, then coffee with my sister. Every game day.&rdquo;
        </p>
        <div className="mt-auto flex items-center gap-2.5 pt-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-white">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden>
              <path d="M7 5v14l12-7Z" />
            </svg>
          </span>
          <span className="relative h-[3px] flex-1 rounded-full bg-black/10">
            <span className="absolute inset-y-0 left-0 w-[34%] rounded-full bg-[#0a0a0a]" />
          </span>
          <span className="font-sans text-[11px] tabular-nums text-black/50">12:08</span>
        </div>
      </div>
    ),
  },
  {
    key: "backgrounds",
    node: (
      <div className={`${SHELL} bg-[#cfe5fb] p-4`}>
        <p className="font-sans text-[12.5px] text-black/55">Background</p>
        <div className="mt-2 flex flex-1 flex-col justify-center divide-y divide-black/10">
          {[
            ["Hometown", "Chicago"],
            ["Interests", "Gaming & cooking"],
            ["Off the field", "Youth coaching"],
          ].map(([t, v]) => (
            <div key={t} className="py-3">
              <p className="font-sans text-[11.5px] text-black/50">{t}</p>
              <p className="mt-0.5 font-sans text-[20px] font-medium leading-tight tracking-[-0.02em]">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "articles",
    node: (
      <div className={`${SHELL} bg-white`}>
        <img src="/brands/laces.webp" alt="" aria-hidden className="h-[40%] w-full object-cover object-[60%_65%]" />
        <div className="flex flex-1 flex-col p-4">
          <p className="font-sans text-[11px] font-semibold text-black/45">Campus Weekly</p>
          <p className="mt-1.5 font-sans text-[16.5px] font-semibold leading-[1.15] tracking-[-0.02em]">
            The guard coaching Chicago&rsquo;s next point guards
          </p>
          <p className="mt-auto line-clamp-2 pt-2 font-sans text-[12px] leading-snug text-black/55">
            Hill runs a free Saturday camp back home, and most of his campers can already beat him at 2K.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "bios",
    node: (
      <div className={`${SHELL} bg-white p-4`}>
        <img src="/brands/athlete.webp" alt="" aria-hidden className="h-16 w-16 rounded-full object-cover object-[36%_35%]" />
        <p className="mt-4 font-sans text-[19px] font-semibold leading-tight tracking-[-0.02em]">Marcus Hill</p>
        <p className="mt-0.5 font-sans text-[12.5px] text-black/55">Guard · Men&rsquo;s basketball</p>
        <p className="mt-3 font-sans text-[13px] leading-snug text-black/75">
          Chicago raised. Coffee, film, and my little sister. Coaching on Saturdays.
        </p>
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
      </div>

      {/* The fan. */}
      <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
        <div className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-4">
          {CARDS.map((c, i) => (
            <div
              key={c.key}
              className="h-[21rem] w-[15rem] shrink-0 snap-center md:h-[17.25rem] md:w-auto md:[transform:rotate(var(--tilt))_translateY(var(--y))]"
              style={{ "--tilt": FAN[i].tilt, "--y": FAN[i].y } as React.CSSProperties}
            >
              {c.node}
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
