import { VoltButton } from "@/components/ui/volt-button";

export default function CtaSection() {
  return (
    <section className="cta-section" aria-label="Get started">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-inner">
        <h2 className="cta-headline font-deck">
          What if you could manage every athlete's deliverables, tasks,
          calendars, and obligations through{" "}
          <img src="/cta-bubble.webp" alt="one text thread?" className="bubble-float cta-bubble" />
        </h2>

        {/* Closing CTA — sized up and given room so it doesn't disappear
            under a headline this large. */}
        <div className="mt-10 flex justify-center">
          <VoltButton
            size="lg"
            className="scale-110 shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
            onClick={() =>
              window.open("https://calendly.com/jordon-jaba/jaba", "_blank", "noopener,noreferrer")
            }
          >
            See JABA in action
          </VoltButton>
        </div>
      </div>
    </section>
  );
}
