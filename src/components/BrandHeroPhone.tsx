import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import IPhoneFrame from "@/components/ui/iphone-frame";

/**
 * The brands hero's phone. Same handset as the homepage, different thread:
 * there the coach is chasing a deliverable, here a brand runs a campaign, so
 * the conversation walks the page's own three promises in order (find the
 * athletes, run the work, prove what it did).
 *
 * One-to-one rather than a group chat, because the visitor is meant to read
 * the blue bubbles as theirs. iMessage drops sender names and avatars in a
 * one-to-one thread, so this does too.
 *
 * The campaign is invented and the numbers in it are scenario, not results:
 * nothing here reports anything JABA has done for a real brand.
 */

/* pause → ask → typing → reply → typing → reply → "lock them" → typing →
   confirm → "how'd it do" → typing → report (hold), then it loops. */
const STEP_MS = [600, 1800, 1300, 2100, 1200, 2000, 1400, 1300, 2000, 1500, 1300, 4200];

function TypingBubble() {
  return (
    <motion.div {...POP} className="relative" style={{ transformOrigin: "bottom left" }}>
      <div className="flex w-fit items-center gap-[6px] rounded-[19px] bg-[#e9e9eb] px-[15px] py-[13px]">
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" />
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" style={{ animationDelay: "0.22s" }} />
        <span className="typing-dot h-[9px] w-[9px] shrink-0 rounded-full" style={{ animationDelay: "0.44s" }} />
      </div>
      <span className="absolute -left-[3px] bottom-[1px] h-[9px] w-[9px] rounded-full bg-[#e9e9eb]" />
      <span className="absolute -left-[9px] -bottom-[5px] h-[5px] w-[5px] rounded-full bg-[#e9e9eb]" />
    </motion.div>
  );
}

const POP = {
  initial: { opacity: 0, y: 12, scale: 0.86 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 27 } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.16 } },
} as const;

function Sent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...POP} className="flex justify-end pt-2.5">
      <div className="imsg imsg-sent imsg-tail-r" style={{ transformOrigin: "bottom right" }}>
        {children}
      </div>
    </motion.div>
  );
}

function Recv({ tail = true, children }: { tail?: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      {...POP}
      className={`imsg imsg-recv${tail ? " imsg-tail-l" : ""} mt-[3px]`}
      style={{ transformOrigin: "bottom left" }}
    >
      {children}
    </motion.div>
  );
}

export default function BrandHeroPhone() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % STEP_MS.length), STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <IPhoneFrame
      avatar={<img src="/jaba-face.png" alt="" className="h-full w-full rounded-full object-cover" />}
      title="JABA"
      subtitle={
        <>
          iMessage
          <br />
          Today 9:12 AM
        </>
      }
    >
      <AnimatePresence>
        {step >= 1 && (
          <Sent key="ask">We&rsquo;re launching the new flavor in March. Who should we work with?</Sent>
        )}

        {step >= 2 && (
          <motion.div key="find" {...POP} className="flex flex-col items-start pt-2.5">
            {step === 2 && <TypingBubble key="t1" />}
            {step >= 3 && (
              <Recv key="r1" tail={step === 3}>
                Read 1.5M athlete posts. 42 fit your buyer, not just your follower count.
              </Recv>
            )}
            {step === 4 && <TypingBubble key="t2" />}
            {step >= 5 && (
              <Recv key="r2">
                &#128269; Six already post about drinks like yours, unpaid. Shortlist is in your inbox.
              </Recv>
            )}
          </motion.div>
        )}

        {step >= 6 && <Sent key="lock">lock the top 8</Sent>}

        {step >= 7 && (
          <motion.div key="run" {...POP} className="flex flex-col items-start pt-2.5">
            {step === 7 ? (
              <TypingBubble />
            ) : (
              <Recv>
                &#9989; Offers out. I&rsquo;ll run the briefs, deadlines and approvals from here.
              </Recv>
            )}
          </motion.div>
        )}

        {step >= 9 && <Sent key="howd">how&rsquo;d it do?</Sent>}

        {step >= 10 && (
          <motion.div key="prove" {...POP} className="flex flex-col items-start pt-2.5">
            {step === 10 ? (
              <TypingBubble />
            ) : (
              <Recv>
                &#128202; 11 posts live, all on time. Report sent: reach, engagement and cost per post.
              </Recv>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </IPhoneFrame>
  );
}
