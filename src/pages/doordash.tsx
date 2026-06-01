import { useEffect, useRef, useState } from "react";
import { Zap, Layers, AlertTriangle, BarChart2, Bot, Search, Send, LineChart, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";

const lifecycleSteps = [
  { label: "Score", sub: "Athletes" },
  { label: "Pitch", sub: "Brands" },
  { label: "Negotiate", sub: "Deals" },
  { label: "Manage", sub: "Deliverables" },
  { label: "Track", sub: "Payments" },
  { label: "Prove", sub: "Value" },
];

const painPoints = [
  {
    icon: Layers,
    title: "You can't pitch what you can't measure",
    body: "When a brand asks why they should pay your athlete $15K, you need more than follower counts. You need engagement quality, audience authenticity, and performance data that justifies the rate.",
  },
  {
    icon: AlertTriangle,
    title: "Deals fall apart in execution",
    body: "You closed the deal — but the athlete missed the posting window, the caption was wrong, and the brand is frustrated. You're spending more time chasing deliverables than closing new business.",
  },
  {
    icon: BarChart2,
    title: "Your athletes don't see your impact",
    body: "You're grinding behind the scenes, but athletes and their families can't see the full picture. Without organized reporting, your value is invisible — even when you're the reason deals are landing.",
  },
];

const solutions = [
  {
    icon: Bot,
    title: "Data that justifies the rate",
    body: "JABA scores every athlete across engagement quality, audience authenticity, and growth trajectory. Use Compare Mode to build side-by-side pitch decks showing exactly why your athlete outperforms peers.",
  },
  {
    icon: Search,
    title: "AI-generated pitch decks and media kits",
    body: "Stop building decks manually. JABA generates professional, data-backed media kits and personalized pitches instantly — tailored to the brand you're targeting.",
  },
  {
    icon: Send,
    title: "Automated campaign management",
    body: "Once the deal closes, JABA takes over execution. Text reminders to athletes, deadline tracking, content approvals, and payment status — all in one pipeline with full CRM built in.",
  },
  {
    icon: LineChart,
    title: "Show your athletes what you've built",
    body: "Generate reports showing every deal, deliverable, and dollar across your roster. Track deal history, rate trends, and growth over time. Your impact — documented and shareable.",
  },
];

export default function DoordashPage() {
  const painRef = useRef<HTMLDivElement | null>(null);
  const solRef = useRef<HTMLDivElement | null>(null);
  const transRef = useRef<HTMLDivElement | null>(null);
  const [painVisible, setPainVisible] = useState(false);
  const [solVisible, setSolVisible] = useState(false);
  const [transVisible, setTransVisible] = useState(false);

  useEffect(() => {
    const observe = (el: HTMLElement | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold: 0.12 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    const c1 = observe(painRef.current, setPainVisible);
    const c2 = observe(solRef.current, setSolVisible);
    const c3 = observe(transRef.current, setTransVisible);
    return () => { c1?.(); c2?.(); c3?.(); };
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="audience-page-hero">
        <div className="audience-page-hero-inner">
          <span className="audience-page-chip">For Agencies &amp; Agents</span>
          <h1 className="audience-page-h1">
            AI built for{" "}
            <span className="audience-page-h1-accent">athlete agencies.</span>
          </h1>
          <p className="audience-page-subtitle">
            JABA gives agencies and agents complete visibility across every
            athlete, deal, and deliverable in their portfolio — so nothing
            slips and your impact is always clear.
          </p>
          <div className="audience-page-hero-cta">
            <VoltButton icon={<Zap className="h-4 w-4" />}>
              Book a demo
            </VoltButton>
          </div>
        </div>
      </section>

      {/* Lifecycle marquee */}
      <section className="lifecycle-marquee-section">
        <div className="lifecycle-marquee-track">
          {[...lifecycleSteps, ...lifecycleSteps, ...lifecycleSteps].map((step, i) => (
            <div key={i} className="lifecycle-marquee-item">
              <span className="lifecycle-marquee-label">{step.label}</span>
              <span className="lifecycle-marquee-sub">{step.sub}</span>
              {i < lifecycleSteps.length * 3 - 1 && (
                <ArrowRight className="lifecycle-marquee-arrow" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pain points */}
      <section className="audience-page-section">
        <div className="audience-page-section-inner">
          <p className="audience-page-overline">Operational reality</p>
          <h2 className="audience-page-h2">
            Representing athletes is hard.{" "}
            <span className="audience-page-h2-accent">Your tools make it harder.</span>
          </h2>
          <div ref={painRef} className="audience-page-cards">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className={`audience-page-card ${painVisible ? "audience-page-card-visible" : ""}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="audience-page-card-icon-wrap">
                    <Icon className="audience-page-card-icon" />
                  </div>
                  <h3 className="audience-page-card-title">{p.title}</h3>
                  <p className="audience-page-card-body">{p.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transition */}
      <section className="audience-page-transition" ref={transRef}>
        <div className={`audience-page-transition-inner ${transVisible ? "audience-page-transition-visible" : ""}`}>
          <p className="audience-page-transition-label">We built AI to fix this.</p>
          <h2 className="audience-page-transition-headline">Meet JABA.</h2>
        </div>
      </section>

      {/* Solution */}
      <section className="audience-page-section audience-page-section-alt">
        <div className="audience-page-section-inner">
          <p className="audience-page-overline">The JABA way</p>
          <h2 className="audience-page-h2">
            AI that manages the{" "}
            <span className="audience-page-h2-accent">whole campaign lifecycle.</span>
          </h2>
          <div ref={solRef} className="audience-page-cards audience-page-cards-2x2">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  className={`audience-page-card audience-page-card-sol ${solVisible ? "audience-page-card-visible" : ""}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="audience-page-card-icon-wrap audience-page-card-icon-volt">
                    <Icon className="audience-page-card-icon" />
                  </div>
                  <h3 className="audience-page-card-title">{s.title}</h3>
                  <p className="audience-page-card-body">{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="audience-page-cta">
        <div className="audience-page-cta-inner">
          <h2 className="audience-page-cta-h2">
            Ready to run your agency{" "}
            <span className="cta-headline-accent">like a machine?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how JABA helps agents manage portfolios and prove their impact.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>
            Book a demo
          </VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
