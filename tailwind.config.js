export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cedar: "#8a4a25",
        ember: "#2e1711",
        steam: "#f5efe4",
        water: "#0e5f58",
        gold: "#f7d08a",
        amber: "#f6c06e"
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        floatUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        pulseRing: {
          "0%": { transform: "scale(.9)", opacity: ".7" },
          "70%": { transform: "scale(1.7)", opacity: "0" },
          "100%": { transform: "scale(1.7)", opacity: "0" }
        }
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floatUp: "floatUp .8s cubic-bezier(.22,1,.36,1) both",
        pulseRing: "pulseRing 2.4s cubic-bezier(.4,0,.6,1) infinite"
      }
    }
  },
  plugins: []
};
