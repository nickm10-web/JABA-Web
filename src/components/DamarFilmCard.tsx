import { useState } from "react";
import { Play } from "lucide-react";

import FilmLightbox from "@/components/FilmLightbox";

export default function DamarFilmCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* The card clips the top 12.5% of the photo; a pixel-aligned cutout of
          Damar sits outside that clip, masked to just that sliver, so his
          head reads as breaking out above the card. Both images share the
          same box and animation so the ken-burns never drifts apart. */}
      <div className="group relative">
        <div className="relative aspect-[4/4.4] overflow-hidden rounded-[28px] shadow-[0_16px_40px_-22px_rgba(0,0,0,0.45)] md:aspect-[2000/984] md:shadow-[0_50px_130px_-40px_rgba(0,0,0,0.5)]">
          <img
            src="/DAMAR%20HAMLIN%20thumbnail.png"
            alt="Damar Hamlin, JABA Creative Director"
            className="damar-kenburns absolute inset-0 h-full w-full object-cover object-bottom md:inset-auto md:bottom-0 md:left-0 md:h-auto"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
          />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play the JABA launch film"
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
          >
            <span className="flex h-12 w-12 -translate-y-8 items-center justify-center rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 md:translate-y-0" style={{ background: "#dfff00" }}>
              <Play className="h-6 w-6 translate-x-0.5 text-black md:h-7 md:w-7" fill="currentColor" />
            </span>
          </button>

          {/* Sits above the button so the caption stays selectable. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-12">
            <div>
              <p className="font-display text-sm italic text-white/70 md:text-lg">
                Hear from our Creative Director
              </p>
              <p className="mt-1.5 font-display text-2xl leading-none text-white md:text-4xl">
                Damar Hamlin
              </p>
              <p className="mt-2.5 font-sans text-[12.5px] tracking-wide text-white/60">
                Buffalo Bills Safety · JABA Creative Director
              </p>
            </div>
          </div>
        </div>

        <img
          src="/damar-cutout.png"
          alt=""
          aria-hidden
          className="damar-kenburns pointer-events-none absolute bottom-0 left-0 hidden w-full md:block"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0 15%, transparent 16.5%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0 15%, transparent 16.5%)",
          }}
        />
      </div>

      <FilmLightbox open={open} onClose={() => setOpen(false)} />
    </>
  );
}
