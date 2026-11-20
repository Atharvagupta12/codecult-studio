import type { WeekHours } from "../shared/useOpenStatus";

/* ── Brand ── */
export const PF = {
  bg: "#F4F6FF",
  paper: "#FFFFFF",
  ink: "#0B1030",
  mute: "#5A6285",
  blue: "#3A5BFF",
  blueDeep: "#2238D8",
  sky: "#DCE3FF",
  sun: "#FFD23F",
  coral: "#FF6B5A",
  mint: "#2BD99F",
  line: "rgba(11,16,48,0.1)",
};

const IMG = "/images/pulse-fitness";

/* ── Place ── */
export const ADDRESS = "2nd floor, 58 Saket Nagar, near Saket Square, Indore 452018";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Saket+Nagar+Indore";
export const MAP_EMBED = "https://www.google.com/maps?q=Saket+Nagar,+Indore&z=15&output=embed";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Mon–Sat 5 am – 11 pm, Sunday 6 am – noon */
export const HOURS: WeekHours = [
  [6 * 60, 12 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
  [5 * 60, 23 * 60],
];

/* ── Classes ── */
export type ClassId = "strength" | "zumba" | "yoga" | "hiit" | "functional";

export const CLASSES: { id: ClassId; name: string; blurb: string; img: string; pos?: string; mins: number; burn: string; level: 1 | 2 | 3; color: string }[] = [
  { id: "strength", name: "Strength", blurb: "Learn the big lifts the right way, with a coach watching every rep.", img: `${IMG}/strength.jpg`, mins: 60, burn: "350–500", level: 2, color: PF.blue },
  { id: "zumba", name: "Zumba", blurb: "Bollywood, Latin and pure fun. You'll forget it's a workout.", img: `${IMG}/zumba.jpg`, mins: 50, burn: "400–600", level: 1, color: PF.coral },
  { id: "yoga", name: "Power Yoga", blurb: "Mobility, breath and a strong core. Perfect after a long workday.", img: `${IMG}/yoga.jpg`, mins: 60, burn: "200–350", level: 1, color: PF.mint },
  { id: "hiit", name: "HIIT Blast", blurb: "45 minutes of sweat-dripping intervals. Short, sharp, addictive.", img: `${IMG}/hiit.jpg`, pos: "50% 40%", mins: 45, burn: "500–750", level: 3, color: PF.sun },
  { id: "functional", name: "Functional", blurb: "Kettlebells, ropes and bodyweight moves for everyday strength.", img: `${IMG}/kettlebell.jpg`, mins: 50, burn: "400–600", level: 2, color: PF.blueDeep },
];

/* ── Batches ── */
export type Batch = { start: number; end: number; name: string; cls: ClassId; coach: string; days: number[]; ladies?: boolean };

const h = (hh: number, mm = 0) => hh * 60 + mm;
const WEEK = [1, 2, 3, 4, 5, 6];
const MWF = [1, 3, 5];
const TTS = [2, 4, 6];

export const BATCHES: Batch[] = [
  { start: h(5, 30), end: h(6, 30), name: "Morning Strength", cls: "strength", coach: "Vikram", days: WEEK },
  { start: h(6, 30), end: h(7, 30), name: "Power Yoga", cls: "yoga", coach: "Sneha", days: MWF },
  { start: h(6, 30), end: h(7, 30), name: "HIIT Blast", cls: "hiit", coach: "Imran", days: TTS },
  { start: h(7), end: h(8), name: "Ladies Strength", cls: "strength", coach: "Sneha", days: WEEK, ladies: true },
  { start: h(17), end: h(18), name: "Ladies Zumba", cls: "zumba", coach: "Sneha", days: WEEK, ladies: true },
  { start: h(18), end: h(19), name: "Zumba", cls: "zumba", coach: "Sneha", days: MWF },
  { start: h(18), end: h(19), name: "Functional Circuit", cls: "functional", coach: "Imran", days: TTS },
  { start: h(19), end: h(20), name: "Evening Strength", cls: "strength", coach: "Vikram", days: WEEK },
  { start: h(20), end: h(21), name: "HIIT Blast", cls: "hiit", coach: "Imran", days: MWF },
  { start: h(20), end: h(21), name: "Core & Abs", cls: "functional", coach: "Vikram", days: TTS },
  // Sunday
  { start: h(7), end: h(8), name: "Sunday Zumba Party", cls: "zumba", coach: "Sneha", days: [0] },
  { start: h(8, 30), end: h(9, 30), name: "Yoga & Stretch", cls: "yoga", coach: "Sneha", days: [0] },
  { start: h(10), end: h(11), name: "Bootcamp", cls: "functional", coach: "Imran", days: [0] },
];

/* ── Plans ── */
export const DURATIONS = [1, 3, 6, 12] as const;
export type Months = (typeof DURATIONS)[number];

export type Plan = { id: string; name: string; tagline: string; prices: Record<Months, number>; features: string[]; popular?: boolean };

export const PLANS: Plan[] = [
  {
    id: "floor",
    name: "Gym Floor",
    tagline: "For self-starters",
    prices: { 1: 1499, 3: 3999, 6: 6999, 12: 11999 },
    features: ["Full gym + cardio zone", "Lockers & showers", "Free fitness assessment", "Floor trainers to guide you"],
  },
  {
    id: "plus",
    name: "Gym + Classes",
    tagline: "Most loved by members",
    prices: { 1: 1999, 3: 5499, 6: 9999, 12: 16999 },
    features: ["Everything in Gym Floor", "Unlimited Zumba, Yoga & HIIT", "Monthly diet plan", "Monthly body-fat check"],
    popular: true,
  },
  {
    id: "pt",
    name: "Personal Training",
    tagline: "Fastest results",
    prices: { 1: 5999, 3: 16499, 6: 30999, 12: 56999 },
    features: ["Everything in Gym + Classes", "1-on-1 coach, 12 sessions a month", "Custom workout & diet", "Weekly progress tracking"],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── Trainers ── */
export const TRAINERS = [
  {
    name: "Vikram Joshi",
    role: "Head coach · Strength & fat loss",
    years: 9,
    certs: ["ACE certified", "K11 Sports"],
    quote: "Show up three times a week and I'll handle the rest.",
    img: `${IMG}/trainer-vikram.jpg`,
    pos: "50% 25%",
  },
  {
    name: "Sneha Rathore",
    role: "Zumba, yoga & ladies batch",
    years: 6,
    certs: ["Zumba licensed", "RYT 200 yoga"],
    quote: "Fitness should feel like the best hour of your day.",
    img: `${IMG}/trainer-sneha.jpg`,
    pos: "35% 30%",
  },
  {
    name: "Imran Sheikh",
    role: "HIIT & functional training",
    years: 7,
    certs: ["ISSA certified", "Functional L1"],
    quote: "Strong enough for real life: stairs, kids, groceries.",
    img: `${IMG}/trainer-imran.jpg`,
    pos: "50% 8%",
  },
];

/* ── Reviews ── */
export const REVIEWS = [
  { name: "Neha Agrawal", when: "3 weeks ago", tag: "−11 kg in 5 months", text: "Lost 11 kg and finally enjoy working out. Sneha's ladies batch is the best part of my morning." },
  { name: "Arpit Jain", when: "1 month ago", tag: "Total beginner", text: "I walked in not knowing how to use a single machine. Vikram sir made a plan for me on day one. Zero judgement." },
  { name: "Sakshi Verma", when: "2 months ago", tag: "Zumba regular", text: "Clean, bright and never crowded. The evening Zumba is so much fun that I've dragged three friends along." },
  { name: "Rohan Patidar", when: "1 week ago", tag: "5 am club", text: "Best gym in Saket Nagar. Equipment is always clean and the trainers actually correct your form." },
];

/* ── Gallery ── */
export const GALLERY = [
  { src: `${IMG}/interior.jpg`, alt: "Bright cardio zone with big windows" },
  { src: `${IMG}/high-five.jpg`, alt: "Members high-fiving after class" },
  { src: `${IMG}/dance.jpg`, alt: "Zumba class having fun" },
  { src: `${IMG}/sunlit.jpg`, alt: "Strength floor in morning light" },
  { src: `${IMG}/friends.jpg`, alt: "Friends after a workout" },
  { src: `${IMG}/group.jpg`, alt: "Group dumbbell class" },
  { src: `${IMG}/pushup.jpg`, alt: "Trainer spotting a member" },
];

/* ── FAQ ── */
export const FAQ = [
  { q: "Is the first session really free?", a: "Yes. Book on WhatsApp, come in, train with a coach and take a full tour. No payment, no pressure." },
  { q: "I'm a complete beginner. Is that okay?", a: "Most of our members started as beginners. Every new member gets a free fitness assessment and a plan made for them." },
  { q: "Do you have ladies-only batches?", a: "Yes. 7 – 8 am (strength) and 5 – 6 pm (Zumba), Monday to Saturday, with a female trainer." },
  { q: "Can I pause my membership?", a: "Yes. Pause for up to 15 days on 3-month plans and up to 30 days on 6 and 12-month plans." },
  { q: "Is there parking?", a: "Free two-wheeler and car parking right below the gym." },
];

/* ── WhatsApp messages ── */
export const WA_TRIAL = "Hi Pulse! 👋\nI'd like to book my FREE trial session.\nName: Riya\nPreferred time: Evening, 6 pm\nGoal: Lose weight";

export const joinMessage = (plan: Plan, months: Months) =>
  `Hi Pulse! 💪\nI'd like to join the ${plan.name} plan for ${months} ${months === 1 ? "month" : "months"} (${inr(plan.prices[months])}).\nWhen can I start?`;
