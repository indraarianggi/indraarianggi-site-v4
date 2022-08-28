/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.rose,
        gray: colors.trueGray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray[700]'),
            a: {
              color: theme('colors.secondary.500'),
              fontWeight: '400',
              textDecoration: 'none',
              borderBottomWidth: '2px',
              borderBottomStyle: 'solid',
              borderBottomColor: theme('colors.secondary.400'),
              display: 'inline-block',
              padding: '0 4px',
              transition: 'all 100ms ease-in-out',
              '&:hover': {
                color: theme('colors.white'),
                backgroundColor: theme('colors.secondary.400'),
              },
              code: { color: theme('colors.secondary.400') },
            },
          },
        },
      }),
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['Roboto Mono'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
