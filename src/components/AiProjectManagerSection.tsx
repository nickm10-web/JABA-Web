import { useRef, type ReactElement } from "react";
import { motion, useInView } from "motion/react";

/**
 * Outreach → Manage → Report as a sequence.
 *
 * Each card shows the product doing the thing rather than a photograph of a
 * mood, and the copy sits under the card on a solid surface instead of over
 * artwork. `art` is a swappable slot: give a step an `image` and it renders
 * that; otherwise it falls back to a built mockup, so a rendered asset can be
 * dropped in later without touching layout.
 *
 * Deliberately no hover-expand. Expanding revealed nothing, squeezed the
 * unhovered cards into their ugliest crop, and did nothing at all on touch.
 */
interface Step {
  id: string;
  number: string;
  title: string;
  /** Caption inside the card, split so the middle word can be emphasised. */
  caption: [string, string, string];
  image?: string;
  behind?: string;
}

const STEPS: Step[] = [
  {
    id: "outreach",
    number: "01",
    title: "Outreach",
    caption: ["Find and pitch the ", "right", " partners."],
    image: "/step-outreach.webp",
  },
  {
    id: "manage",
    number: "02",
    title: "Manage",
    caption: ["Keep every campaign ", "moving", "."],
    image: "/step-manage.webp",
  },
  {
    id: "report",
    number: "03",
    title: "Report",
    caption: ["Turn campaign activity into ", "proof", "."],
    image: "/step-report.webp",
  },
];

function ReportMock() {
  const rows = [
    { k: "Posts live", v: "12" },
    { k: "Deliverables", v: "9 / 9" },
    { k: "On time", v: "100%" },
  ];
  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_18px_40px_-16px_rgba(15,18,30,0.28)]">
      <div className="flex items-baseline justify-between">
        <p className="font-sans text-[13px] font-semibold text-[#0a0a0a]">
          Weekly report
        </p>
        <p className="font-sans text-[11px] text-black/40">Voltic</p>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between">
            <span className="font-sans text-[12px] text-black/50">{r.k}</span>
            <span
              className="font-sans text-[13px] font-semibold text-[#0a0a0a]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>

      <div className="my-3.5 h-px bg-black/[0.07]" />

      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-[#dfff00] text-[11px] font-bold text-black">
          ✓
        </span>
        <span className="font-sans text-[12px] text-black/60">
          Sent to the brand
        </span>
      </div>
    </div>
  );
}

const MOCKS: Record<string, () => ReactElement> = {
  report: ReportMock,
};

export default function AiProjectManagerSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const railInView = useInView(railRef, { once: true, margin: "-20%" });

  return (
    <section className="bg-black py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mx-auto max-w-4xl font-deck text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            AI that manages everything your athletes have to do.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:mt-6 md:text-lg">
            Every task, deliverable, conversation, activation, and event,
            handled for you. Your athletes never have to log in. They just get
            a text.
          </p>
        </div>

        {/* Step rail. Desktop only: stacked on phones the cards already read
            top to bottom and a horizontal rail would misdescribe the layout,
            so the labels move into each card instead. */}
        <div ref={railRef} className="relative mb-8 hidden md:block lg:mb-10">
          {/* Same 3-column grid as the cards, so each label and node lands on
              its card's centre rather than the row's edges. */}
          <div className="grid grid-cols-3 gap-5 lg:gap-6">
            {STEPS.map((s) => (
              <p
                key={s.id}
                className="text-center font-sans text-[13px] font-semibold text-[#dfff00]"
              >
                {s.number}
              </p>
            ))}
          </div>

          <div className="relative mt-4" aria-hidden>
            {/* Line runs centre-to-centre, not edge-to-edge: half a column in
                on each side, where half a column is (100% - 2 gaps) / 6. */}
            <div className="absolute top-[7px] h-px bg-white/12 left-[calc((100%_-_40px)/6)] right-[calc((100%_-_40px)/6)] lg:left-[calc((100%_-_48px)/6)] lg:right-[calc((100%_-_48px)/6)]" />
            <motion.div
              className="absolute top-[7px] h-px origin-left bg-[#dfff00]/70 left-[calc((100%_-_40px)/6)] right-[calc((100%_-_40px)/6)] lg:left-[calc((100%_-_48px)/6)] lg:right-[calc((100%_-_48px)/6)]"
              initial={{ scaleX: 0 }}
              animate={railInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
            <div className="relative grid grid-cols-3 gap-5 lg:gap-6">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex justify-center">
                  <motion.span
                    className="h-[15px] w-[15px] rounded-full border-2 border-black bg-[#dfff00]"
                    initial={{ scale: 0 }}
                    animate={railInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.15 + i * 0.42, type: "spring", stiffness: 320, damping: 20 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {STEPS.map((step, i) => {
            const Mock = MOCKS[step.id];
            return (
              <motion.div
                key={step.id}
                role="group"
                aria-label={`Step ${step.number}: ${step.title.replace(/\.$/, "")}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              >
                {/* Light panel on the black section: gives the dark run of the
                    page a step toward the light sections either side. Gradient,
                    not a photo, so nothing object-covers and the art never
                    crops when the card changes size. */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 25% 0%, rgba(233,232,244,0.95), transparent 62%), linear-gradient(180deg, #f6f6f9 0%, #eceaf3 100%)",
                    }}
                  />

                  {/* Art area takes the slack so every caption sits on the same
                      baseline no matter how tall its artwork runs. */}
                  <div className="relative grid flex-1 place-items-center p-6 pb-2 lg:p-8 lg:pb-3">
                    {step.image ? (
                      <div className="relative w-full">
                        {step.behind && (
                          <img
                            src={step.behind}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="absolute -top-[10%] left-[4%] w-[50%] -rotate-[7deg] opacity-90 drop-shadow-2xl"
                          />
                        )}
                        <img
                          src={step.image}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="relative mx-auto w-[92%] translate-y-[6%] rotate-[2deg] drop-shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="relative rotate-[-1.5deg]">{Mock && <Mock />}</div>
                    )}
                  </div>

                  <div className="relative p-6 pt-4 lg:p-8 lg:pt-5">
                    <h3 className="font-deck text-2xl leading-tight text-[#0a0a0a] lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/55 lg:text-base">
                      {step.caption[0]}
                      {/* Emphasis by weight and tone, not italics. */}
                      <span className="font-semibold text-black/80">
                        {step.caption[1]}
                      </span>
                      {step.caption[2]}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
