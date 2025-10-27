/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        s3pink: '#ffd6e0',
        s3green: '#d4ffea'
      }
    }
  },
  plugins: []
}
