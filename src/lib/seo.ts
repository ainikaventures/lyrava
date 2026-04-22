import { SITE } from "./site";

export type SEOProps = {
  title: string;
  description: string;
  path: string; // pathname only, e.g. "/services"
  ogImage?: string; // absolute or root-relative
  ogType?: "website" | "article" | "profile";
  noindex?: boolean;
  publishedAt?: string; // ISO
  updatedAt?: string;
  author?: string;
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalFor(path: string): string {
  // Normalise: collapse trailing slashes, ensure leading slash
  let p = path.startsWith("/") ? path : `/${path}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return absoluteUrl(p);
}

/**
 * Build an Organization JSON-LD blob. Sits on every page so search engines
 * can wire entity relationships across the site.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.jpg"),
    description: SITE.description,
    sameAs: Object.values(SITE.social).filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        areaServed: ["GB", "US"],
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: ["en-GB", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
    ],
    url: absoluteUrl(`/services/${opts.slug}`),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : absoluteUrl("/og-default.png"),
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt ?? opts.publishedAt,
    author: {
      "@type": "Organization",
      name: opts.author ?? SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.jpg"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${opts.slug}`),
  };
}
