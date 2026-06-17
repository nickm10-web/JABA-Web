import { useRef } from "react";
import { useInView } from "motion/react";
import CountUp from "react-countup";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";

const LIME = "#dfff00";

interface GlassStatTileProps {
  label: string;
  /** Final numeric value; counts up when scrolled into view. */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Optional delta chip, e.g. "8.1%". */
  delta?: string;
  deltaDir?: "up" | "down";
  /** Optional inline sparkline (relative values, any scale). */
  spark?: number[];
  className?: string;
}

/** Tiny normalized sparkline polyline. */
function Sparkline({ data }: { data: number[] }) {
  const w = 72;
  const h = 22;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 3) - 1.5;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <polyline
        points={pts}
        stroke={LIME}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * A single performance tile: liquid glass, big tabular count-up number, an
 * optional up/down delta chip (lime up, red down), and an optional sparkline.
 */
export function GlassStatTile({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  delta,
  deltaDir = "up",
  spark,
  className,
}: GlassStatTileProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <LiquidGlassCard
      borderRadius="18px"
      blurIntensity="md"
      className={className}
      style={{
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
    >
      <div ref={ref} className="px-5 py-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/60">
          {label}
        </p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="flex items-end gap-2">
            <span
              className="font-sans text-3xl font-extrabold leading-none tracking-tight text-white md:text-4xl"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {inView ? (
                <CountUp
                  end={value}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                  duration={1.6}
                />
              ) : (
                `${prefix}0${suffix}`
              )}
            </span>
            {delta ? (
              <span
                className="mb-1 inline-flex items-center gap-0.5 font-sans text-xs font-semibold"
                style={{
                  color: deltaDir === "up" ? LIME : "#ff6b6b",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {deltaDir === "up" ? "▲" : "▼"} {delta}
              </span>
            ) : null}
          </div>
          {spark ? (
            <span className="mb-0.5 shrink-0">
              <Sparkline data={spark} />
            </span>
          ) : null}
        </div>
      </div>
    </LiquidGlassCard>
  );
}
