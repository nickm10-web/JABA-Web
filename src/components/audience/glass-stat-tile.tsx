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
  className?: string;
}

/**
 * A single performance tile: liquid glass, big tabular count-up number, and
 * an optional up/down delta chip (lime up, red down).
 */
export function GlassStatTile({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  delta,
  deltaDir = "up",
  className,
}: GlassStatTileProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <LiquidGlassCard
      borderRadius="18px"
      blurIntensity="md"
      className={className}
    >
      <div ref={ref} className="px-5 py-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/55">
          {label}
        </p>
        <div className="mt-2 flex items-end gap-2">
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
      </div>
    </LiquidGlassCard>
  );
}
