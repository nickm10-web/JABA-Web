import { Zap } from "lucide-react";

import { VoltButton } from "@/components/ui/volt-button";

export default function VoltButtonDemo() {
  return (
    <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[42px] border border-[#dfff00]/20 bg-[#151c03] p-10 shadow-[0_24px_80px_rgba(102,121,0,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(223,255,0,0.14),rgba(223,255,0,0)_48%)]" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#efff96]/72">
          Volt CTA
        </p>
        <VoltButton
          icon={<Zap className="h-4 w-4" />}
          className="shadow-[0_0_24px_rgba(223,255,0,0.28)]"
        >
          Book a demo
        </VoltButton>
      </div>
    </div>
  );
}
