import { useState } from "react";
import {
  ArrowRight,
  KanbanSquare,
  Mail,
  RefreshCw,
  Search,
  Shuffle,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";
import { FadeUp } from "@/components/audience/fade-up";
import { WorldBackdrop } from "@/components/audience/world-backdrop";
import {
  GlassPanel,
  PillarSection,
  ScrimCluster,
  StatusChip,
} from "@/components/audience/glass-mockups";
import {
  AthleteCard,
  PostGrid,
  ReportBuilder,
  RosterTable,
  StepStrip,
  type PostTile,
  type RosterRow,
} from "@/components/audience/product-mockups";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";
const SECTION = "scroll-mt-32 md:scroll-mt-40";
const PADS = "pb-20 pt-28 md:pb-28 md:pt-36";
const CLOUDS = "/videos/Video%20BG%20Web_02.mp4";
const WORLD_IMG = "/header%20BG-%20V4-WithoutBalls_less.jpg";

const steps = [
  { verb: "Discover", label: "brands", Icon: Search },
  { verb: "Match", label: "your roster", Icon: Shuffle },
  { verb: "Pitch", label: "with AI", Icon: Sparkles },
  { verb: "Track", label: "the pipeline", Icon: KanbanSquare },
  { verb: "Showcase", label: "ROI", Icon: TrendingUp },
];

// Fictional brands, contacts, athletes. Real numbers OK.
const directory = [
  { name: "Apex Hydration", category: "Beverage", history: "24 deals", dm: "Rachel Doss · VP Marketing" },
  { name: "Northwind Apparel", category: "Apparel", history: "18 deals", dm: "Marcus Hill · Brand Partnerships" },
  { name: "Voltic Energy", category: "Energy", history: "31 deals", dm: "Elena Park · Head of Influencer" },
  { name: "Cedar & Co.", category: "Lifestyle", history: "12 deals", dm: "Priya Nair · Marketing Lead" },
];

const pipeline = [
  { stage: "Outreach", deals: [{ brand: "Apex Hydration", val: "$45K" }, { brand: "Cedar & Co.", val: "$28K" }] },
  { stage: "Negotiating", deals: [{ brand: "Northwind Apparel", val: "$60K" }] },
  { stage: "Signed", deals: [{ brand: "Voltic Energy", val: "$85K" }], accent: true },
];

const rosterAthletes = ["Darius Vaughn", "Andre Solis", "Marcus Webb", "Tyson Reed"];
const matchBrands = ["Apex Hydration", "Voltic Energy", "Northwind Apparel", "Cedar & Co."];

const athleteMetrics = [
  { label: "Brand Fit Score", value: "94", bar: 94 },
  { label: "Audience Reach", value: "1.2M" },
  { label: "Engagement", value: "7.8%" },
  { label: "Content Style", value: "Lifestyle" },
  { label: "Alignment Score", value: "90", bar: 90 },
];

const rosterRows: RosterRow[] = [
  { name: "Darius Vaughn", img: 13, followers: "1.2M", eng: "7.8%", likes: "88K", comments: "3.4K", posts: "246", growth: "+9.1%", deals: "11" },
  { name: "Andre Solis", img: 33, followers: "684K", eng: "6.2%", likes: "42K", comments: "1.9K", posts: "203", growth: "+5.7%", deals: "7" },
  { name: "Marcus Webb", img: 51, followers: "512K", eng: "8.4%", likes: "39K", comments: "2.1K", posts: "178", growth: "+6.3%", deals: "6" },
  { name: "Tyson Reed", img: 8, followers: "398K", eng: "5.9%", likes: "24K", comments: "1.2K", posts: "154", growth: "+4.4%", deals: "4" },
];

const posts: PostTile[] = [
  { seed: "ag1", likes: "88K", comments: "3.4K", views: "540K", tag: "TOP 5", tone: "lime" },
  { seed: "ag2", likes: "42K", comments: "1.9K", views: "310K", tag: "VISIBLE", tone: "neutral" },
  { seed: "ag3", likes: "39K", comments: "2.1K", views: "280K", tag: "SPONSORED", tone: "lime" },
  { seed: "ag4", likes: "24K", comments: "1.2K", views: "190K", tag: "TOP 25", tone: "neutral" },
  { seed: "ag5", likes: "18K", comments: "900", views: "140K", tag: "ORGANIC", tone: "muted" },
  { seed: "ag6", likes: "61K", comments: "2.8K", views: "420K", tag: "TOP 10", tone: "neutral" },
];

const masterRows = [
  { name: "Darius Vaughn", campaigns: "9", deals: "11", payments: "$420K" },
  { name: "Andre Solis", campaigns: "6", deals: "7", payments: "$255K" },
  { name: "Marcus Webb", campaigns: "5", deals: "6", payments: "$198K" },
];

/* ── Brand Directory mockup ── */
function BrandDirectory() {
  return (
    <GlassPanel className="p-4">
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/55">Brand Directory</p>
        <StatusChip tone="lime">300,000+</StatusChip>
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-white/40" />
        <span className="font-sans text-[12.5px] text-white/45">Search brands by category…</span>
      </div>
      <div className="space-y-2">
        {directory.map((b) => (
          <div key={b.name} className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-[13px] font-medium text-white">{b.name}</p>
              <p className="truncate font-sans text-[11px] text-white/45">{b.dm}</p>
            </div>
            <StatusChip tone="neutral">{b.category}</StatusChip>
            <span className="hidden shrink-0 font-sans text-[12px] text-white/55 sm:block" style={{ fontVariantNumeric: "tabular-nums" }}>{b.history}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

/* ── CRM + AI Outreach: assistant card + deal pipeline board ── */
function OutreachAssistant() {
  return (
    <GlassPanel className="p-5">
      <p className="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
        <Mail className="h-3.5 w-3.5" style={{ color: LIME }} /> Inbox Assistant
      </p>
      <div className="mt-4 rounded-lg border border-white/[0.08] bg-black/35 p-3">
        <p className="font-sans text-[12px] text-white/45">Rachel Doss · Apex Hydration</p>
        <p className="mt-1 font-sans text-[12.5px] text-white/75">"Can you send a media kit for Darius and a rate for a fall activation?"</p>
      </div>
      <div className="mt-3 rounded-lg border border-[#dfff00]/25 bg-[#dfff00]/[0.06] p-3">
        <p className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.14em]" style={{ color: LIME }}>
          <Sparkles className="h-3 w-3" /> Drafted in your voice
        </p>
        <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-white/80">
          Hi Rachel — attaching Darius's media kit now. He over-indexes with
          your 18–24 audience. Proposing a three-post fall activation; rate
          card below.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <VoltButton size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>Use Draft</VoltButton>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-sans text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
          </button>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 font-sans text-[11px] text-white/45">
        <span className="inline-flex h-5 items-center rounded border border-white/15 bg-white/[0.05] px-2 text-[10px] uppercase tracking-[0.1em] text-white/60">AI media kit</span>
        Darius-Vaughn-2025.pdf attached automatically
      </p>
    </GlassPanel>
  );
}

function DealPipeline() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {pipeline.map((col) => (
        <GlassPanel key={col.stage} className="p-4">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">{col.stage}</p>
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: col.accent ? LIME : "rgba(255,255,255,0.3)" }} />
          </div>
          <div className="mt-3 space-y-2">
            {col.deals.map((d) => (
              <div
                key={d.brand}
                className="flex items-center justify-between rounded-lg border bg-white/[0.04] px-3 py-2.5"
                style={{ borderColor: col.accent ? "rgba(223,255,0,0.3)" : "rgba(255,255,255,0.08)" }}
              >
                <span className="font-sans text-[12.5px] font-medium text-white">{d.brand}</span>
                <span className="font-sans text-[12px] font-semibold" style={{ color: col.accent ? LIME : "rgba(255,255,255,0.7)", fontVariantNumeric: "tabular-nums" }}>{d.val}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

function CrmSection() {
  return (
    <WorldBackdrop type="video" src={CLOUDS} parallax className={SECTION}>
      <div className={`${WRAP} ${PADS}`}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <ScrimCluster>
            <FadeUp>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">CRM</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
                Your inbox, with{" "}
                <span className="italic" style={{ color: LIME }}>an assistant.</span>
              </h2>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/65 md:text-lg">
                JABA reads your inbox and keeps every brand conversation moving.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["drafts replies in your voice", "generates AI media kits per athlete", "moves deals through the pipeline"].map((b) => (
                  <li key={b} className="flex gap-3 font-sans text-[14px] leading-relaxed text-white/70">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: LIME }} />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </ScrimCluster>
          <FadeUp delay={0.12}>
            <ScrimCluster>
              <OutreachAssistant />
            </ScrimCluster>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-10 md:mt-14">
          <ScrimCluster>
            <DealPipeline />
          </ScrimCluster>
        </FadeUp>
      </div>
    </WorldBackdrop>
  );
}

/* ── Match Studio overlap engine ── */
function MatchStudioSection() {
  const [dir, setDir] = useState<"a2b" | "b2a">("a2b");
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Match Studio</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Match every athlete to{" "}
            <span className="italic" style={{ color: LIME }}>the right brand.</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            The overlap engine ranks fit by audience and content, in both
            directions, so you always lead with the strongest pairing.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-10 md:mt-14">
          <GlassPanel className="p-5">
            <div className="mb-5 flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-0.5 text-center">
              <button onClick={() => setDir("a2b")} className="flex-1 rounded-full px-3 py-1.5 font-sans text-[12px] font-semibold transition-colors" style={dir === "a2b" ? { background: LIME, color: "#000" } : { color: "rgba(255,255,255,0.55)" }}>
                Athlete → Brand
              </button>
              <button onClick={() => setDir("b2a")} className="flex-1 rounded-full px-3 py-1.5 font-sans text-[12px] font-semibold transition-colors" style={dir === "b2a" ? { background: LIME, color: "#000" } : { color: "rgba(255,255,255,0.55)" }}>
                Brand → Athlete
              </button>
            </div>

            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
              {/* Roster */}
              <div>
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.14em] text-white/40">Roster</p>
                <ul className="space-y-2">
                  {rosterAthletes.map((a, i) => (
                    <li key={a} className="flex items-center gap-2.5 rounded-lg border bg-white/[0.04] px-3 py-2" style={{ borderColor: i === 0 ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.08)" }}>
                      <img src={`https://i.pravatar.cc/48?img=${[13, 33, 51, 8][i]}`} alt="" aria-hidden className="h-6 w-6 rounded-full object-cover" />
                      <span className="font-sans text-[12.5px] text-white/80">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden items-center justify-center md:flex"><ArrowRight className="h-5 w-5 text-white/25" /></div>

              {/* Find Overlap result */}
              <div>
                <button className="mx-auto mb-3 flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-[12px] font-semibold" style={{ background: LIME, color: "#000" }}>
                  <Sparkles className="h-3.5 w-3.5" /> Find Overlap
                </button>
                <div className="rounded-xl border border-[#dfff00]/25 bg-[#dfff00]/[0.05] p-4 text-center">
                  <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">Brand Fit Score</p>
                  <p className="mt-1 font-sans text-4xl font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>91</p>
                  <p className="mt-2 font-sans text-[12px] leading-relaxed text-white/65">
                    Audience overlap and content style match. Darius Vaughn fits
                    Apex Hydration.
                  </p>
                </div>
              </div>

              <div className="hidden items-center justify-center md:flex"><ArrowRight className="h-5 w-5 text-white/25" /></div>

              {/* Brands */}
              <div>
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.14em] text-white/40">Brands</p>
                <ul className="space-y-2">
                  {matchBrands.map((b, i) => (
                    <li key={b} className="flex items-center justify-between rounded-lg border bg-white/[0.04] px-3 py-2" style={{ borderColor: i === 0 ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.08)" }}>
                      <span className="font-sans text-[12.5px] text-white/80">{b}</span>
                      <span className="font-sans text-[11px] font-semibold" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{[94, 88, 82, 78][i]}%</span>
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

/* ── Roster intelligence (reuses AthleteCard + RosterTable) ── */
function RosterIntelligence() {
  return (
    <WorldBackdrop src={WORLD_IMG} parallax className={SECTION}>
      <div className={`${WRAP} ${PADS}`}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <ScrimCluster>
            <FadeUp>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Roster</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
                Know every athlete's{" "}
                <span className="italic" style={{ color: LIME }}>value.</span>
              </h2>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/65 md:text-lg">
                Brand Fit Score, Audience Reach, Engagement, Content Style, and
                Alignment Score on every athlete, with FMV one toggle away.
              </p>
            </FadeUp>
          </ScrimCluster>
          <FadeUp delay={0.12}>
            <ScrimCluster className="mx-auto w-full max-w-sm">
              <AthleteCard name="Darius Vaughn" sport="NFL · Wide Receiver" img={13} overall={92} metrics={athleteMetrics} />
            </ScrimCluster>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-10 md:mt-14">
          <ScrimCluster>
            <RosterTable rows={rosterRows} />
          </ScrimCluster>
        </FadeUp>
      </div>
    </WorldBackdrop>
  );
}

export default function ForAgenciesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="audience-page-hero" style={{ paddingTop: 0 }}>
        <div className="audience-page-hero-inner pt-32 md:pt-40">
          <span className="audience-page-chip">For Agencies &amp; Representation</span>
          <h1 className="audience-page-h1">
            Turn your roster into{" "}
            <span className="italic" style={{ color: LIME }}>signed deals.</span>
          </h1>
          <p className="audience-page-subtitle">
            Agencies juggle hundreds of brand conversations. JABA is the layer
            that finds the deals, writes the outreach, and tracks them to close.
          </p>
          <div className="audience-page-hero-cta">
            <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
          </div>
        </div>
      </section>

      {/* Step strip */}
      <StepStrip steps={steps} />

      {/* Brand Discovery */}
      <PillarSection
        eyebrow="Brand Directory"
        headline={<>Search <span className="italic" style={{ color: LIME }}>300,000+</span> brands.</>}
        body="Every brand JABA tracks, in one searchable directory."
        bullets={[
          "search every brand by category",
          "see deal history",
          "surface decision makers",
        ]}
      >
        <BrandDirectory />
      </PillarSection>

      {/* CRM + AI Outreach */}
      <CrmSection />

      {/* Match Studio */}
      <MatchStudioSection />

      {/* Roster intelligence */}
      <RosterIntelligence />

      {/* Content intelligence */}
      <PillarSection
        eyebrow="Content"
        headline={<>See what content <span className="italic" style={{ color: LIME }}>actually performs.</span></>}
        body="Content analysis across every platform shows what works and why."
        bullets={[
          "search every athlete post",
          "track sponsor visibility",
          "compare sponsored vs organic content",
        ]}
        reverse
      >
        <PostGrid posts={posts} />
      </PillarSection>

      {/* Mission Control / Data */}
      <PillarSection
        eyebrow="Mission Control"
        headline={<>Every deal, <span className="italic" style={{ color: LIME }}>measured.</span></>}
        body="Athletes, campaigns, deals, and payments in one master table, with EMV, ROI, and CSV export."
        world={{ src: WORLD_IMG, type: "image" }}
      >
        <ReportBuilder title="Master Table" emv="$1.24M" roi="4.8x" bars={[42, 58, 51, 67, 74, 88]}>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse">
                <thead>
                  <tr className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/40">
                    <th className="px-3 py-2 text-left font-medium">Athlete</th>
                    <th className="px-3 py-2 text-right font-medium">Campaigns</th>
                    <th className="px-3 py-2 text-right font-medium">Deals</th>
                    <th className="px-3 py-2 text-right font-medium">Payments</th>
                  </tr>
                </thead>
                <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                  {masterRows.map((r) => (
                    <tr key={r.name} className="border-t border-white/[0.06] font-sans text-[12.5px] text-white/75">
                      <td className="px-3 py-2 font-medium text-white">{r.name}</td>
                      <td className="px-3 py-2 text-right">{r.campaigns}</td>
                      <td className="px-3 py-2 text-right">{r.deals}</td>
                      <td className="px-3 py-2 text-right" style={{ color: LIME }}>{r.payments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-white/10 px-3 py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-sans text-[11px] font-medium text-white/70">
                Export CSV
              </span>
            </div>
          </div>
        </ReportBuilder>
      </PillarSection>

      {/* CTA */}
      <section className={`audience-page-cta ${SECTION}`}>
        <div className="audience-page-cta-inner pt-28 md:pt-36">
          <h2 className="audience-page-cta-h2">
            Ready to <span className="cta-headline-accent">close more?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how agencies find, pitch, and close brand deals on JABA.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
