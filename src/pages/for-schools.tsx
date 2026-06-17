import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Eye,
  FileText,
  Heart,
  ListChecks,
  MessageCircle,
  Radar,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { FadeUp } from "@/components/audience/fade-up";
import { WorldBackdrop } from "@/components/audience/world-backdrop";
import { GlassStatTile } from "@/components/audience/glass-stat-tile";
import {
  GlassPanel,
  PillarSection,
  ScrimCluster,
  StatusChip,
} from "@/components/audience/glass-mockups";
import { pressReleases } from "@/data/press-releases";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";
const CLOUDS = "/videos/Video%20BG%20Web_02.mp4";
const WORLD_IMG = "/header%20BG-%20V4-WithoutBalls_less.jpg";

/* The six product steps, shown as a connected horizontal strip. */
const pillarSteps = [
  { verb: "Discover", label: "brand opportunities", Icon: Search },
  { verb: "Analyze", label: "athlete content", Icon: BarChart3 },
  { verb: "Measure", label: "school IP performance", Icon: Eye },
  { verb: "Track", label: "campaign deliverables", Icon: ListChecks },
  { verb: "Monitor", label: "sponsor activations", Icon: Radar },
  { verb: "Benchmark", label: "performance", Icon: TrendingUp },
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

const rosterRows = [
  { name: "Tyrell Banks", img: 15, followers: "184K", eng: "9.7%", likes: "12.1K", comments: "631", posts: "212", growth: "+8.4%", deals: "6" },
  { name: "Devin Cross", img: 12, followers: "142K", eng: "8.1%", likes: "9.7K", comments: "402", posts: "188", growth: "+5.2%", deals: "4" },
  { name: "Sofia Marin", img: 45, followers: "96K", eng: "7.4%", likes: "6.8K", comments: "274", posts: "164", growth: "+6.9%", deals: "3" },
  { name: "Maya Ellison", img: 32, followers: "71K", eng: "6.1%", likes: "4.2K", comments: "188", posts: "143", growth: "+4.1%", deals: "2" },
];

const posts = [
  { seed: "jb1", likes: "12.1K", comments: "631", views: "88K", tag: "TOP 5", tone: "lime" as const },
  { seed: "jb2", likes: "9.7K", comments: "402", views: "61K", tag: "VISIBLE", tone: "neutral" as const },
  { seed: "jb3", likes: "4.2K", comments: "188", views: "40K", tag: "SPONSORED", tone: "lime" as const },
  { seed: "jb4", likes: "6.8K", comments: "274", views: "52K", tag: "TOP 25", tone: "neutral" as const },
  { seed: "jb5", likes: "3.5K", comments: "121", views: "28K", tag: "ORGANIC", tone: "muted" as const },
  { seed: "jb6", likes: "15.4K", comments: "880", views: "120K", tag: "TOP 10", tone: "neutral" as const },
];

const contacts = [
  { name: "Rachel Doss", title: "VP, Marketing", company: "Apex Hydration" },
  { name: "Marcus Hill", title: "Brand Partnerships", company: "Northwind Apparel" },
  { name: "Elena Park", title: "Head of Influencer", company: "Voltic Energy" },
];

const brandsDB = [
  { name: "Apex Hydration", category: "Beverage", match: 94 },
  { name: "Northwind Apparel", category: "Apparel", match: 89 },
  { name: "Voltic Energy", category: "Energy", match: 82 },
  { name: "Cedar & Co.", category: "Lifestyle", match: 78 },
];

const reportTemplates = [
  "Campaign Report",
  "Athlete Report",
  "Brand Report",
  "Social Report",
  "Team Report",
];

/* ── Step strip (replaces the word marquee) ── */
function StepStrip() {
  return (
    <section className="border-y border-white/5 bg-[#dfff00]/[0.02] py-5">
      <div className={`${WRAP} flex items-center gap-3 overflow-x-auto md:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        {pillarSteps.map((s, i) => (
          <Fragment key={s.verb}>
            <div className="flex shrink-0 items-center gap-2.5">
              <s.Icon className="h-4 w-4" style={{ color: LIME }} />
              <span className="whitespace-nowrap font-sans text-[13px]">
                <span className="font-semibold text-white">{s.verb}</span>{" "}
                <span className="text-white/55">{s.label}</span>
              </span>
            </div>
            {i < pillarSteps.length - 1 ? (
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ── Pillar 1 visual: execution / compliance iMessage mockup ── */
function ExecutionMockup() {
  const chips = [
    "Deliverable Reminder Sent",
    "Collab Tag Verified",
    "Post Scheduled",
    "Payment Status Updated",
  ];
  const msgs = [
    "Heads up — your Apex Hydration post is due tomorrow at 5:00pm.",
    "Tag @apexhydration, add the #ad disclosure, and keep the code in your story.",
  ];
  // Chips live in the top/bottom margins, staggered so they never sit over
  // the message column. Solid dark glass so they read clearly.
  const floatPos = [
    "top-0 left-0",
    "top-10 right-0",
    "bottom-10 left-0",
    "bottom-0 right-0",
  ];
  return (
    <div className="relative mx-auto w-full max-w-[360px] px-1 md:py-20">
      {chips.map((c, i) => (
        <div
          key={c}
          className={`absolute z-20 hidden whitespace-nowrap rounded-full border border-[#dfff00]/30 bg-black/65 px-3 py-1.5 shadow-lg shadow-black/40 backdrop-blur-md md:block ${floatPos[i]}`}
        >
          <span className="flex items-center gap-1.5 font-sans text-[11px] font-medium text-white">
            <span style={{ color: LIME }}>✓</span> {c}
          </span>
        </div>
      ))}

      <GlassPanel borderRadius="32px" className="mx-auto max-w-[290px] p-3">
        <div className="rounded-[24px] bg-black/55 p-4">
          <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
            <img src="/jaba-face.png" alt="" aria-hidden className="h-8 w-8 rounded-full" />
            <div>
              <p className="font-sans text-sm font-semibold text-white">JABA</p>
              <p className="font-sans text-[11px] text-white/45">iMessage</p>
            </div>
          </div>
          <div className="space-y-2">
            {msgs.map((m) => (
              <div key={m} className="flex justify-start">
                <p className="max-w-[82%] rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black">
                  {m}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* Mobile fallback so the exact chip terms still show. */}
      <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
        {chips.map((c) => (
          <StatusChip key={c} tone="lime">
            {c}
          </StatusChip>
        ))}
      </div>
    </div>
  );
}

/* ── Pillar 2 (kept): glass dashboard floating over the clouds world ── */
function GlassDashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, -20]);
  const depth = { filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.4))" };

  return (
    <WorldBackdrop type="video" src={CLOUDS} parallax className="scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
        <FadeUp className="max-w-2xl">
          <ScrimCluster className="inline-block">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">
            Dashboard
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl lg:text-6xl">
            See your entire program{" "}
            <span className="italic" style={{ color: LIME }}>
              at a glance.
            </span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Every athlete, post, and deal in one view, updated live. A look at
            what your department sees inside JABA.
          </p>
          </ScrimCluster>
        </FadeUp>

        <div ref={ref} className="relative mt-12 md:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[44px] blur-2xl"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 45%, rgba(0,0,0,0.42), rgba(0,0,0,0.18) 70%, transparent 100%)",
            }}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <motion.div style={{ y: yMid, scale: 1, ...depth }} className="md:col-span-7">
              <FadeUp className="grid grid-cols-1 gap-3 sm:grid-cols-3" delay={0.05}>
                <GlassStatTile label="Posts This Month" value={564} delta="8.1%" deltaDir="up" spark={[12, 18, 15, 22, 19, 27, 31]} />
                <GlassStatTile label="Total Engagement" value={62.5} suffix="K" decimals={1} spark={[40, 44, 41, 48, 52, 58, 63]} />
                <GlassStatTile label="Avg Engagement Rate" value={24.3} suffix="%" decimals={1} delta="0.5%" deltaDir="up" spark={[20, 21, 23, 22, 24, 23, 24]} />
              </FadeUp>
            </motion.div>

            <motion.div style={{ y: yFront, ...depth }} className="md:col-span-5">
              <FadeUp delay={0.15}>
                <LiquidGlassCard
                  borderRadius="18px"
                  className="h-full"
                  style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" }}
                >
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
                        Top 5 · Engagement
                      </p>
                      <span className="h-[6px] w-[6px] rounded-full" style={{ background: LIME }} />
                    </div>
                    <ul className="mt-4 space-y-3">
                      {leaderboard.map((a, i) => (
                        <li key={a.name} className="flex items-center gap-3">
                          <span className="w-4 font-sans text-xs font-semibold text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {i + 1}
                          </span>
                          <span className="flex-1 font-sans text-sm text-white/85">{a.name}</span>
                          <span className="h-1 w-20 overflow-hidden rounded-full bg-white/12">
                            <span className="block h-full rounded-full" style={{ width: `${a.pct}%`, background: LIME }} />
                          </span>
                          <span className="w-9 text-right font-sans text-xs text-white/55" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {a.pct}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </LiquidGlassCard>
              </FadeUp>
            </motion.div>

            <motion.div style={{ y: yBack, scale: 0.985, ...depth }} className="md:col-span-12">
              <FadeUp delay={0.2}>
                <LiquidGlassCard
                  borderRadius="18px"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <div className="px-5 py-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
                      Athlete Content · Live
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {feed.map((a) => (
                        <div key={a.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <div className="flex items-center gap-2.5">
                            <img src={`https://i.pravatar.cc/96?img=${a.img}`} alt="" aria-hidden className="h-9 w-9 rounded-full object-cover" />
                            <div className="min-w-0">
                              <p className="truncate font-sans text-[13px] font-medium text-white">{a.name}</p>
                              <p className="font-sans text-[11px] text-white/45">{a.sport}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-3 font-sans text-[11px] text-white/55" style={{ fontVariantNumeric: "tabular-nums" }}>
                            <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {a.likes}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {a.comments}</span>
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
      </div>
    </WorldBackdrop>
  );
}

/* ── Pillar 3: athlete intelligence (trading card + roster table) ── */
function AthleteIntelligence() {
  const metrics = [
    { label: "Brand Fit Score", value: "88", bar: 88 },
    { label: "Audience Reach", value: "512K" },
    { label: "Engagement", value: "24.3%" },
    { label: "Content Style", value: "Lifestyle" },
    { label: "Alignment Score", value: "91", bar: 91 },
  ];
  return (
    <section className="scroll-mt-32 bg-black md:scroll-mt-40">
      <div className={`${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <FadeUp>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Athletes</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
              Know every athlete's{" "}
              <span className="italic" style={{ color: LIME }}>brand.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/65 md:text-lg">
              Understand each athlete's content, audience, and the partnerships
              they naturally fit.
            </p>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/45">
              Roster analytics rank Followers, Eng %, Avg Likes, Avg Comments,
              Posts, Growth, and Brand Deals, with a fair market value (FMV)
              view one toggle away.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <ScrimCluster className="mx-auto w-full max-w-sm">
              <GlassPanel className="p-5">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/96?img=32" alt="" aria-hidden className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-sans text-[15px] font-semibold text-white">Maya Ellison</p>
                    <p className="font-sans text-[12px] text-white/50">Track & Field</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-3xl font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>92</p>
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/45">Overall</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 font-sans text-[12px] text-white/55">{m.label}</span>
                      {m.bar ? (
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
                          <span className="block h-full rounded-full" style={{ width: `${m.bar}%`, background: LIME }} />
                        </span>
                      ) : (
                        <span className="flex-1" />
                      )}
                      <span className="w-16 text-right font-sans text-[13px] font-medium text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </ScrimCluster>
          </FadeUp>
        </div>

        {/* Roster analytics table */}
        <FadeUp delay={0.1} className="mt-10 md:mt-14">
          <GlassPanel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/55">Roster Analytics</p>
              <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-0.5">
                <span className="rounded-full px-3 py-1 font-sans text-[11px] font-semibold" style={{ background: LIME, color: "#000" }}>Engagement</span>
                <span className="rounded-full px-3 py-1 font-sans text-[11px] text-white/55">FMV</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="font-sans text-[11px] uppercase tracking-[0.1em] text-white/40">
                    <th className="px-5 py-3 text-left font-medium">Athlete</th>
                    {["Followers", "Eng %", "Avg Likes", "Avg Comments", "Posts", "Growth", "Brand Deals"].map((h) => (
                      <th key={h} className="px-4 py-3 text-right font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                  {rosterRows.map((r) => (
                    <tr key={r.name} className="border-t border-white/[0.06] font-sans text-[13px] text-white/75">
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2.5">
                          <img src={`https://i.pravatar.cc/64?img=${r.img}`} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover" />
                          <span className="font-medium text-white">{r.name}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">{r.followers}</td>
                      <td className="px-4 py-3 text-right">{r.eng}</td>
                      <td className="px-4 py-3 text-right">{r.likes}</td>
                      <td className="px-4 py-3 text-right">{r.comments}</td>
                      <td className="px-4 py-3 text-right">{r.posts}</td>
                      <td className="px-4 py-3 text-right" style={{ color: LIME }}>{r.growth}</td>
                      <td className="px-4 py-3 text-right">{r.deals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Pillar 4 visual: content grid ── */
function PostGrid() {
  return (
    <GlassPanel className="p-4">
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/55">Content Analysis</p>
        <StatusChip tone="lime">1M+ posts</StatusChip>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {posts.map((p) => (
          <div key={p.seed} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
            <div className="relative">
              <img src={`https://picsum.photos/seed/${p.seed}/240/180`} alt="" aria-hidden className="h-24 w-full object-cover" />
              <div className="absolute right-1.5 top-1.5">
                <StatusChip tone={p.tone}>{p.tag}</StatusChip>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2 font-sans text-[11px] text-white/55" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {p.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.comments}</span>
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

/* ── Pillar 5: brand matching + outreach (Match Studio flow) ── */
function MatchStudio() {
  return (
    <section className="scroll-mt-32 bg-black md:scroll-mt-40">
      <div className={`${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Brands</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            JABA reads your roster and finds the{" "}
            <span className="italic" style={{ color: LIME }}>brands that fit.</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Match your roster to brands, find the right person, and send
            outreach that sounds like you.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              "find verified brand and agency contacts",
              "see brand deal history and audience overlap",
              "generate outreach drafts in seconds",
              "auto-log activity and set follow-up reminders",
            ].map((b) => (
              <li key={b} className="flex gap-3 font-sans text-[14px] leading-relaxed text-white/70">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: LIME }} />
                {b}
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Three-step flow */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-2">
          {/* Contact Discovery */}
          <FadeUp delay={0.05} className="h-full">
            <GlassPanel className="h-full p-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">Contact Discovery</p>
              <ul className="mt-4 space-y-3">
                {contacts.map((c) => (
                  <li key={c.name} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-sans text-[12px] font-semibold text-white/70">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-sans text-[13px] font-medium text-white">{c.name}</p>
                      <p className="truncate font-sans text-[11px] text-white/45">{c.title} · {c.company}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </FadeUp>

          <div className="hidden items-center justify-center md:flex">
            <ArrowRight className="h-5 w-5 text-white/25" />
          </div>

          {/* Brand Deal Database */}
          <FadeUp delay={0.12} className="h-full">
            <GlassPanel className="h-full p-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">Brand Deal Database</p>
              <ul className="mt-4 space-y-2.5">
                {brandsDB.map((b) => (
                  <li key={b.name} className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                    <div>
                      <p className="font-sans text-[13px] font-medium text-white">{b.name}</p>
                      <p className="font-sans text-[11px] text-white/45">{b.category}</p>
                    </div>
                    <span className="font-sans text-[13px] font-semibold" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{b.match}%</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </FadeUp>

          <div className="hidden items-center justify-center md:flex">
            <ArrowRight className="h-5 w-5 text-white/25" />
          </div>

          {/* AI Outreach */}
          <FadeUp delay={0.19} className="h-full">
            <GlassPanel className="h-full p-5">
              <p className="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
                <Sparkles className="h-3.5 w-3.5" style={{ color: LIME }} /> AI Outreach
              </p>
              <p className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 font-sans text-[12.5px] leading-relaxed text-white/75">
                Hi Rachel — three of our athletes over-index with Apex's core
                18–24 audience. Open to a quick call on a fall activation?
              </p>
              <div className="mt-4 flex items-center gap-2">
                <VoltButton size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>Use Draft</VoltButton>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-sans text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
              </div>
            </GlassPanel>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Pillar 6 visual: report builder ── */
function ReportBuilder() {
  const roi = [42, 58, 51, 67, 74, 88];
  return (
    <GlassPanel className="p-5">
      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/55">Report Builder</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {reportTemplates.map((t, i) => (
          <div
            key={t}
            className="flex items-center gap-2 rounded-lg border px-3 py-2.5"
            style={
              i === 0
                ? { borderColor: "rgba(223,255,0,0.4)", background: "rgba(223,255,0,0.08)" }
                : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)" }
            }
          >
            <FileText className="h-3.5 w-3.5 shrink-0" style={{ color: i === 0 ? LIME : "rgba(255,255,255,0.4)" }} />
            <span className="font-sans text-[12px] font-medium text-white/80">{t}</span>
          </div>
        ))}
      </div>

      {/* IP Impact */}
      <div className="mt-5 rounded-xl border border-white/10 bg-black/45 p-4">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">IP Impact</p>
          <div className="flex gap-4 font-sans" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/40">EMV</span>
              <span className="text-base font-bold" style={{ color: LIME }}>$1.24M</span>
            </span>
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/40">ROI</span>
              <span className="text-base font-bold text-white">4.8x</span>
            </span>
          </div>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2">
          {roi.map((v, i) => {
            const accent = i === roi.length - 1;
            const fill = accent
              ? LIME
              : i % 2 === 0
                ? "rgba(255,255,255,0.22)"
                : "rgba(223,255,0,0.7)";
            return (
              <span key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, background: fill }} />
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}

/* ── Athlete texting (kept) ── */
function AssistantThread() {
  const thread = [
    { from: "jaba", text: "Hey Maya, your Apex Hydration post goes live tomorrow at 5pm. Want the caption and assets?" },
    { from: "me", text: "yes pls 🙏" },
    { from: "jaba", text: "Sent. Tag @apexhydration and drop the code in your story. I'll remind you an hour before." },
  ];
  return (
    <section className="scroll-mt-32 bg-black pb-16 pt-28 md:scroll-mt-40 md:pb-20 md:pt-36">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16`}>
        <FadeUp>
          <h2 className="font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Athletes respond to texts,{" "}
            <span className="italic" style={{ color: LIME }}>not portals.</span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/60 md:text-lg">
            JABA texts athletes directly, reminders, content ideas, deadlines.
            Nothing to download, no portal to log into. Response rates run
            5–10x higher than email.
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
                          me ? "rounded-br-md bg-[#007aff] text-white" : "rounded-bl-md bg-[#e9e9eb] text-black"
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

/* ── Proof: partner announcement marquee (kept) ── */
function Proof() {
  const strip = [...pressReleases, ...pressReleases].filter((r) => r.graphic);
  return (
    <section className="scroll-mt-32 bg-black pb-16 pt-24 md:scroll-mt-40 md:pb-20 md:pt-28">
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
              <img src={r.graphic} alt={`JABA partners with ${r.partner}`} className="h-full w-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80">{r.partner}</p>
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
      <section className="audience-page-hero" style={{ paddingTop: 0 }}>
        <div className="audience-page-hero-inner pt-32 md:pt-40">
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

      {/* Pillar step strip */}
      <StepStrip />

      {/* Pillar 1 — Execution layer */}
      <PillarSection
        eyebrow="Workflow"
        headline={<>Every deliverable, <span className="italic" style={{ color: LIME }}>handled.</span></>}
        body="JABA manages every deliverable and sends reminders before anything slips."
        bullets={[
          "posting time",
          "incorrect caption or missed collab tag",
          "improper use of IP",
          "athlete breaking exclusivity",
          "missed deadlines or missing assets",
          "payment status and posting windows",
        ]}
      >
        <ExecutionMockup />
      </PillarSection>

      {/* Pillar 2 — Program dashboard */}
      <GlassDashboard />

      {/* Pillar 3 — Athlete intelligence */}
      <AthleteIntelligence />

      {/* Pillar 4 — Content intelligence */}
      <PillarSection
        eyebrow="Content"
        headline={<><span className="italic" style={{ color: LIME }}>1M+</span> posts analyzed.</>}
        body="See what athlete content performs and why, across every platform."
        bullets={[
          "search every athlete post across your schools",
          "track sponsor logo placement and school IP visibility",
          "analyze hooks, pacing, and caption style",
          "compare sponsor activations vs organic content",
        ]}
        world={{ src: WORLD_IMG, type: "image" }}
        reverse
      >
        <PostGrid />
      </PillarSection>

      {/* Pillar 5 — Brand matching + outreach */}
      <MatchStudio />

      {/* Pillar 6 — Data and reporting */}
      <PillarSection
        eyebrow="Data"
        headline={<>Every campaign, <span className="italic" style={{ color: LIME }}>measured.</span></>}
        body="Pull the numbers on any campaign, athlete, brand, or team, and turn them into a report in minutes."
        world={{ src: WORLD_IMG, type: "image" }}
      >
        <ReportBuilder />
      </PillarSection>

      {/* Athlete texting */}
      <AssistantThread />

      {/* Proof */}
      <Proof />

      {/* CTA */}
      <section className="audience-page-cta scroll-mt-32 md:scroll-mt-40">
        <div className="audience-page-cta-inner pt-12 md:pt-16">
          <h2 className="audience-page-cta-h2">
            Ready to stop <span className="cta-headline-accent">chasing?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how athletic departments run NIL at scale on JABA.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
