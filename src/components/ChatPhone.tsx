import { AnimatePresence, motion } from "motion/react";

export interface ChatMessage {
  sender: "casey" | "brielle" | "jaba";
  name: string;
  text: string;
  /** iMessage tapback shown on the bubble; fromMe renders it blue. */
  reaction?: { emoji: string; fromMe?: boolean };
}

export const messages: ChatMessage[] = [
  { sender: "casey", name: "Casey", text: "B, did you get the Chipotle reel done?" },
  { sender: "brielle", name: "Brielle", text: "ugh i forgot" },
  {
    sender: "jaba",
    name: "JABA",
    text: "It's due Friday at 9am. I resent you the brief and asked Chipotle for an extra day.",
  },
  {
    sender: "jaba",
    name: "JABA",
    text: "They approved it. New deadline is Monday, I'll remind you Sunday.",
    reaction: { emoji: "👍", fromMe: true },
  },
  { sender: "casey", name: "Casey", text: "you're the best", reaction: { emoji: "❤️" } },
];

/**
 * The NIL Team phone. Shared by the thread section and by PhoneHandoff, so the
 * phone that flies out of JABA's hand is literally the same phone it lands as.
 *
 * Sizing comes from the parent (`className` width), so the flight can render it
 * at a fixed design width and scale it.
 */
export default function ChatPhone({
  visibleCount,
  readShown,
  className = "",
  phoneRef,
  ...rest
}: {
  visibleCount: number;
  readShown?: boolean;
  className?: string;
  phoneRef?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div ref={phoneRef} className={`relative ${className}`} {...rest}>
      {/* Side buttons — mute, volume up/down (left), power (right) */}
      <span aria-hidden className="absolute -left-[3px] top-[15%] h-6 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -left-[3px] top-[22.5%] h-11 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -left-[3px] top-[31.5%] h-11 w-[3px] rounded-l-md" style={{ background: "linear-gradient(90deg,#4a4d53,#232528)" }} />
      <span aria-hidden className="absolute -right-[3px] top-[25%] h-16 w-[3px] rounded-r-md" style={{ background: "linear-gradient(90deg,#232528,#4a4d53)" }} />

      {/* Stainless frame */}
      <div
        className="rounded-[60px] p-[4px]"
        style={{
          background: "linear-gradient(145deg,#5c5f65 0%,#2b2d31 22%,#111214 52%,#3e4146 86%,#5a5d63 100%)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.45), 0 6px 18px rgba(0,0,0,0.35)",
        }}
      >
        {/* Black bezel */}
        <div className="rounded-[56px] bg-[#050506] p-[9px]">
          {/* Screen */}
          <div className="relative w-full overflow-hidden rounded-[46px] bg-[#fbfbfc]" style={{ aspectRatio: "9 / 18.6" }}>
            <div className="absolute inset-0 flex flex-col">
              {/* Status bar */}
              <div className="bg-[#fbfbfc]">
                <div className="flex items-center justify-between px-8 pt-4 text-[15px] font-semibold text-black">
                  <span className="pl-1">2:14</span>
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

                {/* iOS 17 conversation header */}
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
                  <span className="flex -space-x-2.5">
                    <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-to-b from-[#a8aeb8] to-[#8e95a1] text-[21px] font-medium text-white ring-2 ring-[#fbfbfc]">
                      B
                    </span>
                    <img src="/jaba-face.png" alt="" aria-hidden className="h-[52px] w-[52px] rounded-full object-cover ring-2 ring-[#fbfbfc]" />
                  </span>
                  <span className="-mt-2 rounded-full bg-white px-2.5 py-[3px] text-[14px] font-semibold text-black shadow-[0_1px_6px_rgba(0,0,0,0.14)]">
                    3 People <span className="text-black/35">&rsaquo;</span>
                  </span>
                  <span className="mt-1.5 text-center text-[11px] leading-[1.35] text-black/40">
                    iMessage
                    <br />
                    Today 2:14 PM
                  </span>
                </div>
              </div>

              {/* Thread — stacks from the bottom, like a real open chat */}
              <div
                className="flex flex-1 flex-col justify-end overflow-hidden px-3.5 pb-1 text-[15.5px]"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
              >
                <AnimatePresence initial={false}>
                  {messages.slice(0, visibleCount).map((m, i, arr) => {
                    // Casey is the admin viewing this thread: their messages
                    // are "me" (blue, right, no sender label).
                    const isMe = m.sender === "casey";
                    const firstOfGroup = i === 0 || arr[i - 1].sender !== m.sender;
                    // Tail + avatar only on the last bubble of a run.
                    const lastOfGroup = i === arr.length - 1 || arr[i + 1].sender !== m.sender;
                    const tail = lastOfGroup ? (isMe ? " imsg-tail-r" : " imsg-tail-l") : "";

                    return (
                      <motion.div
                        key={i}
                        layout
                        initial={{ opacity: 0, y: 12, scale: 0.86 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 380, damping: 27 }}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                        style={{ transformOrigin: isMe ? "bottom right" : "bottom left" }}
                      >
                        {firstOfGroup && !isMe ? (
                          <span className="pb-0.5 pl-[42px] pt-2.5 text-[12px] text-black/45">{m.name}</span>
                        ) : null}
                        <div
                          className={`flex w-full items-end gap-2 ${isMe ? "justify-end pt-2.5" : ""} ${
                            m.reaction ? "mt-3" : ""
                          }`}
                        >
                          {!isMe ? (
                            lastOfGroup ? (
                              m.sender === "jaba" ? (
                                <img src="/jaba-face.png" alt="" aria-hidden className="relative z-[1] h-[34px] w-[34px] shrink-0 rounded-full object-cover" />
                              ) : (
                                <span className="relative z-[1] grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#a8a8ad] to-[#8e8e93] text-[13px] font-medium text-white">
                                  {m.name[0]}
                                </span>
                              )
                            ) : (
                              <span aria-hidden className="h-[34px] w-[34px] shrink-0" />
                            )
                          ) : null}
                          <div className={`imsg ${isMe ? "imsg-sent" : "imsg-recv"}${tail} relative`}>
                            {m.reaction ? (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.9 }}
                                className={`absolute -top-4 z-10 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-[#fbfbfc] px-1.5 text-[12px] shadow-sm ${
                                  isMe ? "-left-3" : "-right-3"
                                } ${m.reaction.fromMe ? "bg-[#3b9bf7]" : "bg-[#e9e9eb]"}`}
                              >
                                {m.reaction.emoji}
                              </motion.span>
                            ) : null}
                            {m.text}
                          </div>
                        </div>
                        {isMe && i === messages.length - 1 && readShown ? (
                          <motion.p
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="mt-1 pr-1 text-right text-[11px] text-black/40"
                          >
                            <span className="font-semibold">Read</span> 2:15 PM
                          </motion.p>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Input bar */}
              <div className="bg-[#fbfbfc] px-3 pb-2.5 pt-2">
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
                <div className="mx-auto mt-2.5 h-1 w-[36%] rounded-full bg-black/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
