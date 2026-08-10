import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0d1b3d",
          green: "#2e7d32",
          white: "#ffffff",
        },
        vijana: {
          primary: "#0e3b40",
          secondary: "rgba(14, 59, 64, 0.67)",
          bg: "#f8fafc",
        },
      },
      boxShadow: {
        brand: "0 24px 80px rgba(26, 46, 94, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
