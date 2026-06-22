import { ArrowLeftRight, ArrowRight, Check, Download, Instagram, MapPin, Paperclip, RotateCw, Search, Send, Sparkles, TrendingUp, Zap } from "lucide-react";

/* TikTok glyph (not in lucide). */
function TiktokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.5 3c.3 1.9 1.4 3.4 3.3 4 .4.1.8.2 1.2.2v3a8 8 0 0 1-4.5-1.4v6.3a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.8 2.5V3h2.9z" />
    </svg>
  );
}

import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";
import { FadeUp } from "@/components/audience/fade-up";
import { WorldBackdrop } from "@/components/audience/world-backdrop";
import {
  GlassPanel,
  ScrimCluster,
} from "@/components/audience/glass-mockups";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";
const SECTION = "scroll-mt-32 md:scroll-mt-40";
const PADS = "pb-20 pt-28 md:pb-28 md:pt-36";
const WORLD_IMG = "/header%20BG-%20V4-WithoutBalls_less.jpg";

// Fictional brands, contacts, athletes. Real numbers OK.
// `logo` is an optional image path (drop /brand-*.png files in public and set it);
// falls back to a monogram until a logo is provided.
const directoryCategories = [
  { name: "Apparel", n: "1,184" },
  { name: "Beverage", n: "1,061", active: true },
  { name: "Nutrition & Supplements", n: "804" },
  { name: "Sports Equipment", n: "715" },
  { name: "Skincare", n: "654" },
  { name: "Footwear", n: "636" },
  { name: "Lifestyle", n: "619" },
  { name: "Automotive", n: "515" },
  { name: "Financial Services", n: "425" },
  { name: "Gaming & Esports", n: "282" },
];

const directoryBrands: { name: string; cat: string; posts: string; hq: string; desc: string; logo?: string; logoBg?: string }[] = [
  { name: "Apex Hydration", cat: "Beverage", posts: "24 posts", hq: "Austin, TX", desc: "Electrolyte hydration mixes and bottles built for game-day performance and faster recovery, stocked in gyms and grocery nationwide.", logo: "/brand-apex.png", logoBg: "#e6eefb" },
  { name: "Northwind Apparel", cat: "Apparel", posts: "18 posts", hq: "Portland, OR", desc: "Technical outerwear and everyday basics for athletes who train outdoors, from waterproof shells to recycled-fleece layers.", logo: "/brand-northwind.png", logoBg: "#e8eaed" },
  { name: "Voltic Energy", cat: "Beverage", posts: "31 posts", hq: "Los Angeles, CA", desc: "Zero-sugar energy drinks with clean caffeine and B-vitamins, built for esports, endurance, and late-game focus.", logo: "/brand-voltic.png", logoBg: "#eef2d6" },
  { name: "Cedar & Co.", cat: "Lifestyle", posts: "12 posts", hq: "Brooklyn, NY", desc: "Minimalist home and lifestyle goods, candles, ceramics, and linens, designed for a calm and modern everyday.", logo: "/brand-cedar.png", logoBg: "#f1e9dc" },
  { name: "Summit Gear", cat: "Sports Equipment", posts: "9 posts", hq: "Denver, CO", desc: "Field-tested training and climbing equipment, from resistance systems to packs, trusted by collegiate and pro programs.", logo: "/brand-summit.png", logoBg: "#e4ecf1" },
  { name: "Lumen Skincare", cat: "Skincare", posts: "15 posts", hq: "Miami, FL", desc: "Dermatologist-backed, sweat-resistant skincare, SPF, recovery balms, and cleansers formulated for high-performance skin.", logo: "/brand-lumen.png", logoBg: "#efe9f4" },
];

// Inbox threads (fictional contacts/brands). Flags use real product vocabulary.
const inboxThreads: {
  from: string;
  brand: string;
  preview: string;
  time: string;
  flag: "Needs reply" | "Awaiting media kit" | "Follow-up due" | "Replied";
  selected?: boolean;
}[] = [
  { from: "Rachel Doss", brand: "Apex Hydration", preview: "Can you send a media kit for Darius?", time: "9:24 AM", flag: "Needs reply", selected: true },
  { from: "Marcus Hill", brand: "Northwind Apparel", preview: "Following up on the fall activation", time: "8:02 AM", flag: "Follow-up due" },
  { from: "Tom Becker", brand: "Summit Gear", preview: "Sounds good, standing by for the kit", time: "Mon", flag: "Awaiting media kit" },
  { from: "Priya Nair", brand: "Cedar & Co.", preview: "Rates for a 3-post deal?", time: "Mon", flag: "Needs reply" },
  { from: "Elena Park", brand: "Voltic Energy", preview: "Contract sent, thanks!", time: "Fri", flag: "Replied" },
];

// Functional status colors for the inbox flags, tuned for the light panel
// (dot carries the hue, label stays dark for legibility on white).
const flagColor: Record<string, { dot: string; text: string }> = {
  "Needs reply": { dot: LIME, text: "#3d4a00" },
  "Awaiting media kit": { dot: "#2563eb", text: "#1d4ed8" },
  "Follow-up due": { dot: "#d97706", text: "#b45309" },
  "Replied": { dot: "rgba(0,0,0,0.3)", text: "rgba(0,0,0,0.42)" },
};


/* ── Brand Directory: full search UI (sidebar + brand cards) ── */
function BrandDirectorySection() {
  return (
    <section className={`${SECTION} bg-black`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Brand Directory</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Search <span className="italic" style={{ color: LIME }}>300,000+</span> brands.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Every brand JABA tracks, in one searchable directory, with deal
            history and decision makers on each.
          </p>
        </FadeUp>

        <FadeUp delay={0.12} className="mt-10 md:mt-14">
          <GlassPanel className="overflow-hidden">
            {/* Tabs + search */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 p-4">
              <div className="flex items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5 font-sans text-[12px]">
                <span className="rounded-full px-3 py-1 font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>Brands</span>
                <span className="px-3 py-1 text-white/45">Contacts</span>
                <span className="px-3 py-1 text-white/45">For an athlete</span>
              </div>
              <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 font-sans text-[12.5px] text-white/40">
                <Search className="h-3.5 w-3.5" /> Search brand, city, category, aesthetic…
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[210px_1fr]">
              {/* Category sidebar */}
              <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Categories</p>
                <ul className="mt-3 space-y-0.5">
                  {directoryCategories.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between rounded-lg px-2.5 py-1.5 font-sans text-[12.5px]"
                      style={c.active ? { background: "rgba(223,255,0,0.08)", color: LIME, fontWeight: 600 } : { color: "rgba(255,255,255,0.6)" }}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="shrink-0 font-sans text-[11px]" style={{ color: c.active ? LIME : "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>{c.n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[12.5px] text-white/55"><span className="font-semibold text-white">1,061</span> results</p>
                  <p className="font-sans text-[11.5px] text-white/40">Sort by <span className="text-white/70">Relevance</span></p>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {directoryBrands.map((b) => (
                    <div key={b.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-3">
                        {b.logo ? (
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl px-1.5 py-1.5" style={{ background: b.logoBg ?? "#ffffff" }}>
                            <img src={b.logo} alt="" aria-hidden className="max-h-full max-w-full object-contain" />
                          </span>
                        ) : (
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-sans text-[18px] font-bold text-white">{b.name[0]}</span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-sans text-[14px] font-semibold text-white">{b.name}</p>
                          <p className="truncate font-sans text-[11px] text-white/45">{b.cat} · {b.posts}</p>
                          <p className="mt-0.5 flex items-center gap-1 truncate font-sans text-[11px] text-white/40">
                            <MapPin className="h-3 w-3 shrink-0" /> {b.hq}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-white/60">{b.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-sans text-[12px] font-medium text-white/70">View brand →</span>
                        <span className="rounded-full px-3 py-1.5 font-sans text-[11.5px] font-semibold" style={{ background: LIME, color: "#000" }}>+ Add to pitch</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── CRM inbox: thread list + opened email + AI draft reply ── */
function OutreachAssistant() {
  const selected = inboxThreads.find((t) => t.selected) ?? inboxThreads[0];
  return (
    <div
      className="overflow-hidden rounded-[22px]"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow:
          "0 16px 44px rgba(0,0,0,0.1), inset 2px 2px 1px -2px rgba(255,255,255,0.95), inset -2px -2px 1px -2px rgba(255,255,255,0.6), inset 1px 1px 1px -0.5px rgba(255,255,255,0.5), inset -1px -1px 1px -0.5px rgba(0,0,0,0.1)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
      }}
    >
      {/* Mail client header */}
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src="/jaba-face.png" alt="" aria-hidden className="h-6 w-6 rounded-full" />
          <span className="font-sans text-[13px] font-semibold text-[#0a0a0a]">Inbox</span>
          <span
            className="rounded-full bg-black/[0.06] px-1.5 py-0.5 font-sans text-[10px] text-black/55"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {inboxThreads.length}
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: "rgba(223,255,0,0.25)", color: "#3d4a00" }}>
          <Sparkles className="h-3 w-3" /> Assistant on
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[176px_1fr]">
        {/* Thread list rail */}
        <ul className="border-b border-black/10 lg:border-b-0 lg:border-r">
          {inboxThreads.map((t) => {
            const active = t === selected;
            return (
              <li
                key={t.from}
                className="border-b border-black/[0.06] px-3 py-2.5 last:border-b-0"
                style={
                  active
                    ? { background: "rgba(223,255,0,0.22)", boxShadow: `inset 3px 0 0 ${LIME}` }
                    : undefined
                }
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-sans text-[12.5px] font-semibold text-[#0a0a0a]">{t.from}</span>
                  <span className="shrink-0 font-sans text-[10px] text-black/40" style={{ fontVariantNumeric: "tabular-nums" }}>{t.time}</span>
                </div>
                <p className="truncate font-sans text-[10.5px] text-black/45">{t.brand}</p>
                <p className="mt-0.5 truncate font-sans text-[11.5px] text-black/55">{t.preview}</p>
                <span className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: flagColor[t.flag].dot }} />
                  <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.07em]" style={{ color: flagColor[t.flag].text }}>{t.flag}</span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* Opened email + AI draft */}
        <div className="p-4">
          {/* Received email */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.07] font-sans text-[13px] font-bold text-[#0a0a0a]">{selected.brand[0]}</span>
            <div className="min-w-0">
              <p className="truncate font-sans text-[13px] font-semibold text-[#0a0a0a]">{selected.from} <span className="font-normal text-black/45">· {selected.brand}</span></p>
              <p className="truncate font-sans text-[11px] text-black/40">to you · {selected.time}</p>
            </div>
          </div>
          <p className="mt-3 font-sans text-[12.5px] font-semibold text-[#0a0a0a]">Media kit for Darius + fall rate</p>
          <p className="mt-1.5 font-sans text-[12.5px] leading-relaxed text-black/60">
            Hi, we love what Darius is doing this season. Can you send his media kit and a fall campaign rate? Hoping to lock something in soon.
          </p>

          {/* AI draft reply (focal point) */}
          <div
            className="mt-4 rounded-xl p-3.5 ring-1 ring-black/[0.06]"
            style={{ background: "rgba(223,255,0,0.12)", border: "1px solid rgba(223,255,0,0.55)" }}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "#3d4a00" }} />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#3d4a00" }}>JABA Draft · in your voice</span>
            </div>
            <p className="mt-2.5 font-sans text-[12.5px] leading-relaxed text-black/80">
              Hi Rachel, thrilled Apex wants to work with Darius. I&rsquo;ve attached his 2025 media kit. For a fall activation we&rsquo;d start at $45K for a 3-post package, happy to tailor it to what you have in mind.
            </p>

            {/* Auto-attached media kit */}
            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-black/12 bg-white/70 px-3 py-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.06]">
                <Paperclip className="h-3.5 w-3.5 text-black/60" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-sans text-[12px] font-medium text-[#0a0a0a]">Darius-Vaughn-2025.pdf</p>
                <p className="truncate font-sans text-[10.5px] text-black/45">AI media kit</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <button className="flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-semibold" style={{ background: LIME, color: "#000" }}>
                <Send className="h-3.5 w-3.5" /> Approve &amp; send
              </button>
              <button className="flex items-center gap-1.5 rounded-full border border-black/15 bg-black/[0.03] px-3.5 py-2 font-sans text-[12.5px] font-medium text-black/70">
                <RotateCw className="h-3.5 w-3.5" /> Regenerate
              </button>
            </div>
            <p className="mt-3 flex items-center gap-1.5 font-sans text-[10.5px] text-black/45">
              <ArrowRight className="h-3 w-3" style={{ color: "#3d4a00" }} /> Sending moves Apex Hydration to Negotiating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmSection() {
  return (
    <section className={`${SECTION} bg-[#eeeeee]`}>
      <div className={`${WRAP} ${PADS}`}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <FadeUp>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-black/45">CRM</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-[#0a0a0a] md:text-5xl">
              Your inbox, with{" "}
              <span className="italic" style={{ color: "#0a0a0a", textDecoration: "underline", textDecorationColor: LIME, textDecorationThickness: "0.12em", textUnderlineOffset: "0.08em" }}>an assistant.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-black/60 md:text-lg">
              JABA reads your inbox and keeps every brand conversation moving.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["drafts replies in your voice", "generates AI media kits per athlete", "moves deals through the pipeline"].map((b) => (
                <li key={b} className="flex gap-3 font-sans text-[14px] leading-relaxed text-black/70">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.12}>
            <OutreachAssistant />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Match Studio overlap engine ── */
function MatchStudioSection() {
  const athleteSignals = [
    { label: "Audience Reach", value: "184K" },
    { label: "Engagement", value: "9.7%" },
  ];
  const athleteThemes = ["Training", "Film room", "Recovery", "Gear reviews"];
  const matchMetrics = [
    { label: "Audience overlap", value: "88%" },
    { label: "Content style", value: "Aligned" },
    { label: "Audience demo", value: "18-24 · M" },
    { label: "Alignment Score", value: "91" },
  ];
  const bridges = [
    "Weekly resistance-band and mobility work he already films",
    "Off-field gear reviews mirror how Summit's athletes post",
    "Mountain-West audience maps to Summit's expansion markets",
  ];
  const brandWants = ["Collegiate athletes", "Training-first content", "Mountain West"];
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
            The overlap engine reads each athlete and brand in depth, audience,
            content, and intent, then explains why a pairing works before you pitch it.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-10 md:mt-14">
          <GlassPanel className="p-4 md:p-6">
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_1.4fr_1fr] md:gap-5">
              {/* Athlete source card */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
                  <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Source · Football</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60">Athlete</span>
                </div>
                <div
                  className="aspect-[4/5] w-full flex-1 overflow-hidden"
                  style={{ background: "radial-gradient(120% 85% at 50% 6%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 52%, rgba(255,255,255,0.01))" }}
                >
                  <img src="/athlete-cutout.png" alt="" aria-hidden className="h-full w-full object-cover object-top" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl italic leading-none text-white">Darius Vaughn</h3>
                  <p className="mt-1.5 font-sans text-[11.5px] text-white/45">NFL · Wide Receiver</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {athleteSignals.map((s) => (
                      <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.1em] text-white/35">{s.label}</p>
                        <p className="mt-0.5 font-sans text-[15px] font-semibold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">Top content themes</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {athleteThemes.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-sans text-[10px] text-white/65">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Find Overlap engine */}
              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-center">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55">
                    <ArrowLeftRight className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-xl italic leading-none text-white">Find Overlap</p>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-white/40">Darius Vaughn <span className="text-white/25">×</span> Summit Gear</p>
                </div>

                <div className="mt-4 rounded-xl border border-[#dfff00]/25 bg-[#dfff00]/[0.05] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/55">Brand Fit Score</p>
                    <span className="rounded-full px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.12em]" style={{ background: LIME, color: "#000" }}>Strong match</span>
                  </div>
                  <p className="mt-1 font-sans text-[44px] font-extrabold leading-none" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>92</p>
                  <p className="mt-2 font-sans text-[12px] leading-relaxed text-white/70">
                    Darius posts weekly training and recovery content, and his audience
                    over-indexes on performance-minded 18 to 24 men across the Mountain
                    West, the exact demo and region Summit Gear is scaling into. A
                    training-season activation lands low-risk and on-brand for both.
                  </p>

                  <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                    {matchMetrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.1em] text-white/40">{m.label}</p>
                        <p className="mt-0.5 font-sans text-[13px] font-semibold" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5">
                  <p className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Creative bridges</p>
                  <ul className="mt-2 space-y-1.5">
                    {bridges.map((b) => (
                      <li key={b} className="flex gap-2 font-sans text-[11.5px] leading-snug text-white/70">
                        <Sparkles className="mt-[1px] h-3 w-3 shrink-0" style={{ color: LIME }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Brand match card */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
                  <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Sports Equipment · Match</span>
                  <span className="rounded-full px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ background: "rgba(223,255,0,0.16)", color: LIME }}>Brand</span>
                </div>
                <div className="flex flex-1 items-center justify-center p-7" style={{ background: "#e4ecf1" }}>
                  <img src="/brand-summit.png" alt="" aria-hidden className="max-h-16 max-w-[78%] object-contain" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl italic leading-none text-white">Summit Gear</h3>
                  <p className="mt-1.5 flex items-center gap-1 font-sans text-[11.5px] text-white/45">
                    <MapPin className="h-3 w-3 shrink-0" /> Sports Equipment · Denver, CO
                  </p>
                  <p className="mt-3.5 font-sans text-[12px] leading-relaxed text-white/60">
                    Field-tested training and climbing equipment, trusted by collegiate
                    and pro programs and expanding into NIL.
                  </p>
                  <p className="mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">Actively looking for</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {brandWants.map((w) => (
                      <span key={w} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-sans text-[10px] text-white/65">{w}</span>
                    ))}
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/40">Est. deal value</span>
                    <span className="font-sans text-[13px] font-semibold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>$30K to $45K</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Roster intelligence: deep athlete profile + roster table ── */
function RosterIntelligence() {
  const tabs = ["Overview", "Performance", "Audience", "FMV", "Athlete Business"];
  const voice = ["Game-day highlights", "Training & recovery", "Lifestyle & family"];
  const interests = ["Performance gear", "Hydration & nutrition", "Community"];
  const brandFits = [
    { name: "Apex Hydration", fit: 94, reason: "Audience and content align, over-indexes with their 18 to 24 demo." },
    { name: "Voltic Energy", fit: 88, reason: "High-energy game content matches the brand's tone." },
    { name: "Northwind Apparel", fit: 82, reason: "Off-field lifestyle fits their apparel line." },
  ];
  const stats = [
    { label: "Audience Reach", value: "1.2M", sub: "↑ 9.1% · 30d", up: true },
    { label: "Engagement", value: "7.8%", sub: "vs 5.4% cohort", up: true },
    { label: "Brand Fit", value: "94", sub: "score" },
    { label: "Alignment", value: "90", sub: "score" },
  ];
  return (
    <WorldBackdrop src={WORLD_IMG} parallax className={SECTION}>
      <div className={`${WRAP} pb-12 pt-24 md:pb-16 md:pt-28`}>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <ScrimCluster className="inline-block">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Roster</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-white md:text-6xl lg:text-7xl">
              Know every athlete's{" "}
              <span className="italic" style={{ color: LIME }}>value.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-white/65 md:text-lg">
              A living profile for every athlete: audience, content, brand fit,
              and the brands they naturally win, with FMV one toggle away.
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
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">NFL</span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/70">WR</span>
                </div>
                <h3 className="mt-2.5 font-display text-3xl italic leading-none text-white">Darius Vaughn</h3>
                <div className="mt-1.5 flex items-center gap-1.5 font-sans text-[11px] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                  JABA · Verified
                  <span className="text-white/30">·</span> Pro
                </div>
                <p className="mt-1.5 font-sans text-[11px] text-white/45" style={{ fontVariantNumeric: "tabular-nums" }}>
                  Overall <span className="font-semibold text-white/80">92</span> · Content style: Lifestyle
                </p>
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
                  Darius Vaughn is an NFL wide receiver with a fast-growing,
                  highly engaged following across Instagram and TikTok. Known for
                  clutch catches and breakaway speed, he pairs game-day highlights
                  with off-field training, recovery, and lifestyle content that
                  fans rarely get from a pro. That mix of elite on-field
                  performance and authentic personal storytelling makes him a
                  natural fit for performance, apparel, and lifestyle brands.
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

/* ── Light interlude: centered statement + three-up world-image cards ── */
/* ── Light content beat: AI content search ── */
const searchResults = [
  { image: "/athleteglasses1.png", label: "Sponsored", proof: false, platform: "instagram", kind: "Post" },
  { image: "/athleteglasses2.png", label: "Literal Proof", proof: true, platform: "instagram", kind: "Carousel" },
  { image: "/athleteglasses3.png", label: "Sponsored", proof: false, platform: "tiktok", kind: "Video" },
  { image: "/athleteglasses4.png", label: "Literal Proof", proof: true, platform: "instagram", kind: "Reel" },
];

function ContentSection() {
  return (
    <section className={`${SECTION} bg-[#eeeeee]`}>
      <div className={`${WRAP} ${PADS}`}>
        <FadeUp className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-black/45">Content</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-[#0a0a0a] md:text-5xl">
            Search content with{" "}
            <span className="italic" style={{ color: "#0a0a0a", textDecoration: "underline", textDecorationColor: LIME, textDecorationThickness: "0.12em", textUnderlineOffset: "0.08em" }}>AI.</span>
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-black/60">
            Find posts as proof, references, or comps. Brand-visible content is
            enforced, and creative bridges are labeled, never sold as literal proof.
          </p>
        </FadeUp>

        <FadeUp delay={0.12} className="mt-10 md:mt-14">
          <div
            className="overflow-hidden rounded-[18px] p-5"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow:
                "0 16px 44px rgba(0,0,0,0.1), inset 2px 2px 1px -2px rgba(255,255,255,0.95), inset -2px -2px 1px -2px rgba(255,255,255,0.6), inset 1px 1px 1px -0.5px rgba(255,255,255,0.5), inset -1px -1px 1px -0.5px rgba(0,0,0,0.1)",
              backdropFilter: "blur(16px) saturate(160%)",
              WebkitBackdropFilter: "blur(16px) saturate(160%)",
            }}
          >
            {/* Query bar */}
            <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/60 py-1.5 pl-2 pr-1.5">
              <span className="rounded-full px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em]" style={{ background: "rgba(223,255,0,0.25)", color: "#3d4a00" }}>Query</span>
              <span className="flex-1 truncate font-sans text-[14px] font-medium text-[#0a0a0a]">athletes wearing glasses</span>
              <span className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em]" style={{ background: LIME, color: "#000" }}>
                AI Search <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Toggle */}
            <div className="mt-3 flex items-center gap-2 font-sans text-[12px] text-black/55">
              <span className="flex h-4 w-4 items-center justify-center rounded-[4px] text-[10px] font-bold" style={{ background: LIME, color: "#000" }}>✓</span>
              Include creative bridges (labeled, not literal proof)
            </div>

            {/* Summary + filter chips */}
            <p className="mt-4 font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-black/40">3,412 posts returned</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Top Videos · 12", "Sponsored Proof · 540", "Recent Proof · 1,290"].map((c, i) => (
                <span key={c} className="rounded-full border px-2.5 py-1 font-sans text-[11px]" style={i === 0 ? { borderColor: "rgba(0,0,0,0.18)", color: "#0a0a0a", fontWeight: 600 } : { borderColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.5)" }}>{c}</span>
              ))}
            </div>

            {/* Results grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {searchResults.map((r) => (
                <div key={r.image} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3 / 4" }}>
                  <img src={r.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
                  <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.6) 100%)" }} />
                  <div className="absolute inset-x-2 top-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 font-sans text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.proof ? "rgba(255,255,255,0.7)" : LIME }} />
                      {r.label}
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 font-sans text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-sm">
                      {r.platform === "tiktok" ? <TiktokGlyph className="h-2.5 w-2.5" /> : <Instagram className="h-2.5 w-2.5" />}
                      {r.kind}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 px-2 py-1.5">
                    <p className="truncate font-sans text-[8.5px] font-medium uppercase tracking-[0.06em] text-white/75">Glasses · Eyewear · Spectacles · Frames</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Campaign report: results + benchmarks ── */
function BenchBar({ label, value, lime }: { label: string; value: number; lime?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between font-sans text-[11px]">
        <span className="text-white/55">{label}</span>
        <span className="font-semibold" style={{ color: lime ? LIME : "rgba(255,255,255,0.7)", fontVariantNumeric: "tabular-nums" }}>{value}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${(value / 10) * 100}%`, background: lime ? LIME : "rgba(255,255,255,0.4)" }} />
      </div>
    </div>
  );
}

function WeekChart({ data }: { data: number[] }) {
  const W = 300, H = 84, pad = 8;
  const lo = 4, hi = 10;
  const xs = (i: number) => pad + (i / (data.length - 1)) * (W - 2 * pad);
  const ys = (v: number) => H - pad - ((v - lo) / (hi - lo)) * (H - 2 * pad);
  const pts = data.map((v, i) => [xs(i), ys(v)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${xs(data.length - 1).toFixed(1)} ${H - pad} L ${xs(0).toFixed(1)} ${H - pad} Z`;
  const peak = data.indexOf(Math.max(...data));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2.5 w-full" aria-hidden>
      <defs>
        <linearGradient id="weekfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.35" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#weekfill)" />
      <path d={line} fill="none" stroke={LIME} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[peak][0]} cy={pts[peak][1]} r="3.5" fill={LIME} />
    </svg>
  );
}

function CampaignReportSection() {
  const kpis = [
    { label: "Audience Reach", value: "1.2M", delta: "+18% vs goal" },
    { label: "Engagement", value: "8.9%", delta: "Top quartile" },
    { label: "ROI", value: "2.4x", delta: "+0.6x vs avg" },
  ];
  const weekly = [5.2, 6.0, 7.3, 8.0, 9.4, 8.5, 9.1, 8.9];
  const brandBench = [
    { label: "This campaign", value: 8.9, lime: true },
    { label: "Summit average", value: 5.4 },
    { label: "Summit best", value: 9.1 },
  ];
  const athleteBench = [
    { label: "Sponsored (this)", value: 8.9, lime: true },
    { label: "Non-sponsored avg", value: 9.7 },
  ];
  const demographics = [
    { label: "Ages 18-24", value: 62 },
    { label: "Male", value: 71 },
    { label: "Mountain West", value: 38 },
  ];
  const quality = [
    { label: "Saves", value: "12.4K" },
    { label: "Shares", value: "6.1K" },
    { label: "Comments", value: "3.2K" },
    { label: "Positive", value: "94%" },
  ];
  const deliverables = [
    { name: "Launch Reel", eng: "9.4%", reach: "420K" },
    { name: "Training carousel", eng: "8.1%", reach: "310K" },
    { name: "Story series", eng: "7.6%", reach: "180K" },
  ];
  return (
    <WorldBackdrop type="image" src={WORLD_IMG} parallax className={SECTION}>
      <div className={`${WRAP} pb-14 pt-20 md:pb-16 md:pt-24`}>
        <FadeUp className="max-w-2xl">
          <ScrimCluster>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">Mission Control</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-5xl">
              Every deal, <span className="italic" style={{ color: LIME }}>measured.</span>
            </h2>
            <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-white/65">
              Every campaign tracked and benchmarked, against the brand's other
              deals, the athlete's organic posts, and the targets you set.
            </p>
          </ScrimCluster>
        </FadeUp>

        <FadeUp delay={0.12} className="mt-6 md:mt-8">
          <ScrimCluster>
            <GlassPanel className="overflow-hidden">
              {/* Report header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
                <div>
                  <p className="font-sans text-[9.5px] uppercase tracking-[0.16em] text-white/45">Campaign Report</p>
                  <h3 className="mt-0.5 font-display text-xl italic leading-none text-white">Summit Gear <span className="text-white/35">×</span> Darius Vaughn</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10.5px] text-white/40">Training Season · Sep to Nov</span>
                  <span className="rounded-full px-2.5 py-1 font-sans text-[9.5px] font-bold uppercase tracking-[0.12em]" style={{ background: "rgba(223,255,0,0.16)", color: LIME }}>Completed</span>
                  <span className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-sans text-[11px] font-medium text-white/70 sm:inline-flex">
                    <Download className="h-3.5 w-3.5" /> Export CSV
                  </span>
                </div>
              </div>

              {/* Dashboard grid */}
              <div className="space-y-3.5 p-4 md:p-5">
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3.5">
                  {kpis.map((k) => (
                    <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">{k.label}</p>
                      <p className="mt-1 font-sans text-[23px] font-semibold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{k.value}</p>
                      <p className="mt-1 font-sans text-[10px] font-medium" style={{ color: LIME }}>{k.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Row 1: performance over time + benchmarks */}
                <div className="grid grid-cols-1 items-stretch gap-3.5 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <p className="flex items-center gap-1.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">
                      <TrendingUp className="h-3.5 w-3.5" style={{ color: LIME }} /> Engagement by week
                    </p>
                    <WeekChart data={weekly} />
                    <p className="mt-2 font-sans text-[11px] leading-snug text-white/55">
                      Climbed through the campaign, peaked week 5 at the launch reel.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">vs Summit's campaigns</p>
                    <div className="mt-2.5 space-y-2">
                      {brandBench.map((b) => <BenchBar key={b.label} {...b} />)}
                    </div>
                    <p className="mt-2.5 font-sans text-[11px] leading-snug text-white/55">65% above Summit's average, second best of their last 14 deals.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">vs Darius's organic posts</p>
                    <div className="mt-2.5 space-y-2">
                      {athleteBench.map((b) => <BenchBar key={b.label} {...b} />)}
                    </div>
                    <p className="mt-2.5 font-sans text-[11px] leading-snug text-white/55">Held 92% of his organic engagement, the audience stayed with the ad.</p>
                  </div>
                </div>

                {/* Row 2: audience + engagement quality + deliverables */}
                <div className="grid grid-cols-1 items-stretch gap-3.5 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">Audience reached</p>
                    <div className="mt-2.5 space-y-2">
                      {demographics.map((d) => (
                        <div key={d.label}>
                          <div className="flex items-center justify-between font-sans text-[11px]">
                            <span className="text-white/55">{d.label}</span>
                            <span className="font-semibold text-white/80" style={{ fontVariantNumeric: "tabular-nums" }}>{d.value}%</span>
                          </div>
                          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: LIME }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">Engagement quality</p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {quality.map((q) => (
                        <div key={q.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                          <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-white/40">{q.label}</p>
                          <p className="mt-0.5 font-sans text-[16px] font-semibold leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{q.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/55">Deliverables</p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-white/35">Eng · Reach</p>
                    </div>
                    <div className="mt-2.5 space-y-2">
                      {deliverables.map((d) => (
                        <div key={d.name} className="flex items-center gap-2.5">
                          <Instagram className="h-3.5 w-3.5 shrink-0 text-white/40" />
                          <p className="min-w-0 flex-1 truncate font-sans text-[12px] font-medium text-white">{d.name}</p>
                          <span className="shrink-0 font-sans text-[12px] font-semibold" style={{ color: LIME, fontVariantNumeric: "tabular-nums" }}>{d.eng}</span>
                          <span className="shrink-0 font-sans text-[11px] text-white/45" style={{ fontVariantNumeric: "tabular-nums" }}>{d.reach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 md:px-5" style={{ background: "rgba(223,255,0,0.05)" }}>
                <p className="flex items-center gap-2 font-sans text-[12px] leading-snug text-white/80">
                  <Check className="h-4 w-4 shrink-0" style={{ color: LIME }} />
                  <span><span className="font-semibold text-white">Verdict:</span> top-quartile campaign for Summit Gear. Renew Darius Vaughn for the spring drop.</span>
                </p>
                <span className="shrink-0 rounded-full px-3.5 py-1.5 font-sans text-[11.5px] font-semibold" style={{ background: LIME, color: "#000" }}>Renew deal</span>
              </div>
            </GlassPanel>
          </ScrimCluster>
        </FadeUp>
      </div>
    </WorldBackdrop>
  );
}

export default function ForAgenciesPage() {
  return (
    <PageLayout>
      {/* Hero — image backdrop that fades to black into the first section */}
      <WorldBackdrop type="image" src="/for-agencies-hero.png" parallax>
        <div className="audience-page-hero-inner px-6 pb-32 pt-52 text-center md:pb-44 md:pt-64">
          <h1 className="audience-page-h1 [text-wrap:balance]" style={{ maxWidth: "24ch", marginLeft: "auto", marginRight: "auto" }}>
            Turn your roster into{" "}
            <span className="italic" style={{ color: LIME }}>signed deals.</span>
          </h1>
          <p className="audience-page-subtitle" style={{ color: "rgba(255,255,255,0.66)" }}>
            Agencies juggle hundreds of brand conversations. JABA is the layer
            that finds the deals, writes the outreach, and tracks them to close.
          </p>
          <div className="audience-page-hero-cta">
            <VoltButton icon={<Zap className="h-4 w-4" />}>Book a demo</VoltButton>
          </div>
        </div>
      </WorldBackdrop>

      {/* Brand Directory — full search UI */}
      <BrandDirectorySection />

      {/* CRM inbox assistant — light beat */}
      <div className="h-1.5 w-full bg-[#dfff00]" />
      <CrmSection />
      <div className="h-1.5 w-full bg-[#dfff00]" />

      {/* Match Studio — dark dashboard */}
      <MatchStudioSection />

      {/* Roster intelligence — deep profile on world backdrop */}
      <RosterIntelligence />

      {/* Content — light beat (flipped visual-left / text-right) */}
      <div className="h-1.5 w-full bg-[#dfff00]" />
      <ContentSection />
      <div className="h-1.5 w-full bg-[#dfff00]" />

      {/* Mission Control — campaign report + benchmarks */}
      <CampaignReportSection />

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
