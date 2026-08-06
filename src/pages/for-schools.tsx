import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Check,
  Eye,
  FileText,
  Filter,
  GripVertical,
  Heart,
  LayoutGrid,
  LineChart,
  List,
  MessageCircle,
  MessageSquare,
  Play,
  Plus,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

import PageLayout from "@/components/layout/page-layout";
import SocialProofSection from "@/components/sections/social-proof-section";
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

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";
const BOOKING_URL = "https://calendly.com/jordon-jaba/jaba";
const SECTION = "scroll-mt-32 md:scroll-mt-40";
const PADS = "pb-20 pt-28 md:pb-28 md:pt-36";
const CLOUDS = "/videos/Video%20BG%20Web_02.mp4";
const WORLD_IMG = "/header%20BG-%20V4-WithoutBalls_less.jpg";

// Fictional athletes + stock avatars only. No real roster names or photos.
// Live content tiles (stock thumbnails + fictional athletes).
const contentCards = [
  { name: "Jake Banks", sport: "Football", img: 15, seed: "jb-tb", likes: "23.5K", comments: "133" },
  { name: "Sofia Marin", sport: "Soccer", img: 45, seed: "jb-sm", likes: "12.3K", comments: "29" },
  { name: "Maya Ellison", sport: "Track & Field", img: 32, seed: "jb-me", likes: "10.5K", comments: "126" },
  { name: "Jordan Pace", sport: "Volleyball", img: 5, seed: "jb-jp", likes: "8.4K", comments: "34" },
  { name: "Devin Cross", sport: "Basketball", img: 12, seed: "jb-dc", likes: "6.6K", comments: "16" },
];

type LeaderRow = { name: string; sport: string; val: string; delta?: string; dir?: "up" | "down" | "flat" };
const lbFollowers: LeaderRow[] = [
  { name: "Jake Banks", sport: "Football", val: "184K", delta: "0.3%", dir: "up" },
  { name: "Devin Cross", sport: "Basketball", val: "142K", delta: "0.0%", dir: "flat" },
  { name: "Maya Ellison", sport: "Track & Field", val: "96K", delta: "1.1%", dir: "up" },
  { name: "Sofia Marin", sport: "Soccer", val: "71K", delta: "0.2%", dir: "down" },
  { name: "Jordan Pace", sport: "Volleyball", val: "63K", delta: "0.4%", dir: "up" },
];
const lbEngagement: LeaderRow[] = [
  { name: "Sofia Marin", sport: "Soccer", val: "12.7%" },
  { name: "Maya Ellison", sport: "Track & Field", val: "11.4%" },
  { name: "Aria Cole", sport: "Dance", val: "9.9%" },
  { name: "Devin Cross", sport: "Basketball", val: "9.1%" },
  { name: "Marcus Webb", sport: "Lacrosse", val: "8.0%" },
];
const lbViews: LeaderRow[] = [
  { name: "Maya Ellison", sport: "Track & Field", val: "401K" },
  { name: "Jordan Pace", sport: "Volleyball", val: "374K", delta: "0.4%", dir: "up" },
  { name: "Jake Banks", sport: "Football", val: "288K", delta: "21.1%", dir: "up" },
  { name: "Devin Cross", sport: "Basketball", val: "123K" },
  { name: "Elena Ruiz", sport: "Cheer", val: "116K", delta: "1.2%", dir: "up" },
];

const rosterRows = [
  { name: "Jake Banks", img: 15, followers: "184K", eng: "9.7%", likes: "12.1K", comments: "631", posts: "212", growth: "+8.4%", deals: "6" },
  { name: "Devin Cross", img: 12, followers: "142K", eng: "8.1%", likes: "9.7K", comments: "402", posts: "188", growth: "+5.2%", deals: "4" },
  { name: "Sofia Marin", img: 45, followers: "96K", eng: "7.4%", likes: "6.8K", comments: "274", posts: "164", growth: "+6.9%", deals: "3" },
  { name: "Maya Ellison", img: 32, followers: "71K", eng: "6.1%", likes: "4.2K", comments: "188", posts: "143", growth: "+4.1%", deals: "2" },
];

type ContentPost = {
  image: string;
  avatar: number;
  /** Real headshot URL; overrides the stock pravatar when present. */
  avatarSrc?: string;
  name: string;
  sport: string;
  status: "Visible" | "Sponsored" | "Organic";
  rank: string;
  likes: string;
  comments: string;
  views: string;
};
const contentPosts: ContentPost[] = [
  { image: "/post1.png", avatar: 5, name: "Jordan Pace", sport: "Volleyball", status: "Sponsored", rank: "Top 5", likes: "12.1K", comments: "631", views: "88K" },
  { image: "/post2.png", avatar: 31, name: "Priya Shah", sport: "Tennis", status: "Visible", rank: "Top 5", likes: "9.7K", comments: "402", views: "61K" },
  { image: "/post3.png", avatar: 15, name: "Jake Banks", sport: "Football", status: "Visible", rank: "Top 10", likes: "4.2K", comments: "188", views: "40K" },
  { image: "/post4.png", avatar: 12, name: "Devin Cross", sport: "Basketball", status: "Organic", rank: "Top 25", likes: "6.8K", comments: "274", views: "52K" },
  { image: "/post5.png", avatar: 45, name: "Sofia Marin", sport: "Soccer", status: "Visible", rank: "Top 25", likes: "3.5K", comments: "121", views: "28K" },
  { image: "/post6.png", avatar: 51, name: "Marcus Webb", sport: "Track & Field", status: "Sponsored", rank: "Top 10", likes: "15.4K", comments: "880", views: "120K" },
  { image: "/post7.png", avatar: 32, name: "Maya Ellison", sport: "Track & Field", status: "Visible", rank: "Top 25", likes: "5.1K", comments: "203", views: "44K" },
  { image: "/post8.png", avatar: 13, name: "Cole Hayes", sport: "Baseball", status: "Organic", rank: "Ranked", likes: "2.8K", comments: "96", views: "21K" },
  { image: "/post9.png", avatar: 47, name: "Nina Alvarez", sport: "Basketball", status: "Sponsored", rank: "Top 5", likes: "18.2K", comments: "742", views: "151K" },
  { image: "/post10.png", avatar: 23, name: "Elena Ruiz", sport: "Swimming", status: "Visible", rank: "Top 10", likes: "7.4K", comments: "311", views: "58K" },
  { image: "/post11.png", avatar: 60, name: "Jalen Foster", sport: "Tennis", status: "Organic", rank: "Top 25", likes: "4.6K", comments: "158", views: "37K" },
  { image: "/post12.png", avatar: 9, name: "Theo Marsh", sport: "Soccer", status: "Visible", rank: "Top 10", likes: "6.1K", comments: "240", views: "49K" },
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

/* ── Pillar 1: the workspace. A Notion-like task table you run for every
   athlete, with assignment by iMessage as one way in. ── */
const workflowRows = [
  { task: "Long-form promotional video", type: "Deliverable", who: "Maya Ellison", img: "/athletehs2.png", campaign: "Apex Hydration", brand: true, platform: "YouTube", amount: "$4,000", status: "Overdue", color: "#ff6b6b", due: "Dec 7, 2025" },
  { task: "Meet and greet", type: "Event", who: "Jake Banks", img: "/athleteheadshot.png", campaign: "General task", brand: false, platform: "—", amount: "—", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Feb 18, 2026" },
  { task: "Send campaign results", type: "Task", who: "Devin Cross", img: "/athletehs1.png", campaign: "General task", brand: false, platform: "—", amount: "—", status: "In review", color: "rgba(255,255,255,0.62)", due: "Feb 19, 2026" },
  { task: "Instagram post", type: "Deliverable", who: "Maya Ellison", img: "/athletehs2.png", campaign: "Apex Hydration", brand: true, platform: "Instagram", amount: "$1,500", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Feb 19, 2026" },
  { task: "Voltic reel", type: "Deliverable", who: "Sofia Marin", img: "/athletehs3.png", campaign: "Voltic Energy", brand: true, platform: "Instagram", amount: "$2,500", status: "New", color: LIME, due: "Mar 5, 2026" },
  { task: "Photoshoot session", type: "Deliverable", who: "Jordan Pace", img: "/athletehs4.png", campaign: "Northwind Apparel", brand: true, platform: "—", amount: "$3,000", status: "Done", color: LIME, due: "Mar 5, 2026" },
  { task: "In-person appearance", type: "Event", who: "Elena Ruiz", img: "/athletehs5.png", campaign: "Apex Hydration", brand: true, platform: "—", amount: "$5,000", status: "Active", color: LIME, due: "Apr 20, 2026" },
];

const workflowOverdue = workflowRows.filter((r) => r.status === "Overdue").length;

/* Proactive iMessage nudges that float over the workspace. Decorative
   (pointer-events-none): JABA texting you reminders, asks, and confirmations. */
function AssistantPop({
  message,
  delay = 0,
  bobY = -6,
  bobDur = 6,
  className,
}: {
  message: React.ReactNode;
  delay?: number;
  bobY?: number;
  bobDur?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none w-[262px] ${className ?? ""}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, bobY, 0] }}
        transition={reduce ? undefined : { duration: bobDur, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-end gap-2"
      >
        <img src="/jaba-face.png" alt="" aria-hidden className="h-7 w-7 shrink-0 rounded-full" />
        <p
          className="w-fit rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black"
          style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }}
        >
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
}

function WorkflowSection({ ucla }: { ucla?: boolean } = {}) {
  const rows = ucla ? uclaWorkflowRows : workflowRows;
  const overdue = rows.filter((r) => r.status === "Overdue").length;
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        {/* Copy + the text-to-task flow, side by side */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-12">
          <FadeUp>
            <h2 className="font-deck mt-4 text-4xl leading-[1.05] text-white md:text-5xl">
              Every deliverable,{" "}
              <span style={{ color: LIME }}>handled.</span>
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
              Every task, deadline, and deliverable for every athlete in one
              place. Assign work to athletes or staff by iMessage or in the
              dashboard, and JABA tracks it to done.
            </p>
            {!ucla && (
              <ul className="mt-8 space-y-3">
                {[
                  "Text it in plain English, or add it in the dashboard",
                  "Assign to any athlete or teammate",
                  "AI reminders follow up until it's done",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-3 font-sans text-[15px] text-white/75">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: LIME }} />
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </FadeUp>

          {/* One contained message card: your text in, structured task back */}
          <FadeUp delay={0.1}>
            <GlassPanel borderRadius="22px" className="p-3.5">
              <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <img src="/jaba-face.png" alt="" aria-hidden className="h-8 w-8 rounded-full" />
                <div>
                  <p className="font-sans text-[13px] font-semibold text-white">JABA</p>
                  <p className="font-sans text-[11px] text-white/45">iMessage</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-end">
                  <p className="max-w-[86%] rounded-2xl rounded-br-md bg-[#007aff] px-3.5 py-2 font-sans text-[13px] leading-snug text-white">
                    {ucla ? "Add a task for Nico: post the Vuori reel by Friday." : "Add a task for Sofia: post the Voltic reel by Friday."}
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black">
                    {ucla ? <>Done. Added to Nico Iamaleava&rsquo;s tasks, due Fri 5:00pm.</> : <>Done. Added to Sofia Marin&rsquo;s tasks, due Fri 5:00pm.</>}
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="max-w-[86%] rounded-2xl rounded-br-md bg-[#007aff] px-3.5 py-2 font-sans text-[13px] leading-snug text-white">
                    {ucla ? "Remind them the day before." : "Remind her the day before."}
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black">
                    {ucla ? <>Will do. I&rsquo;ll nudge Nico Thursday and follow up until it&rsquo;s posted.</> : <>Will do. I&rsquo;ll nudge Sofia Thursday and follow up until it&rsquo;s posted.</>}
                  </p>
                </div>
              </div>
            </GlassPanel>
          </FadeUp>
        </div>

        {/* Full-width task table: the Notion-like workspace itself */}
        <FadeUp delay={0.15} className="relative mt-10 md:mt-14">
          {/* Proactive nudges floating over the workspace */}
          <AssistantPop
            delay={0.2}
            bobY={-7}
            bobDur={6}
            className="absolute right-6 top-[88px] z-20 hidden lg:block"
            message={ucla ? <>Roch&rsquo;s MLB The Show promo is due Friday. Want me to text a reminder?</> : <>Maya&rsquo;s Apex Hydration video is due Friday. Want me to text her a reminder?</>}
          />
          <AssistantPop
            delay={0.5}
            bobY={8}
            bobDur={7.5}
            className="absolute -bottom-10 left-6 z-20 hidden lg:block"
            message={ucla ? <>Just a reminder: the Vuori reel is due in 2 days.</> : <>Just a reminder: the Voltic reel is due in 2 days.</>}
          />
          <AssistantPop
            delay={0.7}
            bobY={-6}
            bobDur={5.5}
            className="absolute -bottom-8 right-10 z-20 hidden lg:block"
            message={ucla ? <>Sent Kiki the address and parking details for the appearance.</> : <>Sent Elena the address and parking details for the appearance.</>}
          />

          <GlassPanel className="overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2 border-b-2 pb-1 font-sans text-[13px] font-semibold text-white" style={{ borderColor: LIME }}>
                  All Tasks
                  <span className="rounded-full bg-white/10 px-1.5 text-[11px] text-white/60" style={{ fontVariantNumeric: "tabular-nums" }}>{rows.length}</span>
                </span>
                <span className="flex items-center gap-2 pb-1 font-sans text-[13px] text-white/45">
                  Overdue
                  <span className="rounded-full bg-white/10 px-1.5 text-[11px] text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>{overdue}</span>
                </span>
                <span
                  className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-sans text-[12px] text-white/60 backdrop-blur-md sm:flex"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)" }}
                >
                  <Filter className="h-3 w-3" /> Filters
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="hidden items-center rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md sm:flex"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)" }}
                >
                  <span
                    className="flex h-6 w-7 items-center justify-center rounded-full bg-white/15 text-white"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28)" }}
                  >
                    <List className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex h-6 w-7 items-center justify-center rounded-full text-white/40">
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12px] font-semibold" style={{ background: LIME, color: "#000" }}>
                  <Plus className="h-3.5 w-3.5" /> Add Task
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/35">
                    <th className="px-5 py-3 text-left font-medium">Task name</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Athlete</th>
                    <th className="px-4 py-3 text-left font-medium">Campaign</th>
                    <th className="px-4 py-3 text-left font-medium">Platform</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">Due date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.task} className="border-t border-white/[0.06]">
                      <td className="px-5 py-3.5 font-sans text-[13.5px] font-medium text-white">{r.task}</td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/45">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-2.5">
                          <img src={r.img} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover object-top" />
                          <span className="font-sans text-[13px] text-white/85">{r.who}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {r.brand ? (
                          <span className="inline-block rounded-md border border-[#dfff00]/25 bg-[#dfff00]/[0.06] px-2 py-1 font-sans text-[12px] text-white/80">{r.campaign}</span>
                        ) : (
                          <span className="font-sans text-[12px] uppercase tracking-[0.06em] text-white/35">{r.campaign}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 font-sans text-[12.5px]" style={{ color: r.platform === "—" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)" }}>
                        {r.platform}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: r.color }}>
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.color }} />
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-sans text-[12.5px] text-white/65" style={{ fontVariantNumeric: "tabular-nums" }}>{r.due}</td>
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

/* A stylized leaderboard widget for the program dashboard. */
function MiniLeaderboard({ title, rows }: { title: string; rows: LeaderRow[] }) {
  const deltaColor = (dir?: string) =>
    dir === "down" ? "#ff6b6b" : dir === "up" ? LIME : "rgba(255,255,255,0.4)";
  return (
    <LiquidGlassCard
      borderRadius="16px"
      className="h-full"
      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
    >
      <div className="px-4 py-3.5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-white/55">Top 5 · {title}</p>
          <span className="h-[6px] w-[6px] rounded-full" style={{ background: LIME }} />
        </div>
        <ul className="mt-3 space-y-2.5">
          {rows.map((r, i) => (
            <li key={r.name} className="flex items-center gap-2.5">
              <span className="w-3 font-sans text-[11px] font-semibold text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-[12.5px] font-medium text-white">{r.name}</p>
                <p className="truncate font-sans text-[10px] uppercase tracking-[0.08em] text-white/40">{r.sport}</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[12.5px] font-semibold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{r.val}</p>
                {r.delta && (
                  <p className="font-sans text-[10px]" style={{ color: deltaColor(r.dir), fontVariantNumeric: "tabular-nums" }}>
                    {r.dir === "down" ? "↓" : r.dir === "up" ? "↑" : "→"} {r.delta}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </LiquidGlassCard>
  );
}

/* A live content tile: stock thumbnail with a play affordance + stats. */
function ContentTile({ c }: { c: (typeof contentCards)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      <img src={`https://picsum.photos/seed/${c.seed}/400/520`} alt="" aria-hidden className="aspect-[4/5] w-full object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.82) 100%)" }} />
      <span className="absolute left-1/2 top-[38%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 backdrop-blur-sm">
        <Play className="h-3.5 w-3.5 fill-white text-white" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <div className="flex items-center gap-1.5">
          <img src={`https://i.pravatar.cc/64?img=${c.img}`} alt="" aria-hidden className="h-5 w-5 rounded-full object-cover" />
          <p className="truncate font-sans text-[11.5px] font-medium text-white">{c.name}</p>
        </div>
        <div className="mt-1.5 flex items-center gap-2.5 font-sans text-[10.5px] text-white/80" style={{ fontVariantNumeric: "tabular-nums" }}>
          <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {c.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {c.comments}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Pillar 2 (kept): glass dashboard floating over the world ── */
function GlassDashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [26, -26]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, -18]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, -10]);
  const depth = { filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.4))" };

  return (
    <WorldBackdrop type="image" src="/JW-sky1.png" parallax className="scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} pb-12 pt-24 md:pb-16 md:pt-28`}>
        <FadeUp className="max-w-2xl">
          <ScrimCluster className="inline-block">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">
            Dashboard
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            See your entire program{" "}
            <span className="italic" style={{ color: LIME }}>
              at a glance.
            </span>
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/65">
            Content, engagement, brand matches, and your full roster, live in
            one place. The first screen your staff opens each morning.
          </p>
          </ScrimCluster>
        </FadeUp>

        <div ref={ref} className="relative mt-7 md:mt-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[44px] blur-2xl"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 45%, rgba(0,0,0,0.42), rgba(0,0,0,0.18) 70%, transparent 100%)",
            }}
          />
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-12">
            {/* Program stats */}
            <motion.div style={{ y: yFront, ...depth }} className="md:col-span-12">
              <FadeUp className="grid grid-cols-1 gap-3.5 sm:grid-cols-3" delay={0.05}>
                <GlassStatTile label="Posts This Month" value={538} delta="8.1%" deltaDir="up" spark={[12, 18, 15, 22, 19, 27, 31]} />
                <GlassStatTile label="Total Engagement" value={62.5} suffix="K" decimals={1} spark={[40, 44, 41, 48, 52, 58, 63]} />
                <GlassStatTile label="Avg Engagement Rate" value={24.3} suffix="%" decimals={1} delta="0.5%" deltaDir="up" spark={[20, 21, 23, 22, 24, 23, 24]} />
              </FadeUp>
            </motion.div>

            {/* Live content */}
            <motion.div style={{ y: yMid, ...depth }} className="md:col-span-7">
              <FadeUp delay={0.1} className="h-full">
                <LiquidGlassCard borderRadius="18px" className="h-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="px-4 py-3.5">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">Athlete Content · Live</p>
                      <p className="font-sans text-[11px] text-white/40">My athletes · 30D</p>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                      {contentCards.map((c) => <ContentTile key={c.name} c={c} />)}
                    </div>
                  </div>
                </LiquidGlassCard>
              </FadeUp>
            </motion.div>

            {/* Brands to reach out */}
            <motion.div style={{ y: yMid, ...depth }} className="md:col-span-5">
              <FadeUp delay={0.15} className="h-full">
                <LiquidGlassCard borderRadius="18px" className="h-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="px-4 py-3.5">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">Brands to Reach Out</p>
                      <span className="font-sans text-[11px] text-white/45">View all →</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {brandsDB.map((b) => (
                        <div key={b.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 font-sans text-[12px] font-bold text-white">{b.name[0]}</span>
                            <div className="min-w-0">
                              <p className="truncate font-sans text-[12px] font-medium text-white">{b.name}</p>
                              <p className="truncate font-sans text-[9.5px] uppercase tracking-[0.08em] text-white/40">{b.category}</p>
                            </div>
                          </div>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="font-sans text-[10.5px] text-white/55" style={{ fontVariantNumeric: "tabular-nums" }}>{b.match}% fit</span>
                            <span className="rounded-full border px-2 py-0.5 font-sans text-[10.5px] font-semibold" style={{ borderColor: "rgba(223,255,0,0.4)", color: LIME }}>Pitch ›</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              </FadeUp>
            </motion.div>

            {/* Leaderboards */}
            <motion.div style={{ y: yBack, scale: 0.99, ...depth }} className="md:col-span-12">
              <FadeUp delay={0.2} className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
                <MiniLeaderboard title="Followers" rows={lbFollowers} />
                <MiniLeaderboard title="Engagement" rows={lbEngagement} />
                <MiniLeaderboard title="Views" rows={lbViews} />
              </FadeUp>
            </motion.div>
          </div>
        </div>
      </div>
    </WorldBackdrop>
  );
}

/* ── Pillar 3: athlete intelligence (profile card on the world backdrop) ── */
function AthleteIntelligence({ ucla }: { ucla?: boolean } = {}) {
  const tabs = ["Overview", "Performance", "Audience", "FMV", "Athlete Business"];
  const voice = ["Game-day highlights", "Training & film", "Community & family"];
  const interests = ["QB development", "Performance nutrition", "Lifestyle & fashion"];
  const profile = ucla
    ? {
        img: UCLA_HS.nico,
        name: "Nico Iamaleava",
        meta: "UCLA Bruins · @nico_iamaleava8",
        bio: "Nico Iamaleava is one of the most-followed quarterbacks in college football, with a large, highly engaged Instagram audience. His content spans game-day moments, training, and off-field lifestyle, a mix that fits performance, apparel, and lifestyle brands.",
      }
    : {
        img: "/athlete-cutout.png",
        name: "Jake Banks",
        meta: "University of Jaba · Junior",
        bio: "Jake Banks is a dual-threat quarterback known for his arm talent, poise in the pocket, and a fast-growing, highly engaged following across Instagram and TikTok. A standout recruit out of high school, he has built a reputation for big-moment highlights and behind-the-scenes access fans rarely get. Off the field, his content spans training and film breakdowns, game-day routines, and lifestyle moments with friends and family. That mix of on-field performance and authentic personal storytelling makes him a natural fit for performance, apparel, and lifestyle brands.",
      };
  const brandFits = ucla
    ? [
        { name: "Vuori", fit: 92, reason: "Active partner; off-field lifestyle content matches the brand." },
        { name: "Gatorade", fit: 88, reason: "Game-day and training content fits performance hydration." },
        { name: "Beats by Dre", fit: 84, reason: "Pre-game and lifestyle moments suit audio and lifestyle drops." },
      ]
    : [
        { name: "Apex Hydration", fit: 94, reason: "Posts game-day hydration routines; audience skews performance-minded." },
        { name: "Voltic Energy", fit: 88, reason: "High-energy highlight reels match the brand's tone." },
        { name: "Northwind Apparel", fit: 81, reason: "Off-field fashion content fits their apparel drops." },
      ];
  const stats = [
    { label: "Followers", value: ucla ? "181K" : "184K", sub: "↑ 12.4% · 30d", up: true },
    { label: "Engagement", value: "9.7%", sub: "vs 6.2% cohort", up: true },
    { label: "Avg Likes", value: "12.1K", sub: "per post" },
    { label: "Avg Comments", value: "631", sub: "per post" },
  ];
  return (
    <WorldBackdrop type="image" src="/JW-sky1.png" parallax className="scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} pb-12 pt-24 md:pb-16 md:pt-28`}>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <ScrimCluster className="inline-block">
            <h2 className="font-deck mt-3 text-5xl leading-[1.05] text-white md:text-6xl">
              Know every athlete's{" "}
              <span style={{ color: LIME }}>brand.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
              A living profile for every athlete: content, audience, value, and
              the brands they naturally fit, with the reasoning behind each match.
            </p>
          </ScrimCluster>
        </FadeUp>

        <FadeUp delay={0.12} className="mt-7 md:mt-9">
          <GlassPanel className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Profile rail */}
              <div className="flex flex-col border-b border-white/10 p-5 md:col-span-4 md:border-b-0 md:border-r">
                <div
                  className="min-h-[200px] flex-1 overflow-hidden rounded-2xl border border-white/10"
                  style={{ background: "radial-gradient(120% 85% at 50% 6%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 52%, rgba(255,255,255,0.01))" }}
                >
                  <img src={profile.img} alt={ucla ? profile.name : ""} aria-hidden={!ucla} className="h-full w-full object-cover object-top" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">Football</span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">QB</span>
                </div>
                <h3 className="mt-2.5 font-display text-3xl italic leading-none text-white">{profile.name}</h3>
                <p className="mt-1.5 font-sans text-[12px] text-white/55">{profile.meta}</p>
                <div className="mt-1.5 flex items-center gap-1.5 font-sans text-[11px] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                  JABA Verified
                </div>
              </div>

              {/* Detail panel */}
              <div className="p-5 md:col-span-8">
                {/* Tabs */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/10 pb-3">
                  {tabs.map((t, i) => (
                    <span
                      key={t}
                      className="font-sans text-[12px]"
                      style={i === 0 ? { color: LIME, fontWeight: 600, borderBottom: `2px solid ${LIME}`, paddingBottom: "6px", marginBottom: "-15px" } : { color: "rgba(255,255,255,0.45)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                      <p className="font-sans text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/35">{s.label}</p>
                      <p className="mt-1 font-sans text-[20px] font-semibold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{s.value}</p>
                      <p className="mt-1 font-sans text-[10px]" style={{ color: s.up ? LIME : "rgba(255,255,255,0.4)" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <p className="mt-4 font-sans text-[13px] leading-relaxed text-white/70">
                  {profile.bio}
                </p>

                {/* Voice + interests */}
                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[{ label: "Voice", items: voice }, { label: "Interests", items: interests }].map((g) => (
                    <div key={g.label}>
                      <p className="font-sans text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35">{g.label}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {g.items.map((it) => (
                          <span key={it} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-sans text-[10.5px] text-white/65">{it}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Brand fits */}
                <div className="mt-4">
                  <p className="font-sans text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35">Brand Fits</p>
                  <div className="mt-2 space-y-1.5">
                    {brandFits.map((b) => (
                      <div key={b.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-sans text-[12.5px] font-medium text-white">{b.name}</p>
                          <p className="truncate font-sans text-[11px] text-white/45">{b.reason}</p>
                        </div>
                        <span className="shrink-0 font-sans text-[13px] font-semibold" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{b.fit}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </WorldBackdrop>
  );
}

/* A single vertical post tile for the content grid. */
function ContentPostCard({ p }: { p: ContentPost }) {
  const statusDot =
    p.status === "Sponsored" ? LIME : p.status === "Organic" ? "rgba(255,255,255,0.4)" : "#7cc4ff";
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      <img src={p.image} alt="" aria-hidden className="aspect-[4/5] w-full object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)" }} />
      {/* Tags */}
      <div className="absolute left-1.5 top-1.5 flex flex-col items-start gap-1">
        <span className="flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.08em] text-white/85 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusDot }} />
          {p.status}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.08em] backdrop-blur-sm" style={{ color: LIME }}>
          <Star className="h-2.5 w-2.5 fill-current" />
          {p.rank}
        </span>
      </div>
      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 p-2">
        <div className="flex items-center gap-1.5">
          <img src={p.avatarSrc ?? `https://i.pravatar.cc/64?img=${p.avatar}`} alt="" aria-hidden className="h-4 w-4 rounded-full object-cover object-top" />
          <span className="truncate font-sans text-[10.5px] font-medium text-white">{p.name}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 font-sans text-[9.5px] text-white/75" style={{ fontVariantNumeric: "tabular-nums" }}>
          <span className="flex items-center gap-0.5"><Heart className="h-2.5 w-2.5" /> {p.likes}</span>
          <span className="flex items-center gap-0.5"><MessageCircle className="h-2.5 w-2.5" /> {p.comments}</span>
          <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {p.views}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Pillar 4 visual: content analysis grid ── */
function PostGrid() {
  const reduce = useReducedMotion();
  const posts = contentPosts;
  const tabs = ["All", "Posts", "Reels", "Videos"];
  return (
    <div
      className="overflow-hidden rounded-[18px]"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow:
          "0 16px 44px rgba(0,0,0,0.1), inset 2px 2px 1px -2px rgba(255,255,255,0.95), inset -2px -2px 1px -2px rgba(255,255,255,0.6), inset 1px 1px 1px -0.5px rgba(255,255,255,0.5), inset -1px -1px 1px -0.5px rgba(0,0,0,0.1)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
      }}
    >
      {/* Tabs + count */}
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <div className="flex items-center gap-5">
          {tabs.map((t, i) => (
            <span
              key={t}
              className="font-sans text-[12.5px]"
              style={i === 0 ? { color: "#0a0a0a", fontWeight: 600, borderBottom: `2px solid ${LIME}`, paddingBottom: "10px", marginBottom: "-13px" } : { color: "rgba(0,0,0,0.45)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="font-sans text-[12px] text-black/45" style={{ fontVariantNumeric: "tabular-nums" }}>24 posts</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 px-4 py-3">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 font-sans text-[12px] text-black/45">
          <Search className="h-3.5 w-3.5" /> Search posts, athletes, schools...
        </div>
        <div className="flex items-center rounded-full border border-black/10 bg-black/[0.03] p-0.5 font-sans text-[11px]">
          <span className="rounded-full px-2.5 py-1 font-semibold text-[#0a0a0a]" style={{ background: "rgba(0,0,0,0.08)" }}>My School</span>
          <span className="px-2.5 py-1 text-black/45">NCAA</span>
          <span className="px-2.5 py-1 text-black/45">Pro</span>
        </div>
        <div className="hidden items-center rounded-full border border-black/10 bg-black/[0.03] p-0.5 font-sans text-[11px] sm:flex">
          <span className="rounded-full px-2.5 py-1 font-semibold text-[#0a0a0a]" style={{ background: "rgba(0,0,0,0.08)" }}>All</span>
          <span className="px-2.5 py-1 text-black/45">Sponsored</span>
          <span className="px-2.5 py-1 text-black/45">Organic</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 font-sans text-[11px] text-black/55">
          <Filter className="h-3 w-3" /> Filters
        </span>
      </div>

      {/* Auto-scrolling marquee (seamless: posts duplicated, loop at -50%) */}
      <div className="overflow-hidden p-4">
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 55, repeat: Infinity, ease: "linear" }}
        >
          {[...posts, ...posts].map((p, i) => (
            <div key={`${p.image}-${i}`} className="mr-3 w-[150px] shrink-0 sm:w-[164px]">
              <ContentPostCard p={p} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Pillar 4: content intelligence (full-width grid + toolbar) ── */
function ContentSection({ ucla }: { ucla?: boolean } = {}) {
  return (
    <section className={`${SECTION} bg-[#eeeeee]`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-black/45">Content</p>
          {ucla ? (
            <h2 className="font-deck mt-3 text-4xl leading-[1.08] text-[#0a0a0a] md:text-5xl">
              JABA watches the{" "}
              <span style={{ background: LIME, color: "#000", padding: "0 0.12em", borderRadius: "2px" }}>entire athlete internet.</span>
            </h2>
          ) : (
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-[#0a0a0a] md:text-5xl">
              <span className="italic" style={{ background: LIME, color: "#000", padding: "0 0.1em", borderRadius: "2px" }}>1M+</span> posts analyzed.
            </h2>
          )}
          <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-black/60">
            See what athlete content performs and why, across every platform.
          </p>
          {!ucla && (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "search every athlete post across your schools",
                "track sponsor logo placement and school IP visibility",
                "analyze hooks, pacing, and caption style",
                "compare sponsor activations vs organic content",
              ].map((b) => (
                <li key={b} className="flex gap-3 font-sans text-[14px] leading-relaxed text-black/70">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: "rgba(0,0,0,0.4)" }} />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </FadeUp>
        <FadeUp delay={0.12} className="mt-10 md:mt-14">
          <PostGrid />
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Light interlude: centered NIL statement + three-up world-image cards ── */
function NilInterlude() {
  const cards = [
    { n: "01", label: "Pitch", body: "Find the brands that fit your roster and send the outreach.", img: "/pitchimage2.png" },
    { n: "02", label: "Manage", body: "Every task, deadline, and deliverable for every athlete, in one place.", img: "/manageimage2.png" },
    { n: "03", label: "Track", body: "Turn campaigns, content, and school IP into a report in minutes.", img: "/trackimage2.png" },
  ];
  return (
    <section className={`${SECTION} bg-[#eeeeee]`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp>
          <h2 className="mx-auto max-w-4xl text-center font-sans text-4xl font-extrabold tracking-tight leading-[1.45] [text-wrap:balance] text-[#0a0a0a] md:text-5xl lg:text-6xl">
            NIL runs on more deals, content, and deadlines{" "}
            <span
              style={{
                color: "#000",
                padding: "0 0.12em",
                background: `linear-gradient(180deg, transparent 0.22em, ${LIME} 0.22em, ${LIME} calc(100% - 0.16em), transparent calc(100% - 0.16em))`,
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              than any staff can track by hand.
            </span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.n} className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 5" }}>
              <img src={c.img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.9) 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="font-sans text-[12px] font-bold tracking-[0.2em]" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{c.n}</span>
                <h3 className="mt-2 font-display text-[2rem] italic leading-none text-white">{c.label}</h3>
                <p className="mt-2.5 max-w-[40ch] font-sans text-[13.5px] leading-relaxed text-white/75">{c.body}</p>
              </div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Pillar 5: brand matching + outreach (Match Studio flow) ── */
function MatchStudio({ ucla }: { ucla?: boolean } = {}) {
  return (
    <section className="relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "#000" }}
      />
      <div className={`relative ${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
        <FadeUp className="max-w-2xl">
          <ScrimCluster className="inline-block">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Brands</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            JABA reads your roster and finds the{" "}
            <span className="italic" style={{ color: LIME }}>brands that fit.</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Match your roster to brands, find the right person, and send
            outreach that sounds like you.
          </p>
          {!ucla && (
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
          )}
          </ScrimCluster>
        </FadeUp>

        {/* Sales Agent: staged pitch flow */}
        <FadeUp delay={0.1} className="mt-12">
          <GlassPanel className="overflow-hidden">
            {/* Stage bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 px-5 py-3.5">
              {[
                { label: "Find", count: 50 },
                { label: "Enrich", count: 8 },
                { label: "Pitch", count: 11 },
                { label: "Send", count: 7 },
              ].map((s, i) => (
                <span key={s.label} className="flex items-center gap-1.5 font-sans text-[12.5px]" style={i === 2 ? { color: LIME, fontWeight: 600 } : { color: "rgba(255,255,255,0.5)" }}>
                  <span className="font-sans text-[11px]" style={{ color: i === 2 ? LIME : "rgba(255,255,255,0.3)", fontVariantNumeric: "tabular-nums" }}>0{i + 1}</span>
                  {s.label}
                  <span className="rounded-full bg-white/10 px-1.5 text-[10px] text-white/60" style={{ fontVariantNumeric: "tabular-nums" }}>{s.count}</span>
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
              {/* Pitch queue */}
              <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Pitch Queue · 2 of 5 ready</p>
                <ul className="mt-3 space-y-2">
                  {[
                    { handle: "@apexhydration", cat: "Beverage", status: "Ready", ready: true },
                    { handle: "@northwind", cat: "Apparel", status: "Needs athletes" },
                    { handle: "@voltic", cat: "Energy", status: "Needs ideas" },
                    { handle: "@cedarco", cat: "Lifestyle", status: "Ready", ready: true },
                  ].map((q, i) => (
                    <li key={q.handle} className="rounded-xl border px-3 py-2" style={{ borderColor: i === 0 ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.1)", background: i === 0 ? "rgba(223,255,0,0.05)" : "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-sans text-[12.5px] font-medium text-white">{q.handle}</p>
                        <span className="shrink-0 font-sans text-[9px] font-semibold uppercase tracking-[0.08em]" style={{ color: q.ready ? LIME : "rgba(255,255,255,0.4)" }}>{q.status}</span>
                      </div>
                      <p className="font-sans text-[10.5px] text-white/40">{q.cat}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Drafted pitch */}
              <div className="p-5">
                <div className="space-y-2 border-b border-white/10 pb-3 font-sans text-[12.5px]">
                  <p className="flex gap-2"><span className="w-14 shrink-0 text-white/35">To</span><span className="text-white/80">Rachel Doss <span className="text-white/40">&lt;rachel.doss@apexhydration.com&gt;</span></span></p>
                  <p className="flex gap-2"><span className="w-14 shrink-0 text-white/35">Subject</span><span className="text-white">Maya Ellison × Apex Hydration: campaign concept</span></p>
                </div>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
                  <Sparkles className="h-3 w-3" style={{ color: LIME }} /> JABA Draft
                </span>

                <p className="mt-3 font-sans text-[13px] leading-relaxed text-white/80">
                  Hi Rachel, Maya Ellison brings 96K highly engaged followers in
                  track and field, an audience that over-indexes on Apex&rsquo;s core
                  18 to 24 demo and opens a college-sports lane the brand rarely occupies.
                </p>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-sans text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/40">Why this fits</p>
                  <p className="mt-1.5 font-sans text-[12.5px] leading-relaxed text-white/70">
                    Apex gets to be the brand that backed a rising track athlete before
                    it was obvious, a story about supporting performance at every level.
                  </p>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 font-sans text-[12px] text-white/70" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <span><span className="font-semibold text-white">96K</span> followers</span>
                  <span><span className="font-semibold text-white">9.7%</span> engagement</span>
                  <span><span className="font-semibold" style={{ color: LIME }}>91/100</span> fit score</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-semibold" style={{ background: LIME, color: "#000" }}>
                    Approve &amp; preview email <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 font-sans text-[12px] font-medium text-white/70">
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                  </span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Pillar 6 visual: report picker (left) + rendered IP report (right) ── */
function ReportBuilder() {
  const reports = [
    { label: "Campaign Recap", icon: LayoutGrid },
    { label: "Athlete Spotlight", icon: Users },
    { label: "Brand Report", icon: Target },
    { label: "IP Impact", icon: Eye, active: true },
    { label: "Team Performance", icon: BarChart3 },
    { label: "Conference", icon: LineChart },
  ];
  const signals = [
    { n: "564", label: "School mentioned in caption", pct: "19.1%" },
    { n: "709", label: "School logo in the post", pct: "24.1%" },
    { n: "69", label: "Official school collaboration", pct: "2.3%" },
  ];
  const lifts = [
    { n: "+26%", label: "Likes" },
    { n: "+26%", label: "Video views" },
    { n: "+75%", label: "Engagement rate" },
  ];
  const compare: Record<string, Record<string, { w: number; wo: number; suf: string }>> = {
    "Any IP": { Engagement: { w: 9, wo: 5.2, suf: "%" }, Likes: { w: 12.1, wo: 9.6, suf: "K" }, Comments: { w: 631, wo: 470, suf: "" } },
    Collaboration: { Engagement: { w: 16.1, wo: 5.2, suf: "%" }, Likes: { w: 40.2, wo: 9.6, suf: "K" }, Comments: { w: 980, wo: 470, suf: "" } },
    Logo: { Engagement: { w: 9.8, wo: 5.2, suf: "%" }, Likes: { w: 11.6, wo: 9.6, suf: "K" }, Comments: { w: 540, wo: 470, suf: "" } },
    Mention: { Engagement: { w: 8, wo: 5.2, suf: "%" }, Likes: { w: 12.4, wo: 9.6, suf: "K" }, Comments: { w: 615, wo: 470, suf: "" } },
  };
  const [signal, setSignal] = useState("Any IP");
  const [metric, setMetric] = useState("Engagement");
  const d = compare[signal][metric];
  const lift = Math.round((d.w / d.wo - 1) * 100);
  const fmt = (v: number) => `${v}${d.suf}`;
  const woPct = Math.round((d.wo / d.w) * 100);
  return (
    <GlassPanel className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[224px_1fr]">
        {/* Report picker */}
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <p className="font-sans text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35">Reports</p>
          <ul className="mt-3 space-y-1">
            {reports.map((r) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-sans text-[12.5px]"
                  style={r.active ? { background: "rgba(223,255,0,0.08)", border: "1px solid rgba(223,255,0,0.3)", color: LIME, fontWeight: 600 } : { color: "rgba(255,255,255,0.6)" }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" /> {r.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Rendered IP report */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[14px] font-extrabold uppercase tracking-[0.02em] text-white">IP Impact Report</p>
            <span className="font-sans text-[11px] text-white/40">Last 90 days</span>
          </div>

          {/* What we measured */}
          <div className="mt-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-[34px] font-extrabold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>2,947</span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white/70">Sponsored posts analyzed</span>
            </div>
            <div className="mt-3.5 flex h-2 overflow-hidden rounded-full">
              <span style={{ width: "68%", background: "rgba(255,255,255,0.18)" }} />
              <span style={{ width: "32%", background: LIME }} />
            </div>
            <div className="mt-2 flex justify-between font-sans text-[11px] text-white/55" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span><span className="font-bold text-white">2,006</span> no school IP · 68%</span>
              <span><span className="font-bold" style={{ color: LIME }}>941</span> use school IP · 32%</span>
            </div>
          </div>

          {/* Three ways school IP shows up */}
          <p className="mt-4 font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">The three ways school IP shows up</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {signals.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <p className="font-sans text-[20px] font-extrabold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{s.n}</p>
                <p className="mt-1.5 font-sans text-[10.5px] font-semibold leading-tight text-white/75">{s.label}</p>
                <p className="mt-0.5 font-sans text-[10px] text-white/40">{s.pct} of posts</p>
              </div>
            ))}
          </div>

          {/* Posts with IP perform better */}
          <p className="mt-4 font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">Posts with school IP perform better</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {lifts.map((l) => (
              <div
                key={l.label}
                className="rounded-xl border px-3.5 py-3.5"
                style={{ borderColor: "rgba(223,255,0,0.22)", background: "rgba(223,255,0,0.05)" }}
              >
                <p className="font-sans text-[28px] font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{l.n}</p>
                <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.04em] text-white/80">{l.label}</p>
                <p className="mt-0.5 font-sans text-[10px] text-white/40">vs no school IP</p>
              </div>
            ))}
          </div>

          {/* Interactive: with IP vs without IP */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-sans text-[12px] font-extrabold uppercase tracking-[0.04em] text-white">With IP vs without IP</p>
            <p className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.1em]" style={{ color: LIME }}>Pick a signal and a metric to compare the typical post</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.keys(compare).map((s) => (
                <button
                  key={s}
                  onClick={() => setSignal(s)}
                  className="rounded-full border px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.06em] transition-colors"
                  style={signal === s ? { background: LIME, borderColor: LIME, color: "#000" } : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Engagement", "Likes", "Comments"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className="rounded-full border px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.06em] transition-colors"
                  style={metric === m ? { background: LIME, borderColor: LIME, color: "#000" } : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-3.5 space-y-2" style={{ fontVariantNumeric: "tabular-nums" }}>
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 font-sans text-[10px] uppercase tracking-[0.1em] text-white/50">With IP</span>
                <span className="relative h-7 flex-1 overflow-hidden rounded-md">
                  <span className="absolute inset-y-0 left-0 rounded-md" style={{ width: "100%", background: LIME }} />
                  <span className="absolute inset-y-0 right-2 flex items-center font-sans text-[12px] font-extrabold text-black">{fmt(d.w)}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 font-sans text-[10px] uppercase tracking-[0.1em] text-white/50">Without</span>
                <span className="relative h-7 flex-1 overflow-hidden rounded-md bg-white/[0.04]">
                  <span className="absolute inset-y-0 left-0 rounded-md bg-white/15" style={{ width: `${woPct}%` }} />
                  <span className="absolute inset-y-0 right-2 flex items-center font-sans text-[12px] font-bold text-white/70">{fmt(d.wo)}</span>
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2 border-t border-white/10 pt-3">
              <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">IP Lift</span>
              <span className="font-sans text-[22px] font-extrabold leading-none" style={{ color: LIME }}>+{lift}%</span>
              <span className="font-sans text-[11px] text-white/45">{metric} with {signal} vs without</span>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

/* ── Pillar 6: reports (copy + full-width report picker/preview) ── */
function ReportsSection() {
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Reports</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Report on <span className="italic" style={{ color: LIME }}>anything</span> you run.
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/65">
            Campaigns, athletes, brands, teams, conferences, and school IP impact.
            Pick a report and JABA builds it from your live data, ready to export.
          </p>
        </FadeUp>
        <FadeUp delay={0.12} className="mt-10 md:mt-14">
          <ReportBuilder />
        </FadeUp>
      </div>
    </section>
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

/* ── UCLA live data (real athletes + content, pulled from JABA's database).
   Names, headshots, handles, follower counts, post images and engagement are
   real. Task statuses/dates are illustrative workspace states; deal amounts
   are left blank rather than fabricated. Scoped to the `ucla` variant only. ── */
const HS = "https://storage.googleapis.com/jaba-profile-pictures-bucket-prod/profile-pictures/";
const UCLA_HS = {
  chiles: `${HS}1765897229904-Jordan_Chiles_68f878d77fcc92b86eee7f0e_ProfilePicture.jpg`,
  nico: `${HS}1770926967187-Nico_Iamaleava_68f878d77fcc92b86eee7dbf_ProfilePicture.jpg`,
  kiki: `${HS}1765897154917-Kiki_Rice_68f878d77fcc92b86eee7ee2_ProfilePicture.jpg`,
  roch: `${HS}1765896553837-Roch_Cholowsky_68f878d77fcc92b86eee7d6c_ProfilePicture.jpg`,
  mikey: `${HS}1770926968745-Mikey_Matthews_68f878d77fcc92b86eee7dbd_ProfilePicture.jpg`,
};

const uclaWorkflowRows = [
  { task: "Nike Player Edition post", type: "Deliverable", who: "Jordan Chiles", img: UCLA_HS.chiles, campaign: "Nike", brand: true, platform: "Instagram", amount: "—", status: "Overdue", color: "#ff6b6b", due: "Jul 12, 2026" },
  { task: "MLB The Show promo", type: "Deliverable", who: "Roch Cholowsky", img: UCLA_HS.roch, campaign: "MLB The Show", brand: true, platform: "Instagram", amount: "—", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Jul 15, 2026" },
  { task: "Vuori partner reel", type: "Deliverable", who: "Nico Iamaleava", img: UCLA_HS.nico, campaign: "Vuori", brand: true, platform: "Instagram", amount: "—", status: "In review", color: "rgba(255,255,255,0.62)", due: "Jul 16, 2026" },
  { task: "Degree World Cup reel", type: "Deliverable", who: "Jordan Chiles", img: UCLA_HS.chiles, campaign: "Degree", brand: true, platform: "Instagram", amount: "—", status: "Done", color: LIME, due: "Jul 18, 2026" },
  { task: "Meet and greet", type: "Event", who: "Kiki Rice", img: UCLA_HS.kiki, campaign: "General task", brand: false, platform: "—", amount: "—", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Jul 20, 2026" },
  { task: "Peacock series promo", type: "Deliverable", who: "Roch Cholowsky", img: UCLA_HS.roch, campaign: "Peacock", brand: true, platform: "Instagram", amount: "—", status: "Done", color: LIME, due: "Jul 13, 2026" },
  { task: "Send campaign recap", type: "Task", who: "Mikey Matthews", img: UCLA_HS.mikey, campaign: "General task", brand: false, platform: "—", amount: "—", status: "New", color: LIME, due: "Jul 22, 2026" },
];

const uclaContentPosts: ContentPost[] = [
  { image: "/ucla-content/post1.jpg", avatar: 0, avatarSrc: UCLA_HS.chiles, name: "Jordan Chiles", sport: "Gymnastics", status: "Sponsored", rank: "Top 5", likes: "34.1K", comments: "458", views: "—" },
  { image: "/ucla-content/post2.jpg", avatar: 0, avatarSrc: UCLA_HS.roch, name: "Roch Cholowsky", sport: "Baseball", status: "Organic", rank: "Top 5", likes: "27.8K", comments: "149", views: "454K" },
  { image: "/ucla-content/post3.jpg", avatar: 0, avatarSrc: UCLA_HS.roch, name: "Roch Cholowsky", sport: "Baseball", status: "Sponsored", rank: "Top 10", likes: "15.7K", comments: "161", views: "—" },
  { image: "/ucla-content/post4.jpg", avatar: 0, avatarSrc: UCLA_HS.chiles, name: "Jordan Chiles", sport: "Gymnastics", status: "Organic", rank: "Top 10", likes: "11.7K", comments: "145", views: "—" },
  { image: "/ucla-content/post5.jpg", avatar: 0, avatarSrc: UCLA_HS.nico, name: "Nico Iamaleava", sport: "Football", status: "Organic", rank: "Top 10", likes: "8.7K", comments: "117", views: "—" },
  { image: "/ucla-content/post6.jpg", avatar: 0, avatarSrc: UCLA_HS.roch, name: "Roch Cholowsky", sport: "Baseball", status: "Sponsored", rank: "Top 25", likes: "3.4K", comments: "12", views: "—" },
  { image: "/ucla-content/post7.jpg", avatar: 0, avatarSrc: UCLA_HS.chiles, name: "Jordan Chiles", sport: "Gymnastics", status: "Sponsored", rank: "Top 25", likes: "1.5K", comments: "26", views: "51.7K" },
  { image: "/ucla-content/post8.jpg", avatar: 0, avatarSrc: UCLA_HS.nico, name: "Nico Iamaleava", sport: "Football", status: "Sponsored", rank: "Ranked", likes: "721", comments: "24", views: "—" },
];

/* ── Real-app-style icons for the lock-screen notifications ── */
function AppIcon({ app }: { app: string }) {
  const base = "mt-0.5 h-7 w-7 shrink-0 rounded-[8px]";
  if (app === "JABA") {
    return <img src="/jaba-face.png" alt="" aria-hidden className={`${base} object-cover`} />;
  }
  if (app === "Messages") {
    return (
      <span className={`${base} flex items-center justify-center`} style={{ background: "linear-gradient(180deg,#67e26b,#25b53c)" }}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff" aria-hidden>
          <path d="M12 4.2c-5.2 0-9.4 3.3-9.4 7.4 0 2.4 1.4 4.5 3.6 5.8-.1.9-.5 2-1.4 2.9 0 0 2-.1 3.9-1.4.7.2 1.8.2 3.3.2 5.2 0 9.4-3.3 9.4-7.5S17.2 4.2 12 4.2z" />
        </svg>
      </span>
    );
  }
  if (app === "Phone") {
    return (
      <span className={`${base} flex items-center justify-center`} style={{ background: "linear-gradient(180deg,#5cd669,#12a63e)" }}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff" aria-hidden>
          <path d="M6.8 10.6c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.9 20.9 3.1 13.1 3.1 3.8c0-.6.5-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1l-2.2 2.2z" />
        </svg>
      </span>
    );
  }
  if (app === "Instagram") {
    return (
      <span className={`${base} flex items-center justify-center`} style={{ background: "linear-gradient(135deg,#7C3AED 0%,#E1306C 55%,#F58529 100%)" }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.8" cy="7.2" r="1.1" fill="#fff" stroke="none" />
        </svg>
      </span>
    );
  }
  if (app === "Gmail") {
    return (
      <span className={`${base} flex items-center justify-center bg-white`} style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,.07)" }}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
          <rect x="3.5" y="6.5" width="3" height="11" rx="1" fill="#4285F4" />
          <rect x="17.5" y="6.5" width="3" height="11" rx="1" fill="#34A853" />
          <path d="M3.5 7.6 12 13.9l8.5-6.3v3.4L12 17.3 3.5 11z" fill="#EA4335" />
          <path d="M3.5 11.2l3 2.2v4.1h-2c-.6 0-1-.4-1-1z" fill="#FBBC04" />
        </svg>
      </span>
    );
  }
  if (app === "Calendar") {
    return (
      <span className={`${base} flex flex-col items-center justify-center bg-white`} style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,.07)" }}>
        <span style={{ fontSize: 5, fontWeight: 800, letterSpacing: "0.08em", color: "#ff453a", lineHeight: 1.4 }}>FRI</span>
        <span className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: "#111", lineHeight: 1 }}>24</span>
      </span>
    );
  }
  return <span className={`${base}`} style={{ background: "#c7cdd6" }} />;
}

/* ── Lock-screen phone: an endless stream of notifications keeps pouring in ── */
function NotificationCard({ n }: { n: { app: string; tone: string; dark?: boolean; title: string; body: string; time: string } }) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-2xl px-3 py-2.5"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow:
          "0 8px 22px rgba(0,0,0,0.08), inset 2px 2px 1px -2px rgba(255,255,255,0.95), inset -2px -2px 1px -2px rgba(255,255,255,0.6), inset 1px 1px 1px -0.5px rgba(255,255,255,0.5), inset -1px -1px 1px -0.5px rgba(0,0,0,0.1)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
      }}
    >
      <AppIcon app={n.app} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-sans text-[12.5px] font-semibold text-[#0a0a0a]">{n.title}</p>
          <span className="shrink-0 font-sans text-[10px] text-black/45">{n.time}</span>
        </div>
        <p className="truncate font-sans text-[11.5px] text-black/60">{n.body}</p>
      </div>
    </div>
  );
}

const PHONE_NOTES = [
  { app: "JABA", tone: LIME, dark: true, title: "New deal to approve", body: "Nike × Jordan Chiles" },
  { app: "Instagram", tone: "#e1306c", title: "New post is live", body: "Nico Iamaleava tagged @vuoriclothing" },
  { app: "JABA", tone: LIME, dark: true, title: "Reminder", body: "Roch's MLB The Show promo due Friday" },
  { app: "Gmail", tone: "#1a8cff", title: "Agent request", body: "Loop me in on the Degree deal" },
  { app: "Calendar", tone: "#ff453a", title: "Meet & greet in 1 hour", body: "Kiki Rice" },
  { app: "JABA", tone: "#ff6b6b", dark: true, title: "Overdue", body: "Nike Player Edition post" },
  { app: "Phone", tone: "#12a63e", title: "Missed call (2)", body: "Voltic team" },
  { app: "JABA", tone: LIME, dark: true, title: "Compliance cleared", body: "Peacock promo approved by UCLA" },
  { app: "Messages", tone: "#34c759", title: "Athlete replied", body: "Roch: got it, posting tonight" },
  { app: "JABA", tone: "#ff6b6b", dark: true, title: "Deadline today", body: "Degree World Cup reel" },
  { app: "Gmail", tone: "#1a8cff", title: "Brand inquiry", body: "Partnership request for Sienna Betts" },
  { app: "Calendar", tone: "#ff453a", title: "Content shoot", body: "Jordan Chiles, 3:00 PM" },
];
const PHONE_TIMES = ["now", "1m", "2m", "4m", "6m", "9m", "14m"];

function NotificationPhone() {
  const reduce = useReducedMotion();
  const WINDOW = 6;
  const [visible, setVisible] = useState(() =>
    Array.from({ length: WINDOW }, (_, i) => ({ ...PHONE_NOTES[i % PHONE_NOTES.length], id: i })),
  );

  useEffect(() => {
    if (reduce) return;
    let noteIdx = WINDOW;
    let uid = 1000;
    const t = setInterval(() => {
      const n = PHONE_NOTES[noteIdx % PHONE_NOTES.length];
      noteIdx += 1;
      const id = uid++;
      // new one drops in at the top; the rest shift down, the last slides off
      setVisible((prev) => [{ ...n, id }, ...prev].slice(0, WINDOW + 1));
    }, 1900);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-[300px] max-w-full">
      <div
        className="relative overflow-hidden rounded-[46px] border border-black/10 bg-[#eef0f3] p-3"
        style={{
          aspectRatio: "9 / 19",
          boxShadow: "0 0 0 6px #17181b, 0 0 0 7px rgba(0,0,0,0.18), 0 40px 90px rgba(0,0,0,0.28)",
        }}
      >
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, #ffffff, #e8ebef 62%)" }} />
        {/* dynamic island */}
        <div className="relative mx-auto mt-1 h-7 w-24 rounded-full bg-black" />
        {/* time */}
        <div className="relative mt-4 text-center">
          <p className="font-sans text-[13px] font-medium text-black/60">Friday, July 24</p>
          <p className="font-sans text-[62px] font-semibold leading-none text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>9:41</p>
        </div>
        {/* notifications: newest drops in on top, the stack shifts down */}
        <div className="absolute inset-x-3 bottom-3" style={{ top: "196px", overflow: "hidden" }}>
          <div className="space-y-2 px-1">
            <AnimatePresence initial={false}>
              {visible.map((n, idx) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: -28, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, transition: { duration: 0.3 } }}
                  transition={{ type: "spring", stiffness: 460, damping: 34 }}
                >
                  <NotificationCard n={{ ...n, time: PHONE_TIMES[idx] ?? "" }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* soft slide-off at the very bottom only */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(0deg, #e9ecf0 35%, transparent)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Problem framing: text + an iPhone that fills with notifications ── */
function MovingPieces() {
  const reduce = useReducedMotion();
  const pieces = ["Athletes", "Agents", "Deliverables", "Posts", "Reminders", "Approvals", "Things going wrong"];
  return (
    <section className="relative flex min-h-screen items-center bg-white">
      <div className={`${WRAP} w-full py-16`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <FadeUp>
              <h2 className="font-deck text-3xl leading-[1.1] text-[#0a0a0a] md:text-5xl">
                Athlete brand deals increased.{" "}
                <span className="text-black/55">Managing athletes didn&rsquo;t get easier.</span>
              </h2>
              <p className="mt-6 font-sans text-lg text-black/50">
                More deals means more moving pieces:
              </p>
            </FadeUp>

            <motion.ul
              className="mt-6 flex max-w-xl flex-wrap items-baseline justify-center gap-x-3 gap-y-2 lg:justify-start"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12%" }}
              variants={{ show: { transition: { staggerChildren: 0.14 } } }}
            >
              {pieces.map((p, i) => {
                const last = i === pieces.length - 1;
                return (
                  <motion.li
                    key={p}
                    variants={{ hidden: { opacity: 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex items-baseline gap-x-3 font-sans text-lg leading-snug md:text-xl ${last ? "text-black/40" : "text-black/80"}`}
                  >
                    {p}
                    {!last && <span aria-hidden className="text-black/25">·</span>}
                  </motion.li>
                );
              })}
            </motion.ul>
            <FadeUp delay={0.15}>
              <p className="font-deck mt-8 text-2xl leading-[1.15] text-[#0a0a0a] md:text-4xl">
                And now <span style={{ background: LIME, color: "#000", padding: "0 0.12em", borderRadius: "2px" }}>NIL Go</span> adds another layer to manage.
              </p>
            </FadeUp>
          </div>

          {/* Phone */}
          <FadeUp delay={0.1} className="flex justify-center lg:justify-end">
            <NotificationPhone />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Deck port §01b: "Meet JABA" — black card on a white section, with the
   walking-mascot video masked into the corner. ── */
function MeetJabaSection() {
  return (
    <section className="meets deck scroll-mt-32 md:scroll-mt-40" style={{ background: "#fff" }}>
      <div className={`${WRAP} py-16 md:py-24`}>
        <FadeUp>
          <div className="meetbox">
            <video className="walkvid" autoPlay muted loop playsInline aria-label="JABA character walking in">
              <source src="/deck/jaba-walk.mp4" type="video/mp4" />
            </video>
            <div className="meettext">
              <h2 className="font-deck text-4xl leading-[1.06] text-white md:text-6xl">Meet JABA.</h2>
              <p className="mt-5 font-sans text-xl font-semibold text-white/85 md:mt-7 md:text-2xl">
                AI that manages the
              </p>
              <ul className="mt-4 space-y-2.5 md:mt-5">
                {["Tasks", "Deliverables", "Follow-ups", "Reminders"].map((item) => (
                  <li key={item} className="flex items-center gap-4 font-deck text-2xl text-white md:text-[2.1rem]">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full md:h-2.5 md:w-2.5" style={{ background: LIME }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="em font-deck mt-5 text-2xl md:mt-6 md:text-[2.1rem]">around athletes.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── The campaign-lifecycle rail, ported verbatim from the Playfly GM deck
   (slide 2): icon + ghost number + connector dots + railfoot. ── */
function Lifecycle() {
  const steps = [
    { n: "01", icon: "/deck/ic-understand.png", title: "Understand", body: "A deep read on every athlete and brand: audience, content, sponsored history, and value." },
    { n: "02", icon: "/deck/ic-enrich.png", title: "Match and pitch", body: "Where athletes and brands overlap, with contact enrichment and the pitch." },
    { n: "03", icon: "/deck/ic-manage.png", title: "Manage and deliver", body: "Contracts, deliverables, due dates, and approvals, with athletes and agents coordinated over text." },
    { n: "04", icon: "/deck/ic-measure.png", title: "Measure and report", body: "Campaign results, IP impact, and reporting back to the brand." },
  ];
  return (
    <section className="deck relative bg-black">
      <div className={`${WRAP} py-24 md:py-32`}>
        <FadeUp>
          <h2 className="font-deck text-center text-4xl leading-[1.08] text-white md:text-5xl">
            JABA manages the entire <span className="em">campaign lifecycle.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="rail">
            {steps.map((s) => (
              <div className="rs" key={s.n}>
                <div className="rshead">
                  <span className="rghost">{s.n}</span>
                  <img className="rsi" src={s.icon} alt="" />
                  <span className="rdot" />
                </div>
                <div className="rst">{s.title}</div>
                <div className="rsd">{s.body}</div>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="railfoot">
            <span className="rflayers">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke={LIME} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(223,255,0,.55))" }}>
                <path d="M12 3 20.5 8 12 13 3.5 8Z" />
                <path d="M3.5 12 12 17 20.5 12" />
                <path d="M3.5 16 12 21 20.5 16" />
              </svg>
            </span>
            <span className="rfdiv" />
            <span className="rftext">Your data, campaigns, conversations, and workflows <b>in one place.</b></span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── The radial "everything around the athlete" diagram, ported from the deck
   (spokes drawn core-to-node by layoutArch). Real UCLA athlete + real post. ── */
function ConsolidatedCard() {
  const archRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const arch = archRef.current;
    if (!arch) return;
    const layout = () => {
      const svg = arch.querySelector("svg");
      const core = arch.querySelector<HTMLElement>(".archcore");
      if (!svg || !core) return;
      const r = arch.getBoundingClientRect();
      if (r.width < 20) return;
      svg.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      const cr = core.getBoundingClientRect();
      const cx = cr.left + cr.width / 2 - r.left;
      const cy = cr.top + cr.height / 2 - r.top;
      const coreR = cr.width / 2;
      const lines = svg.querySelectorAll("line");
      const cards = arch.querySelectorAll<HTMLElement>(".nd");
      cards.forEach((card, i) => {
        const ln = lines[i];
        if (!ln) return;
        const b = card.getBoundingClientRect();
        const mx = b.left + b.width / 2 - r.left;
        const my = b.top + b.height / 2 - r.top;
        const vx = cx - mx;
        const vy = cy - my;
        const hw = b.width / 2 - 2;
        const hh = b.height / 2 - 2;
        const s = Math.min(hw / Math.abs(vx || 1e-6), hh / Math.abs(vy || 1e-6));
        const ex = mx + vx * s;
        const ey = my + vy * s;
        const d = Math.hypot(ex - cx, ey - cy) || 1;
        const sx = cx + ((ex - cx) / d) * (coreR + 4);
        const sy = cy + ((ey - cy) / d) * (coreR + 4);
        ln.setAttribute("x1", sx.toFixed(1));
        ln.setAttribute("y1", sy.toFixed(1));
        ln.setAttribute("x2", ex.toFixed(1));
        ln.setAttribute("y2", ey.toFixed(1));
      });
    };
    layout();
    const t1 = setTimeout(layout, 300);
    const t2 = setTimeout(layout, 900);
    window.addEventListener("resize", layout);
    arch.querySelectorAll("img").forEach((im) => {
      if (!im.complete) im.addEventListener("load", layout);
    });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", layout);
    };
  }, []);
  return (
    <section className="deck relative bg-black">
      <div className={`${WRAP} py-20 md:py-28`}>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-deck text-3xl leading-[1.1] text-white md:text-[2.7rem]">
            Everything around the athlete, <span className="em">and what it takes to manage them.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg leading-relaxed text-white/65 md:text-xl">
            JABA sees the campaign, tracks what is due, picks up action items from
            emails, watches when posts go out, and flags what needs attention.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="arch" ref={archRef}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line className="main" x1="50" y1="50" x2="27" y2="50" />
              <line className="main" x1="50" y1="50" x2="73" y2="50" />
              <line className="rev" x1="50" y1="50" x2="34" y2="28" />
              <line className="rev" x1="50" y1="50" x2="50" y2="19" />
              <line className="rev" x1="50" y1="50" x2="66" y2="28" />
              <line x1="50" y1="50" x2="31" y2="73" />
              <line x1="50" y1="50" x2="48" y2="79" />
              <line x1="50" y1="50" x2="66" y2="74" />
              <line className="rev" x1="50" y1="50" x2="80" y2="71" />
            </svg>
            <div className="archcore"><img src="/deck/jaba-avatar.png" alt="JABA" /></div>

            <div className="nd big" style={{ left: "12%", top: "50%" }}>
              <div className="nk">Athlete</div>
              <div className="ndrow"><img className="ndav" src="/athletehs2.png" alt="" /><div><div className="ndt">Maya Ellison</div><div className="ndm">Track &amp; Field</div></div></div>
            </div>
            <div className="nd big" style={{ left: "88%", top: "50%" }}>
              <div className="nk">Campaign</div>
              <div className="ndrow"><span className="ndmono" style={{ background: "linear-gradient(160deg,#2c3a1e,#131a0d)" }}>V</span><div><div className="ndt">Voltic Energy</div><div className="ndm">Game week</div></div></div>
            </div>
            <div className="nd" style={{ left: "27%", top: "18%" }}>
              <div className="nk">Deliverable</div>
              <div className="ndrow"><span className="ndico" style={{ background: "linear-gradient(160deg,#E8306E,#B4184D)" }}>&#9654;</span><div><div className="ndt">In-feed post</div><div className="ndm">Due Fri</div></div></div>
            </div>
            <div className="nd" style={{ left: "50%", top: "11%" }}>
              <div className="nk">Tasks</div>
              <div className="ndchk"><i>&#10003;</i>Confirm assets</div>
              <div className="ndchk"><i>&#10003;</i>Send brief</div>
            </div>
            <div className="nd" style={{ left: "73%", top: "18%" }}>
              <div className="nk">Reminder</div>
              <div className="ndrow"><span className="ndico" style={{ background: "linear-gradient(160deg,#7C5BE0,#5B39C4)" }}>&#128276;</span><div><div className="ndt">Draft due</div><div className="ndm">Fri 9:00 AM</div></div></div>
            </div>
            <div className="nd" style={{ left: "20%", top: "85%" }}>
              <div className="nk">Agent</div>
              <div className="ndrow"><span className="ndinit" style={{ background: "linear-gradient(160deg,#D98CAE,#C05E86)" }}>AG</span><div><div className="ndt">Talent agent</div><div className="ndm">looped in</div></div></div>
            </div>
            <div className="nd" style={{ left: "40%", top: "85%" }}>
              <div className="nk">Email</div>
              <div className="ndrow"><span className="ndico" style={{ background: "linear-gradient(160deg,#3B9BF0,#2168C4)" }}>&#9993;</span><div><div className="ndt">Contract redline</div><div className="ndm">from Voltic &middot; 2m ago</div></div></div>
            </div>
            <div className="nd" style={{ left: "60%", top: "85%" }}>
              <div className="nk">Post</div>
              <div className="ndrow"><img className="ndthumb" src="/post7.png" alt="" /><div><div className="ndt">@maya.ell</div><div className="ndm">&#10084; 5.1K &middot; went live</div></div></div>
            </div>
            <div className="nd nilv" style={{ left: "80%", top: "85%" }}>
              <div className="nk">NIL Go</div>
              <div className="ndt">Disclosure ready</div>
              <div className="ndm">cleared to run</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Deck port §01d: "JABA keeps the work moving" — numbered operating loop
   + the NIL Team iMessage card. Chat adapted to the real UCLA deal. ── */
function WorkMovingSection() {
  const steps = [
    { n: 1, t: "Campaign created" },
    { n: 2, t: "Deliverables and dates added" },
    { n: 3, t: "Tasks and reminders assigned" },
    { n: 4, t: "An email arrives, or a post goes out" },
    { n: 5, t: "JABA picks up the action item", hero: true },
    { n: 6, t: "The right person gets nudged, or escalated" },
  ];
  return (
    <section className="loops deck relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} py-24 md:py-32`}>
        <div className="loopwrap">
          <FadeUp className="loopside">
            <h2 className="font-deck text-4xl leading-[1.05] text-white md:text-5xl">
              JABA keeps the <span className="em">work moving.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans text-lg font-medium text-white/70 md:text-xl">
              Never worry about sending a follow-up again.
            </p>
            <div className="flow">
              <div className="fsteps live">
                <div className="fspine on" />
                {steps.map((s) => (
                  <div key={s.n} className={`fstep${s.hero ? " hero" : ""}`}>
                    <span className="fn">{s.n}</span>
                    <span className="ft">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="looptag">
              Not just where the deal lives. <b>Where the follow-up happens.</b>
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="msgcard">
            <div className="msgnav">
              <div className="msgavs">
                <span className="mav c">C</span>
                <span className="mav s">S</span>
                <img src="/jaba-face.png" alt="" />
              </div>
              <span className="nm">NIL Team</span>
            </div>
            <div className="msgthread">
              <div className="msgdate">Today 2:14 PM</div>
              <div className="msgsender">Coach Davis</div>
              <div className="msgrow"><span className="mav c">C</span><div className="msgbub">Did the Vuori reel go up today?</div></div>
              <div className="msgsender jb">JABA</div>
              <div className="msgrow"><img src="/jaba-face.png" alt="" /><div className="msgbub">&#9888;&#65039; Not yet, it missed the deadline. Nudging Nico now, and I&rsquo;ll flag you if it slips again.</div></div>
              <div className="msgsender jb">JABA</div>
              <div className="msgrow"><img src="/jaba-face.png" alt="" /><div className="msgbub">&#128232; The brand also emailed the redline. Flagged it and set the countersign reminder.</div></div>
              <div className="msgbub me">appreciate it &#128588;</div>
            </div>
            <div className="msgbar"><span className="msgfield">iMessage</span><span className="msgsend">&#8593;</span></div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Deck port §07: "JABA finds the overlap" — replaces the pitch-flow
   dashboard on the UCLA variant. Athlete data is real (Nico Iamaleava);
   the brand card is labeled an example target, matching the deck. ── */
function OverlapSection() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            el.classList.add("play");
            o.disconnect();
          }
        }
      },
      { threshold: 0.45 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <section ref={ref} className="ovs deck relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} py-24 md:py-32`}>
        <h2 className="font-deck text-4xl leading-[1.08] text-white md:text-5xl">
          JABA finds <span className="em">the overlap.</span>
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
          Pick an athlete. JABA researches the brand, matches it against the
          athlete, enriches the contacts, and drafts the pitch with the
          evidence attached.
        </p>

        <div className="pick">
          <span className="pklab">Select an athlete</span>
          <img className="pk dim" src="/athletehs1.png" alt="" />
          <img className="pk sel" src="/athleteheadshot.png" alt="Jake Banks" />
          <img className="pk dim" src="/athletehs3.png" alt="" />
          <img className="pk dim" src="/athletehs4.png" alt="" />
          <img className="pk dim" src="/athletehs5.png" alt="" />
        </div>

        <div className="ov">
          <div className="ovcard">
            <span className="ovpill">The athlete</span>
            <div className="ovhead">
              <img src="/athleteheadshot.png" alt="" />
              <div>
                <div className="ovname">Jake Banks</div>
                <div className="ovmeta">QB &middot; Football &middot; 184K followers</div>
              </div>
            </div>
            <div className="ovrow"><div className="ovk">Proven categories</div><div className="ovv">Game-day hydration routines already run through his content</div></div>
            <div className="ovrow"><div className="ovk">Content mix</div><div className="ovv">Training, film breakdowns, and game-day routines</div></div>
            <div className="ovrow"><div className="ovk">Sponsored performance</div><div className="ovv">9.7% engagement, well above his cohort&rsquo;s 6.2%</div></div>
            <div className="ovrow"><div className="ovk">Brand fit, ranked</div><div className="ovv">Performance &amp; hydration &middot; Energy &middot; Apparel</div></div>
          </div>

          <div className="ovmid">
            <div className="ovmidtitle">THE <span>OVERLAP</span></div>
            <div className="ovscan">MATCHING</div>
            <div className="ovhit"><div className="ovhk">Proven category</div><div className="ovhv">Hydration content is already live in his feed</div></div>
            <div className="ovhit"><div className="ovhk">Audience match</div><div className="ovhv">His performance-minded audience over-indexes on Apex&rsquo;s core demo</div></div>
            <div className="ovhit"><div className="ovhk">Campaign angle</div><div className="ovhv">Game-day hydration ritual, in his voice rather than a script read</div></div>
          </div>

          <div className="ovcard light">
            <span className="ovpill onlight">The brand &middot; example target</span>
            <div className="ovhead">
              <div>
                <div className="ovname">Apex Hydration</div>
                <div className="ovmeta">Beverage &middot; Performance hydration</div>
              </div>
            </div>
            <div className="ovrow"><div className="ovk">Why it surfaced</div><div className="ovv">Performance &amp; hydration is his top JABA brand-fit</div></div>
            <div className="ovrow"><div className="ovk">Contacts found</div><div className="ovv">3 decision makers, titles and emails enriched</div></div>
            <div className="ovrow"><div className="ovk">Pitch drafted</div><div className="ovv">Concept, deliverables, and pricing, in your sender&rsquo;s voice</div></div>
            <div className="ovrow"><div className="ovk">Next action</div><div className="ovv">Sequence queued, follow-up set for day 4</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Deck port §9: "Deliverables, due dates, and reminders in one calendar"
   — month grid + New-reminder panel. Fictional people, matching the deck. ── */
function CalendarSection() {
  const week1 = [
    { n: 27, out: true }, { n: 28, out: true }, { n: 29, out: true }, { n: 30, out: true },
    { n: 1 }, { n: 2 }, { n: 3 },
  ];
  return (
    <section className="cals deck relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} py-24 md:py-32`}>
        <FadeUp>
          <h2 className="font-deck text-4xl leading-[1.08] text-white md:text-5xl" style={{ maxWidth: "38ch" }}>
            Deliverables, due dates, and reminders <span className="em">in one calendar.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Every deliverable carries its own due date, owner, and reminder.
            Reschedule one and everything attached to it moves with it.
          </p>
        </FadeUp>
        <div className="calwrap">
          <FadeUp delay={0.1} className="cal">
            <div className="caldrag">Drag a reminder to reschedule it</div>
            <div className="calhead">
              <div className="calnav"><i>&lsaquo;</i><i>&rsaquo;</i></div>
              <div className="calmo">October 2026</div>
              <div className="seg"><span className="on">Month</span><span>Week</span><span>Day</span></div>
              <div className="everyone"><span className="str">&#9733;</span>Everyone</div>
            </div>
            <div className="cgrid">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <div key={d} className="cdow">{d}</div>
              ))}
              {week1.map((d) => (
                <div key={`w1-${d.n}`} className={`cday${d.out ? " out" : ""}`}><span className="cdn">{d.n}</span></div>
              ))}
              <div className="cday"><span className="cdn">4</span></div>
              <div className="cday"><span className="cdn today">5</span></div>
              <div className="cday"><span className="cdn">6</span><div className="ev rem">REMINDER<span className="av">JB</span></div><div className="ev bill">APPROVAL<span className="av">YO</span></div></div>
              <div className="cday"><span className="cdn">7</span></div>
              <div className="cday"><span className="cdn">8</span></div>
              <div className="cday"><span className="cdn">9</span><div className="ev bill">APPROVAL<span className="av">YO</span></div></div>
              <div className="cday"><span className="cdn">10</span><div className="ev post">POST<span className="av">JB</span></div></div>
              <div className="cday"><span className="cdn">11</span><div className="ev story">STORY<span className="av">JB</span></div></div>
              <div className="cday"><span className="cdn">12</span><div className="ev story">STORY<span className="av">JB</span></div><div className="ev event">EVENT<span className="av">JB</span></div></div>
              <div className="cday"><span className="cdn">13</span></div>
              <div className="cday"><span className="cdn">14</span><div className="ev rem">REMINDER<span className="av">AT</span></div></div>
              <div className="cday"><span className="cdn">15</span></div>
              <div className="cday"><span className="cdn">16</span></div>
              <div className="cday"><span className="cdn">17</span></div>
              {[18, 19, 20, 21, 22, 23, 24].map((n) => (
                <div key={`w4-${n}`} className="cday"><span className="cdn">{n}</span></div>
              ))}
              <div className="cday"><span className="cdn">25</span></div>
              <div className="cday"><span className="cdn">26</span></div>
              <div className="cday"><span className="cdn">27</span></div>
              <div className="cday"><span className="cdn">28</span></div>
              <div className="cday"><span className="cdn">29</span></div>
              <div className="cday"><span className="cdn">30</span><div className="ev event2">INVOICE<span className="av">YO</span></div></div>
              <div className="cday"><span className="cdn">31</span></div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="rpanel">
            <div className="rph"><span className="rpic">&#128276;</span><span className="rpt">New reminder</span><span className="rpx">&times;</span></div>
            <div className="rlab">WHO TO REMIND</div>
            <div className="rsel">Brooks, Apex</div>
            <div className="rdrop">
              <div className="rgl">JUST ME</div>
              <div className="rp"><span className="rcb" /><span className="rav" style={{ background: "#8A8F98" }}>YO</span><span className="rpn">You</span><span className="rpr">GM</span></div>
              <div className="rgl">ATHLETES</div>
              <div className="rp"><span className="rcb on">&#10003;</span><span className="rav"><img src="/deck/athlete-fake.svg" alt="" /></span><span className="rpn">Jalen Brooks</span><span className="rpr">Assigned to</span></div>
              <div className="rgl">AGENTS</div>
              <div className="rp"><span className="rcb on">&#10003;</span><span className="rav" style={{ background: "#6642CE" }}>AT</span><span className="rpn">Apex Talent Group</span><span className="rpr">Jalen&rsquo;s agency</span></div>
            </div>
            <div className="rlab">ABOUT</div>
            <div className="rsel">Deliverable &middot; In-feed Reel</div>
            <div className="rlab">MESSAGE</div>
            <div className="rsel ghost">Reel draft due Monday</div>
            <div className="rvia"><span className="rlab" style={{ margin: 0 }}>NOTIFY VIA</span><div className="seg"><span className="on">Text</span><span>Email</span></div></div>
            <div className="rbtn">Schedule reminder</div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── "Weekly reports. Own your success." — numbered list + a mock of the real
   weekly report. Universal: fictional athletes and a generic program, no school
   named. ── */
function ReportBrandSection() {
  return (
    <section className="reps deck relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} py-24 md:py-32`}>
        <FadeUp>
          <h2 className="font-deck text-4xl leading-[1.08] text-white md:text-5xl">
            Weekly reports. <span className="em">Own your success.</span>
          </h2>
        </FadeUp>
        <div className="repwrap">
          <FadeUp delay={0.1} className="repside">
            <div className="replist">
              <div className="rli"><span className="rlin">01</span><div><div className="rlit">Top movers</div><div className="rlid">Who grew this week: follower gains ranked against each athlete&rsquo;s own baseline, with the story behind the spike.</div></div></div>
              <div className="rli"><span className="rlin">02</span><div><div className="rlit">Where you stand</div><div className="rlid">Per-athlete averages benchmarked against your conference, plus your rank in the conference and the NCAA.</div>
                <div className="ipbars">
                  <div className="ipb"><span className="iplab">Conference avg</span><span className="iptrack"><i style={{ width: "58%", background: "rgba(247,247,238,.24)" }} /></span></div>
                  <div className="ipb"><span className="iplab">Your roster</span><span className="iptrack"><i style={{ width: "100%", background: "var(--lime)" }} /></span><b className="iplift">+26%</b></div>
                </div></div></div>
              <div className="rli"><span className="rlin">03</span><div><div className="rlit">Milestones</div><div className="rlid">Most followers gained, most talked about, engagement outliers, called out automatically every week.</div></div></div>
              <div className="rli"><span className="rlin">04</span><div><div className="rlit">Sponsored this week</div><div className="rlid">Every paid partnership caught, counted, and ranked against the rest of your conference.</div></div></div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="repcard">
            <div className="reph">
              <img
                src="/deck/jaba-avatar.png"
                alt=""
                aria-hidden
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  flexShrink: 0,
                  objectFit: "cover",
                  border: "2px solid rgba(226,245,0,.55)",
                  background: "#131a0d",
                }}
              />
              <div><div className="rl">Weekly report</div></div>
            </div>
            <div className="mvk">This week&rsquo;s top movers</div>
            <div className="movers">
              <div className="mvcard mv-blue">
                <img className="mvav" src="/athletehs3.png" alt="" />
                <div className="mvname">Maya Ellison</div>
                <div className="mvsport">Gymnastics (W)</div>
                <div className="mvpct">+2.7%</div>
              </div>
              <div className="mvcard mv-dark">
                <img className="mvav" src="/athletehs1.png" alt="" />
                <div className="mvname">Jaylen Cole</div>
                <div className="mvsport">Track and Field</div>
                <div className="mvpct">+14.3%</div>
              </div>
              <div className="mvcard mv-red">
                <img className="mvav" src="/athletehs4.png" alt="" />
                <div className="mvname">Sofia Marsh</div>
                <div className="mvsport">Soccer (W)</div>
                <div className="mvpct">+2.6%</div>
              </div>
            </div>
            <div className="mvk">Conference leaderboard &middot; sponsored posts</div>
            <div className="lb">
              <div className="lbrow"><span className="lbrank">1</span><span className="lbname">Arlington St.</span><span className="lbval">866</span></div>
              <div className="lbrow you"><span className="lbrank">2</span><span className="lbname">Your program</span><span className="lbval">574</span></div>
              <div className="lbrow"><span className="lbrank">3</span><span className="lbname">Ridgemont</span><span className="lbval">557</span></div>
              <div className="lbrow"><span className="lbrank">4</span><span className="lbname">Carver State</span><span className="lbval">535</span></div>
              <div className="lbrow"><span className="lbrank">5</span><span className="lbname">Westbrook</span><span className="lbval">445</span></div>
            </div>
            <div className="lbfoot">You rank 2 of 16 in your conference &middot; 17 of 264 in the NCAA</div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Simple annual pricing (centered closing beat) ── */
function PricingSection() {
  return (
    <section className="audience-page-cta scroll-mt-40 md:scroll-mt-48">
      <div className="audience-page-cta-inner pt-28 md:pt-36">
        <FadeUp>
          <p
            className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-white/40"
            style={{ margin: "0 0 1.75rem" }}
          >
            Simple annual pricing
          </p>
          <h2 className="audience-page-cta-h2">Run your NIL program on JABA.</h2>
          <p
            className="font-sans font-extrabold leading-none"
            style={{
              color: LIME,
              fontSize: "clamp(4.5rem, 11vw, 8.5rem)",
              fontVariantNumeric: "tabular-nums",
              margin: "0.25rem 0 0",
            }}
          >
            $2,500
          </p>
          <p
            className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-white/40"
            style={{ margin: "0.75rem 0 0" }}
          >
            Per year
          </p>
          <p className="audience-page-cta-sub" style={{ margin: "1.5rem 0 2.5rem" }}>
            Full access to JABA for your athletic department.
          </p>
          <div className="audience-page-hero-cta">
            <VoltButton
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
            >
              Get started
            </VoltButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Athlete + agent coordination (UCLA) — clean dark ── */
function CoordinationSection() {
  const parties = [
    { role: "Athlete", name: "Jordan Chiles", status: "Approved", ready: true },
    { role: "Agent", name: "Talent agent", status: "Approved", ready: true },
    { role: "Compliance", name: "UCLA Athletics", status: "In review", ready: false },
  ];
  const thread = [
    { who: "JABA", lime: true, text: "Nike deal is drafted. Looping in the agent and UCLA compliance for sign-off." },
    { who: "Agent", lime: false, text: "Approved on our side. Deliverables and usage rights look right." },
    { who: "Athlete", lime: false, text: "Good to go." },
    { who: "JABA", lime: true, text: "Both approved. Sent to UCLA compliance for final review, I'll nudge if it stalls." },
  ];
  return (
    <section className="relative overflow-hidden bg-black scroll-mt-32 md:scroll-mt-40">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "#000" }}
      />
      <div className={`relative ${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Athletes + Agents</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Keep every athlete and their agent{" "}
            <span className="italic" style={{ color: LIME }}>on the same page.</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            UCLA athletes bring their own agents and reps. JABA loops them in
            automatically, so deals, deliverables, and approvals move without your
            staff playing middleman.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12">
          <GlassPanel className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
              {/* Parties + approvals */}
              <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                  Deal · Nike
                </p>
                <ul className="mt-3 space-y-2">
                  {parties.map((p) => (
                    <li
                      key={p.role}
                      className="rounded-xl border px-3 py-2"
                      style={{
                        borderColor: p.ready ? "rgba(223,255,0,0.3)" : "rgba(255,255,255,0.1)",
                        background: p.ready ? "rgba(223,255,0,0.05)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-sans text-[12.5px] font-medium text-white">{p.name}</p>
                        <span
                          className="flex shrink-0 items-center gap-1 font-sans text-[9px] font-semibold uppercase tracking-[0.08em]"
                          style={{ color: p.ready ? LIME : "rgba(255,255,255,0.4)" }}
                        >
                          {p.ready && <Check className="h-3 w-3" />}
                          {p.status}
                        </span>
                      </div>
                      <p className="font-sans text-[10.5px] text-white/40">{p.role}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coordination thread */}
              <div className="p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <p className="font-sans text-[13px] font-extrabold uppercase tracking-[0.04em] text-white">Coordination</p>
                  <span className="font-sans text-[11px] text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>2 of 3 approved</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {thread.map((m, i) => (
                    <li key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <span
                        className="font-sans text-[11px] font-semibold"
                        style={{ color: m.lime ? LIME : "rgba(255,255,255,0.85)" }}
                      >
                        {m.who}
                      </span>
                      <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-white/70">{m.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </section>
  );
}

export default function ForSchoolsPage({
  bare,
  hideBrands,
  pricing,
  ucla,
}: { bare?: boolean; hideBrands?: boolean; pricing?: boolean; ucla?: boolean } = {}) {
  return (
    <PageLayout bare={bare}>
      {/* Hero — image backdrop that fades to black into the first section */}
      <WorldBackdrop type="image" src="/for-schools-hero.png" parallax>
        {ucla ? (
          <div className="px-6 pb-0 pt-48 text-center md:pt-56">
            <img
              src="/deck/jaba-wordmark.png"
              alt="JABA"
              className="mx-auto block"
              style={{ width: "min(440px, 80vw)", filter: "drop-shadow(0 20px 44px rgba(0,0,0,.5))" }}
            />
            <p className="mx-auto mt-6 font-sans font-bold" style={{ fontSize: "clamp(19px,2.4vw,32px)", color: "#f7f7ee" }}>
              AI that helps athletic departments run NIL at scale.
            </p>
            <img
              src="/deck/mascot.png"
              alt=""
              aria-hidden
              className="mx-auto mt-10 block"
              style={{ width: "min(280px, 62vw)", marginBottom: "0", filter: "drop-shadow(0 18px 40px rgba(0,0,0,.35))" }}
            />
          </div>
        ) : (
          <div className="audience-page-hero-inner px-6 pb-32 pt-44 text-center md:pb-44 md:pt-56">
            <h1 className="audience-page-h1 [text-wrap:balance]" style={{ maxWidth: "24ch", marginLeft: "auto", marginRight: "auto", marginBottom: "2.25rem" }}>
              NIL is evolving faster{" "}
              <span className="italic" style={{ color: LIME }}>than the systems built to support it.</span>
            </h1>
            <p
              className="audience-page-subtitle"
              style={{
                color: "rgba(255,255,255,0.72)",
                ...(bare
                  ? { fontSize: "clamp(1.2rem, 1.7vw, 1.65rem)", lineHeight: 1.6, maxWidth: "720px" }
                  : {}),
              }}
            >
              Third-party NIL unlocks opportunity and thousands of deliverables
              to manage. JABA gives your department the operating layer to handle it all.
            </p>
            {!bare && (
              <div className="audience-page-hero-cta">
                <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
              </div>
            )}
          </div>
        )}
      </WorldBackdrop>

      {/* School logo strip — scrolling marquee (white band on UCLA, framed in volt) */}
      {ucla && <div className="h-1.5 w-full bg-[#dfff00]" />}
      <SocialProofSection light={ucla} />

      {/* Problem framing — text-only, animated */}
      {ucla && <MovingPieces />}
      {ucla && <MeetJabaSection />}
      {ucla && <div className="h-1.5 w-full bg-[#dfff00]" />}
      {ucla && <ConsolidatedCard />}

      {/* Content intelligence (UCLA order: before the overlap) */}
      {ucla && (
        <>
          <div className="h-1.5 w-full bg-[#dfff00]" />
          <ContentSection ucla />
          <div className="h-1.5 w-full bg-[#dfff00]" />
        </>
      )}

      {/* Athlete intelligence — UCLA order: before the overlap (fictional athlete) */}
      {ucla && <AthleteIntelligence />}

      {!hideBrands && (ucla ? <OverlapSection /> : <MatchStudio />)}

      {/* Operating loop, then deliverables: deck calendar on UCLA */}
      {ucla && <WorkMovingSection />}
      {ucla ? <CalendarSection /> : <WorkflowSection />}

      {/* Lime divider into the light statement + three-up cards */}
      {!ucla && (
        <>
          <div className="h-1.5 w-full bg-[#dfff00]" />
          <NilInterlude />
          <div className="h-1.5 w-full bg-[#dfff00]" />
        </>
      )}

      {/* Athlete intelligence — world backdrop, centered headline (non-UCLA position) */}
      {!ucla && <AthleteIntelligence />}


      {/* Content — light dashboard beat (non-UCLA position) */}
      {!ucla && (
        <>
          <div className="h-1.5 w-full bg-[#dfff00]" />
          <ContentSection />
          <div className="h-1.5 w-full bg-[#dfff00]" />
        </>
      )}

      {/* Reports — dark dashboard */}
      {ucla ? <ReportBrandSection /> : <ReportsSection />}

      {/* Closing beat — pricing block or CTA */}
      {pricing ? (
        <PricingSection />
      ) : (
        <section className="audience-page-cta scroll-mt-40 md:scroll-mt-48">
          <div className="audience-page-cta-inner pt-28 md:pt-36">
            <h2 className="audience-page-cta-h2">
              JABA helps athletic departments{" "}
              <span className="cta-headline-accent">run NIL at scale.</span>
            </h2>
            <p className="audience-page-cta-sub">
              Never worry about following up with an athlete or their agent again.
            </p>
            <div className="audience-page-hero-cta">
              <VoltButton
                icon={<Zap className="h-4 w-4" />}
                onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
              >
                Book a demo
              </VoltButton>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
