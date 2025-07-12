// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {

        dark: {
          '900': '#0B0F19', // Background
          '800': '#1A2035', // Card Background
          '700': '#2A324B', // Hover, Borders
        },
        primary: {
          'DEFAULT': '#3B82F6', // blue-500
          'hover': '#2563EB'  // blue-600
        }
      }
    },
  },
  plugins: [],
}
