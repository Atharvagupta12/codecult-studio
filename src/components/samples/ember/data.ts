import type { WeekHours } from "../shared/useOpenStatus";

/* ───────────────────────── Brand ───────────────────────── */

export const EM = {
  bg: "#0C0907",
  panel: "#15100D",
  panel2: "#1D1612",
  gold: "#D9A55B",
  flame: "#E2622B",
  cream: "#F3E9DC",
  mute: "#A3968A",
  line: "rgba(243,233,220,0.12)",
};

export const BASE = "/samples/ember-bistro";
export const PAGES = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/menu`, label: "Menu" },
  { href: `${BASE}/order`, label: "Order" },
  { href: `${BASE}/reserve`, label: "Reserve" },
  { href: `${BASE}/events`, label: "Events" },
  { href: `${BASE}/story`, label: "Our Chef" },
];

export const PHONE_DISPLAY = "+91 98XXX 0X0X0";
export const ADDRESS = "Level 2, Sky Avenue, AB Road, Indore 452010";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=AB+Road+Indore";

/** Dinner only. Closed Mondays. Tue–Thu 7–11:30 pm, Fri–Sun 7 pm–midnight. */
export const HOURS: WeekHours = [
  [19 * 60, 24 * 60],
  [0, 0],
  [19 * 60, 23.5 * 60],
  [19 * 60, 23.5 * 60],
  [19 * 60, 23.5 * 60],
  [19 * 60, 24 * 60],
  [19 * 60, 24 * 60],
];
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* ───────────────────────── Menu ───────────────────────── */

export type Cat = "small" | "tandoor" | "mains" | "biryani" | "desserts" | "drinks";
export const CATS: { id: Cat; label: string }[] = [
  { id: "small", label: "Small plates" },
  { id: "tandoor", label: "From the tandoor" },
  { id: "mains", label: "Mains" },
  { id: "biryani", label: "Biryani & breads" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  cat: Cat;
  veg: boolean;
  tags?: ("Signature" | "Chef's special" | "Spicy")[];
  img?: string;
};

const I = (n: string) => `/images/ember/${n}.jpg`;

export const DISHES: Dish[] = [
  { id: "burrata-chaat", name: "Smoked Burrata Chaat", desc: "Tamarind glaze, pomegranate, crisp papdi", price: 495, cat: "small", veg: true, tags: ["Signature"], img: I("dish-white") },
  { id: "corn-shorba", name: "Charred Corn Shorba", desc: "Brown butter, smoked paprika oil", price: 345, cat: "small", veg: true, img: I("dish-blue") },
  { id: "tandoori-prawns", name: "Tandoori Prawns", desc: "Gunpowder butter, curry leaf crumb", price: 795, cat: "small", veg: false, tags: ["Chef's special"], img: I("plating-seafood") },
  { id: "galouti", name: "Galouti Kebab", desc: "On ulta tawa paratha, saffron onions", price: 645, cat: "small", veg: false, img: I("dish-dark") },
  { id: "paneer-tikka", name: "Malai Paneer Tikka", desc: "Cardamom cream, charred peppers", price: 545, cat: "tandoor", veg: true, img: I("paneer-tikka") },
  { id: "seekh", name: "Seekh Kebab", desc: "Hand-minced lamb, smoked chilli", price: 695, cat: "tandoor", veg: false, tags: ["Spicy"], img: I("seekh") },
  { id: "mixed-grill", name: "Ember Mixed Grill", desc: "Chicken tikka, seekh, prawns, paneer", price: 1295, cat: "tandoor", veg: false, tags: ["Signature"], img: I("kebab-platter") },
  { id: "broccoli", name: "Tandoori Broccoli", desc: "Aged cheddar, mustard, almond flakes", price: 475, cat: "tandoor", veg: true },
  { id: "butter-chicken", name: "Butter Chicken, Ember Style", desc: "Charcoal-smoked, tomato-fenugreek makhani", price: 745, cat: "mains", veg: false, tags: ["Signature"], img: I("butter-chicken") },
  { id: "dal-ember", name: "Dal Ember", desc: "Black lentils slow-cooked for 24 hours", price: 495, cat: "mains", veg: true, tags: ["Chef's special"], img: I("dal") },
  { id: "paneer-makhani", name: "Paneer Makhani", desc: "House paneer, silky tomato gravy", price: 595, cat: "mains", veg: true, img: I("curry-bowl") },
  { id: "laal-maas", name: "Laal Maas", desc: "Rajasthani lamb, mathania chillies", price: 845, cat: "mains", veg: false, tags: ["Spicy"] },
  { id: "gosht-biryani", name: "Dum Gosht Biryani", desc: "Sealed with dough, served with raita", price: 895, cat: "biryani", veg: false, img: I("biryani") },
  { id: "subz-biryani", name: "Subz Dum Biryani", desc: "Seasonal vegetables, saffron, fried onions", price: 695, cat: "biryani", veg: true },
  { id: "truffle-naan", name: "Truffle Naan", desc: "Wood-fired, truffle butter", price: 245, cat: "biryani", veg: true },
  { id: "jamun-brulee", name: "Gulab Jamun Brûlée", desc: "Caramelised at the table", price: 395, cat: "desserts", veg: true, tags: ["Signature"], img: I("dessert-candle") },
  { id: "rasmalai", name: "Rasmalai Tres Leches", desc: "Saffron milk, pistachio", price: 425, cat: "desserts", veg: true, img: I("dessert-plate") },
  { id: "kulfi", name: "Mango Cardamom Kulfi", desc: "Alphonso, crushed pistachio", price: 345, cat: "desserts", veg: true, img: I("dessert-bowl") },
  { id: "jamun-sour", name: "Smoked Jamun Sour", desc: "Zero-proof, egg-white foam", price: 345, cat: "drinks", veg: true, img: I("mocktail") },
  { id: "kokum", name: "Kokum Cooler", desc: "Kokum, ginger, soda", price: 295, cat: "drinks", veg: true, img: I("drinks") },
];

export const SIGNATURES = ["butter-chicken", "mixed-grill", "dal-ember", "gosht-biryani", "jamun-brulee", "tandoori-prawns"].map((id) => DISHES.find((d) => d.id === id)!);

export const TASTING = [
  "Amuse · Smoked tomato rasam shot",
  "Burrata chaat, tamarind glaze",
  "Tandoori prawn, gunpowder butter",
  "Coal-roasted paneer, cardamom cream",
  "Butter chicken, Ember style, truffle naan",
  "Kokum & ginger sorbet",
  "Gulab jamun brûlée",
];

/* ───────────────────────── Reservations ───────────────────────── */

export const SLOTS = ["7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm", "9:30 pm", "10:00 pm"];
export const OCCASIONS = ["Just dinner", "Birthday", "Anniversary", "Date night", "Business", "Celebration"];

/** Deterministic "fully booked" slots so the demo looks real */
export const isFull = (date: Date, slot: number) => (date.getDate() + slot * 3) % 5 === 0;

/* ───────────────────────── Events ───────────────────────── */

export const EVENTS = [
  { date: "04", month: "Dec", day: "Friday", title: "Coastal Kerala Pop-up", desc: "A one-night menu of Malabar seafood, appam and toddy-shop classics.", price: "₹3,200 per guest", img: I("plating-seafood") },
  { date: "13", month: "Dec", day: "Sunday", title: "Zero-Proof Pairing Dinner", desc: "Six courses paired with house-made shrubs, kombuchas and smoked sours.", price: "₹3,800 per guest", img: I("mocktail") },
  { date: "31", month: "Dec", day: "Thursday", title: "New Year's Eve by the Fire", desc: "Live grill, a nine-course feast and a countdown on the terrace.", price: "₹6,500 per guest", img: I("firepit") },
];

/* ───────────────────────── Reviews ───────────────────────── */

export const REVIEWS = [
  { text: "The butter chicken is smoky, rich and unlike anything else in the city. Service was impeccable from start to finish.", name: "Ritika Agarwal", meta: "Anniversary dinner" },
  { text: "The tasting menu is pure theatre. Every course arrived with a story, and the gulab jamun brûlée stole the show.", name: "Karan Bhatia", meta: "Chef's tasting" },
  { text: "Easily the most beautiful restaurant in Indore. Came for a business dinner, will be back for every celebration.", name: "Neha Kothari", meta: "Business dinner" },
];

/* ───────────────────────── Order maths ───────────────────────── */

export const GST = 0.05;
export const DELIVERY_FEE = 79;
export const FREE_DELIVERY_ABOVE = 1500;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
