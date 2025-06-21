/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      colors: {
        primary: {
          DEFAULT: "#111827",
          dark: "#1F2937",
          light: "#374151",
        },
        text: {
          DEFAULT: "#F9FAFB",
          muted: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#FFD700",
          light: "#FFE44D",
          dark: "#E6C200",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 215, 0, 0.3)",
        "glow-hover": "0 0 30px rgba(255, 215, 0, 0.5)",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        gradient: "gradient 3s ease infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
