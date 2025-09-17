module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",   // Blue-600
          secondary: "#F59E0B", // Amber-500
          error: "#EF4444",     // Red-500
          surface: "#ffffff",
          background: "#f9fafb",
          text: "#111827"
        }
      },
      boxShadow: {
        subtle: "0 4px 24px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
}
