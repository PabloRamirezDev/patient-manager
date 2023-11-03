import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      animation: {
        "bounce-sm": "bounce-sm 1s infinite",
        "fade-in": "fade-in 300ms both",
        "fade-out": "fade-out 300ms both",
        grow: "grow 300ms both ease-in-out",
        shrink: "shrink 300ms both ease-in-out",
        'shake-x': "shake-x 100ms 3 both",
      },
    },
  },
  plugins: [],
};
export default config;
