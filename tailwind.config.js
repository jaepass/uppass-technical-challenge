/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6b87ed',
          DEFAULT: '#4364e8',
          dark: '#3b5ad0',
          50: '#eef2fe',
          100: '#dce4fd',
          200: '#b9c9fb',
          300: '#96aef9',
          400: '#7393f7',
          500: '#4364e8',
          600: '#3b5ad0',
          700: '#3450b8',
          800: '#2c46a0',
          900: '#243c88',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
