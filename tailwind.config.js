/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'typathon-black': '#13191C',
        'typathon-grey': '#BCBCBC',
        'typathon-green': '#38A2A5',
      },
    },
  },
  plugins: [],
}
