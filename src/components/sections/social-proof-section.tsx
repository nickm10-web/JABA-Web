import { useEffect, useState } from "react";

type Logo = {
  name: string;
  src: string;
  height: number;
  /** Intrinsic width ÷ height, so the slot can be sized before the file lands. */
  ratio: number;
  invert?: boolean;
};

const logos: Logo[] = [
  { name: "Baylor", src: "/logos/ncaa-239.png", height: 52, ratio: 1 },
  { name: "Purdue", src: "/logos/ncaa-2509.png", height: 52, ratio: 1 },
  { name: "Robert Morris University", src: "/logos/ncaa-2523.png", height: 48, ratio: 1 },
  { name: "Cincinnati", src: "/logos/ncaa-2132.png", height: 52, ratio: 1 },
  { name: "Every True Tiger", src: "/logo-every-true-tiger.png", height: 54, ratio: 353 / 216 },
  { name: "Rally", src: "/logo-rally.png", height: 38, ratio: 242 / 152 },
  { name: "DePaul", src: "/logos/ncaa-305.png", height: 50, ratio: 1 },
  { name: "Arizona State", src: "/logos/ncaa-9.png", height: 52, ratio: 1 },
  { name: "Cal", src: "/logos/ncaa-25.png", height: 52, ratio: 1 },
  { name: "Athletes Unlimited", src: "/logos/athletes-unlimited.svg", height: 34, ratio: 738.558 / 234.444 },
];

export default function SocialProofSection({ light }: { light?: boolean } = {}) {
  const doubled = [...logos, ...logos];

  // Hold the strip until every logo has decoded — otherwise they trickle in one
  // at a time and the row visibly reflows as each arrives.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      logos.map((logo) => {
        const img = new Image();
        img.src = logo.src;
        return img.decode().catch(() => undefined);
      }),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={`social-proof-section${light ? " light" : ""}`} aria-label="Trusted by">
      <p className="social-proof-label">
        Trusted by programs building the future of the athlete economy
      </p>
      <div className="social-proof-track-wrapper">
        <div className="social-proof-fade social-proof-fade-left" />
        <div
          className="social-proof-track"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.45s ease" }}
        >
          {doubled.map((logo, i) => {
            // The band is light in every context now, so white wordmark
            // assets (SVGs) get inverted to stay visible.
            const invertOnLight = logo.src.endsWith(".svg");
            return (
              <div key={`${logo.name}-${i}`} className="social-proof-logo-item">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`social-proof-logo-img${logo.invert ? " social-proof-logo-invert" : ""}`}
                  width={Math.round(logo.height * logo.ratio)}
                  height={logo.height}
                  style={{ height: logo.height, ...(invertOnLight ? { filter: "invert(1)" } : {}) }}
                  loading="eager"
                  decoding="async"
                  aria-hidden={i >= logos.length}
                />
              </div>
            );
          })}
        </div>
        <div className="social-proof-fade social-proof-fade-right" />
      </div>
    </section>
  );
}
