/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#00897B', dark: '#4DB6AC' },
        secondary: { DEFAULT: '#FFA000', dark: '#FFB300' },
        surface: { light: '#FFFFFF', dark: '#1E1E1E' },
        background: { light: '#FAFAFA', dark: '#121212' }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        indopak: ['IndoPak', 'Noto Nastaliq Urdu', 'serif'],
      },
      keyframes: {
        'slide-up': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        'slide-down': { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(100%)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'shimmer': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'scale-in': { '0%': { transform: 'scale(0.8)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } }
      },
      animation: {
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slide-down 0.3s ease-in forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-out': 'fade-out 0.3s ease-in forwards',
        'shimmer': 'shimmer 2s infinite',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    }
  },
  plugins: [],
}
