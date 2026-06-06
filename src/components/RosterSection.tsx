import { motion } from "motion/react";

interface Agent {
  number: string;
  position: string;
  name: string;
  description: string;
  image: string;
  chips: string[];
  accent: string;
  bgFrom: string;
  bgTo: string;
  captain?: boolean;
}

const AGENTS: Agent[] = [
  {
    number: "01", position: "OPS",
    name: "The Ops Agent",
    description: "Reminders, follow-ups, and deadlines. Always on time.",
    image: "/ops-jaba-headset-holograms.gif",
    chips: ["Follow-ups", "Reminders", "Scheduling"],
    accent: "#60a5fa", bgFrom: "#0a1628", bgTo: "#060d1a",
  },
  {
    number: "02", position: "SALES",
    name: "The Sales Agent",
    description: "Finds brands, builds pitches, and closes opportunities.",
    image: "/sales-jaba-phone-money.gif",
    chips: ["Brand Discovery", "Outreach", "Pitches"],
    accent: "#a3e635", bgFrom: "#0d1a06", bgTo: "#080e04",
  },
  {
    number: "03", position: "DATA",
    name: "The Data Agent",
    description: "Turns campaign performance into usable insights.",
    image: "/data-jaba-glasses-charts.gif",
    chips: ["Metrics", "Reports", "Benchmarks"],
    accent: "#fb923c", bgFrom: "#1a0e04", bgTo: "#110900",
    captain: true,
  },
  {
    number: "04", position: "MANAGEMENT",
    name: "The Management Agent",
    description: "Deliverables, approvals, invoicing. Nothing slips.",
    image: "/management-jaba-invoice.gif",
    chips: ["Deliverables", "Invoicing", "Compliance"],
    accent: "#c084fc", bgFrom: "#110a1c", bgTo: "#0b0612",
  },
  {
    number: "05", position: "CREATIVE",
    name: "The Creative Agent",
    description: "Captions, scripts, and ideas trained on real athlete data.",
    image: "/creative-jaba-notepad-lightbulb.gif",
    chips: ["Captions", "Scripts", "Ideas"],
    accent: "#f472b6", bgFrom: "#1a0612", bgTo: "#10040c",
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
  const f   = FAN[idx];
  const featured = !!agent.captain;

  // GIF bleed above card (px)
  const BLEED    = 110;
  // Info section starts this far down from card top
  const INFO_TOP = 130;
  // Card height = info top + nameplate content (~140px)
  const CARD_H   = featured ? 290 : 270;

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


      {/* ── Card background (overflow: hidden for texture/border) ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${CARD_H}px`,
          overflow: "hidden",
          borderRadius: "18px",
          background: `linear-gradient(160deg, ${agent.bgFrom} 0%, ${agent.bgTo} 100%)`,
          border: featured
            ? `1.5px solid ${agent.accent}72`
            : `1px solid ${agent.accent}36`,
          boxShadow: featured
            ? `0 0 0 1px rgba(255,255,255,0.04), 0 20px 70px rgba(0,0,0,0.9), 0 0 55px ${agent.accent}28`
            : `0 0 0 1px rgba(255,255,255,0.02), 0 10px 50px rgba(0,0,0,0.85), 0 0 26px ${agent.accent}16`,
          zIndex: 2,
        }}
      >
        {/* Foil diagonal lines */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: `repeating-linear-gradient(72deg, transparent 0px, transparent 20px, ${agent.accent}06 20px, ${agent.accent}06 21px)`,
          }}
        />


        {/* Field arc linework */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 200 300" preserveAspectRatio="none">
          <circle cx="100" cy="310" r="150" fill="none" stroke={`${agent.accent}0d`} strokeWidth="1" />
          <circle cx="100" cy="310" r="110" fill="none" stroke={`${agent.accent}08`} strokeWidth="0.5" />
          <line x1="0" y1="230" x2="200" y2="230" stroke={`${agent.accent}08`} strokeWidth="0.5" />
        </svg>

        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 3,
          background: `linear-gradient(90deg, transparent, ${agent.accent}, transparent)`,
        }} />

        {/* Deep nameplate gradient */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: "58%",
          background: `linear-gradient(to top, rgba(0,0,0,0.98) 60%, rgba(0,0,0,0.7) 80%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* ── Nameplate content ── */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 4, padding: "0 16px 16px" }}>
          {/* Number · position */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: "1rem", color: agent.accent, letterSpacing: "-0.02em" }}>
              {agent.number}
            </span>
            <span style={{ color: `${agent.accent}80`, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
              · {agent.position}
            </span>
          </div>

          {/* Accent rule */}
          <div style={{ height: "1px", background: `linear-gradient(90deg, ${agent.accent}60, transparent)`, marginBottom: "8px" }} />

          {/* Title */}
          <h3 style={{ fontWeight: 900, fontSize: featured ? "1.05rem" : "0.95rem", color: "#fff", lineHeight: 1.2, marginBottom: "5px" }}>
            {agent.name}
          </h3>

          {/* Description */}
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: "10px" }}>
            {agent.description}
          </p>

          {/* Chips */}
          <div style={{ display: "flex", flexWrap: "nowrap", gap: "4px", overflow: "hidden" }}>
            {agent.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  background: `${agent.accent}14`,
                  border: `1px solid ${agent.accent}38`,
                  color: agent.accent,
                  borderRadius: "999px",
                  padding: "2px 8px",
                  fontSize: "9px",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
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
            filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.8))`,
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
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/30">AI Agents</p>
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
