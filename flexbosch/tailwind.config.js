/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.php"],
  theme: {
    extend: {
      colors: {
      'fb-red': "#450000",
      'fb-yellow': "#FFC53E",
      'fb-green': "#006C67"
      },
      'screens': {
        'ws': '1600px'
      }
    },
  },
  plugins: [],
}