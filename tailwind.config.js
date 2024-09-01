/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    darkMode: "class", // Enable dark mode using the 'dark' class
  },

  plugins: [formsPlugin],
};
