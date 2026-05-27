import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Extremely dark navy/black
        foreground: "#f0f0f0", // Highly readable off-white
        cyan: {
          neon: "#00F0FF",
        },
        magenta: {
          neon: "#FF00FF",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 5px theme('colors.cyan.400'), 0 0 20px theme('colors.cyan.500'), 0 0 40px rgba(0, 240, 255, 0.3)",
        "neon-magenta": "0 0 5px theme('colors.magenta.neon'), 0 0 20px theme('colors.magenta.neon'), 0 0 40px rgba(255, 0, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
