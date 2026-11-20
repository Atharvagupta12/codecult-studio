/* ── Brand ── */
export const KR = {
  bg: "#0B0F14",
  panel: "#11161D",
  panel2: "#161C24",
  line: "rgba(230,237,243,0.1)",
  text: "#E6EDF3",
  mute: "#8B949E",
  green: "#3FB950",
  blue: "#58A6FF",
  purple: "#BC8CFF",
  orange: "#F78166",
  yellow: "#F2CC60",
};

export const BASE = "/samples/kabir-rao";
export const EMAIL = "hi@kabirrao.dev";
const IMG = "/images/kabir-rao";

export const PAGES = [
  { href: BASE, label: "home", path: "~" },
  { href: `${BASE}/projects`, label: "projects", path: "~/projects" },
  { href: `${BASE}/experience`, label: "experience", path: "~/experience" },
  { href: `${BASE}/contact`, label: "contact", path: "~/contact" },
];

export const PHOTO = `${IMG}/kabir.jpg`;
export const PHOTO_2 = `${IMG}/kabir-2.jpg`;
export const DESK = `${IMG}/desk.jpg`;

/* ── Projects ── */
export type MockKind = "fintech" | "commerce" | "chat" | "mobile" | "analytics" | "devtool";
export type Stack = "React" | "Next.js" | "Node" | "TypeScript" | "AWS" | "React Native" | "Python" | "PostgreSQL" | "Redis" | "AI";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: number;
  role: string;
  timeline: string;
  team: string;
  kind: MockKind;
  accent: string;
  stack: Stack[];
  metrics: [string, string][];
  problem: string;
  approach: string[];
  code: { file: string; lines: string[] };
  architecture: string[];
  featured?: boolean;
  openSource?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "paylo",
    name: "Paylo",
    tagline: "UPI payments & reconciliation dashboard for small businesses",
    year: 2025,
    role: "Lead full-stack engineer",
    timeline: "5 months",
    team: "4 engineers, 1 designer",
    kind: "fintech",
    accent: KR.green,
    stack: ["Next.js", "TypeScript", "Node", "PostgreSQL", "AWS"],
    metrics: [
      ["₹40 Cr", "processed every month"],
      ["−60%", "time spent on reconciliation"],
      ["99.98%", "uptime in 2025"],
    ],
    problem: "Small businesses were matching thousands of UPI payments to invoices by hand in Excel, losing hours every week and missing failed payments.",
    approach: [
      "Built a webhook ingestion service that normalises payments from 3 gateways into one ledger.",
      "Wrote a matching engine that pairs payments to invoices with 97% accuracy and flags the rest.",
      "Designed a real-time dashboard with Next.js server components and streaming.",
    ],
    code: {
      file: "matcher.ts",
      lines: [
        "export async function reconcile(payment: Payment) {",
        "  const invoice = await db.invoice.findFirst({",
        "    where: { amount: payment.amount, status: 'open' },",
        "  });",
        "  if (!invoice) return flag(payment, 'unmatched');",
        "  return settle(invoice, payment); // ✓ matched",
        "}",
      ],
    },
    architecture: ["UPI gateways", "Webhook queue (SQS)", "Matcher service", "Postgres ledger", "Next.js dashboard"],
    featured: true,
  },
  {
    slug: "cartly",
    name: "Cartly",
    tagline: "Headless storefront that made a D2C brand 3× faster",
    year: 2024,
    role: "Frontend lead",
    timeline: "3 months",
    team: "2 engineers",
    kind: "commerce",
    accent: KR.orange,
    stack: ["Next.js", "React", "TypeScript", "Redis"],
    metrics: [
      ["0.4s", "largest paint (was 3.1s)"],
      ["+18%", "conversion rate"],
      ["100", "Lighthouse performance"],
    ],
    problem: "A fast-growing clothing brand's store took over 3 seconds to load on Indian 4G, and shoppers were leaving before the page appeared.",
    approach: [
      "Moved the store to a headless Next.js frontend with edge caching.",
      "Pre-rendered every product page and streamed personalised blocks.",
      "Rebuilt the cart and checkout as a single, instant drawer.",
    ],
    code: {
      file: "product/[slug]/page.tsx",
      lines: [
        "export default async function Product({ params }) {",
        "  const { slug } = await params;",
        "  const product = await getProduct(slug); // cached at the edge",
        "  return <ProductView product={product} />;",
        "}",
      ],
    },
    architecture: ["Shopify API", "Redis cache", "Next.js on the edge", "CDN", "Shoppers"],
    featured: true,
  },
  {
    slug: "askdoc",
    name: "AskDoc",
    tagline: "AI assistant that answers questions from clinic records",
    year: 2025,
    role: "Full-stack + AI engineer",
    timeline: "4 months",
    team: "3 engineers",
    kind: "chat",
    accent: KR.purple,
    stack: ["React", "Python", "AI", "PostgreSQL"],
    metrics: [
      ["8k", "questions answered daily"],
      ["2 min", "saved per patient visit"],
      ["0", "patient data leaves India"],
    ],
    problem: "Doctors at a clinic chain spent minutes scrolling through old PDFs and notes before every consultation.",
    approach: [
      "Indexed 2 lakh documents into a private vector search hosted in India.",
      "Built a chat interface that always cites the exact page it answered from.",
      "Added role-based access so staff only see what they're allowed to.",
    ],
    code: {
      file: "answer.py",
      lines: [
        "def answer(question: str, patient_id: str):",
        "    docs = search(question, filter={'patient': patient_id}, k=5)",
        "    reply = llm.generate(question, context=docs)",
        "    return {'reply': reply, 'sources': [d.page for d in docs]}",
      ],
    },
    architecture: ["Clinic PDFs", "Text extraction", "Vector index", "LLM + citations", "Chat app"],
    featured: true,
  },
  {
    slug: "trackr",
    name: "Trackr",
    tagline: "Live fleet tracking app for a logistics company",
    year: 2024,
    role: "Mobile + backend engineer",
    timeline: "4 months",
    team: "3 engineers",
    kind: "mobile",
    accent: KR.blue,
    stack: ["React Native", "Node", "AWS", "Redis"],
    metrics: [
      ["2,000", "trucks tracked live"],
      ["−22%", "fuel costs"],
      ["4.7★", "driver app rating"],
    ],
    problem: "Dispatchers were calling drivers every hour to ask where they were.",
    approach: [
      "Built a battery-friendly React Native driver app that streams GPS every 15 seconds.",
      "Created a live map dashboard with route deviation alerts.",
      "Added offline mode for highways with poor network.",
    ],
    code: {
      file: "useLiveLocation.ts",
      lines: [
        "export function useLiveLocation(truckId: string) {",
        "  return useSubscription(`trucks/${truckId}`, {",
        "    throttle: 15_000, // battery friendly",
        "  });",
        "}",
      ],
    },
    architecture: ["Driver app", "MQTT broker", "Location service", "Redis geo index", "Dispatch map"],
  },
  {
    slug: "pulseboard",
    name: "Pulseboard",
    tagline: "Real-time product analytics for a SaaS startup",
    year: 2023,
    role: "Full-stack engineer",
    timeline: "6 months",
    team: "5 engineers",
    kind: "analytics",
    accent: KR.yellow,
    stack: ["React", "Node", "TypeScript", "AWS"],
    metrics: [
      ["50M", "events a day"],
      ["<1s", "dashboard refresh"],
      ["−40%", "infra cost"],
    ],
    problem: "The team's analytics dashboards were hours behind and cost more every month.",
    approach: ["Streamed events through a lightweight queue into a columnar store.", "Built live charts with WebSockets and virtualised tables.", "Cut costs by batching and compressing old data."],
    code: {
      file: "stream.ts",
      lines: ["socket.on('event', (e) => {", "  buffer.push(e);", "  if (buffer.length > 500) flush(buffer.splice(0));", "});"],
    },
    architecture: ["SDK", "Event queue", "Columnar store", "WebSocket API", "Live dashboard"],
  },
  {
    slug: "snip",
    name: "snip",
    tagline: "Open-source CLI to save and share code snippets",
    year: 2023,
    role: "Creator & maintainer",
    timeline: "Ongoing",
    team: "Solo + 14 contributors",
    kind: "devtool",
    accent: KR.green,
    stack: ["TypeScript", "Node"],
    metrics: [
      ["1.2k", "GitHub stars"],
      ["14", "contributors"],
      ["9k", "npm downloads / month"],
    ],
    problem: "I kept losing useful snippets across notes, Slack and old projects.",
    approach: ["Built a tiny CLI that saves snippets with tags from any terminal.", "Added fuzzy search and one-command sharing as a gist.", "Wrote docs good enough that 14 people started contributing."],
    code: {
      file: "terminal",
      lines: ["$ npx snip save debounce --tag react", "✓ saved 'debounce' (react)", "$ snip find deb", "→ debounce.ts  react  2 days ago"],
    },
    architecture: ["CLI", "Local store", "Fuzzy search", "Gist sync"],
    openSource: true,
  },
];

export const STACK_FILTERS: ("All" | Stack)[] = ["All", "Next.js", "React", "Node", "React Native", "AI", "AWS"];

/* ── Experience ── */
export const JOBS = [
  {
    when: "2024 — now",
    role: "Senior Full-stack Engineer",
    org: "Finlo · fintech startup, Bengaluru (remote)",
    points: ["Lead a team of 4 building payment products used by 12,000 businesses.", "Cut API response times by 70% with caching and query tuning.", "Set up the testing and CI pipeline the whole team now uses."],
    stack: ["Next.js", "Node", "PostgreSQL", "AWS"],
  },
  {
    when: "2022 — 2024",
    role: "Full-stack Engineer",
    org: "Swiftcart · e-commerce platform, Pune",
    points: ["Shipped the headless storefront that powers 40+ D2C brands.", "Built the real-time order tracking system.", "Mentored 3 junior developers."],
    stack: ["React", "Node", "Redis"],
  },
  {
    when: "2021 — 2022",
    role: "Freelance Developer",
    org: "Clients across India, UAE and the UK",
    points: ["Delivered 15+ websites and apps for startups and local businesses.", "Built my first React Native app, used by 10k people."],
    stack: ["React", "React Native", "Firebase"],
  },
  {
    when: "2017 — 2021",
    role: "B.Tech, Computer Science",
    org: "Engineering college, Indore",
    points: ["Winner, national-level hackathon 2019.", "Led the college coding club with 300+ members."],
    stack: ["C++", "Java", "Python"],
  },
];

export const SKILLS: { group: string; items: [string, number][] }[] = [
  { group: "Frontend", items: [["React / Next.js", 95], ["TypeScript", 92], ["Tailwind / CSS", 90], ["Animation (Motion)", 80]] },
  { group: "Backend", items: [["Node.js", 92], ["PostgreSQL", 85], ["Redis", 78], ["Python", 70]] },
  { group: "Cloud & tools", items: [["AWS", 82], ["Docker", 80], ["CI / CD", 85], ["Testing", 84]] },
];

export const ACHIEVEMENTS = [
  ["AWS Certified Developer", "Associate, 2024"],
  ["1.2k ★ on GitHub", "for snip, my open-source CLI"],
  ["Hackathon winner", "National level, 2019"],
  ["Speaker", "ReactIndia meetup, Indore 2025"],
];

export const TESTIMONIALS = [
  { name: "Ritika Sharma", role: "CTO, Finlo", text: "Kabir is the engineer you give the scary problem to. He ships it, documents it and makes the team better on the way." },
  { name: "Daniel Okafor", role: "Founder, Cartly client (UK)", text: "Our store went from slow to instant. Clear communication, zero drama, delivered a week early." },
];

/* ── Contact ── */
export const PROJECT_TYPES = ["Website", "Web app / SaaS", "Mobile app", "Full-time role", "Something else"];
export const BUDGETS = ["< ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹5L", "₹5L+"];
