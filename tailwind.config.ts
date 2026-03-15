import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5f2",
          100: "#d4e6dd",
          200: "#a9cdbb",
          300: "#79b195",
          400: "#4f9171",
          500: "#2f7556",
          600: "#225e45",
          700: "#1d4d39",
          800: "#193e2f",
          900: "#163329"
        },
        navy: {
          50: "#eff4fb",
          100: "#d8e2f0",
          200: "#b1c4e0",
          300: "#819fcc",
          400: "#567bad",
          500: "#395f90",
          600: "#2c4c76",
          700: "#243e60",
          800: "#20344f",
          900: "#1d2d43"
        }
      },
      boxShadow: {
        soft: "0 20px 45px -24px rgba(15, 23, 42, 0.25)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(47, 117, 86, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(47, 117, 86, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
