import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface VoltButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  /** Ground the button sits on — only the edge, bevel depth, and drop shadow
   *  change, so it never halos against dark. */
  surface?: "light" | "dark";
  disabled?: boolean;
  /** Defaults to "button" so a CTA dropped into a form never submits it by
   *  accident. A form's own submit button must pass "submit": with type
   *  "button" the click does nothing, and a form with two fields and no submit
   *  button can't be submitted with Enter either. */
  type?: "button" | "submit";
}

/**
 * The primary CTA — volt "soft bevel", per the design handoff. The label is
 * always ink (#11131A): white on volt is ~1.4:1 and fails outright.
 */
export function VoltButton({
  children,
  onClick,
  href,
  className = "",
  size = "default",
  surface = "light",
  disabled,
  type = "button",
}: VoltButtonProps) {
  const classes = cn(
    "volt-btn",
    surface === "dark" && "volt-btn--dark",
    size === "sm" && "volt-btn--sm",
    size === "lg" && "volt-btn--lg",
    className,
  );

  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
