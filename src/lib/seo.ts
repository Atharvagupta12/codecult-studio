import type { Metadata } from "next";
import { FAQS } from "@/data/faq";
import { SERVICES, TIERS, type SampleSite } from "@/data/samples";
import { SITE } from "./site";

/**
 * Public URL of the site, used for canonical links, the sitemap and link previews.
 * 1. NEXT_PUBLIC_SITE_URL, if you set it (e.g. after buying a domain)
 * 2. Vercel's production URL (becomes your custom domain once you add one in Vercel)
 * 3. localhost while developing
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SEO = {
  title: "CodeCult Studio | Website Design & Development in Indore, India",
  shortTitle: "CodeCult Studio",
  description:
    "CodeCult Studio designs and builds stunning websites for cafés, restaurants, gyms, salons, jewellers and creators. Ready designs from ₹7,999, live in 5–7 days, free hosting. Plus WhatsApp Business & Google profile setup. Based in Indore, working across India.",
  ogTitle: "CodeCult Studio · Websites that make your business look premium",
  ogDescription: "Pick a stunning ready-made design, we make it yours. From ₹7,999 · Live in 5–7 days · Free hosting · Based in Indore.",
  keywords: [
    "CodeCult Studio",
    "website design Indore",
    "web development Indore",
    "website developer Indore",
    "website designer near me",
    "affordable website design India",
    "small business website India",
    "restaurant website design",
    "cafe website design",
    "gym website design",
    "salon website design",
    "jewellery website design",
    "portfolio website design",
    "WhatsApp Business setup",
    "Google Business Profile setup",
    "SEO services Indore",
  ],
};

/** Google structured data: the business, its services and prices */
export function businessJsonLd() {
  const tiers = Object.entries(TIERS).map(([name, t]) => ({
    "@type": "Offer",
    name: `${name} website`,
    description: `${t.pages}. ${t.tagline} Live in ${t.days} days.`,
    price: t.amount,
    priceCurrency: "INR",
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    description: SEO.description,
    telephone: `+${SITE.whatsapp}`,
    priceRange: "₹₹",
    address: { "@type": "PostalAddress", addressLocality: "Indore", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
    areaServed: { "@type": "Country", name: "India" },
    sameAs: [SITE.instagram],
    knowsAbout: ["Web design", "Web development", "UI/UX design", "SEO", "WhatsApp Business", "Google Business Profile"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website & business setup services",
      itemListElement: [
        ...tiers,
        { "@type": "Offer", name: "WhatsApp Business + Google profile setup", price: Number(SERVICES.whatsappGoogle.replace(/\D/g, "")), priceCurrency: "INR" },
        { "@type": "Offer", name: "SEO setup", price: Number(SERVICES.seo.replace(/\D/g, "")), priceCurrency: "INR" },
        { "@type": "Offer", name: "Logo design", price: Number(SERVICES.logo.replace(/\D/g, "")), priceCurrency: "INR" },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

/** Title, description and link-preview text for a sample website */
export function sampleMetadata(s: SampleSite, pageTitle: Metadata["title"]): Metadata {
  const t = TIERS[s.tier];
  const title = `${s.name} · ${s.kind} website sample | ${SITE.name}`;
  const description = `${s.tier} website (${t.price}, ${t.pages.toLowerCase()}, live in ${t.days} days) designed and built by ${SITE.name}. Open the live demo and imagine it with your business name.`;
  return {
    title: pageTitle,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      url: `/samples/${s.slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
