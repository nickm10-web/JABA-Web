import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import ChatPhone, { type ChatMessage } from "@/components/ChatPhone";
import PartnerOrbit from "@/components/brands/PartnerOrbit";
import { VoltButton } from "@/components/ui/volt-button";

/**
 * The click-through demo, as a three-act walkthrough with the visitor's brand
 * in it, played like a game: a HUD across the top fills as each act runs, and
 * any act can be jumped to.
 *
 *   1. Your brand goes into the workflows of the universities and agencies on
 *      JABA: each partner lights up as the brand connects to it.
 *   2. JABA finds the fit: the scan runs over real posts, the four things JABA
 *      matches on light up, and an athlete locks in.
 *   3. The AI runs it in the group chat.
 *
 * The three headlines are Jordon's, cleaned of typos. The criteria are the
 * Texas A&M deck's ("personality, interests, content, and audience"), and the
 * chat is the film's own thread, ending on JABA's answer so it fits the phone. The matched athlete stays locked and blurred:
 * no real athlete is shown against a brand they haven't agreed to.
 *
 * Driven by a timer, not animation frames, so it keeps playing in a tab the
 * browser has backgrounded.
 */

const CRITERIA = ["Personality", "Interests", "Content", "Audience"];
const SCAN_TILES = ["p72", "p15", "p71", "p60", "p08", "p42", "p74", "p49"];

const THREAD: ChatMessage[] = [
  {
    sender: "jaba",
    name: "JABA",
    text: "⚠️ Her story went up without the paid partnership tag. I’ve texted her to add it.",
  },
  { sender: "casey", name: "You", text: "how long was it up" },
  {
    sender: "jaba",
    name: "JABA",
    text: "Thirty-nine minutes. The tag is on now, and I logged it against the deliverable.",
    reaction: { emoji: "\u{1F44D}", fromMe: true },
  },
];

const ACTS = [
  { hud: "Your brand", title: "Put your brand into the workflows of the biggest universities and agencies.", ticks: 17 },
  { hud: "The fit", title: "Let JABA find the perfect fit for your brand.", ticks: 16 },
  { hud: "The group chat", title: "Then let our AI manage it in our group chat for you.", ticks: 18 },
];
const TICK_MS = 420;

export default function BrandWalkthrough({
  brand: initialBrand,
  onFinish,
  generic = false,
  startAct = 0,
  tone = "dark",
}: {
  brand?: string;
  onFinish: () => void;
  /** On the landing page there is no brand yet: it plays for "your brand",
   *  and only once it is on screen, so nobody scrolls in to a finished run. */
  generic?: boolean;
  /** The landing page's hero already plays act one, so the walkthrough there
   *  opens on act two with the first act shown as done. */
  startAct?: number;
  /** "light" on the landing page, which runs light like the footer it ends
   *  on; the click-through demo page stays dark. */
  tone?: "light" | "dark";
}) {
  const light = tone === "light";
  const root = useRef<HTMLDivElement>(null);
  const seen = useInView(root, { once: true, amount: 0.35 });
  const [brand, setBrand] = useState(generic ? "Your brand" : (initialBrand?.trim() ?? ""));
  const [draft, setDraft] = useState("");
  const [act, setAct] = useState(startAct);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const playing = Boolean(brand) && !done && (!generic || seen);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setStep((s) => s + 1), TICK_MS);
    return () => clearInterval(t);
  }, [playing, act]);

  // Advance to the next act when this one has run its length.
  useEffect(() => {
    if (step < ACTS[act].ticks) return;
    if (act < ACTS.length - 1) {
      setAct(act + 1);
      setStep(0);
    } else {
      setDone(true);
    }
  }, [step, act]);

  const jump = (i: number) => {
    setAct(i);
    setStep(0);
    setDone(false);
  };

  if (!brand) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) setBrand(draft.trim().slice(0, 60));
        }}
        className="mx-auto max-w-xl px-6 py-24 text-center"
      >
        <h2 className="font-deck text-3xl leading-[1.08] text-white md:text-4xl">See it with your brand.</h2>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-[15px] text-white outline-none placeholder:text-white/40 focus:border-white/40 sm:flex-1"
            placeholder="Enter your brand"
            aria-label="Enter your brand"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            required
          />
          <VoltButton type="submit">Start</VoltButton>
        </div>
      </form>
    );
  }

  const progress = done && act === ACTS.length - 1 ? 1 : Math.min(step / ACTS[act].ticks, 1);

  return (
    <div ref={root} className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
      {/* HUD. The active act's track fills as it plays; finished acts stay full. */}
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {ACTS.map((a, i) => (
          <button
            key={a.hud}
            type="button"
            onClick={() => jump(i)}
            className="group text-left"
            aria-current={i === act ? "step" : undefined}
          >
            <div className={`h-[3px] overflow-hidden rounded-full ${light ? "bg-black/10" : "bg-white/10"}`}>
              <div
                className={`h-full rounded-full ${light ? "bg-[#0a0a0a]" : "bg-[#dfff00]"}`}
                style={{
                  width: `${i < act ? 100 : i === act ? progress * 100 : 0}%`,
                  transition: `width ${TICK_MS}ms linear`,
                  opacity: i === act ? 1 : 0.45,
                }}
              />
            </div>
            <p
              className={`mt-3 font-sans text-[13px] transition-colors md:text-[15px] ${
                i === act
                  ? light ? "text-[#0a0a0a]" : "text-white"
                  : light ? "text-black/35 group-hover:text-black/60" : "text-white/35 group-hover:text-white/60"
              }`}
            >
              <span className="mr-2 tabular-nums">{i + 1}</span>
              {a.hud}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Each act's headline in one fixed slot, so changing act never reflows. */}
        <div className="relative min-h-[8.5rem] md:min-h-[11rem]">
          {ACTS.map((a, i) => (
            <h2
              key={a.title}
              aria-hidden={i !== act}
              className={`absolute inset-x-0 top-0 font-deck text-3xl leading-[1.08] transition-all duration-500 md:text-5xl ${light ? "text-[#0a0a0a]" : "text-white"}`}
              style={{ opacity: i === act ? 1 : 0, transform: `translateY(${i === act ? 0 : i < act ? -14 : 14}px)` }}
            >
              {a.title}
            </h2>
          ))}
          <p
            className={`absolute inset-x-0 top-full mt-2 font-sans text-[15px] transition-opacity duration-500 md:text-[17px] ${light ? "text-black/55" : "text-white/50"}`}
            style={{ opacity: act === 1 ? 1 : 0 }}
          >
            Based on each athlete&rsquo;s personality, interests, content and audience.
          </p>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-[34rem]">
          <ActInto brand={brand} light={light} on={act === 0} step={act === 0 ? step : ACTS[0].ticks} />
          <ActFit brand={generic ? "your brand" : brand} light={light} on={act === 1} step={act === 1 ? step : 0} />
          <ActChat on={act === 2} step={act === 2 ? (done ? ACTS[2].ticks : step) : 0} />
        </div>
      </div>

      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-4 transition-opacity duration-500 md:mt-14"
        style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
      >
        <VoltButton size="lg" onClick={onFinish}>
          Send me my athletes
        </VoltButton>
        <button
          type="button"
          onClick={() => jump(startAct)}
          className={`font-sans text-[14px] transition-colors ${light ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"}`}
        >
          Watch it again
        </button>
      </div>
    </div>
  );
}

/* ── Act 1: the brand connects into every partner on JABA. ───────────────── */
function ActInto({ brand, light, on, step }: { brand: string; light: boolean; on: boolean; step: number }) {
  return (
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0 }}
      aria-hidden={!on}
    >
      <PartnerOrbit brand={brand} light={light} linked={Math.max(0, step - 1)} highlight={step - 2} showBrand={step >= 1} />
    </div>
  );
}

/* ── Act 2: JABA scans, the criteria land, an athlete locks in. ──────────── */
function ActFit({ brand, light, on, step }: { brand: string; light: boolean; on: boolean; step: number }) {
  const scanning = step < 11;
  const lit = (i: number) => step >= [3, 5, 7, 9][i];
  const found = step >= 11;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0 }}
      aria-hidden={!on}
    >
      <div className="flex items-center gap-4">
        <img src="/meet/data.webp" alt="" aria-hidden className="h-16 w-auto md:h-24" />
        <div className="flex flex-wrap gap-2">
          {CRITERIA.map((c, i) => (
            <span
              key={c}
              className="rounded-full border px-3 py-1.5 font-sans text-[12.5px] transition-all duration-300 md:text-[14px]"
              style={{
                borderColor: light
                  ? lit(i) ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.15)"
                  : lit(i) ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
                color: light
                  ? lit(i) ? "#0a0a0a" : "rgba(0,0,0,0.35)"
                  : lit(i) ? "#fff" : "rgba(255,255,255,0.35)",
                background: lit(i) ? (light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)") : "transparent",
              }}
            >
              {lit(i) ? "✓ " : ""}
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-4 gap-2">
        {SCAN_TILES.map((t, i) => {
          const hot = scanning && step % SCAN_TILES.length === i;
          return (
            <div key={t} className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-[#111]">
              <img
                src={`/wall/${t}.webp`}
                alt=""
                aria-hidden
                className="h-full w-full object-cover transition-opacity duration-300"
                style={{ opacity: found ? 0.18 : hot ? 1 : 0.45 }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-[10px] border-2 transition-opacity duration-200"
                style={{ borderColor: "#dfff00", opacity: hot ? 1 : 0 }}
              />
            </div>
          );
        })}

        {/* The match, locked: the athlete stays blurred until they agree. */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{ opacity: found ? 1 : 0, transform: `scale(${found ? 1 : 0.94})` }}
        >
          <div className="w-[72%] overflow-hidden rounded-[16px] border border-white/15 bg-[#121215] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="relative h-24 overflow-hidden md:h-28">
              <img
                src="/wall/p21.webp"
                alt=""
                aria-hidden
                className="h-full w-full scale-110 object-cover"
                style={{ filter: "blur(14px)" }}
              />
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                  <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
                  <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <p className="truncate font-sans text-[15px] font-semibold text-white md:text-[16px]">
                The perfect fit for {brand}
              </p>
              <p className="mt-1 font-sans text-[12.5px] text-white/45">Example match. Name locked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Act 3: the AI runs it in the group chat. ────────────────────────────── */
function ActChat({ on, step }: { on: boolean; step: number }) {
  const visible = step < 1 ? 0 : Math.min(THREAD.length, Math.floor((step - 1) / 3) + 1);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0 }}
      aria-hidden={!on}
    >
      <ChatPhone
        visibleCount={visible}
        readShown={step >= 14}
        messages={THREAD}
        className="w-[230px] md:w-[296px]"
      />
    </div>
  );
}
