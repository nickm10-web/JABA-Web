import { motion } from "motion/react";

import { pressReleases, pressIndexNo } from "@/data/press-releases";

const LIME = "#dfff00";

// The three most recent releases lead the preview; the rest are summarized.
const featured = pressReleases.slice(0, 3);

export default function PressPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Split editorial header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Programs and leagues are already on the wire.
          </h2>
          <a
            href="#/press"
            className="group shrink-0 font-sans text-sm tracking-[0.04em] text-white/55 transition-colors hover:text-white"
          >
            Read the newsroom{" "}
            <span className="transition-colors group-hover:text-[#dfff00]">
              →
            </span>
          </a>
        </div>

        {/* Latest releases as compact wire rows */}
        <div>
          {featured.map((r, i) => (
            <a
              key={r.id}
              href="#/press"
              className="group relative block overflow-hidden border-b border-white/10"
            >
              {/* Lime wipe on hover */}
              <span
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: LIME }}
              />
              <div className="relative grid grid-cols-12 items-center gap-4 py-7 md:py-8">
                <span
                  className="col-span-3 font-sans text-3xl font-extrabold tracking-tight text-white/20 transition-colors duration-300 group-hover:text-black md:col-span-2 md:text-4xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {pressIndexNo(i)}
                </span>
                <span
                  className="col-span-9 font-sans text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-black/70 md:col-span-2"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {r.plateDate}
                </span>
                <h3 className="col-span-12 font-display text-xl leading-snug transition-colors duration-300 group-hover:text-black md:col-span-6 md:text-2xl">
                  {r.headline}
                </h3>
                <span className="col-span-12 font-sans text-[11px] uppercase tracking-[0.14em] text-white/40 transition-colors duration-300 group-hover:text-black/70 md:col-span-2 md:text-right">
                  {r.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Partner logo wall */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-8 md:mt-16"
        >
          {pressReleases
            .filter((r) => r.logo)
            .map((r) => (
              <img
                key={r.id}
                src={r.logo}
                alt={r.partner}
                title={r.partner}
                className="h-10 w-auto opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
