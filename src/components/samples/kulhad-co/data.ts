import type { WeekHours } from "../shared/useOpenStatus";

export const KC = {
  green: "#123526",
  green2: "#1B4936",
  cream: "#F7EDDC",
  paper: "#FFF8EC",
  marigold: "#F4A83A",
  clay: "#C4532F",
  pink: "#E8457E",
  ink: "#0E2219",
};

export const BASE = "/samples/kulhad-co";
export const PAGES = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/menu`, label: "Menu" },
  { href: `${BASE}/adda`, label: "Our Adda" },
  { href: `${BASE}/visit`, label: "Visit" },
];

/** Every day 7 am – 1 am */
export const HOURS: WeekHours = Array.from({ length: 7 }, () => [7 * 60, 25 * 60] as [number, number]);
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const ADDRESS = "G-4, Sapna Sangeeta Road, near Treasure Island, Indore 452001";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Sapna+Sangeeta+Road+Indore";
export const MAP_EMBED = "https://www.google.com/maps?q=Sapna+Sangeeta+Road,+Indore&z=15&output=embed";

export const SPECIAL = "Today's special: Adrak-elaichi chai + 2 bun maska for ₹99";
export const BAND = ["Masala", "Adrak", "Elaichi", "Kesar", "Tandoori", "Gud wali", "Irani", "Cutting"];

export type Flavour = { id: string; name: string; hindi: string; desc: string; price: number; kadak: number; bg: string; fg: string; img: string };

export const FLAVOURS: Flavour[] = [
  { id: "masala", name: "Masala Chai", hindi: "मसाला चाय", desc: "Our house blend of eight whole spices, boiled twice the old-school way.", price: 40, kadak: 4, bg: "#C4532F", fg: "#FFF8EC", img: "/images/kulhad-co/kulhad-top.jpg" },
  { id: "adrak", name: "Adrak Elaichi", hindi: "अदरक इलायची", desc: "Fresh ginger and green cardamom. The cure for every bad day.", price: 40, kadak: 5, bg: "#F4A83A", fg: "#123526", img: "/images/kulhad-co/chai-mug.jpg" },
  { id: "kesar", name: "Kesar Chai", hindi: "केसर चाय", desc: "Saffron strands, a little sugar and a lot of royalty.", price: 60, kadak: 3, bg: "#E8457E", fg: "#FFF8EC", img: "/images/kulhad-co/chai-glass.jpg" },
  { id: "tandoori", name: "Tandoori Chai", hindi: "तंदूरी चाय", desc: "Poured into a red-hot kulhad till it sizzles. Smoky and dramatic.", price: 60, kadak: 4, bg: "#2A1B12", fg: "#F4A83A", img: "/images/kulhad-co/kulhads.jpg" },
  { id: "gud", name: "Gud Wali Chai", hindi: "गुड़ वाली चाय", desc: "Sweetened with jaggery instead of sugar. Earthy, warm, winter-perfect.", price: 50, kadak: 3, bg: "#1B4936", fg: "#F7EDDC", img: "/images/kulhad-co/chai-rusk.jpg" },
  { id: "cutting", name: "Cutting Chai", hindi: "कटिंग चाय", desc: "Half glass, full energy. The ₹20 classic that started it all.", price: 20, kadak: 5, bg: "#F7EDDC", fg: "#123526", img: "/images/kulhad-co/chai-tray.jpg" },
];

export type Cat = "chai" | "snacks" | "pav" | "combos" | "cold";
export const CATS: { id: Cat | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "chai", label: "Chai" },
  { id: "snacks", label: "Snacks" },
  { id: "pav", label: "Pav & Maggi" },
  { id: "combos", label: "Combos" },
  { id: "cold", label: "Cold" },
];

export type Tag = "Bestseller" | "Spicy" | "Jain" | "New";
export type Item = { name: string; hindi?: string; desc: string; price: number; cat: Cat; tags?: Tag[]; img?: string };

export const MENU: Item[] = [
  { name: "Cutting Chai", hindi: "कटिंग", desc: "Half glass, full kadak", price: 20, cat: "chai", tags: ["Bestseller"], img: "/images/kulhad-co/chai-tray.jpg" },
  { name: "Kulhad Masala Chai", desc: "Eight spices, served in clay", price: 40, cat: "chai", tags: ["Bestseller"], img: "/images/kulhad-co/kulhad-top.jpg" },
  { name: "Adrak Elaichi Chai", desc: "Ginger + green cardamom", price: 40, cat: "chai", img: "/images/kulhad-co/chai-mug.jpg" },
  { name: "Kesar Chai", desc: "Saffron, slow-boiled", price: 60, cat: "chai", img: "/images/kulhad-co/chai-glass.jpg" },
  { name: "Tandoori Chai", desc: "Poured into a sizzling kulhad", price: 60, cat: "chai", tags: ["New"], img: "/images/kulhad-co/kulhads.jpg" },
  { name: "Gud Wali Chai", desc: "Jaggery instead of sugar", price: 50, cat: "chai", tags: ["Jain"] },
  { name: "Irani Chai", desc: "Creamy, mawa-rich, Hyderabad style", price: 50, cat: "chai" },
  { name: "Lemon Honey Tea", desc: "No milk, all comfort", price: 40, cat: "chai", tags: ["Jain"] },
  { name: "Samosa (2 pc)", desc: "With green + imli chutney", price: 40, cat: "snacks", tags: ["Bestseller"], img: "/images/kulhad-co/samosa.jpg" },
  { name: "Bun Maska", desc: "Soft bun, a shameless amount of butter", price: 40, cat: "snacks", tags: ["Bestseller", "Jain"], img: "/images/kulhad-co/chai-rusk.jpg" },
  { name: "Kanda Bhajiya", desc: "Crispy onion fritters", price: 70, cat: "snacks", tags: ["Spicy"], img: "/images/kulhad-co/pakora.jpg" },
  { name: "Paneer Pakora", desc: "Stuffed with mint chutney", price: 90, cat: "snacks" },
  { name: "Poha Jalebi", desc: "Indore's breakfast, served till noon", price: 60, cat: "snacks", tags: ["Bestseller"] },
  { name: "Vada Pav", desc: "Mumbai's favourite, Indore's way", price: 35, cat: "pav", tags: ["Bestseller", "Spicy"], img: "/images/kulhad-co/vada-pav.jpg" },
  { name: "Misal Pav", desc: "Fiery sprout curry, crunchy farsan", price: 90, cat: "pav", tags: ["Spicy"], img: "/images/kulhad-co/misal-pav.jpg" },
  { name: "Pav Bhaji", desc: "Extra butter, extra onions", price: 120, cat: "pav", img: "/images/kulhad-co/pav-bhaji.jpg" },
  { name: "Masala Maggi", desc: "Hostel nostalgia, upgraded", price: 70, cat: "pav", tags: ["Spicy"], img: "/images/kulhad-co/maggi.jpg" },
  { name: "Cheese Maggi", desc: "Because why not", price: 90, cat: "pav", tags: ["New"] },
  { name: "Chai + Bun Maska", desc: "The classic duo", price: 70, cat: "combos", tags: ["Bestseller"] },
  { name: "Chai + Samosa", desc: "Rainy-day essentials", price: 55, cat: "combos" },
  { name: "Adda Platter", desc: "4 chai + samosa, bhajiya, vada pav, bun maska", price: 299, cat: "combos", tags: ["New"], img: "/images/kulhad-co/hero-pour.jpg" },
  { name: "Cold Coffee", desc: "Thick, frothy, with ice cream", price: 90, cat: "cold" },
  { name: "Masala Chaas", desc: "Spiced buttermilk", price: 50, cat: "cold", tags: ["Jain"] },
  { name: "Shikanji", desc: "Nimbu, kala namak, jeera", price: 50, cat: "cold", tags: ["Jain"] },
];

export const REVIEWS = [
  { name: "Aditya Joshi", text: "The tandoori chai is pure theatre and tastes even better. Our whole friend group basically lives here now.", when: "1 week ago" },
  { name: "Sneha Rathore", text: "Cutting chai for ₹20 that's genuinely better than fancy cafés. Bun maska is unreal. Staff is super sweet.", when: "3 weeks ago" },
  { name: "Mohit Verma", text: "Came for the open mic, stayed till closing. Great vibe, great chai, and the misal pav is properly spicy.", when: "2 weeks ago" },
  { name: "Fatima Sheikh", text: "Best place for evening adda in Indore. Clean, fast service, and they remember your order. 10/10.", when: "1 month ago" },
  { name: "Rahul Patidar", text: "Masala maggi + kulhad chai at midnight after exams. That's it, that's the review.", when: "5 days ago" },
];

export const EVENTS = [
  { day: "FRI", title: "Open Mic Night", time: "8 pm onwards", desc: "Poetry, stand-up, songs. Sign up at the counter.", color: "#E8457E" },
  { day: "SAT", title: "Ghazal & Chai", time: "7 pm – 10 pm", desc: "Live acoustic ghazals with unlimited cutting chai.", color: "#F4A83A" },
  { day: "SUN", title: "Chess & Chai Mornings", time: "9 am – 12 pm", desc: "Boards on us. Bring your rival.", color: "#C4532F" },
];

export const GALLERY = [
  { src: "/images/kulhad-co/hero-pour.jpg", alt: "Chai poured into kulhads", tall: false },
  { src: "/images/kulhad-co/chaiwala.jpg", alt: "Our first chai master at the stall", tall: true },
  { src: "/images/kulhad-co/interior.jpg", alt: "Inside the café", tall: false },
  { src: "/images/kulhad-co/kulhads.jpg", alt: "Fresh kulhads", tall: true },
  { src: "/images/kulhad-co/samosa-napkin.jpg", alt: "Hot samosas", tall: false },
  { src: "/images/kulhad-co/chai-hands.jpg", alt: "Friends sharing chai", tall: true },
  { src: "/images/kulhad-co/kadhai.jpg", alt: "Bhajiya in the kadhai", tall: false },
  { src: "/images/kulhad-co/stall.jpg", alt: "The chai counter at night", tall: false },
  { src: "/images/kulhad-co/hot-chai-sign.jpg", alt: "Hot chai sign", tall: false },
];

export const WA_MESSAGE = "Hi Kulhad Co.! ☕\n2 Kulhad Masala Chai\n2 Bun Maska\n1 Vada Pav\nPickup in 20 mins. Thanks!";
