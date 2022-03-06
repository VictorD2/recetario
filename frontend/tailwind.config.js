const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./elements/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#1F2024",
      secondary: "#6676EF",
      transparent: "transparent",
      background: "#F2F2F2",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      rose:colors.rose
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};