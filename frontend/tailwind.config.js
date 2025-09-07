/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 tells Tailwind to scan all your src files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
