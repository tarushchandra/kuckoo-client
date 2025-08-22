import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      xs1: "489px",
    },
    extend: {
      colors: {
        // primary: {
        //   50: "#f0fdf4",
        //   100: "#dcfce7",
        //   200: "#bbf7d0",
        //   300: "#86efac",
        //   400: "#4ade80",
        //   500: "#1db954", // Spotify's signature green
        //   600: "#16a34a",
        //   700: "#15803d",
        //   800: "#166534",
        //   900: "#14532d",
        //   950: "#052e16",
        // },

        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#e91e63", // Instagram pink
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
        "18": "repeat(18, minmax(0, 1fr))",
        "19": "repeat(19, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))",
        "21": "repeat(21, minmax(0, 1fr))",
        "22": "repeat(22, minmax(0, 1fr))",
      },
      screens: {
        sm: "570px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
