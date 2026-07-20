import { Zap } from "lucide-react";
import { VoltButton } from "@/components/ui/volt-button";

export default function CtaSection() {
  return (
    <section className="cta-section" aria-label="Get started">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-inner">
        <h2 className="cta-headline">
          What if you could manage every athlete's deliverables, tasks,
          calendars, and obligations through{" "}
          <span className="cta-headline-accent">one text thread?</span>
        </h2>
        <p className="cta-subtext">
          JABA's assistant drafts the replies, fires the reminders, verifies the
          posts, and keeps every deal moving, so nothing slips. Trusted by
          Purdue, Baylor, and Athletes Unlimited.
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
