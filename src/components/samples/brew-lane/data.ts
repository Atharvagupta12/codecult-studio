import type { WeekHours } from "../shared/useOpenStatus";

export const BL = {
  cream: "#F4EADB",
  paper: "#FBF6EE",
  espresso: "#22140D",
  roast: "#3A2318",
  caramel: "#C2652A",
  latte: "#E2C6A2",
  mute: "#7A6656",
};

/** Mon–Fri 8 am–11 pm, Sat–Sun 7 am–midnight */
export const HOURS: WeekHours = [
  [7 * 60, 24 * 60],
  [8 * 60, 23 * 60],
  [8 * 60, 23 * 60],
  [8 * 60, 23 * 60],
  [8 * 60, 23 * 60],
  [8 * 60, 23 * 60],
  [7 * 60, 24 * 60],
];

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const ADDRESS = "14, Scheme No. 54, Vijay Nagar, Indore 452010";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Vijay+Nagar+Indore";
export const MAP_EMBED = "https://www.google.com/maps?q=Vijay+Nagar,+Indore&z=15&output=embed";

export const SIGNATURES = [
  { n: "01", name: "House Cappuccino", notes: "Double ristretto, velvety micro-foam, a hint of cocoa.", price: 180, img: "/images/brew-lane/latte-art.jpg", pos: "50% 70%" },
  { n: "02", name: "Iced Hazelnut Latte", notes: "Cold, nutty, dangerously smooth. Summer in a glass.", price: 220, img: "/images/brew-lane/iced-minimal.jpg", pos: "50% 85%" },
  { n: "03", name: "Single-Origin Pour Over", notes: "Brewed to order. Ask us what's on the bar today.", price: 240, img: "/images/brew-lane/pour-over.jpg", pos: "50% 50%" },
];

export type MenuItem = { name: string; desc?: string; price: number; fav?: boolean; veg?: boolean };

export const MENU: { title: string; items: MenuItem[] }[] = [
  {
    title: "Hot coffee",
    items: [
      { name: "Espresso", desc: "Our house blend, pulled short", price: 120 },
      { name: "Cappuccino", desc: "Double shot, silky foam", price: 180, fav: true },
      { name: "Flat White", desc: "Ristretto, thin velvet milk", price: 190 },
      { name: "Spanish Latte", desc: "Condensed milk, sweet & strong", price: 210 },
    ],
  },
  {
    title: "Cold coffee",
    items: [
      { name: "Cold Brew", desc: "Steeped 18 hours", price: 200 },
      { name: "Iced Hazelnut Latte", desc: "Our summer bestseller", price: 220 },
      { name: "Affogato", desc: "Espresso over vanilla gelato", price: 230 },
      { name: "Coffee Tonic", desc: "Espresso, tonic, orange peel", price: 210 },
    ],
  },
  {
    title: "Bakes & bites",
    items: [
      { name: "Butter Croissant", desc: "Baked in-house at 6 am", price: 140, veg: true },
      { name: "Burnt Basque Cheesecake", desc: "Our most-ordered dessert", price: 240, veg: true },
      { name: "Paneer Pesto Sandwich", desc: "Sourdough, basil, sun-dried tomato", price: 260, veg: true },
      { name: "Buttermilk Pancakes", desc: "Maple, berries, whipped butter", price: 280, veg: true },
    ],
  },
  {
    title: "Not coffee",
    items: [
      { name: "Hot Chocolate", desc: "70% dark, steamed milk", price: 190 },
      { name: "Matcha Latte", desc: "Ceremonial grade, oat or dairy", price: 240 },
      { name: "Masala Chai", desc: "Because we're still in Indore", price: 90 },
      { name: "Fresh Lime Soda", desc: "Sweet, salted or mixed", price: 110 },
    ],
  },
];

export const REVIEWS = [
  { name: "Ananya S.", when: "2 weeks ago", text: "Best cappuccino in Indore, no contest. The window seats are perfect for working, and the croissants sell out by noon for a reason." },
  { name: "Rohit Mehta", when: "1 month ago", text: "Cosy, calm and the staff actually know their coffee. The cold brew is ridiculously smooth. My go-to on weekends." },
  { name: "Priya & Karan", when: "3 weeks ago", text: "We came for one coffee and stayed for three hours. That burnt cheesecake is worth the drive across town." },
];

export const GALLERY = [
  { src: "/images/brew-lane/cheers.jpg", alt: "Friends sharing cappuccinos" },
  { src: "/images/brew-lane/croissant.jpg", alt: "Fresh butter croissants" },
  { src: "/images/brew-lane/people.jpg", alt: "Busy café on a weekend" },
  { src: "/images/brew-lane/coffee-top.jpg", alt: "Coffee from above" },
  { src: "/images/brew-lane/pancakes.jpg", alt: "Buttermilk pancakes" },
  { src: "/images/brew-lane/beans.jpg", alt: "Freshly roasted coffee beans" },
];

export const WA_ORDER_MESSAGE = "Hi Brew Lane! 👋\nI'd like to order:\n• 1 Cappuccino\n• 1 Butter Croissant\nPickup at 6 pm. Thanks!";
