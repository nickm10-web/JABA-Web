import * as React from "react";

import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { FadeUp } from "@/components/audience/fade-up";
import { WorldBackdrop } from "@/components/audience/world-backdrop";

const LIME = "#dfff00";
const WRAP = "mx-auto max-w-7xl px-6 md:px-10 lg:px-12";

/**
 * Standard product-mockup glass surface: brighter than the base
 * LiquidGlassCard (so it reads over both black and world backgrounds) with a
 * soft drop-shadow for depth. Shared by every pillar so they match.
 */
export function GlassPanel({
  className,
  style,
  depth = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { depth?: boolean }) {
  return (
    <div style={depth ? { filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.45))" } : undefined}>
      <LiquidGlassCard
        borderRadius="18px"
        className={className}
        style={{
          // More solid so the panel reads as glass over bright world art,
          // not a transparent overlay.
          background: "rgba(20,22,28,0.5)",
          border: "1px solid rgba(255,255,255,0.18)",
          ...style,
        }}
        {...props}
      >
        {children}
      </LiquidGlassCard>
    </div>
  );
}

/**
 * Wraps a glass mockup with the dark radial scrim behind it so the glass
 * stays legible over bright world art.
 */
export function ScrimCluster({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[48px] blur-2xl"
        style={{
          background:
            "radial-gradient(62% 72% at 50% 45%, rgba(0,0,0,0.62), rgba(0,0,0,0.34) 70%, transparent 100%)",
        }}
      />
      {children}
    </div>
  );
}

type ChipTone = "lime" | "neutral" | "muted";

const chipTones: Record<ChipTone, string> = {
  lime: "border-[#dfff00]/40 text-[#dfff00] bg-[#dfff00]/10",
  neutral: "border-white/20 text-white/80 bg-white/[0.06]",
  muted: "border-white/12 text-white/50 bg-white/[0.03]",
};

/** Small status pill used across the mockups (VISIBLE, TOP 5, SPONSORED…). */
export function StatusChip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em]",
        chipTones[tone],
        className,
      )}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {children}
    </span>
  );
}

interface PillarSectionProps {
  eyebrow: string;
  /** Headline with one lime keyword (pass JSX). */
  headline: React.ReactNode;
  body: string;
  bullets?: string[];
  /** Optional world background; omit for a black section. */
  world?: { src: string; type?: "image" | "video" };
  /** Put the visual on the left instead of the right. */
  reverse?: boolean;
  /** The glass mockup visual. */
  children: React.ReactNode;
}

/** A standard pillar: copy column + glass mockup, over black or a world bg. */
export function PillarSection({
  eyebrow,
  headline,
  body,
  bullets,
  world,
  reverse,
  children,
}: PillarSectionProps) {
  const copyInner = (
    <FadeUp>
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-5xl">
        {headline}
      </h2>
      <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/65 md:text-lg">
        {body}
      </p>
      {bullets ? (
        <ul className="mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex gap-3 font-sans text-[14px] leading-relaxed text-white/70"
            >
              <span
                aria-hidden
                className="mt-[0.7em] h-px w-3 shrink-0"
                style={{ background: LIME }}
              />
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </FadeUp>
  );

  // On world backgrounds, scrim the copy too so text/bullets stay legible.
  const copy = (
    <div className={reverse ? "md:order-2" : undefined}>
      {world ? <ScrimCluster>{copyInner}</ScrimCluster> : copyInner}
    </div>
  );

  const visual = (
    <FadeUp delay={0.12} className={reverse ? "md:order-1" : undefined}>
      <ScrimCluster>{children}</ScrimCluster>
    </FadeUp>
  );

  const inner = (
    <div className={`${WRAP} pb-20 pt-28 md:pb-28 md:pt-36`}>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        {copy}
        {visual}
      </div>
    </div>
  );

  if (world) {
    return (
      <WorldBackdrop
        src={world.src}
        type={world.type ?? "image"}
        parallax
        className="scroll-mt-32 md:scroll-mt-40"
      >
        {inner}
      </WorldBackdrop>
    );
  }
  return <section className="scroll-mt-32 bg-black md:scroll-mt-40">{inner}</section>;
}
