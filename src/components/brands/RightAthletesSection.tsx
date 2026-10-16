import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * "Then we find the right athletes" — the film's search result, on a page
 * anyone can open.
 *
 * The film names real athletes and their schools. That works in a deck sent to
 * one room; it does not work on a public URL, where it would assert a fit
 * those athletes never agreed to. So this takes the treatment the film already
 * uses on its deep-dive beat: the shape of the evidence is real, the identity
 * is not, and the page says so underneath.
 *
 * "Performs like" is the number worth stealing from the film. It reframes
 * follower count as the wrong question without ever arguing the point.
 */

const RESULTS = [
  {
    fit: "Right for a destination that needs reach",
    sport: "Basketball",
    followers: "63.1K",
    performsLike: "391K",
    posts: 56,
    onTopic: 9,
    note: "Their most-liked post is not basketball. It is a yacht trip in Greece, at 588K likes.",
  },
  {
    // The lead result: the one the search would actually open with, and the
    // only card that gets the brand's full attention.
    lead: true,
    fit: "Right for a summer in Europe",
    sport: "Volleyball",
    followers: "11.6K",
    performsLike: "80K",
    posts: 66,
    onTopic: 10,
    note: "Greece, Italy and Turkey in three posts across one week. No travel brand anywhere in their sponsored history.",
  },
  {
    fit: "Right for outdoor and island trips",
    sport: "Beach volleyball",
    followers: "78.8K",
    performsLike: "160K",
    posts: 80,
    onTopic: 15,
    note: "Fifteen of 80 posts are trips: a waterfall, an island, a river city in Europe. None of them paid.",
  },
];

export default function RightAthletesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-black px-6 pb-24 pt-4 text-white md:px-10 md:pb-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          Athletes, with the evidence attached.
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/55">
          An example search: a travel brand that wants athletes already posting
          their trips.
        </p>

        {/* One card is lifted and lit; the other two sit back. Three equal
            cards give the eye nowhere to land, and a search does have a top
            result. */}
        <div ref={ref} className="mt-12 grid grid-cols-1 items-center gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {RESULTS.map((r, i) => (
            <div
              key={r.fit}
              className={`rounded-[18px] border p-5 transition-all duration-500 md:p-6 ${
                r.lead
                  ? "border-[#dfff00]/25 bg-[#17171c] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.95)] md:scale-[1.06] md:p-7"
                  : "border-white/[0.08] bg-[#101013] md:opacity-70"
              }`}
              style={{
                opacity: inView ? undefined : 0,
                transform: inView ? undefined : "translateY(18px)",
                transitionDelay: `${i * 140}ms`,
              }}
            >
              <p
                className={`text-[11px] uppercase tracking-[0.18em] ${
                  r.lead ? "text-[#dfff00]" : "text-white/40"
                }`}
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                {r.fit}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-11 w-11 shrink-0 rounded-full bg-white/10"
                />
                <div>
                  <div className="h-3.5 w-24 rounded bg-white/20" />
                  <p className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.1em] text-white/35">
                    {r.sport}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-y-5">
                <Metric value={r.followers} label="Followers" />
                <Metric value={r.performsLike} label="Performs like" volt />
                <Metric value={String(r.posts)} label="Posts" small />
                <Metric value={String(r.onTopic)} label="Travel posts" small />
              </div>

              <p className="mt-6 font-sans text-[13.5px] leading-relaxed text-white/50">
                {r.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-7 max-w-3xl font-sans text-[13px] leading-relaxed text-white/35">
          Illustrative results, so no athlete is listed against a brand they
          haven&rsquo;t agreed to. The shape of the evidence is what a real search
          returns.
        </p>
      </div>
    </section>
  );
}

function Metric({
  value,
  label,
  volt = false,
  small = false,
}: {
  value: string;
  label: string;
  volt?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-deck leading-none ${small ? "text-xl" : "text-2xl"} ${
          volt ? "text-[#dfff00]" : "text-white"
        }`}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.1em] text-white/35">
        {label}
      </p>
    </div>
  );
}
