/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage': {
          'cream': 'var(--color-vintage-cream)',
          'paper': 'var(--color-vintage-paper)',
          'brown': 'var(--color-vintage-brown)',
          'dark': 'var(--color-vintage-dark)',
          'sepia': 'var(--color-vintage-sepia)',
          'gold': 'var(--color-vintage-gold)',
          'red': 'var(--color-vintage-red)',
          'film': 'var(--color-vintage-film)',
        },
      },
      fontFamily: {
        'display': 'var(--font-display)',
        'body': 'var(--font-body)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
