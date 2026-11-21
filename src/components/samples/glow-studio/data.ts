import type { WeekHours } from "../shared/useOpenStatus";

/* ── Brand ── */
export const GS = {
  blush: "#F8E6DE",
  cream: "#FFF8F3",
  berry: "#B8445E",
  berryDeep: "#8E2C45",
  plum: "#3A1A2E",
  rose: "#EDB4BF",
  gold: "#C99A5B",
  mute: "#8A6B76",
  line: "rgba(58,26,46,0.12)",
};

const IMG = "/images/glow-studio";

export const ADDRESS = "12, Ground floor, Old Palasia, near Greater Kailash Road, Indore 452001";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Old+Palasia+Indore";
export const MAP_EMBED = "https://www.google.com/maps?q=Old+Palasia,+Indore&z=15&output=embed";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Open 10 am – 8 pm, closed on Tuesdays */
export const HOURS: WeekHours = [
  [10 * 60, 20 * 60],
  [10 * 60, 20 * 60],
  [0, 0],
  [10 * 60, 20 * 60],
  [10 * 60, 20 * 60],
  [10 * 60, 20 * 60],
  [10 * 60, 20 * 60],
];

/* ── Services ── */
export type Tab = "Hair" | "Skin" | "Makeup" | "Nails" | "Bridal";
export type Service = { id: string; tab: Tab; name: string; desc: string; mins: number; price: number; popular?: boolean };

export const TABS: { id: Tab; img: string; line: string }[] = [
  { id: "Hair", img: `${IMG}/colour.jpg`, line: "Cuts, colour and treatments by senior stylists" },
  { id: "Skin", img: `${IMG}/facial.jpg`, line: "Facials and skin care for that real-life glow" },
  { id: "Makeup", img: `${IMG}/makeup.jpg`, line: "Party, engagement and every big night in between" },
  { id: "Nails", img: `${IMG}/nails.jpg`, line: "Gel, extensions and nail art that lasts" },
  { id: "Bridal", img: `${IMG}/bridal.jpg`, line: "HD and airbrush bridal looks, trials and pre-bridal care" },
];

export const SERVICES: Service[] = [
  { id: "cut", tab: "Hair", name: "Haircut & styling", desc: "Consultation, wash, cut and blow-dry", mins: 45, price: 699, popular: true },
  { id: "blow", tab: "Hair", name: "Blow-dry & curls", desc: "Bouncy blow-out or soft waves", mins: 30, price: 499 },
  { id: "colour", tab: "Hair", name: "Global hair colour", desc: "Ammonia-free, includes toner", mins: 120, price: 2999 },
  { id: "balayage", tab: "Hair", name: "Balayage / highlights", desc: "Hand-painted, sun-kissed tones", mins: 150, price: 4499, popular: true },
  { id: "keratin", tab: "Hair", name: "Keratin smoothening", desc: "Frizz-free for 4–5 months", mins: 180, price: 5999 },
  { id: "spa", tab: "Hair", name: "Hair spa", desc: "Deep conditioning and scalp massage", mins: 60, price: 1199 },

  { id: "glowfacial", tab: "Skin", name: "Signature glow facial", desc: "Our bestseller. Brightening, hydrating, calming", mins: 60, price: 1999, popular: true },
  { id: "hydra", tab: "Skin", name: "Hydra facial", desc: "Deep cleanse, extraction and serum infusion", mins: 75, price: 3499 },
  { id: "cleanup", tab: "Skin", name: "Clean-up", desc: "Quick refresh for busy weeks", mins: 40, price: 899 },
  { id: "dtan", tab: "Skin", name: "De-tan pack", desc: "Face and neck", mins: 30, price: 699 },
  { id: "brows", tab: "Skin", name: "Eyebrow threading", desc: "Shaped to suit your face", mins: 10, price: 99 },
  { id: "wax", tab: "Skin", name: "Full-arms waxing", desc: "Rica wax, gentle on skin", mins: 30, price: 599 },

  { id: "party", tab: "Makeup", name: "Party makeup", desc: "HD base, lashes included", mins: 60, price: 2499, popular: true },
  { id: "engagement", tab: "Makeup", name: "Engagement look", desc: "Makeup + hairdo + draping", mins: 120, price: 6999 },
  { id: "hairdo", tab: "Makeup", name: "Hairdo", desc: "Buns, braids and soft curls", mins: 40, price: 999 },
  { id: "drape", tab: "Makeup", name: "Saree / dupatta draping", desc: "Any style, pinned to last", mins: 20, price: 499 },

  { id: "gel", tab: "Nails", name: "Gel polish", desc: "Chip-free for 3 weeks", mins: 45, price: 899, popular: true },
  { id: "ext", tab: "Nails", name: "Nail extensions", desc: "Gel or acrylic, any shape", mins: 90, price: 1999 },
  { id: "art", tab: "Nails", name: "Nail art", desc: "French, chrome, florals and more", mins: 30, price: 499 },
  { id: "mani", tab: "Nails", name: "Spa manicure", desc: "Scrub, mask and massage", mins: 45, price: 799 },
  { id: "pedi", tab: "Nails", name: "Spa pedicure", desc: "With foot soak and callus care", mins: 50, price: 999 },

  { id: "hdbridal", tab: "Bridal", name: "HD bridal makeup", desc: "Makeup, hairdo, draping and lashes", mins: 180, price: 14999, popular: true },
  { id: "airbrush", tab: "Bridal", name: "Airbrush bridal makeup", desc: "Weightless, long-wear, camera-ready", mins: 180, price: 21999 },
  { id: "prebridal", tab: "Bridal", name: "Pre-bridal glow package", desc: "5 sittings: facials, spa, polishing", mins: 300, price: 9999 },
  { id: "trial", tab: "Bridal", name: "Bridal trial", desc: "Adjusted in your final bridal bill", mins: 90, price: 2999 },
];

export const FIRST_VISIT_OFF = 0.2;

/* ── People ── */
export const STYLISTS = [
  { name: "Neha Kapoor", role: "Senior hair stylist · colour expert", years: 9, img: `${IMG}/stylist-neha.jpg`, pos: "50% 25%", fav: "Balayage" },
  { name: "Tara D'Souza", role: "Skin & nail specialist", years: 6, img: `${IMG}/stylist-tara.jpg`, pos: "50% 20%", fav: "Glow facial" },
  { name: "Anjali Verma", role: "Makeup & bridal artist", years: 8, img: `${IMG}/stylist-anjali.jpg`, pos: "50% 30%", fav: "Soft-glam bridal" },
];

export const REVIEWS = [
  { name: "Shruti Jain", when: "1 week ago", text: "Neha did my balayage and I've never received so many compliments. The salon is so clean and calm.", tag: "Balayage" },
  { name: "Megha Patidar", when: "3 weeks ago", text: "Their glow facial is magic. My skin actually looked like it had a filter on for days!", tag: "Glow facial" },
  { name: "Ritika Sharma", when: "1 month ago", text: "Anjali did my engagement look and it was exactly what I'd imagined. Lasted all night, looked natural in photos.", tag: "Engagement" },
  { name: "Pooja Mishra", when: "2 weeks ago", text: "Booked on WhatsApp in two minutes, no waiting at all. Gel nails still perfect after three weeks.", tag: "Gel nails" },
];

export const GALLERY = [
  { src: `${IMG}/salon.jpg`, alt: "Inside Glow Studio" },
  { src: `${IMG}/hair-pink.jpg`, alt: "Fresh blow-dry" },
  { src: `${IMG}/glam.jpg`, alt: "Party glam makeup" },
  { src: `${IMG}/nails-pink.jpg`, alt: "Soft pink manicure" },
  { src: `${IMG}/curls.jpg`, alt: "Soft curls in progress" },
  { src: `${IMG}/polish.jpg`, alt: "Our polish wall" },
  { src: `${IMG}/brushes.jpg`, alt: "Makeup station" },
  { src: `${IMG}/facial-2.jpg`, alt: "Relaxing facial" },
];

export const OFFERS = ["20% off your first visit", "Free hair spa with every global colour", "Bridal trial adjusted in your final bill", "Bring a friend, both get 10% off"];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const dur = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);
