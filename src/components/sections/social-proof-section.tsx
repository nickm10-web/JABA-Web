type Logo = {
  name: string;
  src: string;
  height: number;
  invert?: boolean;
};

const logos: Logo[] = [
  {
    name: "Baylor",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/239.png",
    height: 52,
  },
  {
    name: "Cincinnati",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2132.png",
    height: 52,
  },
  {
    name: "DePaul",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/305.png",
    height: 50,
  },
  {
    name: "Purdue",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/2509.png",
    height: 52,
  },
  {
    name: "Alabama",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/333.png",
    height: 52,
  },
  {
    name: "Mizzou",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/142.png",
    height: 52,
  },
  {
    name: "Ohio State",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/194.png",
    height: 52,
  },
  {
    name: "Athletes Unlimited",
    src: "https://auprosports.com/wp-content/themes/au/assets/img/logo-athletes-unlimited-white.svg",
    height: 34,
  },
  {
    name: "Big3",
    src: "https://big3.com/wp-content/themes/big3/assets/dist/images/logo@2x.png",
    height: 30,
  },
];

export default function SocialProofSection({ light }: { light?: boolean } = {}) {
  const doubled = [...logos, ...logos];

  return (
    <section className={`social-proof-section${light ? " light" : ""}`} aria-label="Trusted by">
      <p className="social-proof-label">
        Trusted by programs building the future of the athlete economy
      </p>
      <div className="social-proof-track-wrapper">
        <div className="social-proof-fade social-proof-fade-left" />
        <div className="social-proof-track">
          {doubled.map((logo, i) => {
            // On the light strip: use ESPN's light-background logo variants and
            // invert white wordmarks so they stay visible.
            const src = light ? logo.src.replace("/500-dark/", "/500/") : logo.src;
            const invertOnLight = light && logo.src.endsWith(".svg");
            return (
              <div key={`${logo.name}-${i}`} className="social-proof-logo-item">
                <img
                  src={src}
                  alt={logo.name}
                  className={`social-proof-logo-img${logo.invert ? " social-proof-logo-invert" : ""}`}
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
