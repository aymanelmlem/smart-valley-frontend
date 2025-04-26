/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'learning': "url('./src/assets/learn1.jpg')",
        'about': "url('./src/assets/about.jpg')",
        'courses': "url('./src/assets/contact.jpg')"
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),

  ],
}