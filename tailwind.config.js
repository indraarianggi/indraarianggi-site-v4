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
        gray: colors.neutral,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray[700]'),
            fontWeight: '300',
            a: {
              color: theme('colors.primary.500'),
              fontWeight: '400',
              textDecoration: 'none',
              borderBottomWidth: '2px',
              borderBottomStyle: 'solid',
              borderBottomColor: theme('colors.primary.400'),
              display: 'inline-block',
              padding: '0 4px',
              transition: 'all 100ms ease-in-out',
              '&:hover': {
                color: theme('colors.white'),
                backgroundColor: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '400',
            },
            h2: {
              fontWeight: '500',
            },
            h3: {
              fontWeight: '500',
            },
            code: {
              color: theme('colors.secondary.500'),
              fontWeight: '400',
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
