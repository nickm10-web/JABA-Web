type Logo = {
  name: string;
  src: string;
  height: number;
  invert?: boolean;
};

const logos: Logo[] = [
  {
    name: "Baylor",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
    height: 52,
  },
  {
    name: "Cincinnati",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png",
    height: 52,
  },
  {
    name: "DePaul",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/305.png",
    height: 50,
  },
  {
    name: "Arizona State",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/9.png",
    height: 52,
  },
  {
    name: "Purdue",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
    height: 52,
  },
  {
    name: "RMU",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
    height: 48,
  },
  {
    name: "Wisconsin",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/275.png",
    height: 52,
  },
  {
    name: "Mizzou",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/142.png",
    height: 52,
  },
  {
    name: "Notre Dame",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/87.png",
    height: 52,
  },
  {
    name: "LSU",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/99.png",
    height: 52,
  },
  {
    name: "Michigan State",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/127.png",
    height: 52,
  },
  {
    name: "San Diego",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/301.png",
    height: 50,
  },
  {
    name: "Washington",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/264.png",
    height: 52,
  },
  {
    name: "California",
    src: "https://a.espncdn.com/i/teamlogos/ncaa/500/25.png",
    height: 52,
  },
];

export default function SocialProofSection() {
  const doubled = [...logos, ...logos];

  return (
    <section className="social-proof-section" aria-label="Trusted by">
      <p className="social-proof-label">
        Trusted by programs building the future of athlete business
      </p>
      <div className="social-proof-track-wrapper">
        <div className="social-proof-fade social-proof-fade-left" />
        <div className="social-proof-track">
          {doubled.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="social-proof-logo-item">
              <img
                src={logo.src}
                alt={logo.name}
                className={`social-proof-logo-img${logo.invert ? " social-proof-logo-invert" : ""}`}
                style={{ height: logo.height }}
                loading="eager"
                decoding="async"
                aria-hidden={i >= logos.length}
              />
            </div>
          ))}
        </div>
        <div className="social-proof-fade social-proof-fade-right" />
      </div>
    </section>
  );
}
