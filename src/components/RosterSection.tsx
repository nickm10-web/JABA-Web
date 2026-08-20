import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LIME = "#dfff00";

interface Agent {
  number: string;
  position: string;
  name: string;
  description: string;
  image: string;
  skills: string[];
  captain?: boolean;
}

const AGENTS: Agent[] = [
  {
    number: "01", position: "Ops",
    name: "The Ops Agent",
    description: "Reminders, follow-ups, and deadlines. Always on time.",
    image: "/ops-jaba-headset-holograms.gif",
    skills: ["Follow-ups", "Reminders", "Scheduling"],
  },
  {
    number: "02", position: "Sales",
    name: "The Sales Agent",
    description: "Finds brands, builds pitches, and closes opportunities.",
    image: "/sales-jaba-phone-money.gif",
    skills: ["Brand discovery", "Outreach", "Pitches"],
  },
  {
    number: "03", position: "Data",
    name: "The Data Agent",
    description: "Turns campaign performance into usable insights.",
    image: "/data-jaba-glasses-charts.gif",
    skills: ["Metrics", "Reports", "Benchmarks"],
    captain: true,
  },
  {
    number: "04", position: "Management",
    name: "The Management Agent",
    description: "Deliverables, approvals, invoicing. Nothing slips.",
    image: "/management-jaba-invoice.gif",
    skills: ["Deliverables", "Invoicing", "Compliance"],
  },
  {
    number: "05", position: "Creative",
    name: "The Creative Agent",
    description: "Captions, scripts, and ideas trained on real athlete data.",
    image: "/creative-jaba-notepad-lightbulb.gif",
    skills: ["Captions", "Scripts", "Ideas"],
  },
];

/* Pyramid across the characters only — largest in the middle, stepping down to
   the edges. The nameplates stay on a flat baseline. */
const FAN = [
  { scale: 0.82 },
  { scale: 1.02 },
  { scale: 1.14 },
  { scale: 1.02 },
  { scale: 0.82 },
];

function AgentCard({ agent, idx, compact }: { agent: Agent; idx: number; compact: boolean }) {
  // The pyramid is a wide-screen composition; in a 2-up grid it just makes
  // some agents randomly smaller than their neighbours.
  const f = compact ? { scale: 1 } : FAN[idx];
  const featured = !!agent.captain;

  // GIF bleed above card (px)
  const BLEED = compact ? 64 : 110;
  // Info section starts this far down from card top
  const INFO_TOP = compact ? 104 : 185;
  // Card height = info top + nameplate content (~140px)
  const CARD_H = compact ? 208 : featured ? 300 : 282;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.6, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{
        zIndex: 10 - Math.abs(idx - 2),
        // Extra headroom for bleed
        paddingTop: `${BLEED}px`,
        position: "relative",
      }}
    >
      {/* No card surface — the agents sit straight on the section's black, so
          only the character and its nameplate read. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${CARD_H}px`,
          zIndex: 2,
        }}
      >
        {/* ── Nameplate content ── */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 4, padding: "0 16px 16px" }}>
          {/* Name */}
          <h3
            className="font-deck"
            style={{
              fontSize: compact ? "1.12rem" : featured ? "1.6rem" : "1.45rem",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "7px",
            }}
          >
            {/* Uniform two-line titles: "The X" over "Agent" on every card. */}
            {agent.name.replace(/ Agent$/, "")}
            <br />
            Agent
          </h3>

          {/* Description */}
          <p
            className="font-sans"
            style={{
              fontSize: compact ? "0.76rem" : "0.82rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.55,
            }}
          >
            {agent.description}
          </p>
        </div>
      </div>

      {/* ── GIF wrapper — floats above card, clips bottom transparent padding ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: compact ? "104%" : "130%",
          height: `${BLEED + INFO_TOP}px`,
          // Pyramid: only the characters scale, biggest in the middle. Grows
          // from the bottom so they all keep their feet on one line.
          transform: `translateX(-50%) scale(${f.scale})`,
          transformOrigin: "bottom center",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        {/* Character — shifted up so visible character fills the box */}
        <img
          src={agent.image}
          alt={agent.name}
          loading="eager"
          style={{
            position: "absolute",
            left: "50%",
            /* Move top anchor up so visible character is centered, cropping bottom empty space */
            top: compact ? "48%" : agent.number === "05" ? "57%" : "65%",
            width: "100%",
            transform: `translate(-50%, -50%) scale(${agent.number === "05" ? 1.55 : 1.45})`,
            transformOrigin: "center center",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function RosterSection() {
  // Phones lay the agents out as a grid; the fanned row needs real width.
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setCompact(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // overflow-x-clip, not hidden: the agent gifs are sized past their cards on
  // purpose and must keep overhanging upward, but the outermost one otherwise
  // runs past the viewport and widens the whole page. clip bounds the x axis
  // while leaving y visible; hidden would force y to scroll.
  // -mt-px: this section and the one above are both pure black, but at DPR 2
  // with fractional heights the boundary between them rounds to a visible
  // hairline. Overlapping by a pixel removes the seam entirely.
  return (
    <section className="relative -mt-px overflow-x-clip bg-black pb-20 pt-14 text-white md:pb-32 md:pt-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.018) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="mb-2 text-center">
          <h2 className="font-deck text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            <span className="block">Expand your team</span>
            <span className="block">
              without hiring <span style={{ color: LIME }}>more people.</span>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white">
            JABA&rsquo;s AI agents handle the manual work.
          </p>
        </div>

        {/* Card lineup — needs overflow visible for character bleed */}
        <div
          /* Five cards at a 160px floor need ~848px. Below that the row scrolls
             on its own rather than dragging the whole page sideways. */
          className="grid grid-cols-2 gap-x-3 gap-y-2 overflow-hidden pb-10 lg:flex lg:items-end lg:justify-center lg:gap-3 lg:overflow-visible lg:pb-10"
        >
          {AGENTS.map((agent, i) => (
            <div
              key={agent.number}
              className="group overflow-visible last:col-span-2 last:mx-auto last:w-1/2 lg:last:col-auto lg:last:mx-0 lg:last:w-auto"
              style={{ flex: 1, maxWidth: "250px", overflow: "visible" }}
            >
              <AgentCard agent={agent} idx={i} compact={compact} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
