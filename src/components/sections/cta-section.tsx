import { Zap } from "lucide-react";
import { VoltButton } from "@/components/ui/volt-button";

export default function CtaSection() {
  return (
    <section className="cta-section" aria-label="Get started">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-inner">
        <h2 className="cta-headline">
          Imagine knowing what a campaign will do{" "}
          <span className="cta-headline-accent">before you spend a dollar.</span>
        </h2>
        <p className="cta-subtext">
          Proprietary scoring. Campaign forecasting. An AI assistant that texts
          athletes directly. See why Purdue, Baylor, and Athletes Unlimited chose JABA.
        </p>

        <div className="mt-6 flex justify-center">
          <VoltButton icon={<Zap className="h-4 w-4" />}>
            See JABA in action
          </VoltButton>
        </div>
      </div>
    </section>
  );
}
