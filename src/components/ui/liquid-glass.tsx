import * as React from "react";
import { cn } from "@/lib/utils";

type Intensity = "sm" | "md" | "lg";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowIntensity?: Intensity;
  shadowIntensity?: Intensity;
  blurIntensity?: Intensity;
  borderRadius?: string;
  draggable?: boolean;
  children?: React.ReactNode;
}

const blurMap: Record<Intensity, string> = {
  sm: "blur(10px)",
  md: "blur(18px)",
  lg: "blur(28px)",
};

const glowMap: Record<Intensity, string> = {
  sm: "0 0 12px rgba(255,255,255,0.08)",
  md: "0 0 24px rgba(255,255,255,0.12)",
  lg: "0 0 40px rgba(255,255,255,0.18)",
};

const shadowMap: Record<Intensity, string> = {
  sm: "0 4px 20px rgba(0,0,0,0.18)",
  md: "0 8px 36px rgba(0,0,0,0.28)",
  lg: "0 16px 56px rgba(0,0,0,0.38)",
};

export function LiquidGlassCard({
  glowIntensity = "md",
  shadowIntensity = "md",
  blurIntensity = "md",
  borderRadius = "16px",
  className,
  style,
  children,
  ...props
}: LiquidGlassCardProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{
        borderRadius,
        background: "rgba(255,255,255,0.1)",
        backdropFilter: blurMap[blurIntensity],
        WebkitBackdropFilter: blurMap[blurIntensity],
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: `${shadowMap[shadowIntensity]}, ${glowMap[glowIntensity]}, inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.08)`,
        ...style,
      }}
      {...props}
    >
      {/* Inner highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
