import { useEffect, useRef, useState } from "react";
import { Upload, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload a contract or build a deal",
    body: "Schools upload contracts and JABA's AI extracts every detail: brand, amount, deliverables, dates. Brands use the Deal Builder to select athletes and forecast campaign performance before committing budget.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "JABA manages the campaign",
    body: "Athletes get reminders and content ideas through text. No app to download, no portal to learn. Deadlines, follow-ups, and escalations are automated. Your 5-phase pipeline tracks every deal from setup to wrap-up.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "See what's actually working",
    body: "Track real-time campaign performance, compare athletes side by side, and generate reports that prove ROI. Every metric, from engagement to estimated media value, in one view.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hiw-section"
      aria-label="How it works"
    >
      <div className="hiw-inner">
        <p className="hiw-overline">How it works</p>
        <h2 className="hiw-headline">
          How JABA{" "}
          <span className="hiw-headline-accent">works for you.</span>
        </h2>

        <div className="hiw-steps">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className={`hiw-step ${visible ? "hiw-step-visible" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="hiw-step-icon-wrapper">
                  <Icon className="hiw-step-icon" />
                  <div className="hiw-step-icon-glow" />
                </div>
                <span className="hiw-step-number">{step.number}</span>
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-body">{step.body}</p>
                {i < steps.length - 1 && (
                  <div className="hiw-connector" aria-hidden="true" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
