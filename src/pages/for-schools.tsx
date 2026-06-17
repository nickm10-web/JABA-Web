import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Heart, MessageCircle, Zap } from "lucide-react";

import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { FadeUp } from "@/components/audience/fade-up";
import { WorldBackdrop } from "@/components/audience/world-backdrop";
import { GlassStatTile } from "@/components/audience/glass-stat-tile";
import { pressReleases } from "@/data/press-releases";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";

const lifecycleSteps = [
  { label: "Upload", sub: "Contracts" },
  { label: "Extract", sub: "Deal Details" },
  { label: "Assign", sub: "Athletes" },
  { label: "Automate", sub: "Reminders" },
  { label: "Track", sub: "Deliverables" },
  { label: "Report", sub: "To Leadership" },
];

// Fictional athletes + stock avatars only. No real roster names or photos.
const feed = [
  { name: "Maya Ellison", sport: "Track & Field", img: 32, likes: "4.2K", comments: "188" },
  { name: "Devin Cross", sport: "Basketball", img: 12, likes: "9.7K", comments: "402" },
  { name: "Tyrell Banks", sport: "Football", img: 15, likes: "12.1K", comments: "631" },
  { name: "Sofia Marin", sport: "Soccer", img: 45, likes: "6.8K", comments: "274" },
  { name: "Jordan Pace", sport: "Volleyball", img: 5, likes: "3.5K", comments: "121" },
];

const leaderboard = [
  { name: "Tyrell Banks", pct: 97 },
  { name: "Devin Cross", pct: 88 },
  { name: "Sofia Marin", pct: 74 },
  { name: "Maya Ellison", pct: 61 },
  { name: "Jordan Pace", pct: 53 },
];

const brands = [
  { name: "Apex Hydration", category: "Beverage", fit: "Track, Soccer" },
  { name: "Northwind Apparel", category: "Apparel", fit: "Basketball" },
  { name: "Cedar & Co.", category: "Lifestyle", fit: "Volleyball" },
  { name: "Voltic Energy", category: "Energy", fit: "Football" },
];

/* ── Signature: glass dashboard floating over a JABA world ── */
function GlassDashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Three parallax depths; flattened under reduced motion.
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, -20]);

  return (
    <WorldBackdrop type="video" src="/videos/Video%20BG%20Web_02.mp4">
      <div className={`${WRAP} py-20 md:py-28`}>
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.05] text-white md:text-5xl lg:text-6xl">
            Your whole program,{" "}
            <span className="italic" style={{ color: LIME }}>
              one glass pane.
            </span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Every athlete, post, and dollar of engagement, live. This is a
            glimpse of what your department sees inside JABA.
          </p>
        </FadeUp>

        <div ref={ref} className="relative mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
          {/* Performance tiles */}
          <motion.div style={{ y: yMid }} className="md:col-span-7">
            <FadeUp className="grid grid-cols-1 gap-3 sm:grid-cols-3" delay={0.05}>
              <GlassStatTile label="Posts This Month" value={564} delta="8.1%" deltaDir="up" />
              <GlassStatTile label="Total Engagement" value={62.5} suffix="K" decimals={1} />
              <GlassStatTile label="Avg Engagement Rate" value={24.3} suffix="%" decimals={1} delta="0.5%" deltaDir="up" />
            </FadeUp>
          </motion.div>

          {/* Leaderboard */}
          <motion.div style={{ y: yFront }} className="md:col-span-5">
            <FadeUp delay={0.15}>
              <LiquidGlassCard borderRadius="18px" className="h-full">
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
                      Top 5 · Engagement
                    </p>
                    <span
                      className="h-[6px] w-[6px] rounded-full"
                      style={{ background: LIME }}
                    />
                  </div>
                  <ul className="mt-4 space-y-3">
                    {leaderboard.map((a, i) => (
                      <li key={a.name} className="flex items-center gap-3">
                        <span
                          className="w-4 font-sans text-xs font-semibold text-white/40"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {i + 1}
                        </span>
                        <span className="flex-1 font-sans text-sm text-white/85">
                          {a.name}
                        </span>
                        <span className="h-1 w-20 overflow-hidden rounded-full bg-white/12">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${a.pct}%`, background: LIME }}
                          />
                        </span>
                        <span
                          className="w-9 text-right font-sans text-xs text-white/55"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {a.pct}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </LiquidGlassCard>
            </FadeUp>
          </motion.div>

          {/* Athlete content feed */}
          <motion.div style={{ y: yBack }} className="md:col-span-12">
            <FadeUp delay={0.2}>
              <LiquidGlassCard borderRadius="18px">
                <div className="px-5 py-4">
                  <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
                    Athlete Content · Live
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {feed.map((a) => (
                      <div
                        key={a.name}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={`https://i.pravatar.cc/96?img=${a.img}`}
                            alt=""
                            aria-hidden
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-sans text-[13px] font-medium text-white">
                              {a.name}
                            </p>
                            <p className="font-sans text-[11px] text-white/45">
                              {a.sport}
                            </p>
                          </div>
                        </div>
                        <div
                          className="mt-3 flex items-center gap-3 font-sans text-[11px] text-white/55"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" /> {a.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" /> {a.comments}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>
            </FadeUp>
          </motion.div>
        </div>
      </div>
    </WorldBackdrop>
  );
}

/* ── Brand matching beat ── */
function BrandMatching() {
  return (
    <WorldBackdrop src="/header%20BG-%20V4-WithoutBalls_less.jpg">
      <div className={`${WRAP} py-20 md:py-28`}>
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.05] text-white md:text-5xl">
            JABA reads your roster and finds the{" "}
            <span className="italic" style={{ color: LIME }}>
              brands that fit.
            </span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Auto-matched by sport, audience, and engagement, so your team
            spends time closing, not prospecting.
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b, i) => (
            <FadeUp key={b.name} delay={i * 0.08}>
              <LiquidGlassCard borderRadius="18px" className="h-full">
                <div className="flex h-full flex-col px-5 py-5">
                  <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {b.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-white">
                    {b.name}
                  </h3>
                  <p className="mt-2 font-sans text-[13px] text-white/55">
                    Fits: {b.fit}
                  </p>
                  <div className="mt-5 flex-1" />
                  <VoltButton size="sm" className="self-start" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Pitch
                  </VoltButton>
                </div>
              </LiquidGlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </WorldBackdrop>
  );
}

/* ── Athlete assistant beat: stylized glass phone thread ── */
function AssistantThread() {
  const thread = [
    { from: "jaba", text: "Hey Maya, your Apex Hydration post goes live tomorrow at 5pm. Want the caption and assets?" },
    { from: "me", text: "yes pls 🙏" },
    { from: "jaba", text: "Sent. Tag @apexhydration and drop the code in your story. I'll remind you an hour before." },
  ];
  return (
    <section className="bg-black py-16 md:py-20">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16`}>
        <FadeUp>
          <h2 className="font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Your athletes already live{" "}
            <span className="italic" style={{ color: LIME }}>
              in their texts.
            </span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/60 md:text-lg">
            JABA texts every athlete directly with reminders, content ideas,
            and deadlines. No app to download, no portal to log into. That is
            why response rates run five to ten times higher.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="flex justify-center md:justify-end">
          <LiquidGlassCard borderRadius="36px" blurIntensity="lg" className="w-[300px] p-3">
            <div className="rounded-[28px] bg-black/40 p-4">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <img src="/jaba-face.png" alt="" aria-hidden className="h-8 w-8 rounded-full" />
                <div>
                  <p className="font-sans text-sm font-semibold text-white">JABA</p>
                  <p className="font-sans text-[11px] text-white/45">iMessage</p>
                </div>
              </div>
              <div className="space-y-2">
                {thread.map((m, i) => {
                  const me = m.from === "me";
                  return (
                    <div key={i} className={`flex ${me ? "justify-end" : "justify-start"}`}>
                      <p
                        className={`max-w-[78%] rounded-2xl px-3.5 py-2 font-sans text-[13px] leading-snug ${
                          me
                            ? "rounded-br-md bg-[#007aff] text-white"
                            : "rounded-bl-md bg-[#e9e9eb] text-black"
                        }`}
                      >
                        {m.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </LiquidGlassCard>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Proof: partner announcement marquee ── */
function Proof() {
  const strip = [...pressReleases, ...pressReleases].filter((r) => r.graphic);
  return (
    <section className="bg-black py-16 md:py-20">
      <div className={WRAP}>
        <FadeUp>
          <p className="font-sans text-[13px] uppercase tracking-[0.16em] text-white/45">
            Trusted across college and pro
          </p>
        </FadeUp>
      </div>
      <div className="press-marquee relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-32" />
        <div className="press-marquee-track flex w-max gap-5">
          {strip.map((r, i) => (
            <a
              key={`${r.id}-${i}`}
              href="#/press"
              aria-label={`${r.partner} announcement`}
              className="group relative block h-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-[280px]"
            >
              <img
                src={r.graphic}
                alt={`JABA partners with ${r.partner}`}
                className="h-full w-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80">
                  {r.partner}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ForSchoolsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="audience-page-hero">
        <div className="audience-page-hero-inner">
          <span className="audience-page-chip">For Schools &amp; Athletic Departments</span>
          <h1 className="audience-page-h1">
            NIL is evolving faster{" "}
            <span className="audience-page-h1-accent">than the systems built to support it.</span>
          </h1>
          <p className="audience-page-subtitle">
            Third-party NIL unlocks opportunity and thousands of deliverables
            to manage. JABA gives your department the operating layer to handle it all.
          </p>
          <div className="audience-page-hero-cta">
            <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
          </div>
        </div>
      </section>

      {/* Lifecycle word marquee */}
      <section className="lifecycle-marquee-section">
        <div className="lifecycle-marquee-track">
          {[...lifecycleSteps, ...lifecycleSteps, ...lifecycleSteps].map((step, i) => (
            <div key={i} className="lifecycle-marquee-item">
              <span className="lifecycle-marquee-label">{step.label}</span>
              <span className="lifecycle-marquee-sub">{step.sub}</span>
              {i < lifecycleSteps.length * 3 - 1 && (
                <ArrowRight className="lifecycle-marquee-arrow" />
              )}
            </div>
          ))}
        </div>
      </section>

      <GlassDashboard />
      <BrandMatching />
      <AssistantThread />
      <Proof />

      {/* CTA */}
      <section className="audience-page-cta">
        <div className="audience-page-cta-inner">
          <h2 className="audience-page-cta-h2">
            Ready to stop <span className="cta-headline-accent">chasing?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how JABA helps athletic departments manage NIL at scale, without the fire drills.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
