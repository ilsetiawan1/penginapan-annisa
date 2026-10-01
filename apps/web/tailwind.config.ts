import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf8fd",
          100: "#f3eefa",
          200: "#ede8f8",
          300: "#ded5f2",
          400: "#c4b5e6",
          500: "#9f8ec8",
          600: "#8976c4",
          700: "#7a68b7",
          800: "#6c59aa",
          900: "#594791",
          950: "#36285d",
        },
        purple: {
          50: "#faf8fd",
          100: "#f3eefa",
          200: "#ede8f8",
          300: "#ded5f2",
          400: "#c4b5e6",
          500: "#9f8ec8",
          600: "#8976c4",
          700: "#7a68b7",
          800: "#6c59aa",
          900: "#594791",
          950: "#36285d",
        },
        lilac: {
          50: "#faf8fd",
          100: "#f3eefa",
          200: "#ede8f8",
          300: "#ded5f2",
          400: "#c4b5e6",
          500: "#9f8ec8",
          600: "#8976c4",
        },
        status: {
          ready: "#22c55e",
          occupied: "#3b82f6",
          dirty: "#f59e0b",
          maintenance: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
