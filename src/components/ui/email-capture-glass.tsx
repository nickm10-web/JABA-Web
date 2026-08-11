import { useState } from "react";

import { VoltButton } from "@/components/ui/volt-button";
import { cn } from "@/lib/utils";

interface EmailCaptureGlassProps {
  className?: string;
  placeholder?: string;
  cta?: string;
  onSubmit?: (email: string) => void;
}

/**
 * Inline email capture styled as liquid glass (same displacement + bevel as the
 * nav). Drop-in replacement for a single hero CTA button.
 */
export function EmailCaptureGlass({
  className = "",
  placeholder = "Enter your email",
  cta = "Get started",
  onSubmit,
}: EmailCaptureGlassProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "hero", company_website: honeypot }),
      });
      if (!res.ok) throw new Error("relay failed");
      onSubmit?.(email);
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("liquid-email-glass", className)}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label="Email address"
        className="liquid-email-input"
      />
      {/* Honeypot: offscreen and skipped by tab order, so only bots fill it. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <VoltButton size="sm">
        {status === "done"
          ? "You're on the list ✓"
          : status === "sending"
            ? "Sending…"
            : status === "error"
              ? "Try again"
              : cta}
      </VoltButton>
    </form>
  );
}
