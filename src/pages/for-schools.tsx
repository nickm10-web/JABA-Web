import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
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
const SECTION = "scroll-mt-32 md:scroll-mt-40";
const PADS = "pb-20 pt-28 md:pb-28 md:pt-36";
const CLOUDS = "/videos/Video%20BG%20Web_02.mp4";
const WORLD_IMG = "/header%20BG-%20V4-WithoutBalls_less.jpg";

// Fictional athletes + stock avatars only. No real roster names or photos.
// Live content tiles (stock thumbnails + fictional athletes).
const contentCards = [
  { name: "Tyrell Banks", sport: "Football", img: 15, seed: "jb-tb", likes: "23.5K", comments: "133" },
  { name: "Sofia Marin", sport: "Soccer", img: 45, seed: "jb-sm", likes: "12.3K", comments: "29" },
  { name: "Maya Ellison", sport: "Track & Field", img: 32, seed: "jb-me", likes: "10.5K", comments: "126" },
  { name: "Jordan Pace", sport: "Volleyball", img: 5, seed: "jb-jp", likes: "8.4K", comments: "34" },
  { name: "Devin Cross", sport: "Basketball", img: 12, seed: "jb-dc", likes: "6.6K", comments: "16" },
];

type LeaderRow = { name: string; sport: string; val: string; delta?: string; dir?: "up" | "down" | "flat" };
const lbFollowers: LeaderRow[] = [
  { name: "Tyrell Banks", sport: "Football", val: "184K", delta: "0.3%", dir: "up" },
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
  { name: "Tyrell Banks", sport: "Football", val: "288K", delta: "21.1%", dir: "up" },
  { name: "Devin Cross", sport: "Basketball", val: "123K" },
  { name: "Elena Ruiz", sport: "Cheer", val: "116K", delta: "1.2%", dir: "up" },
];

const rosterRows = [
  { name: "Tyrell Banks", img: 15, followers: "184K", eng: "9.7%", likes: "12.1K", comments: "631", posts: "212", growth: "+8.4%", deals: "6" },
  { name: "Devin Cross", img: 12, followers: "142K", eng: "8.1%", likes: "9.7K", comments: "402", posts: "188", growth: "+5.2%", deals: "4" },
  { name: "Sofia Marin", img: 45, followers: "96K", eng: "7.4%", likes: "6.8K", comments: "274", posts: "164", growth: "+6.9%", deals: "3" },
  { name: "Maya Ellison", img: 32, followers: "71K", eng: "6.1%", likes: "4.2K", comments: "188", posts: "143", growth: "+4.1%", deals: "2" },
];

type ContentPost = {
  image: string;
  avatar: number;
  name: string;
  sport: string;
  status: "Visible" | "Sponsored" | "Organic";
  rank: string;
  likes: string;
  comments: string;
  views: string;
};
const contentPosts: ContentPost[] = [
  { image: "/post1.png", avatar: 15, name: "Tyrell Banks", sport: "Football", status: "Sponsored", rank: "Top 5", likes: "12.1K", comments: "631", views: "88K" },
  { image: "/post2.png", avatar: 12, name: "Devin Cross", sport: "Basketball", status: "Visible", rank: "Top 5", likes: "9.7K", comments: "402", views: "61K" },
  { image: "/post3.png", avatar: 32, name: "Maya Ellison", sport: "Track & Field", status: "Visible", rank: "Top 10", likes: "4.2K", comments: "188", views: "40K" },
  { image: "/post4.png", avatar: 45, name: "Sofia Marin", sport: "Soccer", status: "Organic", rank: "Top 25", likes: "6.8K", comments: "274", views: "52K" },
  { image: "/post5.png", avatar: 5, name: "Jordan Pace", sport: "Volleyball", status: "Visible", rank: "Top 25", likes: "3.5K", comments: "121", views: "28K" },
  { image: "/post6.png", avatar: 47, name: "Aria Cole", sport: "Dance", status: "Sponsored", rank: "Top 10", likes: "15.4K", comments: "880", views: "120K" },
  { image: "/post7.png", avatar: 51, name: "Marcus Webb", sport: "Lacrosse", status: "Visible", rank: "Top 25", likes: "5.1K", comments: "203", views: "44K" },
  { image: "/post8.png", avatar: 9, name: "Elena Ruiz", sport: "Cheer", status: "Organic", rank: "Ranked", likes: "2.8K", comments: "96", views: "21K" },
  { image: "/post9.png", avatar: 60, name: "Jalen Foster", sport: "Football", status: "Sponsored", rank: "Top 5", likes: "18.2K", comments: "742", views: "151K" },
  { image: "/post10.png", avatar: 23, name: "Nina Alvarez", sport: "Soccer", status: "Visible", rank: "Top 10", likes: "7.4K", comments: "311", views: "58K" },
  { image: "/post11.png", avatar: 13, name: "Cole Hayes", sport: "Baseball", status: "Organic", rank: "Top 25", likes: "4.6K", comments: "158", views: "37K" },
  { image: "/post12.png", avatar: 31, name: "Priya Shah", sport: "Tennis", status: "Visible", rank: "Top 10", likes: "6.1K", comments: "240", views: "49K" },
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
  { task: "Long-form promotional video", type: "Deliverable", who: "Maya Ellison", img: 32, campaign: "Apex Hydration", brand: true, platform: "YouTube", amount: "$4,000", status: "Overdue", color: "#ff6b6b", due: "Dec 7, 2025" },
  { task: "Meet and greet", type: "Event", who: "Tyrell Banks", img: 15, campaign: "General task", brand: false, platform: "—", amount: "—", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Feb 18, 2026" },
  { task: "Send campaign results", type: "Task", who: "Devin Cross", img: 12, campaign: "General task", brand: false, platform: "—", amount: "—", status: "In review", color: "rgba(255,255,255,0.62)", due: "Feb 19, 2026" },
  { task: "Instagram post", type: "Deliverable", who: "Maya Ellison", img: 32, campaign: "Apex Hydration", brand: true, platform: "Instagram", amount: "$1,500", status: "Scheduled", color: "rgba(255,255,255,0.62)", due: "Feb 19, 2026" },
  { task: "Voltic reel", type: "Deliverable", who: "Sofia Marin", img: 45, campaign: "Voltic Energy", brand: true, platform: "Instagram", amount: "$2,500", status: "New", color: LIME, due: "Mar 5, 2026" },
  { task: "Photoshoot session", type: "Deliverable", who: "Jordan Pace", img: 5, campaign: "Northwind Apparel", brand: true, platform: "—", amount: "$3,000", status: "Done", color: LIME, due: "Mar 5, 2026" },
  { task: "In-person appearance", type: "Event", who: "Elena Ruiz", img: 47, campaign: "Apex Hydration", brand: true, platform: "—", amount: "$5,000", status: "Active", color: LIME, due: "Apr 20, 2026" },
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

function WorkflowSection() {
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        {/* Copy + the text-to-task flow, side by side */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-12">
          <FadeUp>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Workflow</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
              Every deliverable,{" "}
              <span className="italic" style={{ color: LIME }}>handled.</span>
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
              Every task, deadline, and deliverable for every athlete in one
              place. Assign work to athletes or staff by iMessage or in the
              dashboard, and JABA tracks it to done.
            </p>
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
                    Add a task for Sofia: post the Voltic reel by Friday.
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black">
                    Done. Added to Sofia Marin&rsquo;s tasks, due Fri 5:00pm.
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="max-w-[86%] rounded-2xl rounded-br-md bg-[#007aff] px-3.5 py-2 font-sans text-[13px] leading-snug text-white">
                    Remind her the day before.
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2 font-sans text-[13px] leading-snug text-black">
                    Will do. I&rsquo;ll nudge Sofia Thursday and follow up until it&rsquo;s posted.
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
            message={<>Maya&rsquo;s Apex Hydration video is due Friday. Want me to text her a reminder?</>}
          />
          <AssistantPop
            delay={0.5}
            bobY={8}
            bobDur={7.5}
            className="absolute -bottom-10 left-6 z-20 hidden lg:block"
            message={<>Just a reminder: the Voltic reel is due in 2 days.</>}
          />
          <AssistantPop
            delay={0.7}
            bobY={-6}
            bobDur={5.5}
            className="absolute -bottom-8 right-10 z-20 hidden lg:block"
            message={<>Sent Elena the address and parking details for the appearance.</>}
          />

          <GlassPanel className="overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2 border-b-2 pb-1 font-sans text-[13px] font-semibold text-white" style={{ borderColor: LIME }}>
                  All Tasks
                  <span className="rounded-full bg-white/10 px-1.5 text-[11px] text-white/60" style={{ fontVariantNumeric: "tabular-nums" }}>{workflowRows.length}</span>
                </span>
                <span className="flex items-center gap-2 pb-1 font-sans text-[13px] text-white/45">
                  Overdue
                  <span className="rounded-full bg-white/10 px-1.5 text-[11px] text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>{workflowOverdue}</span>
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
                  {workflowRows.map((r) => (
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
                          <img src={`https://i.pravatar.cc/48?img=${r.img}`} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover" />
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
function AthleteIntelligence() {
  const tabs = ["Overview", "Performance", "Audience", "FMV", "Athlete Business"];
  const voice = ["Game-day highlights", "Training & film", "Community & family"];
  const interests = ["QB development", "Performance nutrition", "Lifestyle & fashion"];
  const brandFits = [
    { name: "Apex Hydration", fit: 94, reason: "Posts game-day hydration routines; audience skews performance-minded." },
    { name: "Voltic Energy", fit: 88, reason: "High-energy highlight reels match the brand's tone." },
    { name: "Northwind Apparel", fit: 81, reason: "Off-field fashion content fits their apparel drops." },
  ];
  const stats = [
    { label: "Followers", value: "184K", sub: "↑ 12.4% · 30d", up: true },
    { label: "Engagement", value: "9.7%", sub: "vs 6.2% cohort", up: true },
    { label: "Avg Likes", value: "12.1K", sub: "per post" },
    { label: "Avg Comments", value: "631", sub: "per post" },
  ];
  return (
    <WorldBackdrop type="image" src="/JW-sky1.png" parallax className="scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} pb-12 pt-24 md:pb-16 md:pt-28`}>
        <FadeUp className="max-w-2xl">
          <ScrimCluster className="inline-block">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Athletes</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-5xl">
              Know every athlete's{" "}
              <span className="italic" style={{ color: LIME }}>brand.</span>
            </h2>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/65">
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
                  <img src="/athlete-cutout.png" alt="" aria-hidden className="h-full w-full object-cover object-top" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">Football</span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">QB</span>
                </div>
                <h3 className="mt-2.5 font-display text-3xl italic leading-none text-white">Jake Banks</h3>
                <p className="mt-1.5 font-sans text-[12px] text-white/55">University of Jaba · Junior</p>
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
                  Jake Banks is a dual-threat quarterback known for his arm
                  talent, poise in the pocket, and a fast-growing, highly engaged
                  following across Instagram and TikTok. A standout recruit out of
                  high school, he has built a reputation for big-moment highlights
                  and behind-the-scenes access fans rarely get. Off the field, his
                  content spans training and film breakdowns, game-day routines,
                  and lifestyle moments with friends and family. That mix of
                  on-field performance and authentic personal storytelling makes
                  him a natural fit for performance, apparel, and lifestyle brands.
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
          <img src={`https://i.pravatar.cc/64?img=${p.avatar}`} alt="" aria-hidden className="h-4 w-4 rounded-full object-cover" />
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
  const tabs = ["All", "Posts", "Reels", "Videos"];
  return (
    <GlassPanel className="overflow-hidden">
      {/* Tabs + count */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-5">
          {tabs.map((t, i) => (
            <span
              key={t}
              className="font-sans text-[12.5px]"
              style={i === 0 ? { color: LIME, fontWeight: 600, borderBottom: `2px solid ${LIME}`, paddingBottom: "10px", marginBottom: "-13px" } : { color: "rgba(255,255,255,0.45)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="font-sans text-[12px] text-white/45" style={{ fontVariantNumeric: "tabular-nums" }}>24 posts</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-sans text-[12px] text-white/40">
          <Search className="h-3.5 w-3.5" /> Search posts, athletes, schools...
        </div>
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-sans text-[11px]">
          <span className="rounded-full px-2.5 py-1 font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>My School</span>
          <span className="px-2.5 py-1 text-white/45">NCAA</span>
          <span className="px-2.5 py-1 text-white/45">Pro</span>
        </div>
        <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-sans text-[11px] sm:flex">
          <span className="rounded-full px-2.5 py-1 font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>All</span>
          <span className="px-2.5 py-1 text-white/45">Sponsored</span>
          <span className="px-2.5 py-1 text-white/45">Organic</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-sans text-[11px] text-white/55">
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
          {[...contentPosts, ...contentPosts].map((p, i) => (
            <div key={`${p.image}-${i}`} className="mr-3 w-[150px] shrink-0 sm:w-[164px]">
              <ContentPostCard p={p} />
            </div>
          ))}
        </motion.div>
      </div>
    </GlassPanel>
  );
}

/* ── Pillar 4: content intelligence (full-width grid + toolbar) ── */
function ContentSection() {
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Content</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            <span className="italic" style={{ color: LIME }}>1M+</span> posts analyzed.
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/65">
            See what athlete content performs and why, across every platform.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              "search every athlete post across your schools",
              "track sponsor logo placement and school IP visibility",
              "analyze hooks, pacing, and caption style",
              "compare sponsor activations vs organic content",
            ].map((b) => (
              <li key={b} className="flex gap-3 font-sans text-[14px] leading-relaxed text-white/70">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: LIME }} />
                {b}
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={0.12} className="mt-10 md:mt-14">
          <PostGrid />
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Pillar 5: brand matching + outreach (Match Studio flow) ── */
function MatchStudio() {
  return (
    <WorldBackdrop type="image" src="/brandbg.png" parallax className="scroll-mt-32 md:scroll-mt-40">
      <div className={`${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
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
                { label: "Compose", count: 14 },
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
    </WorldBackdrop>
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
              <span className="font-sans text-[34px] font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>2,947</span>
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
          <p className="mt-4 font-sans text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: LIME }}>The three ways school IP shows up</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {signals.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <p className="font-sans text-[20px] font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{s.n}</p>
                <p className="mt-1.5 font-sans text-[10.5px] font-semibold leading-tight text-white/75">{s.label}</p>
                <p className="mt-0.5 font-sans text-[10px] text-white/40">{s.pct} of posts</p>
              </div>
            ))}
          </div>

          {/* Posts with IP perform better */}
          <p className="mt-4 font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">Posts with school IP perform better</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {lifts.map((l) => (
              <div key={l.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                <p className="font-sans text-[24px] font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{l.n}</p>
                <p className="mt-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.04em] text-white/75">{l.label}</p>
                <p className="font-sans text-[10px] text-white/40">vs no school IP</p>
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

export default function ForSchoolsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="audience-page-hero" style={{ paddingTop: 0 }}>
        <div className="audience-page-hero-inner pt-32 md:pt-40">
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

      {/* Pillar 1 — Workflow / task table */}
      <WorkflowSection />

      {/* Pillar 2 — Athlete intelligence (on the world backdrop) */}
      <AthleteIntelligence />

      {/* Pillar 4 — Content intelligence */}
      <ContentSection />

      {/* Pillar 5 — Brand matching + outreach */}
      <MatchStudio />

      {/* Pillar 6 — Reports */}
      <ReportsSection />

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
