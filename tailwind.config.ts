import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        glass:
          "0 18px 52px rgba(73, 104, 131, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.56), inset 0 -1px 0 rgba(255, 255, 255, 0.14)",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "serif"],
      },
      keyframes: {
        "fade-lift": {
          "0%": {
            opacity: "0",
            transform: "translateY(18px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-lift": "fade-lift 820ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
