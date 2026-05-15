/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ────────────────────────────────────────────────────────────────
        // Lyrava brand tokens (v02 · "the sparkle" · May 2026)
        // These are the only colours that may appear on a branded surface.
        // Halo/Lumen live INSIDE the mark — they are not generic UI accents.
        // ────────────────────────────────────────────────────────────────

        // Dark surfaces
        nocturne: {
          DEFAULT: "#1A0E2C", // Primary dark surface; the mark's aubergine card
          deep: "#0E0820", // Vignette edge of card gradient
          lift: "#221440", // Centre of card gradient
        },

        // Sparkle palette — these belong to the mark; use sparingly in UI
        lumen: "#FFFFFF",
        halo: {
          DEFAULT: "#F5D38A", // Outer-stop, warm cream-gold
          soft: "#FFF1C9", // Mid-stop of core gradient
        },

        // Light surfaces
        paper: "#F5EFE3", // Warm cream
        smoke: "#EFE8D8", // Secondary light surface

        // Text
        ink: {
          DEFAULT: "#0E0E10", // Body text on light
          soft: "#5F5E5A", // Secondary text on light
        },
      },
      fontFamily: {
        // Outfit for wordmark + display headings (cap weight at 600)
        display: ['"Outfit Variable"', "Outfit", "Inter", "system-ui", "sans-serif"],
        // Inter for body + UI
        sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
        // JetBrains Mono for eyebrows, captions, technical metadata
        mono: ['"JetBrains Mono Variable"', "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial-leaning fluid scale for headings (Outfit 600)
        "display-2xl": ["clamp(3rem, 6vw + 1rem, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.5rem, 4.5vw + 1rem, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2rem, 3vw + 1rem, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        // 11px monospace eyebrow (per brand R: ALL CAPS only here)
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        prose: "68ch",
        container: "1200px",
        wide: "1320px",
      },
      boxShadow: {
        // Cool starlight core glow (mimics the sparkle itself)
        starlight:
          "0 0 60px -16px rgba(255, 255, 255, 0.45), 0 0 24px -6px rgba(255, 241, 201, 0.4)",
        "starlight-sm": "0 0 28px -8px rgba(255, 241, 201, 0.4)",
        // Warm gold bloom (the halo around the spark)
        glow: "0 0 80px -20px rgba(245, 211, 138, 0.35)",
        "glow-sm": "0 0 32px -8px rgba(245, 211, 138, 0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px -12px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        // Card gradient that matches the mark's Nocturne lift→Nocturne deep
        "card-gradient":
          "radial-gradient(ellipse 60% 55% at 50% 40%, #221440 0%, #1A0E2C 60%, #0E0820 100%)",
        // Subtle hero halo — gold bloom just visible at the top edge
        "halo-radial":
          "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(245, 211, 138, 0.10), transparent 70%)",
        // Sparkle core gradient (Lumen → Halo soft → Halo). Mark-only — NEVER recolour.
        "spark-core":
          "radial-gradient(circle at 46% 46%, #FFFFFF 0%, #FFF1C9 60%, #F5D38A 100%)",
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
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
