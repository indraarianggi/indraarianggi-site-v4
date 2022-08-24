/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins'],
      mono: ['Roboto Mono'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
