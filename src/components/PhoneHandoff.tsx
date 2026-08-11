import { useEffect, useRef, useState } from "react";

import ChatPhone from "@/components/ChatPhone";

/** Contents are laid out at this width (the destination phone's lg size). */
const DESIGN_W = 380;

/**
 * Flies a phone from JABA's hand into the thread section's phone as you scroll.
 *
 * The two anchors live in different sections with unrelated layouts, so nothing
 * hard-coded will line up. Instead this measures both at runtime — `[data-phone-start]`
 * and `[data-phone-end]` — and interpolates between their document-space rects,
 * landing exactly on the destination before fading out.
 */
export default function PhoneHandoff() {
  const elRef = useRef<HTMLDivElement>(null);
  const landedRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Desktop only: on phones the two anchors stack and the flight reads as noise.
    const mq = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(mq.matches && !reduce.matches);
    sync();
    mq.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = elRef.current;
      const start = document.querySelector<HTMLElement>("[data-phone-start]");
      const end = document.querySelector<HTMLElement>("[data-phone-end]");
      if (!el || !start || !end) return;

      const y = window.scrollY;
      const s = start.getBoundingClientRect();
      const e = end.getBoundingClientRect();
      // Document space, so the maths doesn't move as the page scrolls.
      const sTop = s.top + y;
      const eTop = e.top + y;

      // Travel runs from the hand sitting mid-viewport to the destination
      // phone settling into place.
      const from = sTop - window.innerHeight * 0.45;
      const to = eTop - window.innerHeight * 0.28;
      const span = Math.max(to - from, 1);
      const p = Math.min(Math.max((y - from) / span, 0), 1);
      // Ease so it lifts off gently and decelerates into the slot.
      const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      // Document-space, absolute positioning: the browser scrolls the phone
      // natively so it sits dead still in his hand. A fixed element has to be
      // re-placed by JS every frame, which always trails the scroll by one and
      // reads as jitter.
      const left = s.left + (e.left - s.left) * t + window.scrollX;
      const top = sTop + (eTop - sTop) * t;
      const width = s.width + (e.width - s.width) * t;
      // Arc it outward rather than travelling on a straight diagonal.
      const arc = Math.sin(t * Math.PI) * -46;
      const rotate = -8 * (1 - t);

      // Scale is part of the transform (not a width change) so the phone is
      // laid out once at DESIGN_W and never reflows — the chat inside stays
      // pixel-identical to the destination all the way down.
      const scale = width / DESIGN_W;
      el.style.transform = `translate3d(${left}px, ${top + arc}px, 0) rotate(${rotate}deg) scale(${scale})`;
      // Rests in his hand from the start; only disappears once it has landed.
      const landed = p >= 0.995;
      el.style.opacity = landed ? "0" : "1";
      el.style.visibility = landed ? "hidden" : "visible";

      // The destination only appears once the flight has arrived — and that
      // arrival is what starts the conversation playing.
      const arrived = p >= 0.94;
      end.style.opacity = arrived ? "1" : "0";
      if (arrived && !landedRef.current) {
        landedRef.current = true;
        window.dispatchEvent(new CustomEvent("jaba:phone-landed"));
      }
    };

    // Driven by rAF rather than scroll events: the flight has to stay glued to
    // two moving anchors, and a dropped or throttled scroll event leaves the
    // phone stranded mid-air. An observer parks the loop when nothing is near.
    let live = false;
    const tick = () => {
      update();
      frame = live ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((entry) => entry.isIntersecting);
        if (near === live) return;
        live = near;
        if (live && !frame) frame = requestAnimationFrame(tick);
      },
      { rootMargin: "150% 0px" },
    );

    const startEl = document.querySelector("[data-phone-start]");
    const endEl = document.querySelector("[data-phone-end]");
    if (startEl) io.observe(startEl);
    if (endEl) io.observe(endEl);

    update();
    return () => {
      live = false;
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      const end = document.querySelector<HTMLElement>("[data-phone-end]");
      if (end) end.style.opacity = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30"
      style={{ width: DESIGN_W, visibility: "hidden", transformOrigin: "top left", willChange: "transform" }}
    >
      {/* The very same phone, authored at DESIGN_W and scaled down, so what
          sits in JABA's hand is identical to what it lands as. */}
      <ChatPhone visibleCount={0} />
    </div>
  );
}
