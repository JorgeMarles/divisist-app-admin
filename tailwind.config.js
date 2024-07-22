const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#D9D9D9",
          500: "#666666",
          900: "#333333"
        },
        white: "#F5F5F5",
        orange: "#FF5733",
        darkblue: "#004088",
        lightblue: "#0080FF",
        principal: "#DD4B39",
        secondary: "#A31A07",
        darkred: "#841101"
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}
