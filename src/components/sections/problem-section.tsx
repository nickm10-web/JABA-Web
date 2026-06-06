import { useEffect, useRef, useState } from "react";

const painPoints = [
  {
    number: "01",
    title: "You're the system",
    body: "Contracts in email. Deliverables in spreadsheets. Reminders in your head. You're manually stitching together every deal across every athlete, and it doesn't scale.",
  },
  {
    number: "02",
    title: "Athletes don't check dashboards",
    body: "You bought a portal. Nobody logs in. Athletes are 18–22, live on their phones, and respond to texts (not app notifications). Missed deadlines pile up because the tool doesn't meet them where they are.",
  },
  {
    number: "03",
    title: "You can't prove what's working",
    body: "Follower counts don't tell the story. You don't know who's actually driving engagement, which campaigns are worth renewing, or how to justify next quarter's budget.",
  },
];

export default function ProblemSection() {
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
      className="problem-section"
      aria-label="The problem"
    >
      <div className="problem-inner">
        <p className="problem-overline">The reality</p>
        <h2 className="problem-headline">
          Working with athletes is a dream job.{" "}
          <span className="problem-headline-accent">The busywork isn't.</span>
        </h2>
        <p className="problem-subtext">
          The NIL market exploded. Revenue sharing changed the game. But the
          tools people use to manage athlete partnerships? Still spreadsheets
          and group chats.
        </p>

        <div className="problem-grid">
          {painPoints.map((point, i) => (
            <article
              key={point.number}
              className={`problem-card ${visible ? "problem-card-visible" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="problem-card-number">{point.number}</span>
              <h3 className="problem-card-title">{point.title}</h3>
              <p className="problem-card-body">{point.body}</p>
              <div className="problem-card-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
