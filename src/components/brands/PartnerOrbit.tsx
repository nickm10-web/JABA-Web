/**
 * The brand at the centre, the universities and agencies already on JABA
 * around it, a line from one to each. Shared by the hero and the walkthrough's
 * first act, so the two can never show different partners.
 *
 * `linked` is how many partners are connected so far; `highlight` is the one
 * line drawn in volt, the most recent connection or, once all are in, the one
 * a signal is travelling along.
 *
 * The partners are the logo strip's, copied rather than imported so this never
 * touches the strip, which another branch is editing. The three drawn in black
 * go to a white reverse on the dark stage.
 */

export const PARTNERS = [
  { name: "Baylor", src: "/logos/ncaa-239.png" },
  { name: "Purdue", src: "/logos/ncaa-2509.png" },
  { name: "Robert Morris", src: "/logos/ncaa-2523.png" },
  { name: "Cincinnati", src: "/logos/ncaa-2132.png", reverse: true },
  { name: "Every True Tiger", src: "/logo-every-true-tiger.png", reverse: true },
  { name: "Rally", src: "/logo-rally.png", reverse: true },
  { name: "DePaul", src: "/logos/ncaa-305.png" },
  { name: "Arizona State", src: "/logos/ncaa-9.png" },
  { name: "Cal", src: "/logos/ncaa-25.png" },
  { name: "Athletes Unlimited", src: "/logos/athletes-unlimited.svg" },
];

const R = 41; // orbit radius, % of the square

export default function PartnerOrbit({
  brand,
  linked,
  highlight,
  showBrand = true,
}: {
  brand: string;
  linked: number;
  highlight: number;
  showBrand?: boolean;
}) {
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {PARTNERS.map((p, i) => {
          const a = (i / PARTNERS.length) * Math.PI * 2 - Math.PI / 2;
          const on = i < linked;
          const hot = on && i === highlight;
          return (
            <line
              key={p.name}
              x1={50}
              y1={50}
              x2={50 + Math.cos(a) * R}
              y2={50 + Math.sin(a) * R}
              pathLength={1}
              stroke={hot ? "#dfff00" : "rgba(255,255,255,0.28)"}
              strokeWidth={hot ? 0.45 : 0.25}
              strokeDasharray={1}
              strokeDashoffset={on ? 0 : 1}
              style={{ transition: "stroke-dashoffset 380ms ease-out, stroke 500ms, stroke-width 500ms" }}
            />
          );
        })}
      </svg>

      {PARTNERS.map((p, i) => {
        const a = (i / PARTNERS.length) * Math.PI * 2 - Math.PI / 2;
        const on = i < linked;
        return (
          <div
            key={p.name}
            className="absolute flex h-[15%] w-[15%] items-center justify-center rounded-full border bg-black transition-all duration-500"
            style={{
              left: `${50 + Math.cos(a) * R}%`,
              top: `${50 + Math.sin(a) * R}%`,
              borderColor: on ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)",
              transform: `translate(-50%, -50%) scale(${on ? 1 : 0.9})`,
            }}
          >
            <img
              src={p.src}
              alt={p.name}
              className="max-h-[56%] max-w-[66%] object-contain transition-all duration-500"
              style={{
                opacity: on ? 1 : 0.28,
                filter: p.reverse ? "brightness(0) invert(1)" : on ? "none" : "grayscale(1)",
              }}
            />
          </div>
        );
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="max-w-[11rem] truncate rounded-full bg-white px-5 py-2.5 text-center font-sans text-[15px] font-bold text-[#0a0a0a] shadow-[0_0_60px_rgba(255,255,255,0.18)] transition-transform duration-500 md:max-w-[14rem] md:text-[18px]"
          style={{ transform: `scale(${showBrand ? 1 : 0.8})` }}
        >
          {brand}
        </div>
      </div>
    </div>
  );
}
