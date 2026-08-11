import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import ChatPhone, { messages, type ChatMessage } from "@/components/ChatPhone";

// NOTE: The conversation autoplays once the phone scrolls into view: a
// timer chain reveals messages with texting-like pacing (longer texts
// take longer to "arrive"). Entrance/reflow animations are React-state
// triggered motion animations (initial/animate + layout).

// Texting-like pacing: short messages arrive fast, long ones take a
// beat longer (someone "typing"), capped so the scene never drags.
const gapBefore = (m: ChatMessage) =>
  Math.min(450 + m.text.length * 10, 1300);

export default function TextAssistantSection() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [readShown, setReadShown] = useState(false);
  const inView = useInView(phoneRef, { once: true, amount: 0.6 });

  // With the handoff running, the thread stays empty until the phone lands;
  // without it (mobile, reduced motion) scrolling into view is enough. Both
  // have to stay live: reading the media query once at mount left the thread
  // waiting forever on a landing event that a resize had already cancelled.
  const [landed, setLanded] = useState(false);
  const [handoffActive, setHandoffActive] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setHandoffActive(wide.matches && !reduce.matches);
    sync();
    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const onLanded = () => setLanded(true);
    window.addEventListener("jaba:phone-landed", onLanded);
    return () => window.removeEventListener("jaba:phone-landed", onLanded);
  }, []);

  const playing = inView && (landed || !handoffActive);

  useEffect(() => {
    if (!playing) return;
    let at = 300;
    const timers = messages.map((m, i) => {
      at += i === 0 ? 0 : gapBefore(m);
      return setTimeout(() => setVisibleCount(i + 1), at);
    });
    // Read receipt lands a beat after the last message sends.
    timers.push(setTimeout(() => setReadShown(true), at + 900));
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  return (
    <section className="relative w-full bg-[#eeeeee]">
      <div className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
            {/* Left: copy */}
            <div className="relative flex flex-1 flex-col justify-center text-center md:text-left md:pl-12 lg:pl-20">
              <motion.img
                src="/images/bubble-blue.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute right-10 -top-10 z-0 hidden w-24 select-none opacity-80 drop-shadow-xl md:right-4 md:-top-12 md:block md:w-32 lg:right-0 lg:-top-16 lg:w-40"
              />
              <motion.img
                src="/images/bubble-white.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="pointer-events-none absolute -bottom-12 -left-8 z-0 hidden w-24 select-none opacity-80 drop-shadow-xl md:-bottom-16 md:-left-6 md:block md:w-32 lg:-bottom-20 lg:-left-4 lg:w-40"
              />
              <div className="relative z-10">
                <h2 className="font-deck text-4xl leading-[1.05] text-black md:text-5xl lg:text-6xl">
                  Athlete management lives in texts.
                  <span className="block text-black/60">Not Zoom.</span>
                  <span className="block text-black/60">Not another app.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/70 md:text-xl">
                  Every deliverable, task, and calendar, managed in one text
                  thread.
                </p>
              </div>
            </div>

            {/* Right: the shared phone — same component the flight lands as */}
            <div className="flex flex-1 items-center justify-center">
              <ChatPhone
                phoneRef={phoneRef}
                data-phone-end
                visibleCount={visibleCount}
                readShown={readShown}
                className="w-[300px] shrink-0 transition-opacity duration-200 md:w-[340px] lg:w-[380px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Volt divider into the post wall */}
      <div className="h-1.5 w-full bg-[#dfff00]" />
    </section>
  );
}
