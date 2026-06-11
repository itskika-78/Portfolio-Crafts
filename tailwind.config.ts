import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-80": "var(--color-background-80)",
        "card-solid": "var(--color-card-solid)",
        "card-foreground": "var(--color-card-foreground)",
        "border-light": "var(--color-border-light)",
        "brand-primary": "var(--color-brand-primary)",
        "shade-primary": "var(--color-shade-primary)",
        "shade-secondary": "var(--color-shade-secondary)",
        "shade-tertiary": "var(--color-shade-tertiary)",
        "shade-mute": "var(--color-shade-mute)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-code)", "ui-monospace", "monospace"],
        wordmark: ["var(--font-archivo)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan":
          "0 0 8px rgba(0,255,255,0.55), 0 0 24px rgba(0,255,255,0.25), 0 0 48px rgba(0,255,255,0.12)",
        "neon-box":
          "0 0 0 1px rgba(0,255,255,0.25), 0 0 32px rgba(0,255,255,0.15), inset 0 0 32px rgba(0,255,255,0.04)",
        "card-hover":
          "0 0 0 1px rgba(0,255,255,0.2), 0 8px 48px rgba(0,0,0,0.7)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        glitch: "glitch 0.3s steps(1) infinite",
        "grain-shift": "grain-shift 8s steps(1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            textShadow:
              "0 0 8px rgba(0,255,255,0.8), 0 0 24px rgba(0,255,255,0.4)",
          },
          "50%": {
            textShadow:
              "0 0 16px rgba(0,255,255,1), 0 0 48px rgba(0,255,255,0.6), 0 0 80px rgba(0,255,255,0.2)",
          },
        },
        "grain-shift": {
          "0%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(1%, -1%)" },
          "70%": { transform: "translate(-2%, 2%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-1%, 1%)" },
          "100%": { transform: "translate(0, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.37, 0, 0.63, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
