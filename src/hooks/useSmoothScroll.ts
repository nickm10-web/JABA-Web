import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Eased, weighted page scrolling.
 *
 * Deliberately scoped: pointer-based devices only. Touch already has native
 * momentum that feels better than anything we'd synthesise, and hijacking it
 * breaks the browser's own overscroll and address-bar behaviour. Anyone who
 * asks for reduced motion keeps the native scroll untouched.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    const lenis = new Lenis({
      // Slightly long ease with a soft tail — carries momentum after the
      // gesture stops without feeling floaty or laggy to the input.
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Hash links still need to land somewhere sensible.
    const onHash = () => lenis.scrollTo(0, { immediate: true });
    window.addEventListener("hashchange", onHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
      lenis.destroy();
    };
  }, []);
}
