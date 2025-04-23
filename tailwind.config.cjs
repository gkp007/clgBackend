/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scrollUp23: "scrollUp 23s linear infinite",
        scrollDown50: "scrollDown 50s linear infinite",
        scrollUp30: "scrollUp 30s linear infinite",
        fadeDown: "fadeDown 0.3s ease-in-out",
        slideDown: "slideDown 0.4s ease-in-out",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        floatFast: "floatFast 3s ease-in-out infinite",
        floatBounce: "floatBounce 4s ease-in-out infinite",
      },
      keyframes: {
        scrollUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        scrollDown: {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatBounce: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
      },
      colors: {
        primary: "#00040f",
        secondary: "#ff8000",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        orange: "orange",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
