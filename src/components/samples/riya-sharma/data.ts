/* ── Brand ── */
export const RS = {
  paper: "#FAF7F2",
  card: "#FFFFFF",
  ink: "#161616",
  mute: "#6E6A64",
  line: "rgba(22,22,22,0.1)",
  violet: "#6C47FF",
  lilac: "#E9E3FF",
  butter: "#FFE9A8",
  peach: "#FFD9C7",
  mint: "#CDEFE0",
};

const IMG = "/images/riya-sharma";

export const EMAIL = "hello@riyasharma.design";

/* ── Work ── */
export type Cat = "Branding" | "Packaging" | "UI" | "Editorial";

export type Project = {
  id: string;
  title: string;
  client: string;
  line: string;
  cats: Cat[];
  year: number;
  cover: string;
  images: string[];
  result: string;
  tint: string;
  palette: string[];
  challenge: string;
  solution: string;
  outcomes: [string, string][];
  span?: "tall" | "wide";
};

export const PROJECTS: Project[] = [
  {
    id: "radical-toast",
    title: "Radical Toast",
    client: "Specialty coffee roaster, Pune",
    line: "A loud, happy coffee brand for people who hate boring mornings.",
    cats: ["Branding", "Packaging"],
    year: 2025,
    cover: `${IMG}/coffee-1.jpg`,
    images: [`${IMG}/coffee-1.jpg`, `${IMG}/coffee-2.jpg`],
    result: "First batch sold out in 9 days",
    tint: "#FFD9C7",
    palette: ["#1F2B5B", "#F26A4B", "#F4E6D4", "#8CC6EE"],
    challenge: "A small roaster competing with big, serious coffee brands on a crowded shelf, with zero marketing budget.",
    solution: "A cheeky illustrated identity: rocket mascots, a bold colour code for each roast and bags designed to be photographed.",
    outcomes: [
      ["9 days", "to sell out the first batch"],
      ["3×", "Instagram followers in a month"],
      ["12", "cafés now stock the beans"],
    ],
    span: "tall",
  },
  {
    id: "castro-capital",
    title: "Castro Capital",
    client: "Investment advisory, Mumbai",
    line: "Calm, confident finance branding that finally looks trustworthy.",
    cats: ["Branding", "Editorial"],
    year: 2024,
    cover: `${IMG}/brochures.jpg`,
    images: [`${IMG}/brochures.jpg`, `${IMG}/stationery.jpg`],
    result: "3 offices, one consistent voice",
    tint: "#E3E8FF",
    palette: ["#0D2A8A", "#F5F5F2", "#121212", "#C9D2EE"],
    challenge: "Three offices using three different logos, and pitch decks that looked like they came from three different companies.",
    solution: "A strict, elegant system: a monogram, a single blue, editorial type and templates that anyone in the team can use.",
    outcomes: [
      ["1", "brand system for 3 offices"],
      ["40+", "templates delivered"],
      ["2×", "faster pitch-deck turnaround"],
    ],
  },
  {
    id: "sakhi",
    title: "Sakhi Botanicals",
    client: "Ayurvedic skincare, Indore",
    line: "Soft, botanical packaging that feels like a gift on the shelf.",
    cats: ["Packaging"],
    year: 2025,
    cover: `${IMG}/skincare.jpg`,
    images: [`${IMG}/skincare.jpg`, `${IMG}/box-white.jpg`],
    result: "Launched in 40 stores",
    tint: "#CDEFE0",
    palette: ["#F4B8C4", "#9FD3B0", "#FFF6EE", "#2E4B3C"],
    challenge: "An Ayurvedic brand that looked old-fashioned next to modern D2C skincare.",
    solution: "Pastel colour-coding by skin type, leaf cut-outs that reveal the product and recyclable board packaging.",
    outcomes: [
      ["40", "retail stores at launch"],
      ["4 wks", "from brief to print-ready"],
      ["100%", "recyclable packaging"],
    ],
    span: "wide",
  },
  {
    id: "mono",
    title: "Mono",
    client: "Habit-tracker app, Bengaluru",
    line: "A calm, minimal app that makes good habits feel effortless.",
    cats: ["UI"],
    year: 2025,
    cover: `${IMG}/app.jpg`,
    images: [`${IMG}/app.jpg`],
    result: "4.8★ on the Play Store",
    tint: "#E9E3FF",
    palette: ["#111111", "#FFFFFF", "#6C47FF", "#EDEBE6"],
    challenge: "An app with great features that users kept uninstalling within a week.",
    solution: "Fewer screens, one daily action and gentle micro-animations that reward every streak.",
    outcomes: [
      ["4.8★", "Play Store rating"],
      ["+62%", "week-4 retention"],
      ["12", "screens instead of 31"],
    ],
  },
  {
    id: "phoenix",
    title: "Phoenix",
    client: "Electronics accessories",
    line: "Packaging that pops off the shelf and opens like a reveal.",
    cats: ["Packaging"],
    year: 2024,
    cover: `${IMG}/phoenix.jpg`,
    images: [`${IMG}/phoenix.jpg`, `${IMG}/boxes.jpg`],
    result: "+28% retail pick-up",
    tint: "#FFE9A8",
    palette: ["#FF5A1F", "#FFFFFF", "#1A1A1A", "#FFC9B3"],
    challenge: "A great product hidden in a plain brown box in electronics stores.",
    solution: "A die-cut flame-orange box with a bold wordmark that unfolds into a mini manual.",
    outcomes: [
      ["+28%", "retail pick-up"],
      ["1", "box, zero plastic"],
      ["6", "SKUs in the system"],
    ],
  },
  {
    id: "rhial",
    title: "Rhial",
    client: "Slow-fashion label, Jaipur",
    line: "Quiet luxury for a handmade clothing label.",
    cats: ["Branding"],
    year: 2023,
    cover: `${IMG}/tote.jpg`,
    images: [`${IMG}/tote.jpg`],
    result: "Featured on Behance",
    tint: "#EFE7DA",
    palette: ["#2B2B2B", "#EFE7DA", "#B89C7A", "#FFFFFF"],
    challenge: "A handmade label whose Instagram looked like every other fast-fashion account.",
    solution: "A whisper-quiet wordmark, earthy tones and textured tote and tag designs that customers keep.",
    outcomes: [
      ["Behance", "featured project"],
      ["2×", "average order value"],
      ["0", "plastic in packaging"],
    ],
    span: "tall",
  },
  {
    id: "type-poster",
    title: "Type Matters",
    client: "Personal project",
    line: "A poster and zine series celebrating classic typefaces.",
    cats: ["Editorial"],
    year: 2023,
    cover: `${IMG}/poster.jpg`,
    images: [`${IMG}/poster.jpg`, `${IMG}/book.jpg`],
    result: "Sold 300 prints",
    tint: "#F1EEE8",
    palette: ["#111111", "#FF5A1F", "#FFFFFF", "#D8D3CA"],
    challenge: "Could a poster about a typeface be beautiful enough to hang at home?",
    solution: "Big, simple type specimens with one accent colour, printed on thick matte paper.",
    outcomes: [
      ["300", "prints sold"],
      ["12", "typefaces covered"],
      ["1", "zine, 48 pages"],
    ],
  },
];

export const CATS: ("All" | Cat)[] = ["All", "Branding", "Packaging", "UI", "Editorial"];

/* ── Logos (drawn in type) ── */
export const CLIENTS = [
  { name: "Radical Toast", style: "font-black italic tracking-tight" },
  { name: "CASTRO", style: "font-light tracking-[0.4em]" },
  { name: "sakhi", style: "[font-family:var(--rs-serif)] italic text-[1.15em]" },
  { name: "PHOENIX", style: "font-extrabold tracking-[0.12em]" },
  { name: "mono.", style: "font-semibold lowercase" },
  { name: "Rhial", style: "[font-family:var(--rs-serif)] tracking-[0.2em] uppercase" },
  { name: "Chai Sutra", style: "font-bold" },
  { name: "Nook & Co", style: "[font-family:var(--rs-serif)] italic" },
];

/* ── Services ── */
export const SERVICES = [
  { n: "01", name: "Brand identity", price: "from ₹24,999", desc: "Logo, colours, type, brand guide and the first set of applications.", tint: RS.lilac },
  { n: "02", name: "Packaging", price: "from ₹14,999", desc: "Boxes, bags, labels and print-ready files your printer will love.", tint: RS.peach },
  { n: "03", name: "UI & websites", price: "from ₹29,999", desc: "App and website design in Figma, ready for developers.", tint: RS.mint },
  { n: "04", name: "Social media kit", price: "from ₹7,999", desc: "Templates for posts, stories and highlights in your brand style.", tint: RS.butter },
];

export const PROCESS = [
  { n: "01", name: "Discover", text: "A 45-min call about your business, audience and taste." },
  { n: "02", name: "Explore", text: "Moodboards and 2–3 directions. You pick, I refine." },
  { n: "03", name: "Design", text: "Everything designed, with two rounds of changes included." },
  { n: "04", name: "Deliver", text: "All files, a brand guide and a handover call." },
];

export const TESTIMONIALS = [
  { name: "Aniket Joshi", role: "Founder, Radical Toast", text: "Riya didn't just design bags, she designed a personality. Customers literally take photos of our coffee.", tint: RS.peach },
  { name: "Meghna Rao", role: "Partner, Castro Capital", text: "Calm, organised and incredibly talented. Our brand finally looks as serious as our work.", tint: RS.lilac },
  { name: "Pooja Malviya", role: "Co-founder, Sakhi", text: "From brief to shelf in four weeks. Stores asked us who designed our boxes!", tint: RS.mint },
];

export const TOOLS = ["Figma", "Illustrator", "Photoshop", "InDesign", "Blender", "After Effects"];

export const WA_MESSAGE = (name: string, need: string, budget: string) =>
  `Hi Riya! 👋\nI'm ${name || "Ankit"} and I need help with: ${need}.\nBudget: ${budget}.\nCan we set up a call?`;
