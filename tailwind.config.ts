import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { accent: "#9db8c4" },
      fontFamily: { sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;