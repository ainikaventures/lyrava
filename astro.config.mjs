import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// IMPORTANT: change this to your real production domain before deploying.
// All canonical URLs, sitemap entries, and OG tags derive from it.
export const SITE_URL = "https://lyrava.com";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "en-GB": "en-GB",
          "en-US": "en-US",
        },
      },
    }),
  ],
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
