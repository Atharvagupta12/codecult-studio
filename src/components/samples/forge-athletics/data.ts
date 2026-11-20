import type { WeekHours } from "../shared/useOpenStatus";

/* ── Brand ── */
export const FG = {
  bg: "#0B0B0B",
  panel: "#141414",
  bone: "#EDEAE4",
  mute: "#8C8984",
  line: "rgba(237,234,228,0.12)",
  heat: "#FF4D2E",
};

export const BASE = "/samples/forge-athletics";
const IMG = "/images/forge-athletics";

export const PAGES = [
  { href: BASE, label: "Home", n: "01" },
  { href: `${BASE}/programs`, label: "Programs", n: "02" },
  { href: `${BASE}/coaches`, label: "Coaches", n: "03" },
  { href: `${BASE}/results`, label: "Results", n: "04" },
  { href: `${BASE}/membership`, label: "Membership", n: "05" },
  { href: `${BASE}/trial`, label: "Free trial", n: "06" },
];

/* ── Place ── */
export const ADDRESS = "3rd floor, Silver Arcade, New Palasia, Indore 452001";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=New+Palasia+Indore";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Mon–Sat 6 am – 10 pm, Sunday 8 am – noon */
export const HOURS: WeekHours = [
  [8 * 60, 12 * 60],
  [6 * 60, 22 * 60],
  [6 * 60, 22 * 60],
  [6 * 60, 22 * 60],
  [6 * 60, 22 * 60],
  [6 * 60, 22 * 60],
  [6 * 60, 22 * 60],
];

/* ── The Forge Method ── */
export const METHOD = [
  {
    n: "01",
    name: "Assess",
    when: "Week 0",
    text: "Body-composition scan, movement screen and a 45-minute goal session with your coach. We find your starting line, honestly.",
    stat: ["45 min", "1-on-1 assessment"],
    img: `${IMG}/stretch-bw.jpg`,
  },
  {
    n: "02",
    name: "Build",
    when: "Weeks 1 – 4",
    text: "Technique first. We groove the squat, hinge, press and pull until they're automatic, and build the engine underneath.",
    stat: ["4", "core movement patterns"],
    img: `${IMG}/barbell-floor.jpg`,
  },
  {
    n: "03",
    name: "Forge",
    when: "Weeks 5 – 10",
    text: "Progressive overload, tracked every session. Your coach adjusts load, volume and food every single week.",
    stat: ["+32%", "average strength gain"],
    img: `${IMG}/squat-bw.jpg`,
  },
  {
    n: "04",
    name: "Perform",
    when: "Week 12",
    text: "Re-test day. New scan, new PRs, new goals. Then we build the next block, stronger than the last.",
    stat: ["94%", "hit a PR on re-test day"],
    img: `${IMG}/sprint.jpg`,
  },
];

/* ── Programs ── */
export type ProgramId = "foundations" | "strength" | "hybrid" | "lean";

export const PROGRAMS: {
  id: ProgramId;
  n: string;
  name: string;
  line: string;
  desc: string;
  img: string;
  pos?: string;
  intensity: number;
  weeks: number;
  perWeek: string;
  forWho: string;
  outcomes: string[];
  week: [string, string][];
}[] = [
  {
    id: "foundations",
    n: "01",
    name: "Foundations",
    line: "Start right. Start strong.",
    desc: "An 8-week on-ramp for complete beginners. Learn every lift, build confidence and finish ready for any program.",
    img: `${IMG}/stretch-bw.jpg`,
    intensity: 2,
    weeks: 8,
    perWeek: "3×",
    forWho: "Never trained, or returning after a long break",
    outcomes: ["Master 6 key lifts", "Daily-life strength", "Habits that stick"],
    week: [
      ["Mon", "Full body A"],
      ["Tue", "—"],
      ["Wed", "Mobility + core"],
      ["Thu", "—"],
      ["Fri", "Full body B"],
      ["Sat", "Optional walk / swim"],
    ],
  },
  {
    id: "strength",
    n: "02",
    name: "Strength",
    line: "Lift heavier. Look the part.",
    desc: "Powerbuilding blocks built on squat, bench and deadlift, with accessory work for size. Programmed and tracked by your coach.",
    img: `${IMG}/squat-bw.jpg`,
    intensity: 4,
    weeks: 12,
    perWeek: "4×",
    forWho: "Comfortable with the basics, wants real strength numbers",
    outcomes: ["+20–40 kg on big lifts", "Visible muscle", "Better posture"],
    week: [
      ["Mon", "Squat + legs"],
      ["Tue", "Bench + push"],
      ["Wed", "Recovery"],
      ["Thu", "Deadlift + pull"],
      ["Fri", "Upper volume"],
      ["Sat", "Conditioning finisher"],
    ],
  },
  {
    id: "hybrid",
    n: "03",
    name: "Hybrid",
    line: "Strong and fast. No trade-offs.",
    desc: "Strength meets engine. Sleds, runs, rows and barbells, built for Hyrox, sport, or simply being ready for anything.",
    img: `${IMG}/ropes.jpg`,
    pos: "50% 30%",
    intensity: 5,
    weeks: 12,
    perWeek: "5×",
    forWho: "Already active, wants to perform, compete or race",
    outcomes: ["Faster 5k", "Hyrox-ready", "Strength + stamina"],
    week: [
      ["Mon", "Strength A + run"],
      ["Tue", "Engine intervals"],
      ["Wed", "Strength B"],
      ["Thu", "Zone 2 + mobility"],
      ["Fri", "Hybrid workout"],
      ["Sat", "Long run / sled day"],
    ],
  },
  {
    id: "lean",
    n: "04",
    name: "Lean",
    line: "Lose fat. Keep the muscle.",
    desc: "Strength training plus coached conditioning and a nutrition plan built around Indian food. The fat-loss program that actually lasts.",
    img: `${IMG}/boxing-bw.jpg`,
    intensity: 3,
    weeks: 12,
    perWeek: "4×",
    forWho: "Wants to drop fat and build a lean, athletic body",
    outcomes: ["−6 to −10 kg fat", "More energy", "Sustainable diet"],
    week: [
      ["Mon", "Strength full body"],
      ["Tue", "Conditioning"],
      ["Wed", "Steps + mobility"],
      ["Thu", "Strength full body"],
      ["Fri", "Boxing conditioning"],
      ["Sat", "Group bootcamp"],
    ],
  },
];

/* ── Coaches ── */
export const COACHES = [
  {
    id: "aditya",
    name: "Aditya Rao",
    role: "Head Coach · Strength",
    img: `${IMG}/coach-aditya.jpg`,
    pos: "50% 25%",
    years: 11,
    bio: "Former state-level sprinter turned strength coach. Aditya built Forge's programming system and still coaches the 6 am crew himself.",
    certs: ["NSCA-CSCS", "Precision Nutrition L1", "IWF Weightlifting L2"],
    specs: ["Powerbuilding", "Athletic performance", "Programming"],
    stat: ["600+", "athletes coached"],
    quote: "Strength is a skill. Skills can be coached.",
  },
  {
    id: "naina",
    name: "Naina Kapoor",
    role: "Hybrid & Hyrox Coach",
    img: `${IMG}/coach-naina.jpg`,
    pos: "50% 20%",
    years: 7,
    bio: "Three-time Hyrox finisher and marathoner. Naina coaches Hybrid and makes conditioning feel like a sport, not a punishment.",
    certs: ["Hyrox Master Trainer", "ACE CPT", "Run coach L2"],
    specs: ["Hybrid training", "Running", "Engine building"],
    stat: ["58:40", "Hyrox PB"],
    quote: "Your engine is built in the boring minutes.",
  },
  {
    id: "rhea",
    name: "Rhea Sethi",
    role: "Foundations & Mobility",
    img: `${IMG}/coach-rhea.jpg`,
    pos: "50% 30%",
    years: 6,
    bio: "Physiotherapist turned coach. Rhea runs Foundations and makes sure every beginner moves well before they move heavy.",
    certs: ["BPT, Physiotherapy", "FRC Mobility", "Pre/post-natal coach"],
    specs: ["Beginners", "Mobility", "Injury rehab"],
    stat: ["0", "injuries in Foundations, 2025"],
    quote: "Move well first. Then move a lot.",
  },
  {
    id: "sameer",
    name: "Sameer Khan",
    role: "Lean & Conditioning",
    img: `${IMG}/lift-bw.jpg`,
    pos: "50% 30%",
    years: 8,
    bio: "Amateur boxer and nutrition nerd. Sameer leads Lean, where members drop fat without giving up dal, roti or their weekends.",
    certs: ["ISSA Nutritionist", "Boxing coach L1", "ACSM CPT"],
    specs: ["Fat loss", "Nutrition", "Boxing conditioning"],
    stat: ["2,400 kg", "fat lost by his members"],
    quote: "Abs are made in the kitchen. Discipline is made here.",
  },
];

/* ── Results (case studies) ── */
export const CASES = [
  {
    name: "Priya, 31",
    program: "Lean · 12 weeks",
    metric: "Body fat %",
    unit: "%",
    series: [32, 31.2, 29.8, 28.6, 27.5, 26.4, 25.1],
    lowerIsBetter: true,
    headline: "−6.9% body fat",
    quote: "I stopped crash dieting and started lifting. Three months later I'm lighter, stronger and I still eat my mom's food.",
    img: `${IMG}/boxing-bw.jpg`,
  },
  {
    name: "Karan, 27",
    program: "Strength · 12 weeks",
    metric: "Back squat (kg)",
    unit: " kg",
    series: [80, 90, 97.5, 105, 115, 125, 140],
    lowerIsBetter: false,
    headline: "+60 kg squat",
    quote: "I'd been 'going to the gym' for four years. Forge was the first time someone actually coached me.",
    img: `${IMG}/barbell-floor.jpg`,
  },
  {
    name: "Neha, 38",
    program: "Hybrid · 16 weeks",
    metric: "5 km time (min)",
    unit: " min",
    series: [34, 32.4, 31, 29.5, 28.2, 27, 25.9],
    lowerIsBetter: true,
    headline: "−8 min on her 5k",
    quote: "At 38 I ran my first Hyrox. My kids think I'm a superhero. Honestly, so do I.",
    img: `${IMG}/track-bw.jpg`,
  },
];

/* ── Membership ── */
export const PLANS = [
  {
    id: "train",
    name: "Train",
    price: 3499,
    line: "Coached group training",
    features: ["3 coached sessions a week", "Any program, any batch", "Monthly body scan", "Forge app access"],
  },
  {
    id: "forge",
    name: "Forge",
    price: 5999,
    line: "Unlimited + nutrition",
    popular: true,
    features: ["Unlimited coached sessions", "Personal nutrition plan", "Bi-weekly coach check-ins", "Re-test day every 12 weeks", "2 guest passes a month"],
  },
  {
    id: "elite",
    name: "Elite",
    price: 11999,
    line: "1-on-1 coaching",
    features: ["12 private sessions a month", "Fully custom programming", "Weekly nutrition reviews", "WhatsApp access to your coach", "Recovery & mobility sessions"],
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

/* ── Goal quiz ── */
export const QUIZ = [
  {
    q: "What's your main goal?",
    options: [
      { label: "Lose fat", hint: "Lean, lighter, more energy" },
      { label: "Get strong", hint: "Lift more, build muscle" },
      { label: "Perform", hint: "Fitter, faster, compete" },
      { label: "Start from zero", hint: "New to training" },
    ],
  },
  {
    q: "How experienced are you?",
    options: [
      { label: "Brand new", hint: "Never trained properly" },
      { label: "Under a year", hint: "Some gym experience" },
      { label: "1 – 3 years", hint: "Comfortable with the basics" },
      { label: "3+ years", hint: "I know my way around" },
    ],
  },
  {
    q: "How many days a week can you train?",
    options: [
      { label: "2 – 3 days", hint: "Busy schedule" },
      { label: "4 days", hint: "The sweet spot" },
      { label: "5+ days", hint: "All in" },
    ],
  },
] as const;

export function recommend(a: number[]): { program: ProgramId; plan: PlanId } {
  const [goal, exp, days] = a;
  const program: ProgramId = goal === 3 || exp === 0 ? "foundations" : goal === 0 ? "lean" : goal === 1 ? "strength" : "hybrid";
  const plan: PlanId = days === 0 ? "train" : days === 2 && exp >= 2 ? "elite" : "forge";
  return { program, plan };
}

/* ── Free-trial booking ── */
export const TRIAL_SLOTS = [6 * 60, 7 * 60, 8 * 60, 17 * 60 + 30, 18 * 60 + 30, 19 * 60 + 30];
export const SUNDAY_SLOTS = [8 * 60, 9 * 60, 10 * 60];
/** Deterministic "full" slots so the calendar looks real */
export const isFull = (dayOfMonth: number, slot: number) => (dayOfMonth * 7 + slot / 30) % 5 === 0;

export const FAQ = [
  { q: "Is the trial really free?", a: "Yes. A full coached session plus your body-composition scan and a goal chat. No card, no contract, no sales pressure." },
  { q: "I'm out of shape. Should I get fit before joining?", a: "No. That's our job. Foundations exists exactly for this, and every program scales to where you are today." },
  { q: "What should I bring?", a: "Training clothes, indoor shoes and a water bottle. We provide towels, lockers and showers." },
  { q: "Can I freeze or cancel?", a: "Freeze up to 30 days a year. Cancel with 30 days' notice. No lock-in contracts, ever." },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
