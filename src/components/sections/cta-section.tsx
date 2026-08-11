import { VoltButton } from "@/components/ui/volt-button";

export default function CtaSection() {
  return (
    <section className="cta-section" aria-label="Get started">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-inner">
        <h2 className="cta-headline font-deck">
          What if you could manage every athlete's deliverables, tasks,
          calendars, and obligations through{" "}
          <span className="bubble-float relative mt-[0.1em] inline-block rounded-[0.42em] bg-[#0a7cff] px-[0.35em] py-[0.06em] text-[0.85em] text-white">
            one text thread?
            <svg
              className="absolute -right-[0.12em] bottom-0 h-[0.28em] w-[0.28em]"
              viewBox="0 0 14 14"
              fill="#0a7cff"
              aria-hidden
            >
              <path d="M1 0 C2.5 7.5 7 12.2 14 14 C7 14.6 2 12.4 0 8.5 L0 0 Z" />
            </svg>
          </span>
        </h2>
        <p className="cta-subtext">
          JABA's AI drafts the replies, fires the reminders, verifies the posts,
          and keeps every deal moving, so nothing slips.
        </p>

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
