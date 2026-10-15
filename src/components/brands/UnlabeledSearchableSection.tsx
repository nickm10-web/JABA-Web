import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * "JABA makes the unlabeled searchable" — the beat from the film, in scroll
 * form. The claim is the whole moat: a caption says nothing about what is in
 * the frame, and JABA reads the frame.
 *
 * The film labels each tile with the athlete's name and school. This page is
 * public, so the tiles carry the detected tag and nothing else. That is also
 * the better argument: the tag is the product, the person is not.
 *
 * Tags land one at a time once the grid is on screen, because a grid that is
 * already finished reads as a screenshot rather than as something working.
 */

/* Each tile is a real post from the index paired with something genuinely in
   the frame. Picked by eye against the wall, because a tag that does not match
   its photo makes the claim look fake rather than illustrative, and these are
   the kinds of signals a brand searches for: a product, a setting, a moment. */
const TILES = [
  { src: "/wall/p72.webp", tag: "SUV" },
  { src: "/wall/p15.webp", tag: "private jet" },
  { src: "/wall/p71.webp", tag: "championship ring" },
  { src: "/wall/p60.webp", tag: "barbell" },
  { src: "/wall/p25.webp", tag: "beach day" },
  { src: "/wall/p08.webp", tag: "golf club" },
  { src: "/wall/p28.webp", tag: "toddler" },
  { src: "/wall/p42.webp", tag: "formal dress" },
  { src: "/wall/p21.webp", tag: "sundress" },
  { src: "/wall/p74.webp", tag: "tailored suit" },
  { src: "/wall/p49.webp", tag: "smartphone" },
  { src: "/wall/p30.webp", tag: "streetwear" },
];

export default function UnlabeledSearchableSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-deck text-4xl leading-[1.06] md:text-5xl">
          JABA makes the{" "}
          <span className="text-[#dfff00]">unlabeled searchable.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/55">
          Posts and individual video frames, scanned for the brands, products,
          settings and behaviors that never appear in the caption.
        </p>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:gap-4 lg:grid-cols-4"
        >
          {TILES.map((t, i) => (
            <div
              key={t.tag}
              className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#111]"
            >
              <img
                src={t.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full w-full object-cover opacity-85"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55))" }}
              />
              {/* Brackets frame the whole tile. A box drawn inside it would be
                  claiming a position in the photo that nothing here knows. */}
              {[
                "left-2.5 top-2.5 border-l-2 border-t-2",
                "right-2.5 top-2.5 border-r-2 border-t-2",
                "left-2.5 bottom-2.5 border-b-2 border-l-2",
                "right-2.5 bottom-2.5 border-b-2 border-r-2",
              ].map((corner) => (
                <span
                  key={corner}
                  aria-hidden
                  className={`absolute h-5 w-5 border-[#dfff00] transition-opacity duration-500 ${corner}`}
                  style={{ opacity: inView ? 0.9 : 0, transitionDelay: `${i * 110}ms` }}
                />
              ))}
              <span
                className="absolute bottom-3 left-3 rounded-full bg-[#dfff00] px-2.5 py-1 font-sans text-[11.5px] font-semibold text-[#0a0a0a] transition-all duration-500"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(6px)",
                  transitionDelay: `${i * 110 + 160}ms`,
                }}
              >
                {t.tag}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 font-sans text-[13px] text-white/35">
          Real posts from the index, with one example of what the scan returns
          on each.
        </p>
      </div>
    </section>
  );
}
