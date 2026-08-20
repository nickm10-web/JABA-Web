import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { EmailCaptureGlass } from "@/components/ui/email-capture-glass";

interface ScrollVideoHeroProps {
  bgSrc?: string;
}

/**
 * Static hero: the JABA-world colonnade vista with centered ink copy in the
 * open sky band. (The image is bright, so the copy runs dark, mirroring the
 * light-section rules.)
 */
export default function ScrollVideoHero({
  bgSrc = "/hero-world.webp",
}: ScrollVideoHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#eeeeee]">
      {/* Portrait crop on phones (16:9 desktop art loses the scene there) */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/hero-world-mobile.webp" />
        <img
          src={bgSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>


      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] items-start gap-12 px-4 pb-20 pt-36 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-6 lg:px-8 lg:pb-0 lg:pt-16">
        {/* Left — copy, nudged above the hills so it sits on the sky band */}
        <div className="relative min-w-0 text-center md:text-left lg:-translate-y-24 lg:self-center">
          <h1
            className="font-deck text-4xl leading-[1.04] text-white [text-wrap:balance] md:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25)" }}
          >
            <span className="block">
              Athletes aren't hard to work with.
            </span>
            <span className="deck-italic block text-[#dfff00]">Your systems are.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl font-sans text-lg font-bold leading-snug text-white/95 [text-wrap:balance] md:mx-0 md:text-2xl"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.3)" }}
          >
            JABA is AI that allows anyone to work with athletes in{" "}
            <img
              src="/cta-bubble.webp"
              alt="one text thread?"
              className="bubble-float hero-bubble"
            />
          </p>

          <div className="mt-7 flex w-full max-w-xl items-center justify-center gap-3 md:justify-start">
            <EmailCaptureGlass className="on-light" cta="Get early access" />
          </div>

          {/* Names the buyer — the hero copy alone doesn't say who this is for. */}
          <p
            className="mt-4 flex items-center justify-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[11px] sm:tracking-[0.16em] md:justify-start md:text-[12px]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
          >
            <img src="/trust-shield.png" alt="" aria-hidden className="h-[22px] w-auto shrink-0" />
            Trusted by athletic departments, agencies, and brands
          </p>
        </div>

        {/* Right — iPhone running the NIL Team thread, cropped by the fold.
            Hidden on phones: the copy carries the mobile hero. */}
        {/* The phone is deliberately taller than the box it sits in. Sizing the
            box instead of letting the phone size itself is what lets it ride
            high: the hero's height is content-driven, so a free-standing phone
            grows the section by exactly what it gains and never actually moves
            up. It hangs out of the bottom and the section's overflow crops it. */}
        {/* lg, not md: the grid only splits into two columns at lg, so showing
            the phone from md dropped it underneath the copy, centred, and grew
            the hero past the viewport. Below lg the copy carries the hero. */}
        <div className="hidden self-start lg:flex lg:justify-end">
          <div className="relative h-[420px] w-[440px] lg:h-[460px] lg:w-[480px]">
            {/* Anchored to the top of the hero, not its bottom. Bottom-anchoring
                ties the phone to the fold, so it slid down ~180px on a taller
                window; from the top its position holds at any viewport height
                and the fold just crops more or less of the tail. */}
            <div className="absolute inset-x-0 top-0 translate-y-[60px] lg:translate-y-[80px]">
              <HeroPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Message pop-in, scaled from the bubble's anchor corner like iMessage. */
const POP = {
  initial: { opacity: 0, y: 12, scale: 0.86 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 27 } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.16 } },
} as const;

/* Per-step dwell times: pause → coach → typing → reply → typing → reply →
   sent → typing (hold), then the loop resets. */
const STEP_MS = [500, 1100, 1400, 1600, 1300, 1700, 1300, 1500, 1800, 1400, 1500, 3800];

function TypingBubble() {
  return (
    <motion.div {...POP} className="relative" style={{ transformOrigin: "bottom left" }}>
      <div className="flex w-fit items-center gap-[6px] rounded-[19px] bg-[#e9e9eb] px-[15px] py-[13px]">
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" />
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" style={{ animationDelay: "0.22s" }} />
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" style={{ animationDelay: "0.44s" }} />
      </div>
      {/* The real indicator trails two detached bubbles instead of a tail. */}
      <span className="absolute -left-[3px] bottom-[1px] h-[9px] w-[9px] rounded-full bg-[#e9e9eb]" />
      <span className="absolute -left-[9px] -bottom-[5px] h-[5px] w-[5px] rounded-full bg-[#e9e9eb]" />
    </motion.div>
  );
}

/* A realistic iPhone (dynamic island, status bar, iMessage chrome) showing the
   NIL Team group chat. Fictional athlete and brand only. */
function HeroPhone() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % STEP_MS.length), STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div className="relative w-[300px] shrink-0 md:w-[440px] lg:w-[480px]">
      {/* Side buttons — mute, volume up/down (left), power (right) */}
      <span aria-hidden className="absolute -left-[3px] top-[15%] h-6 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -left-[3px] top-[22.5%] h-11 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -left-[3px] top-[31.5%] h-11 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -right-[3px] top-[25%] h-16 w-[3px] rounded-r-md" style={{ background: "linear-gradient(90deg,#232528,#4a4d53)" }} />

      {/* Stainless frame with light catching the rails */}
      <div
        className="rounded-[60px] p-[4px]"
        style={{
          background:
            "linear-gradient(145deg,#5c5f65 0%,#2b2d31 22%,#111214 52%,#3e4146 86%,#5a5d63 100%)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.45), 0 6px 18px rgba(0,0,0,0.35)",
        }}
      >
        {/* Black bezel */}
        <div className="rounded-[56px] bg-[#050506] p-[9px]">
          {/* Screen */}
          <div className="relative w-full overflow-hidden rounded-[46px] bg-[#fbfbfc]" style={{ aspectRatio: "9 / 18.6" }}>
            <div className="absolute inset-0 flex flex-col">
        {/* Header chrome (status bar + group header) */}
        <div className="bg-[#fbfbfc]">
          <div className="flex items-center justify-between px-8 pt-4 text-[15px] font-semibold text-black">
            <span className="pl-1">9:41</span>
            <span className="flex items-center gap-1.5">
              <svg width="19" height="12.5" viewBox="0 0 17 11" fill="black" aria-hidden>
                <rect x="0" y="7" width="3" height="4" rx="0.8" />
                <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
                <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
              </svg>
              <svg width="18" height="12.5" viewBox="0 0 16 12" fill="black" aria-hidden>
                <path d="M8 11.2 5.6 8.8a3.4 3.4 0 0 1 4.8 0Z" />
                <path d="M8 6.4c-1.6 0-3 .6-4.1 1.7L2.5 6.7A7.7 7.7 0 0 1 8 4.4c2.1 0 4 .8 5.5 2.3l-1.4 1.4A5.8 5.8 0 0 0 8 6.4Z" />
                <path d="M8 2.3C5.3 2.3 2.8 3.4 1 5.2L-.4 3.8A13 13 0 0 1 8 .3a12.6 12.6 0 0 1 8.4 3.5L15 5.2A10.7 10.7 0 0 0 8 2.3Z" />
              </svg>
              <svg width="28" height="13.5" viewBox="0 0 25 12" aria-hidden>
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke="black" strokeOpacity="0.4" />
                <rect x="2" y="2" width="18" height="8" rx="2" fill="black" />
                <path d="M23 4v4c1-.3 1.6-1 1.6-2S24 4.3 23 4Z" fill="black" fillOpacity="0.4" />
              </svg>
            </span>
          </div>
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-[10px] h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black" />

          {/* iOS 17 conversation header: back / emoji avatar + name pill / FaceTime */}
          <div className="relative flex flex-col items-center px-3 pb-1.5 pt-1.5">
            <span className="absolute left-3 top-4 grid h-[40px] w-[40px] place-items-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
              <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="#0a0a0a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </span>
            <span className="absolute right-3 top-4 grid h-[40px] w-[40px] place-items-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
              <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="#0a0a0a" aria-hidden>
                <rect x="2" y="6" width="13" height="12" rx="3.4" />
                <path d="M17 11.2 21.3 8.4a.7.7 0 0 1 1.1.6v6a.7.7 0 0 1-1.1.6L17 12.8Z" />
              </svg>
            </span>
            <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#8fdcea] text-[27px] leading-none">
              &#127944;
            </span>
            <span className="-mt-2 rounded-full bg-white px-2.5 py-[3px] text-[14px] font-semibold text-black shadow-[0_1px_6px_rgba(0,0,0,0.14)]">
              NIL Team <span className="text-black/35">&rsaquo;</span>
            </span>
            <span className="mt-1.5 text-center text-[11px] leading-[1.35] text-black/40">
              iMessage
              <br />
              Today 2:14 PM
            </span>
          </div>
        </div>

        {/* Thread — real iMessage bubble shapes, SF system font. Plays out as
            a live conversation, then loops. */}
        {/* Top-aligned: the conversation has to sit directly under the header.
            Stacking it up from the composer looks more like real iMessage but
            drops the readable part ~150px down the screen, which cancels out
            raising the phone at all. The empty tail below runs off the fold. */}
        <div
          className="h-[61%] overflow-hidden bg-[#fbfbfc] px-3.5 pt-2 text-[15.5px]"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
        >

          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="coach" {...POP}>
                <div className="pb-0.5 pl-[42px] text-[12px] text-black/45">Coach Davis</div>
                <div className="flex items-end gap-2">
                  <span className="relative z-[1] grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(#6f7bd6,#4b57b6)" }}>C</span>
                  <div className="imsg imsg-recv imsg-tail-l" style={{ transformOrigin: "bottom left" }}>Did the Voltic reel go up today?</div>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div key="jaba-group" {...POP}>
                <div className="pb-0.5 pl-[42px] pt-2.5 text-[12px] text-black/45">JABA</div>
                <div className="flex items-end gap-2">
                  <img src="/jaba-face.png" alt="" className="relative z-[1] h-[34px] w-[34px] shrink-0 rounded-full object-cover" />
                  <div className="flex min-w-0 flex-col items-start gap-[3px]">
                    {step === 2 && <TypingBubble key="typing-1" />}
                    {step >= 3 && (
                      <motion.div key="jaba-1" {...POP} className={`imsg imsg-recv${step === 3 ? " imsg-tail-l" : ""}`} style={{ transformOrigin: "bottom left" }}>
                        &#9888;&#65039; Not yet, it missed the deadline. Nudging Maya now, and I&rsquo;ll flag you if it slips again.
                      </motion.div>
                    )}
                    {step === 4 && <TypingBubble key="typing-2" />}
                    {step >= 5 && (
                      <motion.div key="jaba-2" {...POP} className="imsg imsg-recv imsg-tail-l" style={{ transformOrigin: "bottom left" }}>
                        &#128232; The brand also emailed the redline. Flagged it and set the countersign reminder.
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step >= 6 && (
              <motion.div key="sent" {...POP} className="pt-2.5">
                <div className="imsg imsg-sent imsg-tail-r" style={{ transformOrigin: "bottom right" }}>appreciate it &#128588;</div>
              </motion.div>
            )}

            {step >= 7 && (
              <motion.div key="jaba-final" {...POP}>
                <div className="pb-0.5 pl-[42px] pt-2.5 text-[12px] text-black/45">JABA</div>
                <div className="flex items-end gap-2">
                  <img src="/jaba-face.png" alt="" className="relative z-[1] h-[34px] w-[34px] shrink-0 rounded-full object-cover" />
                  {step === 7 ? (
                    <TypingBubble />
                  ) : (
                    <motion.div {...POP} className="imsg imsg-recv imsg-tail-l" style={{ transformOrigin: "bottom left" }}>
                      &#9989; Maya posted it. Deliverable complete, brand notified.
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step >= 9 && (
              <motion.div key="coach-2" {...POP}>
                <div className="pb-0.5 pl-[42px] pt-2.5 text-[12px] text-black/45">Coach Davis</div>
                <div className="flex items-end gap-2">
                  <span className="relative z-[1] grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(#6f7bd6,#4b57b6)" }}>C</span>
                  <div className="imsg imsg-recv imsg-tail-l" style={{ transformOrigin: "bottom left" }}>what else is open this week?</div>
                </div>
              </motion.div>
            )}

            {step >= 10 && (
              <motion.div key="jaba-week" {...POP}>
                <div className="pb-0.5 pl-[42px] pt-2.5 text-[12px] text-black/45">JABA</div>
                <div className="flex items-end gap-2">
                  <img src="/jaba-face.png" alt="" className="relative z-[1] h-[34px] w-[34px] shrink-0 rounded-full object-cover" />
                  {step === 10 ? (
                    <TypingBubble />
                  ) : (
                    <motion.div {...POP} className="imsg imsg-recv imsg-tail-l" style={{ transformOrigin: "bottom left" }}>
                      Three deliverables across two athletes. Both on track, nothing at risk.
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar + home indicator */}
        <div className="bg-[#fbfbfc] px-3 pb-2.5 pt-1.5">
          <div className="flex items-center gap-2">
            <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-[23px] font-light leading-none text-black shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
              +
            </span>
            <span className="flex flex-1 items-center justify-between rounded-full bg-white py-[9px] pl-4 pr-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
              <span className="text-[15.5px] text-black/32">iMessage</span>
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="rgba(0,0,0,0.35)" aria-hidden>
                <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
                <path d="M17.5 11a.9.9 0 0 0-1.8 0 3.7 3.7 0 0 1-7.4 0 .9.9 0 0 0-1.8 0 5.5 5.5 0 0 0 4.6 5.4V19h-2a.9.9 0 0 0 0 1.8h5.8a.9.9 0 0 0 0-1.8h-2v-2.6a5.5 5.5 0 0 0 4.6-5.4Z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex-1 bg-[#fbfbfc]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
