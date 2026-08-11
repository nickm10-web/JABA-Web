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
    <button type="button" onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
