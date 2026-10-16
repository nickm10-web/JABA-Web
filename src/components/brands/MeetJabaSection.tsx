import { useEffect, useRef, useState } from "react";

/**
 * Meet JABA, built around the character. The stage holds still and JABA
 * changes role as you scroll: he waves hello, then puts on the glasses to read
 * their feed, picks up the notepad for the idea, the headset to work over
 * text, the clipboard to run the campaign. One character, five beats, so the
 * section is a scene rather than a grid of features.
 *
 * The copy is the film's four pillars, turned to face the brand. The opening
 * line under "Meet JABA." is the film's, word for word.
 *
 * Beats are driven by IntersectionObserver sentinels, the homepage's scroll
 * story pattern: one sentinel per beat, and only entering one changes the
 * beat, so leaving the section holds the last beat instead of resetting.
 */

type Beat = {
  rail: string;
  title: string;
  body: string;
  media: { kind: "video" | "image"; src: string };
};

const BEATS: Beat[] = [
  {
    rail: "Meet JABA",
    title: "Meet JABA.",
    body: "The bridge between athletes and influencers.",
    media: { kind: "video", src: "/meet/jaba-wave.mp4" },
  },
  {
    rail: "Direction",
    title: "Knows their feed.",
    body: "What it does, what performs on it, and what they sound like, before you ever reach out.",
    media: { kind: "image", src: "/meet/data.webp" },
  },
  {
    rail: "The idea",
    title: "Brings the idea.",
    body: "The athlete and the angle, with the evidence attached. Nobody has to pitch.",
    media: { kind: "image", src: "/meet/creative.webp" },
  },
  {
    rail: "Availability",
    title: "Works over text.",
    body: "Everything happens in a thread, in the time an athlete actually has.",
    media: { kind: "image", src: "/meet/ops.webp" },
  },
  {
    rail: "The campaign",
    title: "Runs the campaign.",
    body: "Follow-ups, reminders, quality control, and an exclusivity check before anything goes out.",
    media: { kind: "image", src: "/meet/manage.webp" },
  },
];

const BEAT_VH = 75;

export default function MeetJabaSection() {
  const [active, setActive] = useState(0);
  const sentinels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sentinels.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative bg-black text-white"
      style={{ height: `${100 + BEATS.length * BEAT_VH}vh` }}
    >
      {/* One sentinel per beat; the stage reads whichever crosses mid-screen. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
        {BEATS.map((_, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => {
              sentinels.current[i] = el;
            }}
            style={{ height: `${BEAT_VH}vh` }}
          />
        ))}
      </div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-10 lg:px-12">
        <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Copy. Every beat's text is stacked in one fixed box, so changing
              beat cross-fades in place instead of reflowing the column. */}
          <div className="order-2 lg:order-1">
            {/* The rail: where you are in the scene. The tick is the one lime
                element on screen. */}
            <ol className="hidden space-y-2.5 lg:block">
              {BEATS.map((b, i) => (
                <li
                  key={b.rail}
                  className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                    i === active ? "text-white" : "text-white/25"
                  }`}
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                >
                  <span
                    className="h-px transition-all duration-500"
                    style={{
                      width: i === active ? 28 : 12,
                      background: i === active ? "#dfff00" : "rgba(255,255,255,0.25)",
                    }}
                  />
                  {b.rail}
                </li>
              ))}
            </ol>

            <p
              className="text-center text-[11px] uppercase tracking-[0.22em] text-white/35 lg:hidden"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {String(active + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
            </p>

            <div className="relative mt-6 min-h-[11rem] md:min-h-[13rem] lg:mt-14 lg:min-h-[15rem]">
              {BEATS.map((b, i) => (
                <div
                  key={b.title}
                  aria-hidden={i !== active}
                  className="absolute inset-x-0 top-0 text-center transition-all duration-500 ease-out lg:text-left"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${i === active ? 0 : i < active ? -18 : 18}px)`,
                  }}
                >
                  <h2 className="font-deck text-[2.6rem] leading-[1.02] md:text-6xl lg:text-7xl">
                    {b.title}
                  </h2>
                  <p className="mx-auto mt-5 max-w-md font-sans text-lg leading-relaxed text-white/55 lg:mx-0 md:text-xl">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The stage. JABA stays put; only the role changes. */}
          <div className="relative order-1 mx-auto aspect-square w-[min(78vw,46vh)] lg:order-2 lg:w-full lg:max-w-[560px]">
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.09), transparent)" }}
            />
            <div
              aria-hidden
              className="absolute bottom-[4%] left-1/2 h-[7%] w-[46%] -translate-x-1/2 rounded-[50%]"
              style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent)" }}
            />

            {BEATS.map((b, i) => {
              const on = i === active;
              const style = {
                opacity: on ? 1 : 0,
                transform: `scale(${on ? 1 : 0.94})`,
              };
              const cls =
                "absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-out";
              return b.media.kind === "video" ? (
                <video
                  key={b.rail}
                  className={cls}
                  // The video is opaque black, so over the spotlight it would
                  // cut a dark rectangle out of the glow. Lighten drops its
                  // black and keeps only JABA.
                  style={{ ...style, mixBlendMode: "lighten" }}
                  src={b.media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden
                />
              ) : (
                <img
                  key={b.rail}
                  // Close-ups crop tight to the character, so they get a
                  // margin the full-body shot doesn't need.
                  className={`${cls} p-[7%]`}
                  style={style}
                  src={b.media.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
