import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { EmailCaptureGlass } from "@/components/ui/email-capture-glass";
import IPhoneFrame from "@/components/ui/iphone-frame";

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
            <span className="relative inline-block whitespace-nowrap text-[#dfff00]">
              one text thread.
              {/* hand-drawn underline, slightly overshooting like a marker stroke */}
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.12em] left-[-2%] h-[0.34em] w-[104%]"
                fill="none"
                stroke="#dfff00"
                strokeWidth="3.4"
                strokeLinecap="round"
              >
                <path d="M4 8.5C46 4.2 116 3.1 175 4.6c37 .9 84 2.4 121 5.8" />
              </svg>
            </span>
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
    <IPhoneFrame
      avatar={<>&#127944;</>}
      title="NIL Team"
      subtitle={
        <>
          iMessage
          <br />
          Today 2:14 PM
        </>
      }
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
    </IPhoneFrame>
  );
}
