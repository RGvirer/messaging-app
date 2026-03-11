/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',      // indigo-600
        'primary-dark': '#4338ca',
        accent: '#10b981',       // emerald-500
        neutral: '#f3f4f6'       // gray-100
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out'
      }
    }
  },
  plugins: []
};