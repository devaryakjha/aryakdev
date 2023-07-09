/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        tightest: "-0.45rem",
      },
      backgroundImage: {
        "coming-soon": 'url("/images/bg.png")',
        cubes: "url('/images/cubes.png')",
      },
      backgroundColor: {
        primary: "#1D252C",
      },
    },
  },
  plugins: [],
};
