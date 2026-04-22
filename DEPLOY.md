# Deploying Lyrava to shared hosting (cPanel / FTP)

The site is fully static — no Node, no PHP runtime needed (except for the
contact form handler you'll wire up separately). You're uploading plain
HTML/CSS/JS/fonts that any Apache or LiteSpeed host can serve.

---

## 1. Build locally

```bash
cd lyrava
npm install        # first time only
npm run build      # outputs ./dist
```

You should see output like `14 page(s) built in ~600ms` and a populated `dist/`
folder.

## 2. Upload `dist/` contents to `public_html/`

> **Upload the contents of `dist/`, NOT the `dist/` folder itself.**
> Your homepage should be at `public_html/index.html`, not
> `public_html/dist/index.html`.

### Via cPanel File Manager
1. Log in to cPanel → **File Manager** → open `public_html/`.
2. Click **Upload**, select **all files** from inside your local `dist/`
   folder, and upload them.
3. **Important:** make sure the hidden `.htaccess` file made it across.
   In cPanel File Manager, click **Settings** (top right) → check
   **Show Hidden Files (dotfiles)** before uploading.

### Via FTP (FileZilla, Cyberduck, Transmit, etc.)
1. Connect with the credentials your host gave you.
2. In your client's settings, **enable "Show hidden files"** — otherwise
   `.htaccess` won't transfer. (FileZilla: *Server → Force showing hidden
   files*. Cyberduck: *View → Show Hidden Files*.)
3. Set local directory to `dist/`, remote to `/public_html/`.
4. Drag the contents of `dist/` to `public_html/` and confirm overwrite if
   any existing files (e.g. a default `index.html`) get replaced.

### Verify the upload
After uploading, your `public_html/` should contain (at minimum):

```
public_html/
├── .htaccess
├── 404.html
├── index.html
├── about.html
├── blog.html
├── case-studies.html
├── contact.html
├── cookies.html
├── privacy-policy.html
├── services.html
├── terms.html
├── logo.jpg
├── og-default.png
├── robots.txt
├── sitemap-index.xml
├── sitemap-0.xml
├── _astro/                 ← hashed CSS/JS/font bundles
└── services/
    ├── ai-agents-chatbots.html
    ├── business-process-automation.html
    ├── marketing-sales-automation.html
    └── web-data-scraping.html
```

If `.htaccess` is missing, pretty URLs (`/about` instead of `/about.html`)
won't work — re-upload it specifically with hidden files enabled.

## 3. Smoke-test the live site

Hit each of these URLs in a browser. Every one should load without a 404:

- `https://YOUR-DOMAIN/`
- `https://YOUR-DOMAIN/about`
- `https://YOUR-DOMAIN/services`
- `https://YOUR-DOMAIN/services/business-process-automation`
- `https://YOUR-DOMAIN/services/ai-agents-chatbots`
- `https://YOUR-DOMAIN/services/marketing-sales-automation`
- `https://YOUR-DOMAIN/services/web-data-scraping`
- `https://YOUR-DOMAIN/case-studies`
- `https://YOUR-DOMAIN/blog`
- `https://YOUR-DOMAIN/contact`
- `https://YOUR-DOMAIN/privacy-policy`
- `https://YOUR-DOMAIN/terms`
- `https://YOUR-DOMAIN/cookies`
- `https://YOUR-DOMAIN/some-page-that-does-not-exist` → should show the
  custom 404 page (proves `.htaccess` is active)

If any **pretty URL** returns a 404 but the same URL with `.html` works
(e.g. `/about.html` works but `/about` doesn't), the host's mod_rewrite
either isn't loaded or `.htaccess` isn't being read. Talk to your host
support — most cPanel hosts have it on by default.

## 4. Enable HTTPS, then enable the redirect

1. In cPanel, find **SSL/TLS Status** (or "Let's Encrypt SSL") and provision
   a free certificate for your domain + `www.` subdomain.
2. Verify `https://YOUR-DOMAIN/` loads with a valid padlock.
3. Open `public_html/.htaccess` in cPanel File Manager and **uncomment**
   the three HTTPS-redirect lines near the top:

   ```apache
   RewriteCond %{HTTPS} !=on
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

4. Test by hitting `http://YOUR-DOMAIN/` — should 301-redirect to `https://`.

> ⚠️ Don't enable the redirect *before* SSL works, or you'll create a redirect
> loop and lock yourself out of the site.

## 5. Wire up the contact form

The contact form POSTs to `/contact.php`. Until that file exists on the
server, form submissions will fail (the form will show its error state and
fall back to email).

Drop a `contact.php` file into `public_html/` that:

1. Validates the honeypot (`$_POST['website']` should be empty — reject if not).
2. **Re-validates the math captcha server-side.** The form posts four
   captcha fields: `captcha_a`, `captcha_b`, `captcha_op` (`+`, `-`, `×`, or
   `÷`), and `captcha_answer` (what the user typed). Recompute the expected
   answer from the operands and operator, then compare to `captcha_answer`.
   Reject mismatches. **Do not trust** `captcha_expected` — it's there for
   convenience but can be tampered with by a bot; always recompute from the
   operands.
3. Validates required fields: `name`, `email`, `service`, `message`.
4. Sanitises and emails to `info@lyrava.com` (or wherever).
5. Returns HTTP 200 on success, HTTP 4xx/5xx on failure.

The existing front-end JavaScript handles success/error states automatically
based on the response status — no changes needed on the JS side.

> **Captcha symbols:** `+`, `-`, `×` (U+00D7), `÷` (U+00F7). When recomputing
> in PHP, match the multi-byte chars exactly (or normalise to ASCII first):
>
> ```php
> $op = $_POST['captcha_op'] ?? '';
> switch ($op) {
>   case '+': $expected = (int)$_POST['captcha_a'] + (int)$_POST['captcha_b']; break;
>   case '-': $expected = (int)$_POST['captcha_a'] - (int)$_POST['captcha_b']; break;
>   case '×': $expected = (int)$_POST['captcha_a'] * (int)$_POST['captcha_b']; break;
>   case '÷': $expected = intdiv((int)$_POST['captcha_a'], (int)$_POST['captcha_b']); break;
>   default:  http_response_code(400); exit;
> }
> if ((int)$_POST['captcha_answer'] !== $expected) { http_response_code(400); exit; }
> ```

## 6. Submit to search engines

1. **Google Search Console** (`search.google.com/search-console`)
   - Add your property (Domain or URL prefix).
   - Verify via DNS TXT record or by uploading the verification file.
   - Submit `https://YOUR-DOMAIN/sitemap-index.xml`.
2. **Bing Webmaster Tools** (`bing.com/webmasters`)
   - Sign in with the same Google account or import from Search Console.
   - Submit the same sitemap URL.

## 7. Enable analytics (optional, when ready)

Open [`src/lib/site.ts`](src/lib/site.ts) and fill in:

```ts
analytics: {
  ga4MeasurementId: "G-XXXXXXXXXX",      // from Google Analytics 4
  clarityProjectId: "abcd1234",          // from Microsoft Clarity
  googleSiteVerification: "abc...token", // from Search Console
}
```

Re-run `npm run build` and re-upload `dist/`. The snippets only render when
the IDs are present, so leaving them blank in the meantime keeps the page
faster and cookie-compliant by default.

## 8. Lighthouse / Core Web Vitals check

After SSL is live, run:

- [PageSpeed Insights](https://pagespeed.web.dev/) on the homepage and one
  service page. Targets: 95+ on Performance, Accessibility, Best Practices,
  SEO. CLS < 0.1, LCP < 2.5s, INP < 200ms.
- [Schema Markup Validator](https://validator.schema.org/) on the homepage
  and a service page (to confirm JSON-LD validates: Organization, WebSite,
  Service, BreadcrumbList, FAQPage).

If any score is below 95, ping me and we'll dig in (this is Step 6 in the
build plan).

## 9. Iterating after deploy

Most live edits will be in:

- **Copy:** `src/pages/<page>.astro` (or for blog — coming in Step 4 — the
  Markdown files in `src/content/blog/`).
- **Site config:** `src/lib/site.ts` (nav, services list, social URLs,
  email, analytics IDs).
- **Brand colors:** `tailwind.config.mjs` → `theme.extend.colors`.

After any edit:

```bash
npm run build
# then re-upload dist/ contents to public_html/
```

---

## Troubleshooting

| Symptom                                      | Likely cause                                                                  |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| All pretty URLs 404                          | `.htaccess` missing or `mod_rewrite` disabled — re-upload .htaccess           |
| Redirect loop after enabling HTTPS           | SSL not yet provisioned — disable the redirect, install SSL, re-enable        |
| Fonts look like Times New Roman              | `_astro/` folder didn't upload completely — re-upload                          |
| Contact form just sits there                 | `/contact.php` doesn't exist yet on the server — see Section 5                 |
| OG image previews show the raw logo          | Replace `public/og-default.png` with a proper 1200×630 PNG, then rebuild       |
| `www.yourdomain.com` doesn't redirect        | Check `.htaccess` line 14 — uncomment if you want www→apex (or swap)           |
