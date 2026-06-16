import { pressReleases } from "@/data/press-releases";

// Announcement graphics drive the gallery; duplicate the set for a seamless loop.
const graphics = pressReleases.filter((r) => r.graphic);
const strip = [...graphics, ...graphics];

export default function PressPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* Header */}
      <div className="relative mx-auto mb-12 max-w-7xl px-6 md:mb-16 md:px-10 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Official partners across{" "}
            <span className="italic">college and pro.</span>
          </h2>
          <a
            href="#/press"
            className="group shrink-0 font-sans text-sm tracking-[0.04em] text-white/55 transition-colors hover:text-white"
          >
            See the newsroom{" "}
            <span className="transition-colors group-hover:text-[#dfff00]">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Auto-scrolling graphics strip */}
      <div className="press-marquee relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-32" />

        <div className="press-marquee-track flex w-max gap-5">
          {strip.map((r, i) => (
            <a
              key={`${r.id}-${i}`}
              href="#/press"
              aria-label={`${r.partner} announcement`}
              className="group relative block h-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-[320px]"
            >
              <img
                src={r.graphic}
                alt={`JABA partners with ${r.partner}`}
                className="h-full w-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Partner label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80">
                  {r.partner}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Partner logo wall */}
      <div className="relative mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6 md:mt-16 md:px-10 lg:px-12">
        {graphics.map((r) => (
          <img
            key={r.id}
            src={r.logo}
            alt={r.partner}
            title={r.partner}
            className="h-9 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-11"
          />
        ))}
      </div>
    </section>
  );
}
