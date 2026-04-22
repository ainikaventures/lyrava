/**
 * Single source of truth for site-wide config.
 * Update brand details, contact info, and nav here — every page reads from this file.
 */

export const SITE = {
  name: "Lyrava",
  tagline: "Automation, AI agents, and revenue ops for ambitious teams.",
  description:
    "Lyrava is an automation agency for UK and US companies. We design and build business process automations, AI agents, marketing and sales workflows, and data pipelines that compound — not break.",
  url: "https://lyrava.com",
  defaultLocale: "en",
  locales: ["en-GB", "en-US"] as const,
  email: "info@lyrava.com",
  // TODO: set a real registered office before publishing LocalBusiness schema.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  },
  social: {
    linkedin: "https://www.linkedin.com/company/lyrava",
    twitter: "https://twitter.com/lyrava",
    github: "https://github.com/lyrava",
  },
  // SearchConsole, GA4, Clarity — set when ready (left blank → snippets stay disabled)
  analytics: {
    ga4MeasurementId: "" as string, // e.g. "G-XXXXXXXXXX"
    clarityProjectId: "" as string, // e.g. "abcd1234"
    googleSiteVerification: "" as string, // e.g. "abc...verification-token"
  },
};

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    slug: "business-process-automation",
    title: "Business Process & Workflow Automation",
    short: "Process automation",
    blurb:
      "Stitch your tools together so invoices, onboarding, approvals, and reporting run without anyone copy-pasting at 11pm.",
    keywords: ["Zapier", "Make", "n8n", "Power Automate"],
  },
  {
    slug: "ai-agents-chatbots",
    title: "AI Agents & Chatbots",
    short: "AI agents",
    blurb:
      "Custom GPT-4 and Claude agents that answer customer questions, triage tickets, and surface knowledge from your documents.",
    keywords: ["OpenAI", "Anthropic", "LangChain", "RAG"],
  },
  {
    slug: "marketing-sales-automation",
    title: "Marketing & Sales Automation",
    short: "Marketing & sales",
    blurb:
      "CRM build-outs, lead scoring, multi-channel sequences, and attribution that finally tells you which channel actually paid.",
    keywords: ["HubSpot", "Pipedrive", "GoHighLevel", "Apollo"],
  },
  {
    slug: "web-data-scraping",
    title: "Web & Data Scraping",
    short: "Data pipelines",
    blurb:
      "Compliant scraping for price monitoring, lead lists, and market research. Robots.txt-respecting, rate-limited, audit-trailed.",
    keywords: ["Playwright", "Bright Data", "Apify", "Pandas"],
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
