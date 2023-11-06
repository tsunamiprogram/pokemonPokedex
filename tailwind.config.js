/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xxs": "550px",
        "2xs": "320px",
      },
    },
  },
  plugins: [],
}

