import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

// NOTE: The conversation autoplays once the phone scrolls into view: a
// timer chain reveals messages with texting-like pacing (longer texts
// take longer to "arrive"). Entrance/reflow animations are React-state
// triggered motion animations (initial/animate + layout).

interface ChatMessage {
  sender: "casey" | "brielle" | "jaba";
  name: string;
  text: string;
  /** iMessage tapback shown on the bubble; fromMe renders it blue. */
  reaction?: { emoji: string; fromMe?: boolean };
}

const messages: ChatMessage[] = [
  {
    sender: "casey",
    name: "Casey",
    text: "B, did you get the Chipotle reel done?",
  },
  { sender: "brielle", name: "Brielle", text: "ugh i forgot" },
  {
    sender: "jaba",
    name: "JABA",
    text: "It's due Friday at 9am. Brielle, I can send you the brief again. Want me to push the brand for an extra day?",
  },
  { sender: "brielle", name: "Brielle", text: "yes pls 🙏" },
  {
    sender: "jaba",
    name: "JABA",
    text: "Done. Sent the request. Chipotle usually approves these in a few hours. I'll let you both know.",
    reaction: { emoji: "👍", fromMe: true },
  },
  {
    sender: "casey",
    name: "Casey",
    text: "you're the best",
    reaction: { emoji: "❤️" },
  },
];

// Texting-like pacing: short messages arrive fast, long ones take a
// beat longer (someone "typing"), capped so the scene never drags.
const gapBefore = (m: ChatMessage) =>
  Math.min(450 + m.text.length * 10, 1300);

export default function TextAssistantSection() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const playing = useInView(phoneRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!playing) return;
    let at = 300;
    const timers = messages.map((m, i) => {
      at += i === 0 ? 0 : gapBefore(m);
      return setTimeout(() => setVisibleCount(i + 1), at);
    });
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  return (
    <section className="relative w-full bg-[#eeeeee]">
      <div className="w-full overflow-hidden py-24 md:py-32">
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
                <h2 className="font-display text-4xl leading-[1.05] text-black md:text-5xl lg:text-6xl">
                  Athlete management lives in texts.{" "}
                  <span className="text-black/60">
                    Not Zoom. Not another app.
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/70 md:text-xl">
                  JABA works inside the iMessage and RCS threads your team
                  already uses. Reminders, follow-ups, deal updates, content
                  reviews, sent and tracked automatically, so athletes never
                  open another app.
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-black/60 md:text-lg">
                  It's Otter.ai for the group chat. Every action item, every
                  deadline, every commitment, captured automatically.
                </p>
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="flex flex-1 items-center justify-center">
              <div
                ref={phoneRef}
                className="relative aspect-[9/19] w-[280px] rounded-[3rem] bg-black p-[10px] shadow-2xl md:w-[340px] lg:w-[380px]"
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem] bg-white">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

                  {/* Chat header */}
                  <div className="border-b border-black/5 bg-white/95 px-4 pb-3 pt-12 backdrop-blur-sm">
                    <p className="text-center text-[15px] font-semibold leading-tight text-black">
                      Brielle, JABA
                    </p>
                    <p className="mt-0.5 text-center text-[11px] text-black/50">
                      iMessage
                    </p>
                  </div>

                  {/* Message list — justify-end so messages stack from the
                      bottom up (real iMessage behavior). `layout` on each
                      bubble makes the older ones slide upward when a new
                      message appears. */}
                  <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-3">
                    <p className="mb-2 text-center text-[11px] text-black/40">
                      Today 2:14 PM
                    </p>
                    <AnimatePresence initial={false}>
                      {messages.slice(0, visibleCount).map((m, i, arr) => {
                        // Casey is the admin viewing this thread: their
                        // messages are "me" (blue, right, no sender label).
                        const isMe = m.sender === "casey";
                        const showSender =
                          !isMe &&
                          (i === 0 || arr[i - 1].sender !== m.sender);
                        const alignClass = isMe
                          ? "items-end"
                          : "items-start";
                        const bubbleClass = isMe
                          ? "bg-[#007aff] text-white rounded-2xl rounded-br-md"
                          : "bg-[#e9e9eb] text-black rounded-2xl rounded-bl-md";

                        return (
                          <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, y: 24, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                              mass: 0.6,
                            }}
                            className={`flex flex-col ${alignClass}`}
                          >
                            {showSender ? (
                              <span className="mb-0.5 pl-11 text-[10px] text-black/40">
                                {m.name}
                              </span>
                            ) : null}
                            <div
                              className={`flex w-full items-end gap-1.5 ${
                                isMe ? "justify-end" : ""
                              } ${m.reaction ? "mt-2" : ""}`}
                            >
                              {!isMe ? (
                                m.sender === "jaba" ? (
                                  // Crop into the mascot's head for a
                                  // contact-photo style avatar.
                                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-black">
                                    <img
                                      src="/meet-jaba.png"
                                      alt=""
                                      aria-hidden
                                      className="absolute left-[-39%] top-[-32%] w-[178%] max-w-none"
                                    />
                                  </span>
                                ) : (
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#a8a8ad] to-[#8e8e93] text-[12px] font-medium text-white">
                                    {m.name[0]}
                                  </span>
                                )
                              ) : null}
                              <div
                                className={`relative max-w-[75%] px-3.5 py-2 ${bubbleClass}`}
                              >
                                {m.reaction ? (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 22,
                                      delay: 0.9,
                                    }}
                                    className={`absolute -top-4 z-10 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-white px-1.5 text-[12px] shadow-sm ${
                                      isMe ? "-left-3" : "-right-3"
                                    } ${
                                      m.reaction.fromMe
                                        ? "bg-[#007aff]"
                                        : "bg-[#e9e9eb]"
                                    }`}
                                  >
                                    {m.reaction.emoji}
                                  </motion.span>
                                ) : null}
                                <p className="whitespace-pre-wrap text-[15px] leading-snug">
                                  {m.text}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* iMessage input bar */}
                  <div className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5">
                    <button
                      type="button"
                      aria-label="Add"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-xl leading-none text-black/40"
                    >
                      +
                    </button>
                    <div className="relative flex flex-1 items-center rounded-full border border-black/10 bg-white px-4 py-1.5">
                      <span className="select-none text-[14px] text-black/35">
                        iMessage
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35"
                        aria-hidden="true"
                      >
                        <rect x="9" y="3" width="6" height="12" rx="3" />
                        <path d="M5 11a7 7 0 0 0 14 0" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                      </svg>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center bg-white pb-1.5 pt-1">
                    <div className="h-[3px] w-24 rounded-full bg-black/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
