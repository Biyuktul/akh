/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // tailwind.config.js
    plugins: [
      require('@tailwindcss/forms'),
    ],
  
}