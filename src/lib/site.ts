/**
 * Single source of truth for site-wide config.
 * Update brand details, contact info, and nav here. Every page reads from this file.
 *
 * Brand R1: the brand name is "lyrava" (lowercase). Never `Lyrava`.
 */

export const SITE = {
  // Brand-correct (lowercase). Used as text content and as schema.org name.
  name: "lyrava",
  // Corporate structure: lyrava is the trading brand. The legal entities
  // are Ainika Limited (UK) for governance and contracting, and Ainika
  // Pvt Ltd (India) for delivery.
  legal: {
    uk: {
      name: "Ainika Limited",
      companyNumber: "17140562",
      jurisdiction: "England and Wales",
    },
    india: {
      name: "Ainika Pvt Ltd",
      jurisdiction: "India",
    },
  },
  tagline: "Data, automation and engineering for teams that want to move faster.",
  description:
    "lyrava is the automation and AI consultancy brand of Ainika. We work with teams in the UK and US, contracting through Ainika Limited (UK) and delivering through Ainika Pvt Ltd (India).",
  url: "https://lyrava.com",
  defaultLocale: "en",
  locales: ["en-GB", "en-US"] as const,
  email: "info@lyrava.com",
  // Set a registered office before publishing LocalBusiness schema.
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
    github: "https://github.com/ainikaventures/lyrava",
  },
  // Set when ready. Snippets stay disabled while these are blank.
  analytics: {
    ga4MeasurementId: "G-Z0FBXP2X89" as string,
    clarityProjectId: "wzoi1u6c6e" as string,
    googleSiteVerification: "" as string, // Add when you set up Search Console
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
    title: "Business process and workflow automation",
    short: "Process automation",
    blurb:
      "We connect the tools you already pay for so invoices, onboarding, approvals and reporting run without anyone copy-pasting at 11pm.",
    keywords: ["Zapier", "Make", "n8n", "Power Automate"],
  },
  {
    slug: "ai-agents-chatbots",
    title: "AI agents and chatbots",
    short: "AI agents",
    blurb:
      "GPT-4 and Claude agents that answer customer questions, triage tickets, and surface what your team needs from documents nobody reads.",
    keywords: ["OpenAI", "Anthropic", "LangChain", "RAG"],
  },
  {
    slug: "marketing-sales-automation",
    title: "Marketing and sales automation",
    short: "Marketing and sales",
    blurb:
      "CRM build-outs, lead scoring, multi-channel sequences, and attribution that tells you which channel actually paid.",
    keywords: ["HubSpot", "Pipedrive", "GoHighLevel", "Apollo"],
  },
  {
    slug: "web-data-scraping",
    title: "Web and data scraping",
    short: "Data pipelines",
    blurb:
      "Compliant scraping for price monitoring, lead lists, and market research. Respecting robots.txt, rate-limited, with audit trails.",
    keywords: ["Playwright", "Bright Data", "Apify", "Pandas"],
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
