import { useState } from "react";
import { ArrowRight } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to backend / CRM. For now just surface the value.
    onSubmit?.(email);
    setEmail("");
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
      <VoltButton size="sm" icon={<ArrowRight className="h-4 w-4" />}>
        {cta}
      </VoltButton>
    </form>
  );
}
