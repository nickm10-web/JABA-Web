import { Sparkles } from "lucide-react";

import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function LiquidGlassButtonDemo() {
  return (
    <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[42px] border border-white/60 bg-white/60 p-10 shadow-[0_22px_64px_rgba(100,126,153,0.16)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),rgba(255,255,255,0)_55%)]" />
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8">
        <LiquidButton size="sm">Small</LiquidButton>
        <LiquidButton size="xl" className="text-[2rem] tracking-[-0.03em] text-slate-900">
          <span>Generate</span>
          <Sparkles className="h-6 w-6" />
        </LiquidButton>
        <LiquidButton size="lg">Submit</LiquidButton>
        <LiquidButton size="icon" aria-label="Spark">
          <Sparkles className="h-5 w-5" />
        </LiquidButton>
      </div>
    </div>
  );
}
