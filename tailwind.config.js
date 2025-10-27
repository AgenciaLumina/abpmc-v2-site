/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}", "./lib/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        text: { DEFAULT: "#222222", light: "#FFFFFF", footer: "#F5F6F7" },
        background: { internal: "#fefefe", home: "#0B1220", footer: "#021228" },
        download: { 500: "#2b4e6d", 600: "#214059", hover: "#22949e" },
        primary: { 500: "#2C74FF", 700: "#1d54c7" },
        secondary: { 500: "#01C2CE" },
        link: { footerHover: "#2C74FF" }
      },
      boxShadow: {
        panelSoft: "0 10px 30px rgba(11,18,32,.06), 0 40px 120px rgba(11,18,32,.10)"
      },
      borderRadius: { panel: "20px", pill: "9999px" },
      maxWidth: { container: "1280px" }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
