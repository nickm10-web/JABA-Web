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

const FAN = [
  { rotate: -5,   scale: 0.91, y: 20 },
  { rotate: -2.5, scale: 0.96, y: 8  },
  { rotate: 0,    scale: 1.06, y: -12 },
  { rotate: 2.5,  scale: 0.96, y: 8  },
  { rotate: 5,    scale: 0.91, y: 8 },
];

function AgentCard({ agent, idx }: { agent: Agent; idx: number }) {
  const f = FAN[idx];
  const featured = !!agent.captain;

  // GIF bleed above card (px)
  const BLEED = 110;
  // Info section starts this far down from card top
  const INFO_TOP = 130;
  // Card height = info top + nameplate content (~140px)
  const CARD_H = featured ? 290 : 270;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        y: -20,
        zIndex: 30,
        transition: { type: "spring", stiffness: 250, damping: 22 },
      }}
      className="group cursor-pointer"
      style={{
        transform: `rotate(${f.rotate}deg) scale(${f.scale}) translateY(${f.y}px)`,
        zIndex: featured ? 10 : idx < 2 ? idx + 1 : 5 - idx,
        // Extra headroom for bleed
        paddingTop: `${BLEED}px`,
        position: "relative",
      }}
    >
      {/* ── Card background ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${CARD_H}px`,
          overflow: "hidden",
          borderRadius: "18px",
          background: "linear-gradient(160deg, #101010 0%, #060606 100%)",
          border: featured
            ? `1px solid ${LIME}55`
            : "1px solid rgba(255,255,255,0.09)",
          boxShadow: featured
            ? `0 20px 70px rgba(0,0,0,0.9), 0 0 45px ${LIME}14`
            : "0 10px 50px rgba(0,0,0,0.85)",
          zIndex: 2,
        }}
      >
        {/* Top edge highlight */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 3,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          }}
        />

        {/* Deep nameplate gradient */}
        <div
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: "58%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.98) 60%, rgba(0,0,0,0.7) 80%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* ── Nameplate content ── */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 4, padding: "0 16px 16px" }}>
          {/* Index · role — quiet, tabular, one type voice */}
          <p
            className="font-sans"
            style={{
              fontVariantNumeric: "tabular-nums",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: featured ? LIME : "rgba(255,255,255,0.38)",
              marginBottom: "6px",
            }}
          >
            {agent.number} · {agent.position}
          </p>

          {/* Hairline rule */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.16), transparent)",
              marginBottom: "8px",
            }}
          />

          {/* Name — narrative voice, serif */}
          <h3
            className="font-display"
            style={{
              fontSize: featured ? "1.35rem" : "1.2rem",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "5px",
            }}
          >
            {agent.name}
          </h3>

          {/* Description */}
          <p
            className="font-sans"
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
              marginBottom: "8px",
            }}
          >
            {agent.description}
          </p>

          {/* Skills — quiet dotted line instead of rainbow pills */}
          <p
            className="font-sans"
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {agent.skills.join("  ·  ")}
          </p>
        </div>
      </div>

      {/* ── GIF wrapper — floats above card, clips bottom transparent padding ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "130%",
          height: `${BLEED + INFO_TOP}px`,
          transform: "translateX(-50%)",
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
            top: "65%",
            width: "100%",
            transform: `translate(-50%, -50%) scale(${agent.number === "05" ? 1.5 : 1.4})`,
            transformOrigin: "center center",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function RosterSection() {
  return (
    <section className="relative bg-black pt-10 pb-16 text-white md:pt-14 md:pb-20">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.018) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="mb-2 text-center">
          <h2 className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Expand your team without hiring more people.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            JABA's AI agents handle the manual work so you can focus on the high-level stuff and serve your athletes better.
          </p>
        </div>

        {/* Card lineup — needs overflow visible for character bleed */}
        <div
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "12px", paddingTop: "0px", paddingBottom: "2.5rem", overflow: "visible" }}
        >
          {AGENTS.map((agent, i) => (
            <div key={agent.number} className="group" style={{ flex: 1, maxWidth: "250px", minWidth: "160px", overflow: "visible" }}>
              <AgentCard agent={agent} idx={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
