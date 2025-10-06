/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pathfinders-blue': '#1e3a8a',
        'pathfinders-teal': '#0d9488',
        'pathfinders-orange': '#ea580c',
        'pathfinders-gold': '#d97706',
      },
    },
  },
  plugins: [],
}
