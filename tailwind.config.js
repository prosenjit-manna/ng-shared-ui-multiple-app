/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/**/src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#1e293b',
          dark: '#0f172a',
          light: '#334155',
        },
      },
    },
  },
  plugins: [],
};
