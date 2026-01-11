/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // ✅ For Expo Router apps
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          // DEFAULT: "#14b8a6", // teal-500
          // DEFAULT: "#0006b1",
          // DEFAULT: "#1E1E1E",
          DEFAULT: "#1e40af",
          dark: "#0f766e",
          light: "#5eead4",
          textWhite: "#EDEDED",
        },
        background: "#f8fafc",
        text: "#0f172a",
        muted: "#64748b",
        danger: "#ef4444",
        success: "#22c55e",
        primaryBlue: "#0D9488", // For buttons, floating actions
        lightGray: "#F3F4F6", // Background containers
        darkText: "#111827", // Main text
        mutedText: "#6B7280", // Labels
        inStockGreen: "#16A34A", // For availability
        primaryTeal: "#14b8a6",
      },
      fontFamily: {
        body: "Inter_400Regular",
        medium: "Inter_500Medium",
        heading: "Poppins_600SemiBold",
      },
    },
    plugins: [],
  },
};

// 0057B8
// 00AEEF
// 002C6A
// 336699