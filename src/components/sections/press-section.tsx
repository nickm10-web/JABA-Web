import { useEffect, useRef, useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";

interface PressRelease {
  id: string;
  partner: string;
  logo?: string;
  date: string;
  headline: string;
  location: string;
  summary: string;
  quotes: { text: string; author: string; title: string }[];
  keyPoints: string[];
}

const pressReleases: PressRelease[] = [
  {
    id: "rmu",
    partner: "Robert Morris University",
    date: "Dec 16, 2025",
    headline:
      "RMU Athletics Integrates JABA\u2019s AI Platform to Power Next-Generation NIL for Student-Athletes",
    location: "Moon Township, PA",
    summary:
      "Robert Morris University Athletics partnered with JABA to give every Colonial student-athlete a centralized system for managing their personal brand, ensuring compliance, and maximizing commercial value.",
    quotes: [
      {
        text: "The integration of JABA\u2019s AI-powered platform is a significant step forward for our NIL support system.",
        author: "Chris King \u201994",
        title: "VP and Director of Athletics, RMU",
      },
      {
        text: "We are proud to partner with RMU Athletics to ensure that every Colonial has a simple, powerful, and compliant way to engage with the market.",
        author: "Jordon Rooney",
        title: "CEO, JABA",
      },
    ],
    keyPoints: [
      "AI-powered pitching automation and media kits",
      "Verified first-party athlete data for brands",
      "Automated compliance and contract management",
      "Real-time ROI tracking for all partnerships",
    ],
  },
  {
    id: "purdue",
    partner: "Purdue University",
    date: "Dec 10, 2025",
    headline:
      "Purdue Athletics Partners with JABA AI to Enhance Student-Athlete Branding and NIL Opportunities",
    location: "West Lafayette, IN",
    summary:
      "Purdue Athletics partnered with JABA AI to assist Boilermaker student-athletes and Boilermaker BrandWorks in brand opportunity outreach, campaign metrics, and deal management.",
    quotes: [
      {
        text: "Partnering with JABA gives us a powerful tool to utilize in the branding and marketing space.",
        author: "Ken Halpin",
        title: "Deputy Athletics Director & COO, Purdue",
      },
    ],
    keyPoints: [
      "Prospective brand opportunity sourcing",
      "Personalized pitches for each Boilermaker",
      "Real-time social media campaign tracking",
      "Backend deal management from start to finish",
    ],
  },
  {
    id: "athletes-unlimited",
    partner: "Athletes Unlimited",
    date: "Dec 1, 2025",
    headline:
      "Athletes Unlimited Partners with JABA to Elevate Athlete Branding Across Pro Women\u2019s Sports",
    location: "New York, NY",
    summary:
      "Athletes Unlimited, which operates professional women\u2019s softball, volleyball, and basketball leagues, partnered with JABA to support athletes in building their brands and managing deliverables.",
    quotes: [
      {
        text: "JABA helps fill a void in the athlete community by working with AI-driven technology to deliver individual, tailored feedback.",
        author: "James Zehren",
        title: "Sr. Manager, Athlete & Content Marketing, AU",
      },
    ],
    keyPoints: [
      "Brand management across three pro women\u2019s leagues",
      "AI-driven individual athlete feedback",
      "Streamlined workflow and deliverable management",
      "Social presence optimization for athletes",
    ],
  },
  {
    id: "baylor",
    partner: "Baylor University",
    date: "Aug 12, 2025",
    headline:
      "Baylor University Partners with JABA to Power Athlete NIL in the Revenue Sharing Era",
    location: "Waco, TX",
    summary:
      "Baylor Athletics teamed up with JABA to streamline NIL operations as college athletics enters the revenue sharing era, in collaboration with Playfly Sports.",
    quotes: [
      {
        text: "Partnering with Playfly and JABA\u2019s AI technology allows us to elevate how our student-athletes engage with their personal brands.",
        author: "David Kaye",
        title: "Athletics General Manager, Baylor",
      },
    ],
    keyPoints: [
      "Smart, scalable brand outreach",
      "Real-time social media and campaign metrics",
      "Deal management from negotiation to execution",
      "Integration with Playfly Max revenue platform",
    ],
  },
  {
    id: "cincinnati",
    partner: "University of Cincinnati",
    date: "2025",
    headline:
      "University of Cincinnati Partners with JABA AI for NIL Brand Outreach and Campaign Management",
    location: "Cincinnati, OH",
    summary:
      "The University of Cincinnati athletics department partnered with JABA AI to assist Cincy Connect NIL in brand opportunity outreach, campaign metrics, and student-athlete deal management.",
    quotes: [
      {
        text: "JABA AI will empower our student-athletes to manage the complexities of deal execution and performance tracking.",
        author: "Eddie Taylor",
        title: "Director of Athlete Influence, Cincinnati",
      },
    ],
    keyPoints: [
      "Brand opportunity sourcing for all Bearcats",
      "Personalized pitch and proposal generation",
      "Real-time campaign performance tracking",
      "Full deal lifecycle management",
    ],
  },
];

export default function PressSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="press"
      className="press-section"
      aria-label="Press"
    >
      <div className="press-inner">
        <p className="press-overline">Press</p>
        <h2 className="press-headline">
          Who's using{" "}
          <span className="press-headline-accent">JABA.</span>
        </h2>
        <p className="press-subtext">
          From Power Five programs to professional leagues, here's what they're
          saying.
        </p>

        <div className="press-grid">
          {pressReleases.map((pr, i) => {
            const isExpanded = expandedId === pr.id;

            return (
              <article
                key={pr.id}
                className={`press-card ${visible ? "press-card-visible" : ""} ${isExpanded ? "press-card-expanded" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  type="button"
                  className="press-card-header"
                  onClick={() => toggleExpand(pr.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="press-card-meta">
                    <span className="press-card-date">{pr.date}</span>
                    <span className="press-card-location">{pr.location}</span>
                  </div>
                  <h3 className="press-card-partner">{pr.partner}</h3>
                  <p className="press-card-headline">{pr.headline}</p>
                  <div className="press-card-toggle">
                    <span className="press-card-toggle-text">
                      {isExpanded ? "Less" : "Read more"}
                    </span>
                    <ChevronRight
                      className={`press-card-chevron ${isExpanded ? "press-card-chevron-open" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="press-card-body">
                    <p className="press-card-summary">{pr.summary}</p>

                    <div className="press-card-quotes">
                      {pr.quotes.map((q, qi) => (
                        <blockquote key={qi} className="press-card-quote">
                          <p className="press-card-quote-text">
                            &ldquo;{q.text}&rdquo;
                          </p>
                          <footer className="press-card-quote-attr">
                            <span className="press-card-quote-author">
                              {q.author}
                            </span>
                            <span className="press-card-quote-title">
                              {q.title}
                            </span>
                          </footer>
                        </blockquote>
                      ))}
                    </div>

                    <ul className="press-card-points">
                      {pr.keyPoints.map((point, pi) => (
                        <li key={pi} className="press-card-point">
                          <span className="press-card-point-dot" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
