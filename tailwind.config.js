/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Span utilities used dynamically via the `spanClass` field in lib/data.ts.
    // Listed explicitly so the JIT compiler always emits them, even if a future
    // refactor moves the strings to a path the content scan does not cover.
    "sm:col-span-2",
    "lg:col-span-8",
    "sm:col-span-1",
    "lg:col-span-4",
    "lg:col-span-6",
    "lg:col-span-12",
    // Image positions used dynamically via the `imagePosition` field.
    "object-center",
    "object-top",
    "object-bottom",
    "object-[center_30%]",
    "object-[center_40%]",
  ],
  theme: {
    extend: {
      colors: {
        swiss: {
          bg: "var(--color-bg)",
          "bg-secondary": "var(--color-bg-secondary)",
          text: "var(--color-text)",
          "text-secondary": "var(--color-text-secondary)",
          accent: "var(--color-accent)",
          "accent-hover": "var(--color-accent-hover)",
          border: "var(--color-border)",
          card: "var(--color-card)",
          "card-hover": "var(--color-card-hover)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
