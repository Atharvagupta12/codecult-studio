import {
  anton,
  bodoni,
  bricolage,
  cormorant,
  dmSerif,
  fraunces,
  geistMono,
  gloock,
  outfit,
  playfair,
  syne,
  unbounded,
} from "@/lib/fonts";

/* ───────────────────────── Tiers (one place to change prices) ───────────────────────── */

export type Tier = "Essential" | "Signature" | "Premium";

export const TIERS: Record<Tier, { price: string; amount: number; days: number; pages: string; tagline: string }> = {
  Essential: { price: "₹7,999", amount: 7999, days: 5, pages: "1 long page", tagline: "Everything you need to look professional online." },
  Signature: { price: "₹9,999", amount: 9999, days: 5, pages: "Up to 4 pages", tagline: "More pages, more motion, more reasons to visit." },
  Premium: { price: "₹12,999", amount: 12999, days: 7, pages: "Up to 6 pages", tagline: "A flagship website with premium motion and smart features." },
};

export const SERVICES = {
  whatsappGoogle: "₹2,999",
  seo: "₹1,999",
  logo: "₹999",
  poster: "₹499",
  domain: "₹799",
} as const;

/* ───────────────────────── Niches ───────────────────────── */

export type NicheId = "cafe" | "gym" | "portfolio" | "beauty";

export const NICHES: { id: NicheId; label: string; short: string }[] = [
  { id: "cafe", label: "Cafés & restaurants", short: "Café" },
  { id: "gym", label: "Gyms & fitness", short: "Gym" },
  { id: "portfolio", label: "Personal portfolios", short: "Portfolio" },
  { id: "beauty", label: "Beauty & jewellery", short: "Beauty & Jewellery" },
];

/* ───────────────────────── Sample sites ───────────────────────── */

export type SampleSite = {
  slug: string;
  niche: NicheId;
  tier: Tier;
  name: string;
  kind: string;
  style: string;
  highlights: string[];
  /** Live demo is built and linked */
  ready: boolean;

  // Preview content
  domain: string;
  eyebrow: string;
  headline: [string, string];
  blurb: string;
  cta: string;
  nav: string[];
  image: string;
  imagePosition?: string;
  layout: "split" | "overlay";
  bg: string;
  fg: string;
  accent: string;
  accentFg: string;
  fontClass: string;
  uppercase?: boolean;
  italicSecondLine?: boolean;
  /** Headline weight inside previews */
  weight?: number;
  /** Headline size multiplier inside previews (wide fonts need less) */
  size?: number;
};

const img = (slug: string) => `/images/samples/${slug}.jpg`;

export const SAMPLES: SampleSite[] = [
  /* ── Café ── */
  {
    slug: "brew-lane",
    niche: "cafe",
    tier: "Essential",
    name: "Brew Lane",
    kind: "Specialty café",
    style: "Warm & editorial",
    highlights: ["One-page website", "Menu with prices", "Photo gallery", "WhatsApp + Google Maps"],
    ready: false,
    domain: "brewlane.in",
    eyebrow: "Specialty coffee · Vijay Nagar",
    headline: ["Slow coffee,", "fast smiles."],
    blurb: "Small-batch roasts, flaky croissants and the comfiest corner seats in the city.",
    cta: "See the menu",
    nav: ["Menu", "Story", "Visit"],
    image: img("brew-lane"),
    layout: "split",
    bg: "#F3E7D6",
    fg: "#2A1A12",
    accent: "#2A1A12",
    accentFg: "#F3E7D6",
    fontClass: fraunces.className,
    italicSecondLine: true,
  },
  {
    slug: "kulhad-co",
    niche: "cafe",
    tier: "Signature",
    name: "Kulhad Co.",
    kind: "Chai café",
    style: "Desi & bold",
    highlights: ["Up to 4 pages", "Menu with category filters", "Reviews + Instagram grid", "Scroll animations"],
    ready: false,
    domain: "kulhadco.in",
    eyebrow: "Chai · Snacks · Evening adda",
    headline: ["Kadak chai,", "zero drama."],
    blurb: "Kulhad chai, bun maska and the best evening adda in town. Come hungry, leave happy.",
    cta: "Order on WhatsApp",
    nav: ["Menu", "Adda", "Visit"],
    image: img("kulhad-co"),
    imagePosition: "50% 60%",
    layout: "split",
    bg: "#1E3A2F",
    fg: "#F6EBD9",
    accent: "#F2A93B",
    accentFg: "#1E3A2F",
    fontClass: gloock.className,
    weight: 400,
  },
  {
    slug: "ember-bistro",
    niche: "cafe",
    tier: "Premium",
    name: "Ember",
    kind: "Fine-dine restaurant",
    style: "Dark & luxurious",
    highlights: ["Up to 6 pages", "Order-on-WhatsApp cart", "Table reservations", "Premium motion + SEO"],
    ready: false,
    domain: "emberbistro.in",
    eyebrow: "Modern Indian · Dinner from 7 pm",
    headline: ["Fire, flavour", "& slow evenings."],
    blurb: "A modern Indian kitchen where every plate is finished over open flame.",
    cta: "Reserve a table",
    nav: ["Menu", "Reserve", "Events"],
    image: img("ember-bistro"),
    imagePosition: "60% 50%",
    layout: "overlay",
    bg: "#0E0B09",
    fg: "#F4ECE1",
    accent: "#D9A55B",
    accentFg: "#0E0B09",
    fontClass: playfair.className,
    italicSecondLine: true,
    weight: 500,
  },

  /* ── Gym ── */
  {
    slug: "pulse-fitness",
    niche: "gym",
    tier: "Essential",
    name: "Pulse",
    kind: "Neighbourhood gym",
    style: "Bright & friendly",
    highlights: ["One-page website", "Membership plans", "Trainer profiles", "WhatsApp + Google Maps"],
    ready: false,
    domain: "pulsefitness.in",
    eyebrow: "Fitness club · First session free",
    headline: ["Feel strong.", "Every day."],
    blurb: "Friendly trainers, flexible batches and a gym that actually feels welcoming.",
    cta: "Book a free trial",
    nav: ["Classes", "Plans", "Contact"],
    image: img("pulse-fitness"),
    imagePosition: "40% 50%",
    layout: "split",
    bg: "#EEF1FF",
    fg: "#0F1533",
    accent: "#3A5BFF",
    accentFg: "#FFFFFF",
    fontClass: unbounded.className,
    weight: 800,
    size: 0.72,
  },
  {
    slug: "ironpeak",
    niche: "gym",
    tier: "Signature",
    name: "IRONPEAK",
    kind: "Strength club",
    style: "Bold & dark",
    highlights: ["Up to 4 pages", "Class timetable", "Before / after transformations", "BMI calculator"],
    ready: false,
    domain: "ironpeak.fit",
    eyebrow: "Strength club · Open 5 am – 11 pm",
    headline: ["Train hard.", "Track harder."],
    blurb: "Coached programs, modern equipment and a community that shows up every day.",
    cta: "Start free trial",
    nav: ["Programs", "Coaches", "Plans"],
    image: img("ironpeak"),
    imagePosition: "60% 30%",
    layout: "overlay",
    bg: "#0B0B0B",
    fg: "#F5F5F5",
    accent: "#E5FF3D",
    accentFg: "#0B0B0B",
    fontClass: anton.className,
    uppercase: true,
  },
  {
    slug: "forge-athletics",
    niche: "gym",
    tier: "Premium",
    name: "FORGE",
    kind: "Performance studio",
    style: "Editorial & intense",
    highlights: ["Up to 6 pages", "Free-trial booking flow", "Coach & program pages", "Premium motion + SEO"],
    ready: false,
    domain: "forgeathletics.in",
    eyebrow: "Strength · Conditioning · Coaching",
    headline: ["Built,", "not bought."],
    blurb: "Coach-led strength training for people who want real, lasting results.",
    cta: "Claim free trial",
    nav: ["Programs", "Coaches", "Results"],
    image: img("forge-athletics"),
    imagePosition: "50% 30%",
    layout: "overlay",
    bg: "#0A0A0A",
    fg: "#F2F2F2",
    accent: "#FF4D2E",
    accentFg: "#0A0A0A",
    fontClass: syne.className,
    weight: 800,
    size: 1.05,
  },

  /* ── Portfolio ── */
  {
    slug: "riya-sharma",
    niche: "portfolio",
    tier: "Essential",
    name: "riya.",
    kind: "Designer portfolio",
    style: "Clean & playful",
    highlights: ["One-page portfolio", "Project gallery", "About + skills", "Contact form → WhatsApp"],
    ready: false,
    domain: "riyasharma.design",
    eyebrow: "Brand & UI designer · Indore",
    headline: ["Design that", "people remember."],
    blurb: "I help small brands look big: identities, packaging and websites people love.",
    cta: "See my work",
    nav: ["Work", "About", "Contact"],
    image: img("riya-sharma"),
    imagePosition: "50% 50%",
    layout: "split",
    bg: "#FAF7F2",
    fg: "#161616",
    accent: "#6C47FF",
    accentFg: "#FFFFFF",
    fontClass: outfit.className,
    weight: 800,
    size: 0.92,
  },
  {
    slug: "kabir-rao",
    niche: "portfolio",
    tier: "Signature",
    name: "kabir.dev",
    kind: "Developer portfolio",
    style: "Sleek & techy",
    highlights: ["Up to 4 pages", "Project case studies", "Resume download", "Scroll animations"],
    ready: false,
    domain: "kabirrao.dev",
    eyebrow: "Full-stack developer · Open to work",
    headline: ["I build things", "for the web."],
    blurb: "React, Node and the cloud. I turn ideas into fast, reliable products.",
    cta: "View projects",
    nav: ["Projects", "Stack", "Resume"],
    image: img("kabir-rao"),
    layout: "overlay",
    bg: "#0B0F14",
    fg: "#E6EDF3",
    accent: "#3FB950",
    accentFg: "#0B0F14",
    fontClass: geistMono.className,
    weight: 600,
    size: 0.82,
  },
  {
    slug: "aarav-mehta",
    niche: "portfolio",
    tier: "Premium",
    name: "aarav mehta",
    kind: "Wedding photographer",
    style: "Cinematic & bold",
    highlights: ["Up to 6 pages", "Full-screen galleries", "Shoot booking form", "Premium motion + SEO"],
    ready: false,
    domain: "aaravmehta.com",
    eyebrow: "Photographer · Weddings & portraits",
    headline: ["I shoot moments,", "not poses."],
    blurb: "Wedding, portrait and brand photography across India.",
    cta: "View portfolio",
    nav: ["Work", "About", "Book"],
    image: img("aarav-mehta"),
    imagePosition: "60% 40%",
    layout: "overlay",
    bg: "#0A0A0A",
    fg: "#FFFFFF",
    accent: "#FFFFFF",
    accentFg: "#0A0A0A",
    fontClass: bricolage.className,
  },

  /* ── Beauty & jewellery ── */
  {
    slug: "glow-studio",
    niche: "beauty",
    tier: "Essential",
    name: "Glow Studio",
    kind: "Hair & makeup salon",
    style: "Soft & stylish",
    highlights: ["One-page website", "Service menu + prices", "Book on WhatsApp", "Google Maps + reviews"],
    ready: false,
    domain: "glowstudio.in",
    eyebrow: "Hair · Makeup · Bridal",
    headline: ["Book your", "glow-up."],
    blurb: "Hair, skin and bridal makeup by artists who listen first. Walk in, glow out.",
    cta: "Book appointment",
    nav: ["Services", "Bridal", "Book"],
    image: img("glow-studio"),
    imagePosition: "50% 20%",
    layout: "split",
    bg: "#F8E6DE",
    fg: "#3A1A2E",
    accent: "#B8445E",
    accentFg: "#FFF4EF",
    fontClass: dmSerif.className,
    italicSecondLine: true,
    weight: 400,
  },
  {
    slug: "kalaa-jewels",
    niche: "beauty",
    tier: "Signature",
    name: "Kalaa Jewels",
    kind: "Jewellery store",
    style: "Premium & elegant",
    highlights: ["Up to 4 pages", "Collection catalogue", "Enquire on WhatsApp", "Scroll animations"],
    ready: false,
    domain: "kalaajewels.com",
    eyebrow: "Handcrafted in Indore · Since 1998",
    headline: ["Jewellery that", "tells your story."],
    blurb: "Temple gold, kundan and everyday silver, crafted by hand for every occasion.",
    cta: "View collection",
    nav: ["Bridal", "Gold", "Silver"],
    image: img("kalaa-jewels"),
    imagePosition: "50% 35%",
    layout: "split",
    bg: "#15110D",
    fg: "#F3E3C3",
    accent: "#D4A84B",
    accentFg: "#15110D",
    fontClass: cormorant.className,
    italicSecondLine: true,
  },
  {
    slug: "mehr-bridal",
    niche: "beauty",
    tier: "Premium",
    name: "Mehr",
    kind: "Bridal makeup artist",
    style: "Royal & romantic",
    highlights: ["Up to 6 pages", "Bridal portfolio galleries", "Date-check booking flow", "Premium motion + SEO"],
    ready: false,
    domain: "mehrbridal.in",
    eyebrow: "Bridal makeup artist · Indore",
    headline: ["Your day,", "your glow."],
    blurb: "Bridal, engagement and party makeup, crafted around you and your story.",
    cta: "Check my dates",
    nav: ["Bridal", "Portfolio", "Packages"],
    image: img("mehr-bridal"),
    imagePosition: "50% 25%",
    layout: "overlay",
    bg: "#1A0A0E",
    fg: "#F7E7DF",
    accent: "#E7B59E",
    accentFg: "#1A0A0E",
    fontClass: bodoni.className,
    italicSecondLine: true,
    weight: 500,
  },
];

export function getSample(slug: string) {
  const s = SAMPLES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown sample: ${slug}`);
  return s;
}

export function buildThisMessage(s: SampleSite) {
  return `Hi CodeCult Studio! I love the "${s.name}" ${s.kind.toLowerCase()} design (${s.tier}, ${TIERS[s.tier].price}). I want a website like this for my business.`;
}
