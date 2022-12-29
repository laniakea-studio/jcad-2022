/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#000053",
      },
      white: "#fff",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
};
