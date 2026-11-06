import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0E10",     // main background (near-black)
        panel: "#17181C",   // cards / sections
        ivory: "#F2F0EA",   // primary text
        muted: "#A7ABB3",   // secondary text
        accent: "#B99A76",  // champagne
      },
      fontFamily: { sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;