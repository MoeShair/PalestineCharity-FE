/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          300: '#bf67cf',
          400: '#b144c4',
          500: '#a21fba',
          600: '#941db4',
        },
      },
    },
  },
  plugins: [],
}

