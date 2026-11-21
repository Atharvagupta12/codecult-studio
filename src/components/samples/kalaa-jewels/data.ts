import type { WeekHours } from "../shared/useOpenStatus";

/* ── Brand ── */
export const KJ = {
  bg: "#15110D",
  panel: "#1E1813",
  panel2: "#271F18",
  gold: "#D4A84B",
  goldLight: "#F0CF86",
  cream: "#F3E3C3",
  mute: "#A39478",
  line: "rgba(243,227,195,0.12)",
};

export const BASE = "/samples/kalaa-jewels";
const I = (n: string) => `/images/kalaa-jewels/${n}.jpg`;

export const PAGES = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/collections`, label: "Collections" },
  { href: `${BASE}/gold-rate`, label: "Gold rate" },
  { href: `${BASE}/visit`, label: "Visit us" },
];

export const IMG = {
  heroModel: I("model-heritage"),
  heroNecklace: I("hero-necklace"),
  store: I("store"),
  tray: I("tray"),
  nath: I("model-nath"),
  smile: I("model-smile"),
  green: I("model-green"),
  purple: I("model-purple"),
  diamondModel: I("model-diamond"),
  choker: I("choker-smile"),
};

/* ── Place ── */
export const ADDRESS = "42, Sarafa Bazaar, Rajwada, Indore 452002";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Sarafa+Bazaar+Indore";
export const MAP_EMBED = "https://www.google.com/maps?q=Sarafa+Bazaar,+Indore&z=16&output=embed";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** 11 am – 9 pm, closed Mondays (Sunday till 8) */
export const HOURS: WeekHours = [
  [11 * 60, 20 * 60],
  [0, 0],
  [11 * 60, 21 * 60],
  [11 * 60, 21 * 60],
  [11 * 60, 21 * 60],
  [11 * 60, 21 * 60],
  [11 * 60, 21 * 60],
];

/* ── Today's rates (₹ per gram) ── */
export const RATES = [
  { id: "22k", label: "22K Gold", note: "916 hallmarked", rate: 7245, change: 0.4, week: [7160, 7185, 7170, 7202, 7230, 7216, 7245] },
  { id: "24k", label: "24K Gold", note: "999 pure", rate: 7904, change: 0.4, week: [7812, 7838, 7822, 7856, 7887, 7871, 7904] },
  { id: "18k", label: "18K Gold", note: "750 hallmarked", rate: 5928, change: 0.3, week: [5861, 5880, 5868, 5893, 5917, 5905, 5928] },
  { id: "silver", label: "Silver", note: "925 sterling", rate: 96, change: -0.8, week: [98, 97.5, 97.8, 97, 96.6, 96.8, 96] },
] as const;
export type RateId = (typeof RATES)[number]["id"];
export const GST = 0.03;

/* ── Collections & pieces ── */
export type Collection = "Bridal" | "Temple Gold" | "Kundan & Polki" | "Diamonds" | "Everyday Gold";
export type Metal = "22K Gold" | "18K Gold" | "Diamond";
export type Occasion = "Bridal" | "Festive" | "Everyday" | "Gifting";

export const COLLECTIONS: { id: Collection; img: string; line: string }[] = [
  { id: "Bridal", img: I("model-heritage"), line: "Heirlooms for your big day" },
  { id: "Temple Gold", img: I("hero-necklace"), line: "South Indian temple craft" },
  { id: "Kundan & Polki", img: I("kundan-set"), line: "Mughal-era artistry" },
  { id: "Diamonds", img: I("diamond-display"), line: "Certified, conflict-free" },
  { id: "Everyday Gold", img: I("bangles"), line: "Light pieces, daily wear" },
];

export type Piece = {
  id: string;
  name: string;
  collection: Collection;
  metal: Metal;
  occasion: Occasion;
  weight: number;
  making: number;
  diamondValue?: number;
  img: string;
  desc: string;
  new?: boolean;
};

export const PIECES: Piece[] = [
  { id: "rani-haar", name: "Rani Haar Temple Necklace", collection: "Temple Gold", metal: "22K Gold", occasion: "Bridal", weight: 64.2, making: 0.14, img: I("hero-necklace"), desc: "Hand-beaten temple necklace with Lakshmi motifs and ruby-tone beads.", new: true },
  { id: "meenakari-kundan", name: "Meenakari Kundan Set", collection: "Kundan & Polki", metal: "22K Gold", occasion: "Bridal", weight: 48.5, making: 0.18, img: I("kundan-set"), desc: "Kundan necklace and earrings with emerald drops and meenakari on the reverse." },
  { id: "polki-choker", name: "Polki Bridal Choker", collection: "Kundan & Polki", metal: "22K Gold", occasion: "Bridal", weight: 52.0, making: 0.2, img: I("kundan-set-2"), desc: "Uncut polki choker set with pearl hangings.", new: true },
  { id: "lakshmi-coin", name: "Lakshmi Coin Necklace", collection: "Temple Gold", metal: "22K Gold", occasion: "Festive", weight: 38.6, making: 0.12, img: I("necklace-velvet"), desc: "Kasu-mala style coin necklace, a timeless festive favourite." },
  { id: "floral-jhumka", name: "Floral Necklace & Jhumka Set", collection: "Bridal", metal: "22K Gold", occasion: "Festive", weight: 42.3, making: 0.14, img: I("necklace-stand"), desc: "Floral filigree necklace with matching jhumkas." },
  { id: "nakshi-pendant", name: "Nakshi Floral Pendant", collection: "Everyday Gold", metal: "22K Gold", occasion: "Gifting", weight: 9.8, making: 0.12, img: I("pendant-velvet"), desc: "Delicate nakshi pendant on a fine chain. A perfect gift." },
  { id: "bridal-rani", name: "Bridal Rani Set", collection: "Bridal", metal: "22K Gold", occasion: "Bridal", weight: 71.4, making: 0.16, img: I("necklace-stand-2"), desc: "Statement layered set designed to be the heirloom of the family." },
  { id: "ruby-drop", name: "Ruby Drop Necklace", collection: "Bridal", metal: "22K Gold", occasion: "Festive", weight: 34.2, making: 0.15, img: I("necklace-red"), desc: "Pearl strands with ruby-red drops and a gold medallion." },
  { id: "diamond-bridal", name: "Diamond Bridal Necklace", collection: "Diamonds", metal: "Diamond", occasion: "Bridal", weight: 28.4, making: 0.12, diamondValue: 385000, img: I("diamond-display"), desc: "IGI-certified diamonds set in 18K gold. Necklace and earrings." },
  { id: "solitaire", name: "Solitaire Ring · 1.2 ct", collection: "Diamonds", metal: "Diamond", occasion: "Gifting", weight: 3.8, making: 0.1, diamondValue: 295000, img: I("solitaire"), desc: "A brilliant-cut solitaire on a slim platinum-finish band.", new: true },
  { id: "halo-ring", name: "Halo Diamond Ring", collection: "Diamonds", metal: "Diamond", occasion: "Gifting", weight: 4.2, making: 0.1, diamondValue: 98000, img: I("diamond-ring"), desc: "Round centre stone framed by a sparkling halo." },
  { id: "pink-sapphire", name: "Pink Sapphire Ring", collection: "Diamonds", metal: "18K Gold", occasion: "Gifting", weight: 4.6, making: 0.12, diamondValue: 46000, img: I("pink-ring"), desc: "Cushion-cut pink sapphire with diamond halo in 18K rose gold." },
  { id: "classic-bangles", name: "Classic Gold Bangles · set of 4", collection: "Everyday Gold", metal: "22K Gold", occasion: "Everyday", weight: 40.0, making: 0.09, img: I("bangles"), desc: "Smooth and textured bangles you'll never take off." },
  { id: "filigree-rings", name: "Filigree Gold Rings", collection: "Everyday Gold", metal: "22K Gold", occasion: "Everyday", weight: 5.4, making: 0.12, img: I("rings-charcoal"), desc: "Hand-made filigree rings, light and full of detail." },
  { id: "couple-bands", name: "Couple Bands", collection: "Everyday Gold", metal: "18K Gold", occasion: "Gifting", weight: 9.2, making: 0.12, img: I("gold-rings"), desc: "His-and-hers bands with a single diamond accent." },
  { id: "twisted-hoops", name: "Twisted Gold Hoops", collection: "Everyday Gold", metal: "18K Gold", occasion: "Everyday", weight: 6.1, making: 0.11, img: I("earrings"), desc: "Twisted hoops for everyday elegance." },
  { id: "rosegold-set", name: "Rose Gold Floral Set", collection: "Everyday Gold", metal: "18K Gold", occasion: "Gifting", weight: 12.4, making: 0.13, img: I("rosegold-set"), desc: "Necklace, bracelet and studs with tiny floral accents." },
];

export const rateFor = (metal: Metal) => (metal === "22K Gold" ? 7245 : 5928);
export const priceOf = (p: Piece) => Math.round((p.weight * rateFor(p.metal) * (1 + p.making) + (p.diamondValue ?? 0)) * (1 + GST) / 100) * 100;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── Heritage ── */
export const TIMELINE = [
  { year: "1998", title: "A small counter in Sarafa", text: "Ramesh Soni opens a two-person workshop in Sarafa Bazaar, making temple jewellery by hand." },
  { year: "2008", title: "The first showroom", text: "Kalaa moves into its own showroom and starts its now-famous kundan bridal line." },
  { year: "2018", title: "Diamonds & a new generation", text: "Ramesh's daughter Kavya joins and launches certified diamonds and everyday gold." },
  { year: "2026", title: "Three generations of brides", text: "Over 9,000 brides later, some of our brides now bring their daughters." },
];

export const PROMISES = [
  ["BIS hallmarked", "Every gold piece is HUID hallmarked for purity."],
  ["Lifetime exchange", "Full value on gold, any time, at today's rate."],
  ["Certified diamonds", "IGI and GIA certificates with every stone."],
  ["Free cleaning", "Bring it back any time for polish and check-up."],
];

export const TESTIMONIALS = [
  { name: "Aditi & family", text: "My mother's wedding set was from Kalaa, and now mine is too. Kavya ji helped us design it with pieces from her set.", img: I("model-smile") },
  { name: "Neha Agrawal", text: "Transparent pricing, real weights on the bill, no pressure. The kundan work is unbelievably fine.", img: I("model-green") },
  { name: "Riya Jain", text: "Booked a bridal appointment on WhatsApp and had the private lounge all to ourselves. Felt so special.", img: I("choker-smile") },
];

/* ── Appointments ── */
export const PURPOSES = ["Bridal consultation", "Buy gold or diamonds", "Exchange old gold", "Custom design"];
export const VISIT_SLOTS = ["11:30 am", "1:00 pm", "3:30 pm", "5:00 pm", "7:00 pm"];
