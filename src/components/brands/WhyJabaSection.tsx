import Eyebrow from "@/components/brands/Eyebrow";

/**
 * The comparison. Every row is a thing a brand already does one way, set
 * against the way JABA does it, and each one is a claim only JABA can make.
 *
 * Stacked rows rather than a two-column table: a table invites a brand to
 * audit it, and a stack lets each row land on its own.
 */

const ROWS = [
  {
    label: "Follower count",
    body: "A follower number tells you how many people could see a post. Performs like tells you how many actually do.",
    lead: true,
  },
  {
    label: "Caption search",
    body: "Everyone else searches what an athlete wrote. JABA searches what was in the frame, including the frames of a video nobody captioned.",
  },
  {
    label: "One agency's roster",
    body: "An agency can only offer you the athletes it signed. JABA reads the whole index, so the right athlete does not have to already be represented.",
  },
  {
    label: "A media kit",
    body: "A media kit is the athlete's best case, assembled by the athlete. The evidence here is every post they have made, whether it helped them or not.",
  },
  {
    label: "A monthly report",
    body: "You see what went up when it went up, benchmarked the same day against their own baseline and against everyone else's.",
  },
];

export default function WhyJabaSection() {
  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Why JABA</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          Everything you&rsquo;re doing now,{" "}
          <span className="text-[#dfff00]">with the evidence attached.</span>
        </h2>

        <div className="mt-12 space-y-3 md:mt-16">
          {ROWS.map((r) => (
            <div
              key={r.label}
              className={`grid grid-cols-1 gap-3 rounded-[16px] border p-5 md:grid-cols-[0.34fr_1fr] md:items-baseline md:gap-8 md:p-6 ${
                r.lead
                  ? "border-[#dfff00]/30 bg-[#dfff00]/[0.07]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <p
                className={`text-[11px] uppercase tracking-[0.18em] ${
                  r.lead ? "text-[#dfff00]" : "text-white/40"
                }`}
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                {r.label}
              </p>
              <p
                className={`font-sans text-[15px] leading-relaxed ${
                  r.lead ? "text-white/85" : "text-white/55"
                }`}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
