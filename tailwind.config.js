/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(59, 130, 246)',
          dark: '#000000',
          muted: ' #595959',
          light: '#ffffff',
          danger: '#dc2626',
        },
        border: {
          base: '#e7ecf0',
        },
      },
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
      maxWidth: {
        '8xl': '100rem',
      },
      screens: {
        '2xsmall': '320px',
        xsmall: '512px',
        small: '1024px',
        medium: '1280px',
        large: '1440px',
        xlarge: '1680px',
        '2xlarge': '1920px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Ubuntu',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
