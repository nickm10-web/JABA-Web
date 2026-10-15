import Eyebrow from "@/components/brands/Eyebrow";

/**
 * "Meet JABA" — the film's framing beat. The headline is the film's own line,
 * not a new claim: only the four pillars move into the brand's second person.
 */

const PILLARS = [
  {
    icon: "\u{1F9ED}",
    title: "Direction",
    body: "We already know what their feed does, what performs on it, and what they sound like.",
  },
  {
    icon: "\u{1F4A1}",
    title: "The idea",
    body: "You get the athlete and the angle with the evidence attached. They never have to pitch you.",
  },
  {
    icon: "\u{1F4AC}",
    title: "Availability",
    body: "Everything happens over text, in the time an athlete actually has.",
  },
  {
    icon: "\u{1F4CB}",
    title: "The campaign",
    body: "Follow-ups, reminders, quality control, and an exclusivity check before anything goes out.",
  },
];

export default function MeetJabaSection() {
  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
          <Eyebrow>Who you are talking to</Eyebrow>
          <h2 className="mt-5 font-deck text-4xl leading-[1.05] md:text-5xl">
            Meet JABA.
            <span className="mt-1 block text-white/45">
              The bridge between athletes and influencers.
            </span>
          </h2>
          </div>
          <img
            src="/jaba-head.webp"
            alt=""
            aria-hidden
            className="h-16 w-auto shrink-0 self-start md:h-20"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <span aria-hidden className="text-[26px] leading-none">
                {p.icon}
              </span>
              <h3 className="mt-4 font-deck text-xl text-white">{p.title}</h3>
              <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-white/55">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
