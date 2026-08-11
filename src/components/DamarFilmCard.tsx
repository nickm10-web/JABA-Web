import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

/** The launch film, published as a Short but shot 16:9. */
const VIDEO_ID = "EMX8D4zjpzU";

export default function DamarFilmCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Lenis drives the page off wheel events on window, so hiding the overflow
    // is what actually parks the scroll while the film is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

      {/* Portalled to the body: this card sits inside a FadeUp, and Framer
          Motion's transform on that wrapper would make `fixed` resolve against
          the card instead of the viewport. Mounted only while open, so nothing
          from YouTube loads until asked. */}
      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="JABA launch film"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Introducing JABA, featuring Damar Hamlin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
