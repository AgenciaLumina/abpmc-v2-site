export const tokens = {
  colors: {
    text: { default: "#222222", light: "#FFFFFF" },
    background: { internal: "#fefefe", home: "#0B1220" },
    download: { 500: "#2b4e6d", 600: "#214059", hover: "#22949e" },
    primary: { 500: "#2C74FF", 700: "#1d54c7" },
    secondary: { 500: "#01C2CE" }
  },
  shadows: {
    panelSoft: "0 10px 30px rgba(11,18,32,.06), 0 40px 120px rgba(11,18,32,.10)"
  },
  typography: {
    pageTitle: { font: "var(--font-outfit)", size: "50px", line: "1.1", weight: 800 },
    downloadTitle: { font: "var(--font-outfit)", size: "20px", line: "28px", weight: 700 }
  },
  radius: { panel: "20px", pill: "9999px" }
} as const;
export type Tokens = typeof tokens;
