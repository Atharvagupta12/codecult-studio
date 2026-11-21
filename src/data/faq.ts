import { SERVICES, TIERS } from "./samples";

/** Questions shown in the FAQ section (also published to Google as FAQ data). */
export const FAQS: [string, string][] = [
  [
    "I'm not technical at all. Can I still get a website?",
    "Absolutely, most of our clients aren't. You pick a design you like and send your details on WhatsApp. We handle the design, development, hosting and launch, and show you how everything works.",
  ],
  [
    "Can I change things in the sample design?",
    "Yes. Your name, logo, colours, photos, text, menu and prices are all customised for you, and small layout tweaks are fine. Bigger changes or new features are quoted separately, always before we start.",
  ],
  [
    "Is the domain included?",
    `No. The domain (like yourbusiness.in) is registered in your name so you always own it. You can buy it yourself, or we'll buy and connect it for you from ${SERVICES.domain}. The exact price depends on the name you choose.`,
  ],
  [
    "Do I have to pay anything every month?",
    "No. Hosting is free and there are no monthly fees from us. The only recurring cost is your domain's yearly renewal, which you pay to the domain company.",
  ],
  ["How do payments work?", "50% to start and 50% when your website goes live. UPI or bank transfer, whichever is easier for you."],
  [
    "How long does it take?",
    `Essential and Signature websites go live in ${TIERS.Essential.days} days, Premium in ${TIERS.Premium.days} days, counted from when we have all your details (logo, photos, content).`,
  ],
  [
    "What if I need changes after the website is live?",
    "Just message us on WhatsApp. Small text or photo updates are quick and affordable, and we'll always tell you the price before doing anything.",
  ],
  [
    "I already have Instagram. Why do I need a website?",
    "Instagram is great for people who already follow you. But new customers search Google for things like \"gym near me\", and Google shows websites and Maps listings. A website also builds trust and shows your menu, prices and location 24/7.",
  ],
  [
    "Do you only work with businesses in Indore?",
    "We're based in Indore, but we work with businesses across India. Everything happens over WhatsApp and calls, and if you're in Indore we're happy to meet in person.",
  ],
];
