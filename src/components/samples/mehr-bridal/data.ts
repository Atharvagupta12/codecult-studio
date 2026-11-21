/* ── Brand ── */
export const MB = {
  bg: "#1A0A0E",
  wine: "#2A0E16",
  panel: "#24101A",
  rose: "#E7B59E",
  roseDeep: "#C98B72",
  blush: "#F7E7DF",
  mute: "#B7948B",
  line: "rgba(247,231,223,0.12)",
};

export const BASE = "/samples/mehr-bridal";
const I = (n: string) => `/images/mehr-bridal/${n}.jpg`;

export const PAGES = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/portfolio`, label: "Portfolio" },
  { href: `${BASE}/looks`, label: "Find your look" },
  { href: `${BASE}/packages`, label: "Packages" },
  { href: `${BASE}/academy`, label: "Academy" },
  { href: `${BASE}/book`, label: "Check dates" },
];

export const IMG = {
  hero: I("hero"),
  artist: I("artist-at-work"),
  eyes: I("artist-eyes"),
  kit: I("kit"),
  palette: I("palette"),
  academy: I("academy"),
  mirror: I("bride-mirror"),
};

/* ── Portfolio ── */
export type Style = "Traditional" | "Soft glam" | "Reception" | "Engagement";
export const STYLES: ("All" | Style)[] = ["All", "Traditional", "Soft glam", "Reception", "Engagement"];

export const LOOKS: { src: string; style: Style; alt: string; tall?: boolean }[] = [
  { src: I("hero"), style: "Traditional", alt: "Traditional red bridal look with gold jewellery", tall: true },
  { src: I("soft-rose"), style: "Soft glam", alt: "Soft rose glam with dewy skin", tall: true },
  { src: I("reception-silver"), style: "Reception", alt: "Silver-toned reception glam" },
  { src: I("engage-blue"), style: "Engagement", alt: "Engagement look with henna", tall: true },
  { src: I("bride-namaste"), style: "Traditional", alt: "Bride with folded hands, classic red" },
  { src: I("soft-pink"), style: "Soft glam", alt: "Pink soft glam with nath", tall: true },
  { src: I("reception-velvet"), style: "Reception", alt: "Velvet reception look", tall: true },
  { src: I("engage-smile"), style: "Engagement", alt: "Laughing bride at her engagement" },
  { src: I("bride-nath"), style: "Traditional", alt: "Statement nath and kundan jewellery", tall: true },
  { src: I("soft-flower"), style: "Soft glam", alt: "Soft glam with fresh flowers in hair" },
  { src: I("reception-mirror"), style: "Reception", alt: "Reception look by the mirror", tall: true },
  { src: I("engage-white"), style: "Engagement", alt: "Ivory engagement look with maang tikka" },
  { src: I("bride-classic"), style: "Traditional", alt: "Classic bridal portrait", tall: true },
  { src: I("soft-veil"), style: "Soft glam", alt: "Soft glam under the dupatta" },
  { src: I("engage-yellow"), style: "Engagement", alt: "Haldi-ready engagement look", tall: true },
  { src: I("bride-red-lehenga"), style: "Traditional", alt: "Red lehenga bridal look" },
  { src: I("bride-shy"), style: "Soft glam", alt: "Shy smile, soft pink look", tall: true },
  { src: I("bride-down"), style: "Traditional", alt: "Bride looking down, heavy jewellery" },
];

export const SIGNATURES = [
  { name: "The Classic Rani", style: "Traditional", img: I("bride-nath"), line: "Bold eyes, red lips, flawless base that lasts 14 hours." },
  { name: "Rose Dew", style: "Soft glam", img: I("soft-rose"), line: "Glass skin, rosy cheeks and the softest shimmer." },
  { name: "Midnight Glam", style: "Reception", img: I("reception-velvet"), line: "Smoky eyes, sculpted cheeks, a nude lip. Made for flashbulbs." },
];

/* ── The Mehr experience ── */
export const JOURNEY = [
  { n: "I", title: "Consultation", when: "3 – 6 months before", text: "We meet (or video call), look at your outfits and jewellery and talk about how you want to feel on the day.", img: I("bride-mirror") },
  { n: "II", title: "The trial", when: "1 – 2 months before", text: "A full trial of your bridal look, photographed in daylight so you know exactly how it'll look in your pictures.", img: I("artist-at-work") },
  { n: "III", title: "Skin prep", when: "4 weeks before", text: "A personalised skin routine and two pre-bridal facials so your base sits perfectly on the day.", img: I("soft-flower") },
  { n: "IV", title: "Your day", when: "The big day", text: "We arrive early, stay calm and stay until the pheras for touch-ups. You just enjoy it.", img: I("hero") },
];

/* ── Look quiz ── */
export const QUIZ = [
  {
    q: "What's your skin undertone?",
    options: [
      { label: "Warm", hint: "Gold jewellery suits you best", swatch: "#C68B59" },
      { label: "Cool", hint: "Silver looks better on you", swatch: "#B88A8A" },
      { label: "Neutral", hint: "Both gold and silver work", swatch: "#C49A7C" },
    ],
  },
  {
    q: "Your bridal outfit colour?",
    options: [
      { label: "Classic red", hint: "Timeless and traditional", swatch: "#A3192E" },
      { label: "Pastel or pink", hint: "Soft and modern", swatch: "#E8A8B8" },
      { label: "Wine or maroon", hint: "Rich and regal", swatch: "#5E1626" },
      { label: "Ivory or gold", hint: "Elegant and minimal", swatch: "#E9D8B4" },
    ],
  },
  {
    q: "How do you want to feel?",
    options: [
      { label: "Like a queen", hint: "Classic and dramatic", swatch: "#7A2E2E" },
      { label: "Fresh and glowing", hint: "Light, dewy, natural", swatch: "#F2C6B4" },
      { label: "Glamorous", hint: "Sculpted, bold, camera-ready", swatch: "#3B1B2A" },
    ],
  },
] as const;

export const RESULTS = {
  rani: { name: "The Classic Rani", img: I("bride-nath"), base: "Full-coverage HD base, matte finish", eyes: "Warm gold cut-crease with winged liner", lips: "Statement red or brick", pack: "Luxe Bride" },
  dew: { name: "Rose Dew", img: I("soft-rose"), base: "Skin-like airbrush base, dewy glow", eyes: "Soft rose shimmer, wispy lashes", lips: "Rosy nude gloss", pack: "Signature Bride" },
  glam: { name: "Midnight Glam", img: I("reception-velvet"), base: "Sculpted airbrush base, satin finish", eyes: "Smoky brown-plum with glitter lid", lips: "Deep nude or berry", pack: "Couture Bride" },
} as const;
export type ResultKey = keyof typeof RESULTS;
export const pickLook = (a: number[]): ResultKey => (a[2] === 1 || a[1] === 1 ? "dew" : a[2] === 2 || a[1] === 2 ? "glam" : "rani");

/* ── Packages ── */
export const PACKAGES = [
  { id: "signature", name: "Signature Bride", price: 24999, line: "HD makeup", features: ["HD bridal makeup", "Hairstyling & draping", "Premium lashes", "Touch-up kit"] },
  { id: "luxe", name: "Luxe Bride", price: 34999, line: "Airbrush · most loved", popular: true, features: ["Airbrush bridal makeup", "Hairstyling with fresh flowers", "Draping & jewellery setting", "Bridal trial included", "Mehr on-site till pheras"] },
  { id: "couture", name: "Couture Bride", price: 49999, line: "Every event", features: ["3 looks: mehendi, wedding, reception", "Airbrush makeup for all looks", "Dedicated hair artist", "Bridal trial + skin prep plan", "Assistant for family touch-ups"] },
] as const;

export const BUILDER = {
  look: [
    { id: "hd", label: "HD makeup", price: 18999 },
    { id: "airbrush", label: "Airbrush makeup", price: 24999 },
  ],
  eventPrice: 9999,
  familyPrice: 3499,
  addons: [
    { id: "hair", label: "Bridal hairstyling", price: 3999 },
    { id: "drape", label: "Dupatta draping", price: 1499 },
    { id: "trial", label: "Bridal trial", price: 4999 },
    { id: "lashes", label: "Mink lashes", price: 999 },
    { id: "travel", label: "Outside Indore travel", price: 7999 },
  ],
};

/* ── Academy ── */
export const COURSES = [
  { id: "self", name: "Self-makeup masterclass", days: "3 days", price: 8999, next: "6 Dec", seats: 4, for: "For brides-to-be & beginners", learn: ["Your perfect base", "Everyday & party eyes", "Saree draping basics"] },
  { id: "pro", name: "Professional bridal course", days: "30 days", price: 74999, next: "12 Jan", seats: 2, for: "For aspiring makeup artists", learn: ["HD & airbrush bridal", "Skin science & prep", "Portfolio shoot + certificate"], popular: true },
  { id: "hair", name: "Bridal hairstyling", days: "10 days", price: 24999, next: "18 Dec", seats: 6, for: "For artists adding hair skills", learn: ["Buns, braids & curls", "Fresh-flower styling", "Dupatta setting"] },
];

export const TESTIMONIALS = [
  { name: "Ishita, December bride", text: "Mehr made me look like the best version of myself. Fourteen hours, two outfit changes, zero touch-up panic.", img: I("engage-smile") },
  { name: "Aanya, February bride", text: "My trial photos were so good I cried. On the day she was calm, kind and the makeup looked unreal in our pictures.", img: I("soft-pink") },
  { name: "Naina, reception look", text: "Everyone asked who did my reception makeup. Booked her for my sister's wedding the same night!", img: I("reception-silver") },
];

export type DayState = "free" | "few" | "booked";
export const dayState = (y: number, m: number, d: number): DayState => {
  const k = (d * 5 + m * 3 + y + Math.floor(d / 6)) % 8;
  return k === 1 || k === 5 || k === 6 ? "booked" : k === 3 ? "few" : "free";
};

export const EVENTS = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Engagement"];
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
