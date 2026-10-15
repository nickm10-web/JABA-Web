/**
 * The section label. Monospace, wide-tracked, uppercase, on every section.
 *
 * It is the cheapest thing on the page and does the most: a run of sections
 * that all carry the same label treatment reads as one system rather than as
 * sections that were assembled. Mono because the subject is a machine.
 */
export default function Eyebrow({
  children,
  tone = "volt",
}: {
  children: React.ReactNode;
  tone?: "volt" | "muted";
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.22em] ${
        tone === "volt" ? "text-[#dfff00]" : "text-white/35"
      }`}
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
    >
      {children}
    </p>
  );
}
