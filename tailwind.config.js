/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#009a74', 
          orange: '#f37021',
          bg: '#f8f9fa'
        }
      }
    },
  },
  plugins: [],
}