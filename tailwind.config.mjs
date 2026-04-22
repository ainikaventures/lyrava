/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand palette extracted from the Lyrava star logo:
        // a near-black aubergine background with a cool-white spark and a
        // faint warm bloom. Gold is an accent, not the headline color.
        ink: {
          DEFAULT: "#140b26", // deep aubergine — primary background
          deep: "#0d0618",
          soft: "#1d1335",
          line: "#241942",
        },
        // Warm-white "starlight" — the dominant accent, used for primary CTAs
        starlight: {
          DEFAULT: "#fef9e7",
          50: "#fffefa",
          100: "#fefcf2",
          200: "#fef9e7", // primary cream
          300: "#fcf2d2",
        },
        // Gold "bloom" — used sparingly: hover glows, eyebrow dots, small accents
        glow: {
          50: "#fefcf2",
          100: "#fef9e7",
          200: "#fdf1c8",
          300: "#fbe49a",
          400: "#ffd98a",
          500: "#f5c25e",
          600: "#d99a3a",
          700: "#a8762b",
        },
        cream: "#fafaf9",
        ink_text: "#0f0a1f",
        cloud: "#f5f3ff",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
      },
      fontSize: {
        // editorial-leaning scale
        "display-2xl": ["clamp(3rem, 6vw + 1rem, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 4.5vw + 1rem, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 3vw + 1rem, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        prose: "68ch",
        container: "1200px",
        wide: "1320px",
      },
      boxShadow: {
        // Cool-white core glow (mimics the spark itself)
        starlight: "0 0 60px -16px rgba(254, 249, 231, 0.55), 0 0 24px -6px rgba(254, 249, 231, 0.4)",
        "starlight-sm": "0 0 28px -8px rgba(254, 249, 231, 0.4)",
        // Warm gold bloom (mimics the halo around the spark) — for hover
        glow: "0 0 80px -20px rgba(255, 217, 138, 0.35)",
        "glow-sm": "0 0 32px -8px rgba(255, 217, 138, 0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px -12px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        // Subtle warm halo for hero — the bloom around the star, not the star itself
        "spark-radial":
          "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(255,217,138,0.10), transparent 70%)",
        // Cool-white CTA — primary surface
        "starlight-gradient":
          "linear-gradient(180deg, #ffffff 0%, #fef9e7 100%)",
        // Warm bloom — secondary, for accents and small flourishes only
        "gold-gradient":
          "linear-gradient(135deg, #fef9e7 0%, #ffd98a 60%, #f5c25e 100%)",
      },
      animation: {
        "fade-up": "fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 500ms ease-out both",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
