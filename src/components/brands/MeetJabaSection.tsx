import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Meet JABA, from Nick's mock: the film's line on the left, JABA waving in a
 * framed sky on the right, the same sky as the hero so the page reads as one
 * world.
 *
 * JABA waves on a loop: the 4K wave render with the black keyed out frame by
 * frame, so he stays sharp at this size. A second copy of the sky, masked to its bottom
 * edge, sits in front of him so he stands in the clouds rather than on them.
 */
export default function MeetJabaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section className="bg-[#eeeeee] px-6 py-20 text-[#0a0a0a] md:px-10 md:py-28 lg:px-12">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div
          className="transition-all duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 16}px)` }}
        >
          <h2
            className="font-sans font-normal leading-[1.02] tracking-[-0.045em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.4rem)" }}
          >
            The bridge between athletes and <span className="text-black/45">influencers.</span>
          </h2>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-[24px] md:rounded-[28px]">
          <img src="/brands/sky.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-bottom" />
          <img
            src="/meet/jaba-wave-hd.webp"
            alt="JABA waving"
            loading="lazy"
            className="absolute bottom-[3%] left-1/2 h-[90%] w-auto -translate-x-1/2 transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: `translate(-50%, ${inView ? 0 : 24}px)`,
              filter: "drop-shadow(0 22px 26px rgba(10,50,110,0.28))",
            }}
          />
          <img
            src="/brands/sky.webp"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
            style={{
              maskImage: "linear-gradient(to top, #000 0%, #000 6%, transparent 18%)",
              WebkitMaskImage: "linear-gradient(to top, #000 0%, #000 6%, transparent 18%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
