/**
 * /llms.txt — concise site map for AI crawlers (ChatGPT, Claude, Perplexity,
 * Google AI Overviews). Format per https://llmstxt.org.
 *
 * Generated from src/lib/site.ts so the file stays in sync automatically when
 * a service is added, renamed or removed. Keep entries terse: this is a MAP,
 * not a copy of every page.
 */
import type { APIRoute } from "astro";
import { SITE, SERVICES } from "@lib/site";

const u = (path: string) => `${SITE.url.replace(/\/$/, "")}${path}`;

export const GET: APIRoute = () => {
  const body = `# ${SITE.name}

> ${SITE.tagline} An automation and AI agency working with teams in the UK and US, with delivery from India and governance from the UK.

## Core pages

- [Home](${u("/")}): overview, services and how we work
- [Services](${u("/services")}): four automation practices for UK and US teams
- [About](${u("/about")}): who we are, how we engage, what we believe
- [Case studies](${u("/case-studies")}): selected engagements with metrics
- [Blog](${u("/blog")}): notes on automation, AI agents and revenue ops
- [Contact](${u("/contact")}): book a 30-minute discovery call

## Services

${SERVICES.map(
  (s) => `- [${s.title}](${u(`/services/${s.slug}`)}): ${s.blurb}`,
).join("\n")}

## Legal

- [Privacy policy](${u("/privacy-policy")})
- [Terms of service](${u("/terms")})
- [Cookie policy](${u("/cookies")})

## Optional

- [Sitemap (XML)](${u("/sitemap-index.xml")})
- Contact email: ${SITE.email}
- Markets served: United Kingdom, United States
- Delivery location: India
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
