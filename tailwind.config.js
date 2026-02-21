/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        primary: "#000000",
        accent: "#F97316",
        textMain: "#F8FAFC",
        textMuted: "#94A3B8",
        glass: "rgba(255, 255, 255, 0.03)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        dot: ['"DotGothic16"', 'sans-serif'],
      },
      scale: {
        '103': '1.03',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        'footer': '4rem',
      }
    },
  },
  plugins: [],
}
