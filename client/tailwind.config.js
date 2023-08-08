/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"], // Add Roboto font family here
      },
    },
  },
  plugins: [],
};
