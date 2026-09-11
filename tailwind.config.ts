import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "var(--brand-forest)",
          emerald: "var(--brand-emerald)",
          leaf: "var(--brand-leaf)",
          leafLight: "var(--brand-leaf-light)",
          cream: "var(--surface-cream)",
          sand: "var(--surface-sand)",
          paper: "var(--surface-paper)",
          ink: "var(--text-ink)",
          muted: "var(--text-muted)",
          border: "var(--border-subtle)",
          borderWarm: "var(--border-warm)",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 62, 46, 0.05), 0 2px 6px -1px rgba(15, 62, 46, 0.03)",
        card: "0 10px 30px -5px rgba(15, 62, 46, 0.07), 0 0 1px 1px rgba(15, 62, 46, 0.04)",
        elevated: "0 20px 40px -10px rgba(15, 62, 46, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
