// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- important for React
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#875cf5" // To match your CSS variable --color-primary
      }
    },
  },
  plugins: [],
}
