import { useEffect, useRef, useState } from "react";

const floatingChips = [
  { label: "Contract signed", x: "8%", y: "18%", delay: 0 },
  { label: "IG Reel submitted", x: "72%", y: "12%", delay: 0.4 },
  { label: "Reminder sent via text", x: "5%", y: "72%", delay: 0.8 },
  { label: "$24k deal (Phase 3)", x: "78%", y: "68%", delay: 1.2 },
  { label: "JABA Score: 91", x: "68%", y: "42%", delay: 0.6 },
  { label: "Forecast: 2.4M views", x: "12%", y: "46%", delay: 1.0 },
];

export default function ProductShowcaseSection() {
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
      className="showcase-section"
      aria-label="Product preview"
    >
      <div className="showcase-inner">
        <p className="showcase-overline">The platform</p>
        <h2 className="showcase-headline">
          Two dashboards. One platform.{" "}
          <span className="showcase-headline-accent">Both sides of every deal.</span>
        </h2>
        <p className="showcase-subtext">
          Schools and agents manage rosters, upload contracts, and JABA
          extracts the details automatically. Brands discover athletes,
          build campaigns, and forecast ROI before spending a dollar.
          Athletes never log in. JABA reaches them by text.
        </p>

        <div className={`showcase-device ${visible ? "showcase-device-visible" : ""}`}>
          {/* Glowing frame */}
          <div className="showcase-glow" />

          {/* The blurred / teaser dashboard */}
          <div className="showcase-screen">
            {/* Abstract dashboard skeleton */}
            <div className="showcase-skeleton">
              <div className="showcase-skeleton-sidebar">
                <div className="skel-logo" />
                <div className="skel-nav-item skel-w60" />
                <div className="skel-nav-item skel-w80" />
                <div className="skel-nav-item skel-w50 skel-active" />
                <div className="skel-nav-item skel-w70" />
                <div className="skel-nav-item skel-w40" />
              </div>
              <div className="showcase-skeleton-main">
                <div className="skel-header" />
                <div className="skel-cards">
                  <div className="skel-card" />
                  <div className="skel-card" />
                  <div className="skel-card" />
                </div>
                <div className="skel-table">
                  <div className="skel-row" />
                  <div className="skel-row" />
                  <div className="skel-row" />
                  <div className="skel-row" />
                </div>
              </div>
            </div>
            <div className="showcase-screen-blur" />
          </div>

          {/* Floating UI chips */}
          {floatingChips.map((chip) => (
            <div
              key={chip.label}
              className={`showcase-chip ${visible ? "showcase-chip-visible" : ""}`}
              style={{
                left: chip.x,
                top: chip.y,
                animationDelay: `${chip.delay}s`,
                transitionDelay: `${chip.delay + 0.3}s`,
              }}
            >
              <span className="showcase-chip-dot" />
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
