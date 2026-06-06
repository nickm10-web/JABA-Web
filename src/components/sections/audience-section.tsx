import { useState, useEffect, useRef } from "react";
import { Trophy, Building2, Megaphone, Briefcase } from "lucide-react";

type Audience = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  points: string[];
};

const audiences: Audience[] = [
  {
    id: "athletes",
    label: "Athletes",
    icon: Trophy,
    headline: "Know exactly where every deal stands.",
    points: [
      "See every active partnership and what you owe in one place",
      "Get nudged before deadlines slip, not after",
      "Spend less time in email, more time performing",
    ],
  },
  {
    id: "departments",
    label: "Departments",
    icon: Building2,
    headline: "Run a program, not a fire drill.",
    points: [
      "Manage 50+ athlete deals without spreadsheet chaos",
      "Approval workflows that actually get used",
      "Audit-ready reports generated in seconds",
    ],
  },
  {
    id: "brands",
    label: "Brands",
    icon: Megaphone,
    headline: "Campaigns that deliver. Literally.",
    points: [
      "Track every deliverable across every athlete partner",
      "Real-time status on content, approvals, and posting",
      "Stop chasing. Start scaling.",
    ],
  },
  {
    id: "agents",
    label: "Agents",
    icon: Briefcase,
    headline: "Protect your athletes. Prove your value.",
    points: [
      "Portfolio-wide visibility across every deal and deadline",
      "Flag issues before they become problems",
      "Professional reporting that builds trust with families",
    ],
  },
];

export default function AudienceSection() {
  const [active, setActive] = useState(0);
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = audiences[active];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="audience-section"
      aria-label="Built for every player"
    >
      <div className="audience-inner">
        <p className="audience-overline">Built for every player in the game</p>
        <h2 className="audience-headline">
          One platform.{" "}
          <span className="audience-headline-accent">Every seat at the table.</span>
        </h2>

        <div className="audience-tabs" role="tablist">
          {audiences.map((a, i) => {
            const TabIcon = a.icon;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={i === active}
                className={`audience-tab ${i === active ? "audience-tab-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <TabIcon className="audience-tab-icon" />
                <span>{a.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className={`audience-card ${visible ? "audience-card-visible" : ""}`}
          key={current.id}
        >
          <div className="audience-card-icon-wrap">
            <Icon className="audience-card-icon" />
          </div>
          <h3 className="audience-card-headline">{current.headline}</h3>
          <ul className="audience-card-points">
            {current.points.map((p) => (
              <li key={p} className="audience-card-point">
                <span className="audience-card-check">&#10003;</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
