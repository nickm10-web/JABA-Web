import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/** The launch film, published as a Short but shot 16:9. */
export const LAUNCH_FILM_ID = "EMX8D4zjpzU";

/**
 * Fullscreen player for the launch film, shared by every play button on the
 * site. Portalled to the body: callers often sit inside transformed ancestors
 * (Framer Motion wrappers), which would otherwise capture the fixed overlay.
 * The iframe only mounts while open, so nothing loads from YouTube until asked.
 */
export default function FilmLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="JABA launch film"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
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
          src={`https://www.youtube-nocookie.com/embed/${LAUNCH_FILM_ID}?autoplay=1&rel=0&modestbranding=1`}
          title="Introducing JABA, featuring Damar Hamlin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>,
    document.body,
  );
}
