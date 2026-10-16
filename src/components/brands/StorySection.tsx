import { PARTNERS } from "@/components/brands/PartnerOrbit";

/**
 * Below the sky hero, from Nick's mock: the partner row in quiet grey, then
 * "Your brand belongs in the athlete's story" over three cards that walk the
 * campaign from the connection to the work.
 *
 * The partners are JABA's own, the same set as the logo strip and the orbit.
 * The mock showed others (Wisconsin, Alabama, LSU, Playfly, Religion of
 * Sports); they aren't in the logo set, so they aren't claimed here.
 */

function Arrow() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#0a0a0a] shadow-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </span>
  );
}

const ROW = PARTNERS.filter((p) => !["Every True Tiger", "Rally"].includes(p.name)).slice(0, 7);

export default function StorySection() {
  return (
    <section className="bg-[#eeeeee] px-6 pb-20 pt-10 text-[#0a0a0a] md:px-10 md:pb-28 lg:px-12">
      <div id="network" className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-6 md:justify-between">
        {ROW.map((p, i) => (
          <div key={p.name} className="flex items-center gap-6">
            {i > 0 && <span aria-hidden className="hidden h-8 w-px bg-black/10 md:block" />}
            <img
              src={p.src}
              alt={p.name}
              className="h-9 w-auto object-contain opacity-55 md:h-10"
              style={{ filter: "grayscale(1) contrast(1.1)" }}
            />
          </div>
        ))}
      </div>

      <h2
        className="mx-auto mt-20 max-w-4xl text-center font-sans font-light leading-[1] tracking-[-0.045em] md:mt-28"
        style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.8rem)" }}
      >
        Your brand belongs
        <span className="block text-black/45">in the athlete&rsquo;s story.</span>
      </h2>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        <div className="relative h-[19rem] overflow-hidden rounded-[22px] bg-[#cfe0f2] md:h-[22rem]">
          <img src="/brands/sneakers.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-[76%_50%]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-transparent" />
          <div className="relative flex items-start justify-between p-6">
            <p className="max-w-[10rem] font-sans text-[22px] font-medium leading-tight tracking-[-0.02em]">Find the connection</p>
            <Arrow />
          </div>
        </div>

        <div className="relative flex h-[19rem] flex-col overflow-hidden rounded-[22px] bg-white md:h-[22rem]">
          <div className="p-6">
            <p className="font-sans text-[22px] font-medium leading-tight tracking-[-0.02em]">Make it a campaign</p>
            <p className="mt-2 max-w-[16rem] font-sans text-[14.5px] leading-relaxed text-black/55">
              Ideas rooted in the athlete&rsquo;s interests, content, and audience.
            </p>
          </div>
          <div className="relative mt-auto h-40">
            {[
              { src: "ring", cls: "left-6 bottom-0 h-32 w-24 -rotate-6" },
              { src: "barbell", cls: "left-1/2 bottom-2 h-36 w-28 -translate-x-1/2" },
              { src: "club", cls: "right-6 bottom-0 h-32 w-24 rotate-6" },
            ].map((p) => (
              <img
                key={p.src}
                src={`/brands/${p.src}.webp`}
                alt=""
                aria-hidden
                className={`absolute rounded-[12px] object-cover shadow-[0_18px_30px_-16px_rgba(0,0,0,0.5)] ${p.cls}`}
              />
            ))}
          </div>
        </div>

        <div className="relative flex h-[19rem] flex-col overflow-hidden rounded-[22px] bg-[#dfff00] md:h-[22rem]">
          <div className="flex items-start justify-between p-6">
            <div>
              <p className="font-sans text-[22px] font-medium leading-tight tracking-[-0.02em]">Keep it moving</p>
              <p className="mt-2 max-w-[13rem] font-sans text-[14.5px] leading-relaxed text-black/60">
                Outreach, content, and reporting. All connected.
              </p>
            </div>
            <Arrow />
          </div>
          <div className="relative mt-auto h-36">
            <img
              src="/brands/barbell.webp"
              alt=""
              aria-hidden
              className="absolute bottom-0 left-1/2 h-32 w-40 -translate-x-1/2 rounded-t-[14px] object-cover"
            />
            <span className="absolute bottom-10 left-5 flex items-center gap-2 rounded-[12px] bg-white px-3 py-2 font-sans text-[12.5px] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.4)]">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#22b35e] text-white">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden>
                  <path d="m5 12 4.5 4.5L19 7" />
                </svg>
              </span>
              Content live
            </span>
            <span className="absolute bottom-6 right-5 flex h-16 w-20 items-end gap-1 rounded-[12px] bg-white p-2 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.4)]">
              {[0.35, 0.55, 0.45, 0.8, 1].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[2px] bg-[#2f80ff]" style={{ height: `${h * 100}%` }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
