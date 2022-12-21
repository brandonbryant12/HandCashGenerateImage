module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          Figtree: ["Figtree", "sans-serif"],
        },
        colors: {
          brandGreen: "#41FB74",
          brandDarkGreen: "#3EC163",
          brandBlue: "#084C70",
          brandDarkBlue: "#031A28",
          twitterBlue: "#1DA1F2",
          twitterDarkBlue: "#1077AC",
        },
      },
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  };
  