import { useEffect, useRef, useState } from "react";
import { Zap, Target, Eye, Clock, Search, Sparkles, Send, BarChart3, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";

const lifecycleSteps = [
  { label: "Discover", sub: "Athletes" },
  { label: "Build", sub: "Campaign" },
  { label: "Forecast", sub: "Performance" },
  { label: "Send", sub: "Contracts" },
  { label: "Track", sub: "Deliverables" },
  { label: "Measure", sub: "ROI" },
];

const painPoints = [
  {
    icon: Target,
    title: "You're guessing on talent",
    body: "Follower counts don't tell you who will actually drive engagement. You need to know who's authentic, who's growing, and who will move product, before you commit budget.",
  },
  {
    icon: Eye,
    title: "No idea what a campaign will do",
    body: "You sign deals based on vibes and vanity metrics. There's no way to predict views, engagement, or EMV before money is spent. Every campaign is a guess.",
  },
  {
    icon: Clock,
    title: "Post-deal is a black box",
    body: "Once contracts are signed, tracking deliverables across athletes, platforms, and timelines becomes a full-time job. Content sits in review, deadlines slip, and proving ROI is manual math.",
  },
];

const solutions = [
  {
    icon: Search,
    title: "Discover athletes with real data",
    body: "Filter by sport, audience demographics, engagement quality, and growth trajectory. JABA's proprietary scoring goes beyond follower counts to find athletes who actually drive results.",
  },
  {
    icon: Sparkles,
    title: "Forecast before you spend",
    body: "JABA's campaign forecasting predicts expected views, engagement, and estimated media value before you commit a dollar, complete with confidence intervals.",
  },
  {
    icon: Send,
    title: "Build deals in minutes",
    body: "Select athletes, define deliverables, set compensation, and send. All through a guided Deal Builder. Contracts, timelines, and approvals managed in one pipeline.",
  },
  {
    icon: BarChart3,
    title: "Prove ROI, not just reach",
    body: "Track CPM, cost per engagement, and EMV per athlete in real time. See which athletes outperform their forecast and which campaigns are worth renewing.",
  },
];

export default function ForBrandsPage() {
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
          <span className="audience-page-chip">For Brands</span>
          <h1 className="audience-page-h1">
            Athlete brand campaigns,{" "}
            <span className="audience-page-h1-accent">managed for you.</span>
          </h1>
          <p className="audience-page-subtitle">
            This is JABA. AI that makes it easy to collaborate with athletes,
            from finding talent to measuring results.
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
          <p className="audience-page-overline">The problem</p>
          <h2 className="audience-page-h2">
            Athlete marketing is booming.{" "}
            <span className="audience-page-h2-accent">Your tools aren't.</span>
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
            Ready to run campaigns{" "}
            <span className="cta-headline-accent">without the chaos?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See how JABA helps brand teams execute athlete partnerships at scale.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>
            Book a demo
          </VoltButton>
        </div>
      </section>
    </PageLayout>
  );
}
