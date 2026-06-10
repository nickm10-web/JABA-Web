import { motion } from "motion/react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface VoltButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  size?: "default" | "sm" | "lg";
}

export function VoltButton({
  children,
  onClick,
  className = "",
  icon,
  size = "default",
}: VoltButtonProps) {
  const buttonSizeClass =
    size === "sm"
      ? "gap-1 px-2.5 py-1.5 text-[0.88rem]"
      : size === "lg"
        ? "gap-2 px-5 py-3 text-[0.95rem]"
        : "gap-2 px-4 py-2 text-sm";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border border-[#dfff00]/30 bg-gradient-to-br from-[#dfff00]/90 via-[#f0ff40]/90 to-[#dfff00]/90 shadow-[0_0_20px_rgba(223,255,0,0.2)] backdrop-blur-sm",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.5, 2, 1],
          opacity: [0, 0.3, 0.1, 0],
          x: ["-20%", "0%", "20%", "-20%"],
          y: ["-20%", "0%", "20%", "-20%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.button
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center font-medium text-gray-900",
          buttonSizeClass,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">{children}</span>
        {icon ? <span className="relative z-10">{icon}</span> : null}
      </motion.button>
    </div>
  );
}
