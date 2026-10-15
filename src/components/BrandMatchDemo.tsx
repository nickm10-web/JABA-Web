import { useEffect, useRef, useState } from "react";

import { VoltButton } from "@/components/ui/volt-button";

/**
 * "See how it works": the visitor types their brand and watches JABA read the
 * athlete internet, then hits a locked shortlist.
 *
 * The cards are deliberately a format preview, not a result. Nothing here
 * claims an analysis happened, because none did: the copy says what we would
 * send, never what we found. Faces are real post thumbnails blurred past
 * recognition, so no athlete is shown as endorsing a brand they never agreed
 * to, and no plausible-looking numbers are invented for them either.
 *
 * Stages run on timers rather than animation frames so the sequence still
 * advances in backgrounded tabs, where requestAnimationFrame is throttled to
 * nothing; the motion itself is CSS.
 */

type Stage = "idle" | "reading" | "matching" | "locked";

/** Real post thumbnails from the index, blurred hard in the card art. */
const FACES = ["/wall/p07.webp", "/wall/p21.webp", "/wall/p44.webp"];

const CARDS = [
  { sport: "Basketball", bars: [0.92, 0.78, 0.86] },
  { sport: "Track", bars: [0.84, 0.9, 0.71] },
  { sport: "Volleyball", bars: [0.88, 0.69, 0.93] },
];

const BAR_LABELS = ["Audience fit", "Engagement", "Category overlap"];

export default function BrandMatchDemo({
  onUnlock,
  autoBrand,
  fill = false,
}: {
  onUnlock: () => void;
  /** Set on the standalone page: the brand arrived in the URL, so the
   *  sequence starts on arrival instead of behind a second form. */
  autoBrand?: string;
  /** Page mode: square off the corners and hold the viewport. */
  fill?: boolean;
}) {
  const [brand, setBrand] = useState(autoBrand ?? "");
  const [stage, setStage] = useState<Stage>("idle");
  const [posts, setPosts] = useState(0);
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const start = (b: string) => {
    if (!b.trim() || started.current) return;
    started.current = true;
    setStage("reading");

    // Count toward the real index figure rather than a made-up one.
    const target = 1588007;
    const began = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - began) / 2000, 1);
      setPosts(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) timers.current.push(window.setTimeout(tick, 60));
    };
    tick();

    timers.current.push(window.setTimeout(() => setStage("matching"), 2300));
    timers.current.push(window.setTimeout(() => setStage("locked"), 4100));
  };

  // A short beat before it begins, so the page has drawn and the visitor sees
  // the scan start rather than arriving midway through it.
  useEffect(() => {
    if (!autoBrand?.trim()) return;
    const t = window.setTimeout(() => start(autoBrand), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoBrand]);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    start(brand);
  };

  const label = brand.trim() || "your brand";

  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0a] text-white ${
        fill
          ? "flex min-h-[78vh] items-center md:min-h-[82vh]"
          : "rounded-[22px]"
      }`}
    >
      {/* Drifting index wall behind everything, lit only while scanning. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          stage === "reading" ? "opacity-[0.26]" : "opacity-[0.05]"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2">
          {(fill ? [0, 1, 2, 3, 4, 5] : [0, 1, 2]).map((row) => (
            <div key={row} className="flex w-max shrink-0">
              <div
                className="demo-strip flex gap-2"
                style={{
                  animationDuration: `${38 + row * 9}s`,
                  animationDirection: row % 2 ? "reverse" : "normal",
                }}
              >
                {Array.from({ length: 28 }).map((_, i) => (
                  <img
                    key={i}
                    src={`/wall/p${String(((row * 9 + i) % 80) + 1).padStart(2, "0")}.webp`}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-[74px] w-[60px] shrink-0 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrim: lifts during the scan so the wall can show, then settles back
          so the cards and copy keep their contrast. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          stage === "reading" ? "opacity-40" : "opacity-80"
        }`}
        style={{ background: "radial-gradient(70% 70% at 50% 50%, rgba(10,10,10,0.92), rgba(10,10,10,0.6))" }}
      />

      <div className="relative w-full px-6 py-10 md:px-10 md:py-14">
        {stage === "idle" && (
          <form onSubmit={run} className="mx-auto max-w-xl text-center">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#dfff00]">
              See how it works
            </p>
            <h2 className="mt-4 font-deck text-3xl leading-[1.08] md:text-4xl">
              Which athletes fit your brand?
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40 sm:flex-1"
                placeholder="Enter your brand"
                aria-label="Enter your brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
              <VoltButton type="submit">Run it</VoltButton>
            </div>
          </form>
        )}

        {(stage === "reading" || stage === "matching") && (
          <div className="mx-auto max-w-xl py-6 text-center md:py-10">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#dfff00]">
              {stage === "reading" ? "Reading the athlete internet" : `Matching ${label}`}
            </p>

            {stage === "reading" ? (
              <p
                className="mt-5 font-deck text-4xl text-white md:text-6xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {posts.toLocaleString()}
              </p>
            ) : (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["Sport", "Audience age", "Region", "Category"].map((c, i) => (
                  <span
                    key={c}
                    className="demo-chip rounded-full border border-[#dfff00]/40 bg-[#dfff00]/10 px-3.5 py-1.5 font-sans text-[13px] text-[#dfff00]"
                    style={{ animationDelay: `${i * 160}ms` }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 font-sans text-[13px] text-white/45">
              {stage === "reading" ? "posts scanned" : "narrowing the index"}
            </p>
          </div>
        )}

        {stage === "locked" && (
          <div>
            <div className="text-center">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#dfff00]">
                Shortlist ready
              </p>
              <h2 className="mt-4 font-deck text-3xl leading-[1.08] md:text-4xl">
                This is what we&rsquo;d send you for {label}.
              </h2>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-3 sm:gap-4">
              {CARDS.map((c, i) => (
                <div
                  key={c.sport}
                  className="demo-card overflow-hidden rounded-[16px] border border-white/10 bg-[#141417] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]"
                  style={{ animationDelay: `${i * 130}ms` }}
                >
                  <div className="relative h-24 overflow-hidden sm:h-32">
                    <img
                      src={FACES[i]}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-full w-full scale-110 object-cover"
                      style={{ filter: "blur(14px) saturate(1.1)" }}
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/35">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#dfff00" strokeWidth="2" aria-hidden>
                        <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
                        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="h-3 w-24 rounded bg-white/15" />
                    <p className="mt-2.5 font-sans text-[12px] text-white/50">{c.sport}</p>
                    <div className="mt-3.5 space-y-2">
                      {c.bars.map((v, b) => (
                        <div key={b}>
                          <div className="flex justify-between font-sans text-[10.5px] text-white/40">
                            <span>{BAR_LABELS[b]}</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="demo-bar h-full rounded-full bg-[#dfff00]"
                              style={{ width: `${v * 100}%`, animationDelay: `${i * 130 + b * 90}ms` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-9 max-w-xl text-center">
              <p className="font-sans text-[15px] leading-relaxed text-white/65">
                Example cards, so no athlete is listed against a brand they
                haven&rsquo;t agreed to. Want the real ones? We&rsquo;ll put a
                list together for {label} and send it over.
              </p>
              <div className="mt-6 flex justify-center">
                <VoltButton size="lg" onClick={onUnlock}>
                  Send me the real shortlist
                </VoltButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
