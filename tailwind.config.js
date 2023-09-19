/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {

    })
  ],
  theme: {
    extend: {
      fontFamily: {
        Georgia: ['Georama'],
        AnekLatin: ['Anek Latin', 'sans-serif']
      },
      colors: {
        primary: {
          '100': "#E1DBF1",
          '300': "#c2b4e2",
          '400': "#a399d9",
          '500': "#3A0CA3",
          '600': "#6560c7",
          '700': "#2e0a82",
          '800': "#2726a1",
          '900': "#230762"
        },
        Secondary: {
          '100': "#fedeed",
          '300': "#fdbbd9",
          '400': "#a399d9",
          '500': "#f72585",
          '700': "#c61e6a",
          '900': "#941650"
        },
        Tertiary: {
          '100': "#eadaf4",
          '300': "#d3b3e9",
          '500': "#7209b7",
          '700': "#5b0792",
          '900': "#44056e",
        },

      }
    },
  },
  plugins: [],
}

