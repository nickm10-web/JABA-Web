import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "University programs" },
  { value: "$4.2M", label: "NIL deals managed" },
  { value: "1,200+", label: "Athletes onboarded" },
  { value: "98%", label: "On-time deliverable rate" },
];

const quotes = [
  {
    body: "JABA replaced four tools and a dozen spreadsheets. I haven't sent a follow-up in weeks. The AI just texts the athletes directly.",
    author: "Director of NIL Operations",
    org: "Power Five Program",
  },
  {
    body: "We used to guess which athletes would perform. Now we see the forecast before we commit budget. That changes the entire conversation.",
    author: "Brand Marketing Lead",
    org: "National CPG Brand",
  },
];

export default function TractionSection() {
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

  return (
    <section
      ref={sectionRef}
      className="traction-section"
      aria-label="Traction"
    >
      <div className="traction-inner">
        <p className="traction-overline">Momentum</p>
        <h2 className="traction-headline">
          The numbers{" "}
          <span className="traction-headline-accent">speak.</span>
        </h2>

        <div className="traction-stats">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`traction-stat ${visible ? "traction-stat-visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="traction-stat-value">{stat.value}</span>
              <span className="traction-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="traction-quotes">
          {quotes.map((q, i) => (
            <blockquote
              key={i}
              className={`traction-quote ${visible ? "traction-quote-visible" : ""}`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <p className="traction-quote-body">&ldquo;{q.body}&rdquo;</p>
              <footer className="traction-quote-footer">
                <span className="traction-quote-author">{q.author}</span>
                <span className="traction-quote-org">{q.org}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
