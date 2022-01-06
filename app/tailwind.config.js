const colors = require("tailwindcss/colors")

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      orange: colors.orange,
      red: colors.red,
      pink: colors.pink,
      green: colors.green,
      cyan: colors.cyan,
      blue: colors.blue,
      rose: colors.rose,
      sky: colors.sky,
      violet: colors.violet,
      teal: colors.teal,
      lime: colors.lime
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
