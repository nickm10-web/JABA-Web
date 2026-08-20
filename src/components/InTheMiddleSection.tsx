import { FadeUp } from "@/components/audience/fade-up";

/* Everyone who works with an athlete, and the things every one of them ends up
   managing. Both rows funnel into JABA — the layer that used to be a pile of
   spreadsheets and to-do lists.

   To swap in a designed graphic instead of this coded version: drop the file at
   public/flow-diagram.png and set DIAGRAM_SRC below. */
const DIAGRAM_SRC: string | null = null;

const PARTIES = [
  { label: "Schools", emoji: "🏫" },
  { label: "Agents", emoji: "🧑‍💼" },
  { label: "Teams", emoji: "🏟️" },
  { label: "Leagues", emoji: "🏆" },
  { label: "Brands", emoji: "🛍️" },
  { label: "Freelancers", emoji: "💻" },
  { label: "Wealth managers", emoji: "📈" },
];
const STREAMS = [
  { label: "Tasks", emoji: "✅" },
  { label: "Calendars", emoji: "📅" },
  { label: "Deliverables", emoji: "📦" },
  { label: "Deals", emoji: "🤝" },
  { label: "Finances", emoji: "💰" },
  { label: "Communication", emoji: "💬" },
];

function Funnel({ count, flip, label }: { count: number; flip?: boolean; label: string }) {
  const mid = (count - 1) / 2;
  return (
    <>
      {/* Stacked layout has no converging strands, so the groups need a beat
          between them. A word carries the relationship; an arrow only carried
          direction. */}
      <div className="flex items-center gap-3 py-4 md:hidden">
        <span className="h-px flex-1 bg-black/10" />
        <span className="font-display text-[15px] italic text-black/40">{label}</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="hidden h-10 w-full md:block md:h-14"
      style={{
        // Dissolve the ends instead of collecting them into one hard point.
        maskImage: "linear-gradient(to bottom, #000 38%, rgba(0,0,0,0.35) 78%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 38%, rgba(0,0,0,0.35) 78%, transparent 100%)",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const x = ((i + 0.5) / count) * 100;
        const offset = i - mid;
        // Fan the ends apart and stagger how far each one runs, so the bundle
        // reads as strands rather than a single funnel spout.
        const endX = 50 + offset * 2.2;
        const endY = 88 + Math.abs(offset) * 4;
        return (
          <path
            key={i}
            d={
              flip
                ? `M50 0 C50 45 ${x} 55 ${x} 100`
                : `M${x} 0 C${x} 42 ${endX} 58 ${endX} ${endY}`
            }
            fill="none"
            stroke={`rgba(255,255,255,${0.95 - Math.abs(offset) * 0.06})`}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
    </>
  );
}

function Row({ items }: { items: { label: string; emoji: string }[] }) {
  return (
    /* Phones wrap these as content-sized pills — a rigid 2-up grid turns 13
       chips into a long form and strands the odd one on its own row. */
    <div
      className="flex flex-wrap justify-center gap-2 md:grid md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
      style={{ "--cols": items.length } as React.CSSProperties}
    >
      {items.map(({ label, emoji }) => (
        <div
          key={label}
          className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 text-center font-sans text-[12px] font-semibold leading-tight text-black/65 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:flex-col md:gap-1.5 md:rounded-xl md:px-2 md:py-3 md:text-[13px]"
        >
          {/* Decorative: the label already says it, so it isn't announced. */}
          <span aria-hidden className="text-[14px] leading-none md:text-[19px]">
            {emoji}
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}

export default function InTheMiddleSection() {
  return (
    <section className="relative bg-[#eeeeee] py-16 md:py-24">
      {/* Soft sky wash, faded at both edges so it blends into the light
          sections on either side instead of reading as a band. */}
      <img
        src="/sky-soft.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 74%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 74%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-deck text-3xl leading-[1.06] text-[#0a0a0a] md:text-[2.7rem]">
            Everyone around the athlete is managing the same things.
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-black/60 md:text-base">
            Schools, agents, brands, and everyone else all end up tracking the
            same tasks, deals, and deliverables by hand. JABA is the layer
            underneath all of it.
          </p>
        </FadeUp>

        {DIAGRAM_SRC ? (
          <FadeUp delay={0.1} className="mt-12">
            <img
              src={DIAGRAM_SRC}
              alt="Schools, agents, teams, leagues, brands, freelancers, and wealth managers all manage tasks, calendars, deliverables, deals, finances, and communication through JABA"
              className="mx-auto w-full max-w-4xl"
            />
          </FadeUp>
        ) : (
          <FadeUp delay={0.1} className="mt-12">
            <div className="space-y-3 md:space-y-0">
              <Row items={PARTIES} />
              <Funnel count={PARTIES.length} label="all managing" />
              <Row items={STREAMS} />
              <Funnel count={STREAMS.length} label="all handled by" />

              <div className="flex justify-center">
                <div className="relative w-full max-w-[520px]">
                  <img src="/jaba-grass.webp" alt="JABA" className="w-full" />
                  {/* Measured by PhoneHandoff as the flight's start point. */}
                  <span
                    data-phone-start
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{ left: "64.5%", top: "32%", width: "9.5%", aspectRatio: "9 / 18.6" }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
