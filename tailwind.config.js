/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        azurea: {
          sky: "#F2F9FF",
          ice: "#E0F2FE",
          baby: "#7DD3FC",
          mint: "#D1FAE5",
          emerald: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
