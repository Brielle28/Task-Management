/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Removed vue and added jsx and tsx
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'] // Ensure consistent naming
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
