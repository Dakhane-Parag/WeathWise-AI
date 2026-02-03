export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 12px #22c55e" },
          "50%": { boxShadow: "0 0 24px #22c55e" },
        },
      },
    },
  },
  plugins: [],
};
