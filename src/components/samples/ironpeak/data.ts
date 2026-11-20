import type { WeekHours } from "../shared/useOpenStatus";

/* ── Brand ── */
export const IP = {
  bg: "#0A0A0A",
  panel: "#141414",
  panel2: "#1C1C1C",
  line: "rgba(255,255,255,0.1)",
  text: "#F5F5F5",
  mute: "#8E8E8E",
  lime: "#E5FF3D",
  red: "#FF4D4D",
};

export const BASE = "/samples/ironpeak";
const IMG = "/images/ironpeak";

export const PAGES = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/programs`, label: "Programs" },
  { href: `${BASE}/results`, label: "Results" },
  { href: `${BASE}/plans`, label: "Plans" },
];

/* ── Place ── */
export const ADDRESS = "Plot 7, AB Road, opposite C21 Mall, Vijay Nagar, Indore 452010";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=AB+Road+Vijay+Nagar+Indore";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Mon–Sat 5 am – 11 pm, Sunday 7 am – 1 pm */
export const HOURS: WeekHours = [
  [7 * 60, 13 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
];

/* ── Programs ── */
export type Cat = "strength" | "muscle" | "boxing" | "hiit" | "athletic";

export const PROGRAMS: { id: Cat; n: string; name: string; tag: string; desc: string; img: string; pos?: string; perWeek: string; level: string; goals: string[] }[] = [
  {
    id: "strength",
    n: "01",
    name: "Strength",
    tag: "Squat · Bench · Deadlift",
    desc: "Coached barbell training with a 12-week progression. Every session logged, every PR celebrated.",
    img: `${IMG}/deadlift.jpg`,
    perWeek: "3–4×",
    level: "All levels",
    goals: ["Get stronger", "Build confidence", "Better posture"],
  },
  {
    id: "muscle",
    n: "02",
    name: "Muscle Build",
    tag: "Hypertrophy split",
    desc: "Push, pull, legs. A science-based split with progressive overload and a diet plan that actually fits Indian food.",
    img: `${IMG}/athlete-pose.jpg`,
    perWeek: "5×",
    level: "Intermediate",
    goals: ["Gain muscle", "Aesthetics", "Body recomposition"],
  },
  {
    id: "boxing",
    n: "03",
    name: "Fight Fit",
    tag: "Boxing & pad work",
    desc: "Learn real technique on bags and pads. The most fun way to burn 700 calories you'll ever find.",
    img: `${IMG}/boxing.jpg`,
    perWeek: "2–3×",
    level: "Beginner friendly",
    goals: ["Fat loss", "Stress relief", "Self-defence"],
  },
  {
    id: "hiit",
    n: "04",
    name: "Conditioning",
    tag: "HIIT · Ropes · Sleds",
    desc: "45 minutes. Heart rate zones on screen. Sweat guaranteed. Built to torch fat and build an engine.",
    img: `${IMG}/ropes.jpg`,
    perWeek: "3×",
    level: "All levels",
    goals: ["Fat loss", "Stamina", "Heart health"],
  },
  {
    id: "athletic",
    n: "05",
    name: "Athletic",
    tag: "Kettlebells · Mobility",
    desc: "Move better, jump higher, hurt less. Kettlebell flows, plyometrics and mobility for everyday athletes.",
    img: `${IMG}/kb-pushup.jpg`,
    perWeek: "2–3×",
    level: "All levels",
    goals: ["Mobility", "Athleticism", "Injury prevention"],
  },
];

/* ── Timetable ── */
export type Slot = { id: string; start: number; mins: number; name: string; cat: Cat; coach: string; days: number[]; cap: number };

const t = (h: number, m = 0) => h * 60 + m;
const ALL6 = [1, 2, 3, 4, 5, 6];
const MWF = [1, 3, 5];
const TTS = [2, 4, 6];

export const TIMETABLE: Slot[] = [
  { id: "s1", start: t(5, 30), mins: 60, name: "Barbell Basics", cat: "strength", coach: "Kabir", days: ALL6, cap: 12 },
  { id: "s2", start: t(6, 30), mins: 45, name: "Engine Builder", cat: "hiit", coach: "Tanya", days: MWF, cap: 16 },
  { id: "s3", start: t(6, 30), mins: 50, name: "Bag Work", cat: "boxing", coach: "Dev", days: TTS, cap: 14 },
  { id: "s4", start: t(7, 30), mins: 60, name: "Push / Pull / Legs", cat: "muscle", coach: "Kabir", days: ALL6, cap: 12 },
  { id: "s5", start: t(8, 30), mins: 45, name: "Kettlebell Flow", cat: "athletic", coach: "Meera", days: MWF, cap: 14 },
  { id: "s6", start: t(17), mins: 50, name: "Fight Fit", cat: "boxing", coach: "Dev", days: MWF, cap: 14 },
  { id: "s7", start: t(17), mins: 45, name: "Mobility Lab", cat: "athletic", coach: "Meera", days: TTS, cap: 12 },
  { id: "s8", start: t(18), mins: 60, name: "Strength Club", cat: "strength", coach: "Meera", days: ALL6, cap: 12 },
  { id: "s9", start: t(19), mins: 45, name: "HIIT Inferno", cat: "hiit", coach: "Tanya", days: ALL6, cap: 18 },
  { id: "s10", start: t(19, 30), mins: 60, name: "Hypertrophy Lab", cat: "muscle", coach: "Kabir", days: MWF, cap: 12 },
  { id: "s11", start: t(20, 30), mins: 50, name: "Pad Work", cat: "boxing", coach: "Dev", days: TTS, cap: 10 },
  { id: "s12", start: t(8), mins: 75, name: "Sunday Hyrox Sim", cat: "hiit", coach: "Tanya", days: [0], cap: 20 },
  { id: "s13", start: t(9, 30), mins: 60, name: "Open Strength", cat: "strength", coach: "Kabir", days: [0], cap: 12 },
];

/** Deterministic "booked" count so it looks alive but never changes between renders */
export const booked = (s: Slot, day: number) => Math.min(s.cap, Math.round(s.cap * (0.45 + (((s.start / 30 + day * 7 + s.cap) % 11) / 20))));

export const CAT_LABEL: Record<Cat, string> = { strength: "Strength", muscle: "Muscle", boxing: "Boxing", hiit: "Conditioning", athletic: "Athletic" };

/* ── Coaches ── */
export const COACHES = [
  { name: "Meera Iyer", role: "Head of Strength", img: `${IMG}/coach-meera.jpg`, pos: "50% 20%", years: 8, spec: ["Powerlifting", "Women's strength"], stat: "Deadlift 160 kg" },
  { name: "Kabir Singh", role: "Hypertrophy Coach", img: `${IMG}/coach-kabir.jpg`, pos: "40% 30%", years: 10, spec: ["Bodybuilding", "Nutrition"], stat: "300+ transformations" },
  { name: "Dev Malhotra", role: "Boxing Coach", img: `${IMG}/coach-dev.jpg`, pos: "50% 30%", years: 7, spec: ["Boxing", "Conditioning"], stat: "State-level boxer" },
  { name: "Tanya Rao", role: "Conditioning Coach", img: `${IMG}/coach-tanya.jpg`, pos: "50% 25%", years: 6, spec: ["HIIT", "Hyrox"], stat: "Hyrox finisher ×3" },
];

/* ── Transformations ── */
export const RESULTS = [
  {
    name: "Rohit, 29",
    before: `${IMG}/before-1.jpg`,
    after: `${IMG}/after-1.jpg`,
    weeks: 16,
    stats: [
      ["−14 kg", "body weight"],
      ["−9%", "body fat"],
      ["+40 kg", "deadlift"],
    ],
    program: "Strength + Conditioning",
    quote: "I used to skip the gym for weeks. The coaches here simply don't let you disappear.",
  },
  {
    name: "Aman, 34",
    before: `${IMG}/before-2.jpg`,
    after: `${IMG}/after-2.jpg`,
    weeks: 20,
    stats: [
      ["+6 kg", "lean muscle"],
      ["−5%", "body fat"],
      ["+25 kg", "bench press"],
    ],
    program: "Muscle Build",
    quote: "Finally a plan that works with dal-chawal, not against it. Best shape of my life at 34.",
  },
];

export const REVIEWS = [
  { name: "Ishaan Verma", text: "Proper coaching, proper equipment, zero nonsense. The 6 pm Strength Club is the best hour of my day.", tag: "Member 2 yrs" },
  { name: "Pooja Nair", text: "Joined for boxing, stayed for everything. Dev's pad work sessions are addictive.", tag: "Fight Fit" },
  { name: "Harsh Patel", text: "Clean, loud music, serious people. Lost 11 kg in 4 months with Tanya's conditioning classes.", tag: "−11 kg" },
];

/* ── Plans ── */
export const PLANS = [
  { id: "open", name: "Open Gym", price: 1799, tagline: "Train on your own", cta: "Start Open Gym" },
  { id: "pro", name: "Pro", price: 2799, tagline: "Gym + all classes", cta: "Start Pro", popular: true },
  { id: "elite", name: "Elite", price: 6499, tagline: "1-on-1 coaching", cta: "Start Elite" },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const COMPARE: { label: string; v: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: "Gym floor access, 5 am – 11 pm", v: [true, true, true] },
  { label: "Lockers & steam room", v: [true, true, true] },
  { label: "Body composition scan", v: ["Once", "Monthly", "Every 2 weeks"] },
  { label: "Group classes (40+ a week)", v: [false, true, true] },
  { label: "Personal diet plan", v: [false, true, true] },
  { label: "1-on-1 coach", v: [false, false, "12 sessions/mo"] },
  { label: "Progress tracking app", v: [false, true, true] },
  { label: "Guest passes", v: [false, "2 / month", "4 / month"] },
];

export const FAQ = [
  { q: "How does the free trial work?", a: "Pick any class on the timetable, message us on WhatsApp and show up. Your first session is free, with a coach." },
  { q: "I've never lifted before. Is IronPeak too hardcore?", a: "No. Most members start in Barbell Basics, where coaches teach every lift from zero. Hardcore is a vibe, not a requirement." },
  { q: "Can I freeze my membership?", a: "Yes. Freeze for up to 30 days a year on any plan, free of charge." },
  { q: "Are there discounts on longer plans?", a: "Yes. Pay for 6 months and get 1 free, or pay for 12 months and get 3 free." },
];

/* ── WhatsApp ── */
export const WA_TRIAL = "Hi IRONPEAK! 🔥\nI want to claim my FREE trial.\nName: Aditya\nInterested in: Strength Club, 6 pm\nWhen can I come in?";

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
