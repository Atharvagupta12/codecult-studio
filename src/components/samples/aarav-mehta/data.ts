/* ── Brand ── */
export const AM = {
  bg: "#0A0A0A",
  panel: "#131313",
  ivory: "#F2EDE4",
  mute: "#8F8A83",
  line: "rgba(242,237,228,0.12)",
  gold: "#D9B97A",
  rec: "#FF3B30",
};

export const BASE = "/samples/aarav-mehta";
const I = (n: string) => `/images/aarav-mehta/${n}.jpg`;

export const PAGES = [
  { href: BASE, label: "Home", n: "01" },
  { href: `${BASE}/portfolio`, label: "Portfolio", n: "02" },
  { href: `${BASE}/stories`, label: "Stories", n: "03" },
  { href: `${BASE}/films`, label: "Films", n: "04" },
  { href: `${BASE}/packages`, label: "Packages", n: "05" },
  { href: `${BASE}/book`, label: "Check dates", n: "06" },
];

export const PHOTO_AARAV = I("aarav-shoot");
export const PHOTO_FILM = I("aarav-film");
export const PHOTO_CAMERA = I("camera");

/* ── Hero slides ── */
export const SLIDES = [
  { img: I("hero-river"), couple: "Ishita & Rohan", place: "Udaipur, Rajasthan", pos: "50% 45%" },
  { img: I("hero-mist"), couple: "Meera & Arjun", place: "Rishikesh, Uttarakhand", pos: "50% 50%" },
  { img: I("hero-lights"), couple: "Simran & Raghav", place: "Jaipur, Rajasthan", pos: "50% 35%" },
  { img: I("hero-woods"), couple: "Ananya & Dev", place: "Mahabaleshwar, Maharashtra", pos: "50% 50%" },
];

/* ── Portfolio ── */
export type Cat = "Weddings" | "Pre-wedding" | "Haldi & Mehendi" | "Portraits";
export const CATS: ("All" | Cat)[] = ["All", "Weddings", "Pre-wedding", "Haldi & Mehendi", "Portraits"];

export type Photo = { src: string; cat: Cat; alt: string; tall?: boolean };

export const PHOTOS: Photo[] = [
  { src: I("couple-garland"), cat: "Weddings", alt: "Couple exchanging varmala", tall: true },
  { src: I("bride-palace"), cat: "Portraits", alt: "Bride in a palace courtyard", tall: true },
  { src: I("prewed-mist"), cat: "Pre-wedding", alt: "Couple in the mountain mist" },
  { src: I("haldi-splash"), cat: "Haldi & Mehendi", alt: "Haldi flowers falling on the bride", tall: true },
  { src: I("couple-laugh"), cat: "Weddings", alt: "Couple laughing during rituals" },
  { src: I("henna-hands"), cat: "Haldi & Mehendi", alt: "Henna-covered hands holding each other" },
  { src: I("bride-veil"), cat: "Portraits", alt: "Bride smiling under her veil", tall: true },
  { src: I("couple-pheras"), cat: "Weddings", alt: "Pheras under a floral canopy" },
  { src: I("prewed-close"), cat: "Pre-wedding", alt: "Couple sharing a quiet moment" },
  { src: I("mandap"), cat: "Weddings", alt: "Floral mandap at sunset", tall: true },
  { src: I("haldi-shades"), cat: "Haldi & Mehendi", alt: "Bride with sunglasses at her haldi" },
  { src: I("bride-shy"), cat: "Portraits", alt: "Bride looking down, shy smile" },
  { src: I("couple-kiss"), cat: "Weddings", alt: "Groom kissing the bride's forehead", tall: true },
  { src: I("prewed-road"), cat: "Pre-wedding", alt: "Couple on a mountain road" },
  { src: I("mehendi-group"), cat: "Haldi & Mehendi", alt: "Bridesmaids showing their mehendi" },
  { src: I("bride-red"), cat: "Portraits", alt: "Bride in red with a nose ring", tall: true },
  { src: I("couple-forest"), cat: "Weddings", alt: "Newlyweds in the forest" },
  { src: I("prewed-umbrella"), cat: "Pre-wedding", alt: "Bride with a red umbrella", tall: true },
  { src: I("haldi-marigold"), cat: "Haldi & Mehendi", alt: "Bride with marigold garlands" },
  { src: I("groom-mirror"), cat: "Portraits", alt: "Groom getting ready by the mirror" },
  { src: I("venue"), cat: "Weddings", alt: "Ballroom ceremony under chandeliers" },
  { src: I("prewed-woods"), cat: "Pre-wedding", alt: "Couple in the woods", tall: true },
  { src: I("haldi-smile"), cat: "Haldi & Mehendi", alt: "Bride smiling at her haldi" },
  { src: I("bride-smile"), cat: "Portraits", alt: "Bride smiling in gold jewellery" },
  { src: I("couple-nose"), cat: "Weddings", alt: "Couple nose to nose", tall: true },
  { src: I("rings"), cat: "Weddings", alt: "Hands with rings and henna" },
  { src: I("prewed-beach"), cat: "Pre-wedding", alt: "Couple dancing on the beach" },
  { src: I("bride-colour"), cat: "Portraits", alt: "Bride portrait with colourful dupatta" },
];

/* ── Stories ── */
export type Story = {
  slug: string;
  couple: string;
  title: string;
  place: string;
  date: string;
  guests: string;
  cover: string;
  coverPos?: string;
  intro: string;
  chapters: { title: string; text: string; images: string[] }[];
  quote: [string, string];
  credits: [string, string][];
};

export const STORIES: Story[] = [
  {
    slug: "ishita-rohan",
    couple: "Ishita & Rohan",
    title: "A palace wedding in the city of lakes",
    place: "Udaipur, Rajasthan",
    date: "December 2025",
    guests: "320 guests · 3 days",
    cover: I("hero-lights"),
    coverPos: "50% 30%",
    intro: "Three days of marigolds, lake breeze and a family that danced harder than anyone we've ever photographed. Ishita wanted pictures that felt like memories, not posters. So we stayed quiet, stayed close and let the moments happen.",
    chapters: [
      { title: "Getting ready", text: "Morning light through jharokha windows, a nervous laugh and a grandmother adjusting the dupatta one last time.", images: [I("bride-palace"), I("bride-veil"), I("groom-mirror")] },
      { title: "The pheras", text: "Seven rounds under a canopy of white flowers. Rohan's hands were shaking. Ishita's were steady. We caught both.", images: [I("couple-pheras"), I("mandap"), I("rings")] },
      { title: "The celebration", text: "By midnight, nobody remembered the choreography. That's exactly when the best photographs happen.", images: [I("couple-garland"), I("couple-laugh"), I("dance")] },
    ],
    quote: ["We cried looking at the album. Aarav captured things we didn't even know happened.", "Ishita"],
    credits: [
      ["Planner", "Lakeside Weddings Co."],
      ["Decor", "Phoolwala Studio"],
      ["Makeup", "Mehr Bridal"],
      ["Venue", "Heritage palace hotel"],
    ],
  },
  {
    slug: "meera-arjun",
    couple: "Meera & Arjun",
    title: "Mist, mountains and a promise",
    place: "Rishikesh, Uttarakhand",
    date: "February 2026",
    guests: "Pre-wedding · 2 days",
    cover: I("hero-mist"),
    intro: "Meera and Arjun met on a trek, so their pre-wedding had to be in the mountains. We chased fog at 5 am, got rained on twice and came home with our favourite pre-wedding series yet.",
    chapters: [
      { title: "Into the clouds", text: "A 5 am start, a winding road and the kind of light you can't plan for.", images: [I("prewed-mist"), I("prewed-road"), I("prewed-woods")] },
      { title: "Just the two of them", text: "No poses, no props. Just two people who can't stop making each other laugh.", images: [I("prewed-close"), I("prewed-umbrella"), I("hero-river")] },
    ],
    quote: ["It doesn't feel like a photoshoot when Aarav is around. It feels like a holiday with a friend who has a camera.", "Arjun"],
    credits: [
      ["Styling", "The Wardrobe Edit"],
      ["Location", "Shivpuri & Kunjapuri"],
      ["Hair & makeup", "Studio Glow"],
    ],
  },
  {
    slug: "simran-raghav",
    couple: "Simran & Raghav",
    title: "Haldi, mehendi and a whole lot of colour",
    place: "Jaipur, Rajasthan",
    date: "November 2025",
    guests: "450 guests · 4 days",
    cover: I("haldi-splash"),
    coverPos: "50% 35%",
    intro: "Simran told us on day one: 'I want it loud.' Four days of turmeric, petals, dhol and sunglasses at the haldi. This is what joy looks like in Jaipur.",
    chapters: [
      { title: "Haldi", text: "Marigold showers, turmeric everywhere and not a single serious face in sight.", images: [I("haldi-shades"), I("haldi-smile"), I("haldi-marigold")] },
      { title: "Mehendi", text: "Six hours of henna, songs and the cousins' secret dance rehearsal.", images: [I("henna-hands"), I("mehendi-group"), I("mehendi-green")] },
      { title: "The wedding", text: "And finally, the quiet moment in the middle of all that colour.", images: [I("couple-red"), I("couple-forest"), I("couple-kiss")] },
    ],
    quote: ["Every single photo feels alive. Our families keep asking for prints!", "Simran"],
    credits: [
      ["Planner", "Pink City Celebrations"],
      ["Decor", "Genda Phool Designs"],
      ["Music", "Dhol Express"],
    ],
  },
];

/* ── Films ── */
export const FILMS = [
  {
    id: "udaipur",
    title: "The Udaipur Film",
    couple: "Ishita & Rohan",
    length: "4:12",
    frames: [I("hero-lights"), I("bride-palace"), I("couple-pheras"), I("couple-garland"), I("dance"), I("couple-laugh")],
    lines: ["“I knew it was him when he laughed at my terrible jokes.”", "Udaipur · December 2025", "“Seven rounds, seven promises.”", "Forever starts here."],
  },
  {
    id: "rishikesh",
    title: "Above the Clouds",
    couple: "Meera & Arjun",
    length: "3:05",
    frames: [I("hero-mist"), I("prewed-mist"), I("prewed-close"), I("prewed-woods"), I("hero-river")],
    lines: ["“We met on a mountain.”", "Rishikesh · February 2026", "“So of course we came back.”", "A pre-wedding film."],
  },
  {
    id: "jaipur",
    title: "Colours of Jaipur",
    couple: "Simran & Raghav",
    length: "2:48",
    frames: [I("haldi-splash"), I("haldi-shades"), I("henna-hands"), I("mehendi-group"), I("couple-red")],
    lines: ["“I want it loud.”", "Jaipur · November 2025", "Haldi. Mehendi. Dhol.", "Pure joy."],
  },
];

/* ── Packages ── */
export const PACKAGES = [
  {
    id: "silver",
    name: "Silver",
    price: 125000,
    line: "Intimate weddings",
    features: ["1 day coverage", "1 photographer + 1 cinematographer", "Up to 2 events", "400+ edited photos", "3-minute highlight film", "Private online gallery"],
  },
  {
    id: "gold",
    name: "Gold",
    price: 225000,
    line: "Most couples choose this",
    popular: true,
    features: ["2 days coverage", "2 photographers + 1 cinematographer", "Up to 4 events", "800+ edited photos", "5-minute film + 60-sec teaser", "1 premium album (40 pages)", "Drone coverage"],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 350000,
    line: "The full story",
    features: ["3 days coverage", "3 photographers + 2 cinematographers", "All events", "1,200+ edited photos", "20-min feature film + teaser + reels", "2 premium albums", "Pre-wedding shoot", "Same-day edit at reception"],
  },
] as const;

/* ── Estimator ── */
export const EVENTS = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Engagement"];
export const ADDONS = [
  { id: "drone", label: "Drone shots", price: 15000 },
  { id: "prewed", label: "Pre-wedding shoot", price: 45000 },
  { id: "album", label: "Premium album", price: 25000 },
  { id: "sde", label: "Same-day edit", price: 30000 },
  { id: "reels", label: "Instagram reels pack", price: 12000 },
];
export const PRICE = { perDay: 55000, perEvent: 12000, extraShooter: 15000 };

/* ── Booking ── */
export type DayState = "free" | "few" | "booked";
export const dayState = (y: number, m: number, d: number): DayState => {
  // Deterministic pattern that varies day to day (looks like a real, busy calendar)
  const k = (d * 3 + m * 7 + y + Math.floor(d / 4)) % 9;
  return k === 0 || k === 4 ? "booked" : k === 7 ? "few" : "free";
};

export const TESTIMONIALS = [
  { couple: "Ishita & Rohan", place: "Udaipur", text: "We cried looking at the album. Aarav captured things we didn't even know happened.", img: I("couple-garland") },
  { couple: "Meera & Arjun", place: "Rishikesh", text: "It never felt like a shoot. It felt like a holiday with a friend who happens to be brilliant with a camera.", img: I("prewed-close") },
  { couple: "Simran & Raghav", place: "Jaipur", text: "Every photo feels alive. Our families keep asking for prints, and our film has 40k views on Instagram!", img: I("haldi-shades") },
];

export const FEATURED_IN = ["The Wedding Journal", "Shaadi Stories", "Indian Bride Mag", "Lens & Light", "Vows Weekly"];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
