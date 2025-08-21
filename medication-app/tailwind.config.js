/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
            "0%": { opacity: "0", transform: "translateY(-10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
        },
        zoomSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'zoom-slow': 'zoomSlow 20s ease-in-out infinite alternate',
        "fade-in": "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [],
}
