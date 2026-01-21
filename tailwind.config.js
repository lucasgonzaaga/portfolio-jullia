export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        secondary: {
          50: '#f2fcf5',
          100: '#e3f9e9',
          200: '#c1f0cf',
          300: '#90e0aa',
          400: '#56c681',
          500: '#32ab63',
          600: '#23894d',
          700: '#1e6d3f',
          800: '#1a5635',
          900: '#16472e',
          950: '#0b2619',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
