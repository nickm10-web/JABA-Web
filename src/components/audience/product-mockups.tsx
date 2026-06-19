import type { LucideIcon } from "lucide-react";
import { ChevronRight, Eye, Heart, MessageCircle } from "lucide-react";

import { GlassPanel, ScrimCluster, StatusChip } from "@/components/audience/glass-mockups";
import { FadeUp } from "@/components/audience/fade-up";
import { pressReleases } from "@/data/press-releases";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";

/* ── Connected horizontal step strip (steps differ per page) ── */
export interface Step {
  verb: string;
  label: string;
  Icon: LucideIcon;
}

export function StepStrip({ steps }: { steps: Step[] }) {
  // Duplicate the steps so the marquee loops seamlessly.
  const loop = [...steps, ...steps];
  return (
    <section className="border-y border-white/[0.07] bg-[#dfff00]/[0.025] py-7 md:py-8">
      <div className="press-marquee relative">
        <div className="press-marquee-track flex w-max items-center gap-9 md:gap-12">
          {loop.map((s, i) => (
            <div key={i} className="flex shrink-0 items-center gap-9 md:gap-12">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfff00]/25 bg-[#dfff00]/[0.08]">
                  <s.Icon className="h-[18px] w-[18px]" style={{ color: LIME }} />
                </span>
                <span className="whitespace-nowrap font-sans text-[15px] md:text-base">
                  <span className="font-semibold text-white">{s.verb}</span>{" "}
                  <span className="text-white/50">{s.label}</span>
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#dfff00]/35" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Athlete trading card (92 OVERALL) ── */
export interface AthleteMetric {
  label: string;
  value: string;
  bar?: number;
}

export function AthleteCard({
  name,
  sport,
  img,
  overall,
  metrics,
}: {
  name: string;
  sport: string;
  img: number;
  overall: number;
  metrics: AthleteMetric[];
}) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center gap-3">
        <img src={`https://i.pravatar.cc/96?img=${img}`} alt="" aria-hidden className="h-12 w-12 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-sans text-[15px] font-semibold text-white">{name}</p>
          <p className="font-sans text-[12px] text-white/50">{sport}</p>
        </div>
        <div className="text-right">
          <p className="font-sans text-3xl font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{overall}</p>
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
  );
}

/* ── Roster analytics table ── */
export interface RosterRow {
  name: string;
  img: number;
  followers: string;
  eng: string;
  likes: string;
  comments: string;
  posts: string;
  growth: string;
  deals: string;
}

const ROSTER_COLS = ["Followers", "Eng %", "Avg Likes", "Avg Comments", "Posts", "Growth", "Brand Deals"];

export function RosterTable({ rows }: { rows: RosterRow[] }) {
  return (
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
              {ROSTER_COLS.map((h) => (
                <th key={h} className="px-4 py-3 text-right font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
            {rows.map((r) => (
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
  );
}

/* ── Content analysis grid ── */
export interface PostTile {
  seed: string;
  likes: string;
  comments: string;
  views: string;
  tag: string;
  tone: "lime" | "neutral" | "muted";
}

export function PostGrid({ posts, badge = "1M+ posts", light = false }: { posts: PostTile[]; badge?: string; light?: boolean }) {
  const headText = light ? "text-black/55" : "text-white/55";
  const tile = light ? "border-black/10 bg-black/[0.04]" : "border-white/10 bg-white/[0.04]";
  const stats = light ? "text-black/55" : "text-white/55";
  const inner = (
    <>
      <div className="flex items-center justify-between px-1 pb-3">
        <p className={`font-sans text-[11px] uppercase tracking-[0.16em] ${headText}`}>Content Analysis</p>
        <StatusChip tone="lime">{badge}</StatusChip>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {posts.map((p) => (
          <div key={p.seed} className={`overflow-hidden rounded-xl border ${tile}`}>
            <div className="relative">
              <img src={`https://picsum.photos/seed/${p.seed}/240/180`} alt="" aria-hidden className="h-24 w-full object-cover" />
              <div className="absolute right-1.5 top-1.5">
                <StatusChip tone={p.tone}>{p.tag}</StatusChip>
              </div>
            </div>
            <div className={`flex items-center gap-2.5 px-2.5 py-2 font-sans text-[11px] ${stats}`} style={{ fontVariantNumeric: "tabular-nums" }}>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {p.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.comments}</span>
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  if (light) {
    return (
      <div
        className="overflow-hidden rounded-[18px] p-4"
        style={{
          background: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(255,255,255,0.65)",
          boxShadow:
            "0 16px 44px rgba(0,0,0,0.1), inset 2px 2px 1px -2px rgba(255,255,255,0.95), inset -2px -2px 1px -2px rgba(255,255,255,0.6), inset 1px 1px 1px -0.5px rgba(255,255,255,0.5), inset -1px -1px 1px -0.5px rgba(0,0,0,0.1)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
        }}
      >
        {inner}
      </div>
    );
  }
  return <GlassPanel className="p-4">{inner}</GlassPanel>;
}

/* ── Report builder: shared IP Impact chart + a page-specific top area ── */
export function ReportBuilder({
  title,
  emv,
  roi,
  bars,
  children,
}: {
  title: string;
  emv: string;
  roi: string;
  bars: number[];
  children: React.ReactNode;
}) {
  return (
    <GlassPanel className="p-5">
      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/55">{title}</p>
      <div className="mt-4">{children}</div>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/45 p-4">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">IP Impact</p>
          <div className="flex gap-4 font-sans" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/40">EMV</span>
              <span className="text-base font-bold" style={{ color: LIME }}>{emv}</span>
            </span>
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/40">ROI</span>
              <span className="text-base font-bold text-white">{roi}</span>
            </span>
          </div>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2">
          {bars.map((v, i) => {
            const accent = i === bars.length - 1;
            const fill = accent ? LIME : i % 2 === 0 ? "rgba(255,255,255,0.22)" : "rgba(223,255,0,0.7)";
            return <span key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, background: fill }} />;
          })}
        </div>
      </div>
    </GlassPanel>
  );
}

/* ── Partner announcement marquee ── */
export function Proof() {
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

export { ScrimCluster };
