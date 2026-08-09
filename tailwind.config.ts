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
          navy: "#1a2e5e",
          green: "#2e7d5e",
          white: "#ffffff",
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
