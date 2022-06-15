/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Abril Fatface", "cursive"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
