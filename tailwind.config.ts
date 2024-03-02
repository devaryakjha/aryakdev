import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        page: "var(--bg-color)",
      },
      spacing: {
        "100": "0.25rem",
        "200": "0.5rem",
        "250": "0.75rem",
        "300": "1rem",
        "350": "1.5rem",
        "400": "2rem",
        "425": "2.5rem",
        "450": "3rem",
        "500": "4rem",
        "600": "8rem",
        "625": "10rem",
      },
      colors: {
        primary: {
          "10": "#EDEFFF",
          "40": "#B6BDFF",
          "60": "#919DFF",
          "80": "#6D7CFF",
          "100": "#485BFF",
          "120": "#3A49CC",
          "140": "#2B3799",
          "160": "#1D2466",
          "190": "#07091A",
        },
        neutral: {
          "0": "#FFFFFF",
          "5": "#F3F3F3",
          "10": "#E7E7E7",
          "20": "#D0D0D0",
          "40": "#A0A0A0",
          "60": "#717171",
          "80": "#414141",
          "90": "#2A2A2A",
          "95": "#1E1E1E",
          "100": "#121212",
        },
      },
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        link: "var(--color-text-link)",
      },
    },
  },
  plugins: [],
};
export default config;
