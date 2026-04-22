# Lyrava

Static marketing site for **Lyrava**, an automation agency serving the UK and US.
Built with **Astro 5 + Tailwind CSS 3**, outputs pure static HTML/CSS/JS — uploadable
to any cPanel / shared host via FTP. No server runtime required.

---

## Quick start

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Run the dev server (http://localhost:4321)
npm run dev

# 3. Build the production site (outputs to ./dist)
npm run build

# 4. Preview the built site locally
npm run preview
```

> **Node version:** 18.17+ or 20+ recommended. (Astro 5 requires Node ≥ 18.17.)

---

## Project structure

```
lyrava/
├── astro.config.mjs       # Astro + integrations config (site URL lives here)
├── tailwind.config.mjs    # Brand color tokens, fonts, animations
├── tsconfig.json          # Path aliases (@components, @layouts, @lib, @assets)
├── public/                # Files copied as-is to dist/
│   ├── logo.jpg           # Brand logo (4-point spark on indigo)
│   ├── og-default.png     # Default social-share image — REPLACE before launch
│   ├── robots.txt
│   └── .htaccess          # Apache rules: pretty URLs, gzip, cache, security headers
├── src/
│   ├── assets/            # Images processed by Astro (responsive WebP/AVIF)
│   ├── components/        # Reusable .astro components
│   ├── content/           # Markdown for blog & case studies (Step 4)
│   ├── layouts/           # Page wrappers
│   ├── lib/               # Pure TypeScript helpers (site config, SEO, schema)
│   ├── pages/             # File-based routing
│   └── styles/global.css  # Tailwind directives + base styles
└── dist/                  # Build output (created by `npm run build`)
```

### Path aliases

Use the aliases instead of relative `../../` paths:

```ts
import BaseLayout from "@layouts/BaseLayout.astro";
import Logo from "@components/Logo.astro";
import { SITE, SERVICES } from "@lib/site";
```

---

## Editing content (no-code-friendly)

| What you want to change       | Where                                                      |
| ----------------------------- | ---------------------------------------------------------- |
| Site name, tagline, email     | `src/lib/site.ts`                                          |
| Top nav links                 | `PRIMARY_NAV` in `src/lib/site.ts`                         |
| Service blurbs / list         | `SERVICES` in `src/lib/site.ts`                            |
| Social URLs                   | `SITE.social` in `src/lib/site.ts`                         |
| Analytics IDs (GA4, Clarity)  | `SITE.analytics` in `src/lib/site.ts`                      |
| Page copy                     | The matching file in `src/pages/`                          |
| Blog posts                    | `src/content/blog/*.md` (added in Step 4)                  |
| Brand colors                  | `theme.extend.colors` in `tailwind.config.mjs`             |

The home page is `src/pages/index.astro`. Each section is a clearly commented block.

---

## Brand tokens

Set in `tailwind.config.mjs` and exposed as Tailwind classes:

| Token        | Hex       | Tailwind class                |
| ------------ | --------- | ----------------------------- |
| Ink (bg)     | `#1a1033` | `bg-ink`                      |
| Ink deep     | `#120a26` | `bg-ink-deep`                 |
| Glow gold    | `#ffd98a` | `text-glow-400`, `bg-glow-400` |
| Warm white   | `#fef9e7` | `text-glow-100`               |
| Cloud (text) | `#f5f3ff` | `text-cloud`                  |
| Cream        | `#fafaf9` | `bg-cream`                    |
| Ink text     | `#0f0a1f` | `text-ink_text`               |

Gradient: `bg-gold-gradient` (warm-white → soft gold → amber).

---

## Fonts

Self-hosted via `@fontsource-variable/inter` and `@fontsource/instrument-serif`
(installed as npm packages — bundled at build time, no Google CDN call). This is
faster (no extra DNS/TLS round-trip) and avoids the GDPR risk of Google Fonts'
IP logging for UK visitors.

- **Body:** Inter Variable (`font-sans`)
- **Display:** Instrument Serif (`font-display`) — used for headings and italic accents

---

## Assumptions made during scaffolding

A few decisions made without clarification — flag any you'd like changed:

1. **Production URL** is set to `https://lyrava.com` in both `astro.config.mjs` and
   `src/lib/site.ts`. Update both if the real domain differs.
2. **Trailing slashes:** removed. URLs are `/services`, never `/services/`. The
   `.htaccess` enforces this with a 301.
3. **Canonical host:** apex (no `www`). The `.htaccess` 301-redirects www → apex.
   Swap if you prefer www-canonical.
4. **HTTPS redirect** in `.htaccess` is **commented out** — enable it after SSL is
   provisioned on the host (otherwise a redirect loop on first deploy).
5. **OG image** at `public/og-default.png` is a placeholder. Generate a proper
   1200×630 PNG (logo on `#1a1033` background with the tagline) before launch.
   Recommended tools: Figma export, or run a one-off `sharp` script.
6. **Email:** set to `info@lyrava.com` in `src/lib/site.ts` — change there if it ever moves.
7. **Cookie banner** is custom-built (not a third-party CMP). It covers GDPR's
   "freely given, informed, specific" requirement for first-party cookies. If you
   later add Meta Pixel, third-party ad networks, or anything beyond GA4/Clarity,
   you'll likely need a full IAB-TCF CMP — flag and we'll swap it in.
8. **Address / LocalBusiness schema** is not emitted yet — no registered office
   was provided. Add the address in `SITE.address` (`src/lib/site.ts`) to switch
   schema from `Organization` to `LocalBusiness`.

---

## Roadmap (per the original brief)

- [x] **Step 1** — Scaffold, base layout, header, footer, home page (← _you are here_)
- [ ] **Step 2** — All four service pages + services index
- [ ] **Step 3** — About, Contact, legal pages, 404
- [ ] **Step 4** — Blog engine + three seed posts
- [ ] **Step 5** — Final SEO pass (sitemap, OG image, hreflang, deploy docs)
- [ ] **Step 6** — Lighthouse audit, fix anything < 95

---

## Deployment

See `DEPLOY.md` (added in Step 5) for the full FTP/cPanel checklist. Quick version:

1. `npm run build`
2. Upload **the contents of `dist/`** (not the folder itself) to `public_html/`
3. Confirm `.htaccess` made it across (it's a hidden file — most FTP clients hide it by default)
4. Hit the homepage; verify pretty URLs and HTTPS work
5. Submit `https://lyrava.com/sitemap-index.xml` to Google Search Console + Bing
