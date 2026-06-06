import { useEffect, useRef, useState } from "react";
import { Zap, Users, FileWarning, ShieldAlert, LayoutDashboard, Bell, FileCheck, Brain, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";

const lifecycleSteps = [
  { label: "Upload", sub: "Contracts" },
  { label: "Extract", sub: "Deal Details" },
  { label: "Assign", sub: "Athletes" },
  { label: "Automate", sub: "Reminders" },
  { label: "Track", sub: "Deliverables" },
  { label: "Report", sub: "To Leadership" },
];

const painPoints = [
  {
    icon: Users,
    title: "Your NIL team can't scale with headcount",
    body: "Revenue sharing changed everything. Now your department is managing hundreds of athletes, but your NIL team is still 2–3 people. You need systems that let a small team operate at scale.",
  },
  {
    icon: FileWarning,
    title: "Athletes aren't checking your portal",
    body: "You invested in tools, but your athletes are 18–22 and don't log into dashboards. Deadlines get missed because the communication channel doesn't match how they actually operate.",
  },
  {
    icon: ShieldAlert,
    title: "No way to show what your program is doing",
    body: "The AD asks for a quarterly report. Compliance needs an audit trail. You're pulling data from spreadsheets, emails, and DMs to stitch together something presentable.",
  },
];

const solutions = [
  {
    icon: Brain,
    title: "Upload contracts. JABA handles the rest.",
    body: "Upload a brand deal and JABA's AI extracts every detail: brand name, amount, deliverables, dates, parties. Assign athletes, set reminder cadences, and launch. No manual data entry.",
  },
  {
    icon: LayoutDashboard,
    title: "AI text assistant that athletes actually use",
    body: "JABA texts athletes directly via iMessage and RCS with reminders, content ideas, and campaign updates. No app to download. No portal to learn. Response rates 5–10x higher than traditional tools.",
  },
  {
    icon: Bell,
    title: "Every campaign tracked through 5 phases",
    body: "From setup to contract to content to publish to wrap-up, your entire pipeline is visible at a glance. Know what's live, what's overdue, and what's waiting on approval across every sport.",
  },
  {
    icon: FileCheck,
    title: "One-click reports for leadership",
    body: "Generate performance reports, compliance audits, and athlete benchmarks comparing your program against conference and national averages. Give the AD what they need in seconds.",
  },
];

export default function ForSchoolsPage() {
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
          <span className="audience-page-chip">For Schools &amp; Athletic Departments</span>
          <h1 className="audience-page-h1">
            NIL is evolving faster{" "}
            <span className="audience-page-h1-accent">than the systems built to support it.</span>
          </h1>
          <p className="audience-page-subtitle">
            Third-party NIL unlocks opportunity and thousands of deliverables
            to manage. JABA gives your department the operating layer to handle it all.
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
            NIL scaled overnight.{" "}
            <span className="audience-page-h2-accent">Your infrastructure didn't.</span>
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
            Ready to stop{" "}
            <span className="cta-headline-accent">chasing?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how JABA helps athletic departments manage NIL at scale, without the fire drills.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>
            Book a demo
          </VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
