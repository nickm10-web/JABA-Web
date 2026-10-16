import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * "JABA watches the entire athlete internet", light, from Nick's mock: five
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
        className="mx-auto min-w-[5ch] font-sans font-medium leading-none tracking-[-0.05em]"
        style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", fontVariantNumeric: "tabular-nums" }}
      >
        {(n / 10).toFixed(1)}
        {suffix}
      </p>
      <p className="mt-2 font-sans text-[15px] text-black/50 md:text-[18px]">{label}</p>
    </div>
  );
}

const CARD = "relative flex h-full flex-col rounded-[20px] p-4 shadow-[0_30px_60px_-30px_rgba(8,40,96,0.45)]";

function Chip({ children, tone = "bg-[#e8f1fb] text-[#0a0a0a]" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`inline-flex w-fit rounded-full px-3 py-1 font-sans text-[12px] font-medium ${tone}`}>{children}</span>;
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-black/70" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const WAVE = [6, 12, 8, 16, 10, 20, 14, 9, 18, 12, 7, 15, 11, 19, 8, 13, 17, 9, 12, 6, 14, 10];

const CARDS = [
  {
    key: "posts",
    tilt: "-4deg",
    y: "18px",
    node: (
      <div className={`${CARD} bg-white`}>
        <Chip>Posts</Chip>
        <img src="/brands/sneakers.webp" alt="" aria-hidden className="mt-3 aspect-[4/3] w-full rounded-[12px] object-cover object-[50%_70%]" />
        <div className="mt-3 flex items-center gap-3 text-black/70">
          <Icon d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
          <Icon d="M20 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.2A8 8 0 0 1 20 12Z" />
          <Icon d="m22 3-9.5 9.5M22 3l-6.5 18-3-8.5-8.5-3L22 3Z" />
        </div>
        <p className="mt-2 font-sans text-[12.5px] leading-snug text-black/70">
          Early run before class. Same pair every morning.
        </p>
      </div>
    ),
  },
  {
    key: "interviews",
    tilt: "-1.5deg",
    y: "6px",
    node: (
      <div className={`${CARD} bg-white`}>
        <Chip>Interviews</Chip>
        <img src="/brands/mic.webp" alt="" aria-hidden className="mt-3 aspect-[4/3] w-full rounded-[12px] object-cover" />
        <div className="mt-3 flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M7 5v14l12-7Z" />
            </svg>
          </span>
          <div className="flex h-6 items-center gap-[3px]">
            {WAVE.map((h, i) => (
              <span key={i} className="w-[2px] rounded-full bg-black/35" style={{ height: h }} />
            ))}
          </div>
        </div>
        <p className="mt-2 font-sans text-[12.5px] leading-snug text-black/70">
          &ldquo;Film at six, then coffee with my sister. Every game day.&rdquo;
        </p>
      </div>
    ),
  },
  {
    key: "articles",
    tilt: "0deg",
    y: "0px",
    node: (
      <div className={`${CARD} bg-[#f7f3ec]`}>
        <Chip tone="bg-black/[0.06] text-[#0a0a0a]">Articles</Chip>
        <p className="mt-4 font-sans text-[30px] font-semibold leading-[0.98] tracking-[-0.04em]">Beyond the game</p>
        <span className="mt-3 block h-px w-full bg-black/15" />
        <p className="mt-3 font-sans text-[14px] leading-snug text-black/75">
          How today&rsquo;s athletes are building communities and creating change on and off the field.
        </p>
        <p className="mt-auto pt-3 font-sans text-[12px] text-black/45">Campus weekly · 4 min read</p>
      </div>
    ),
  },
  {
    key: "backgrounds",
    tilt: "1.5deg",
    y: "6px",
    node: (
      <div className={`${CARD} bg-[#cfe5fb]`}>
        <Chip tone="bg-white/70 text-[#0a0a0a]">Backgrounds</Chip>
        <div className="mt-3 space-y-2">
          {[
            ["Hometown", "Chicago, Illinois", "M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
            ["Interests", "Gaming, cooking", "M6 11h4M8 9v4M15 12h.01M18 10h.01M7 6h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7 2.6L14 14h-4l-1 .6A4 4 0 0 1 2 12v-1a5 5 0 0 1 5-5Z"],
            ["Off the field", "Runs a youth camp", "M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8"],
          ].map(([t, v, d]) => (
            <div key={t} className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5">
              <Icon d={d} />
              <div className="min-w-0">
                <p className="font-sans text-[13px] font-medium leading-tight">{t}</p>
                <p className="font-sans text-[12px] leading-tight text-black/55">{v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "bios",
    tilt: "4deg",
    y: "18px",
    node: (
      <div className={`${CARD} items-center bg-white text-center`}>
        <div className="self-start">
          <Chip>Bios</Chip>
        </div>
        <img src="/brands/athlete.webp" alt="" aria-hidden className="mt-2 h-24 w-24 rounded-full object-cover object-[36%_35%]" />
        <p className="mt-3 font-sans text-[17px] font-semibold tracking-[-0.02em]">Senior guard</p>
        <p className="mt-1 font-sans text-[12.5px] leading-snug text-black/60">
          Chicago raised. Coffee, film, and my little sister.
        </p>
        <div className="mt-auto flex flex-wrap justify-center gap-1.5 pt-3">
          {["Style", "Music", "Community"].map((t) => (
            <span key={t} className="rounded-full border border-black/10 px-2.5 py-1 font-sans text-[11.5px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function AthleteInternetCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="overflow-hidden bg-[#eeeeee] px-6 pb-20 pt-16 text-[#0a0a0a] md:px-10 md:pb-28 md:pt-20 lg:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h2
          className="font-sans font-normal leading-[1] tracking-[-0.045em]"
          style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.8rem)" }}
        >
          JABA watches the entire
          <span className="block text-black/45">athlete internet.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-[17px] leading-relaxed text-black/60 md:text-[19px]">
          Every post, interview, article, bio, and background, across platforms. Tracked back to the
          athlete and the brand.
        </p>
      </div>

      {/* The fan. A soft sky glow sits behind it so the cards float. */}
      <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-16 -inset-y-12"
          style={{
            backgroundImage: "url(/brands/sky.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 85%",
            opacity: 0.7,
            maskImage: "radial-gradient(closest-side, #000 35%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 35%, transparent 100%)",
          }}
        />
        <div className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-4">
          {CARDS.map((c) => (
            <div
              key={c.key}
              className="h-[21rem] w-[15rem] shrink-0 snap-center md:h-[20rem] lg:h-[20.5rem] md:w-auto md:[transform:rotate(var(--tilt))_translateY(var(--y))]"
              style={{ "--tilt": c.tilt, "--y": c.y } as React.CSSProperties}
            >
              {c.node}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center md:mt-16">
        <button
          type="button"
          onClick={() => document.getElementById("shortlist")?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="inline-flex h-14 items-center gap-3 rounded-full bg-[#dfff00] px-7 font-sans text-[16px] font-semibold text-[#0a0a0a] transition-transform hover:-translate-y-px"
        >
          Find where your brand fits
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div ref={ref} className="mx-auto mt-16 grid max-w-6xl grid-cols-3 border-t border-black/10 pt-10 md:mt-20 md:pt-14">
        {STATS.map((s, i) => (
          <div key={s.label} className={i > 0 ? "border-l border-black/10" : ""}>
            <Stat {...s} run={inView} />
          </div>
        ))}
      </div>
    </section>
  );
}
