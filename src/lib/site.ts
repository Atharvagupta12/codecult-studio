export const SITE = {
  name: "CodeCult Studio",
  whatsapp: "916262866192",
  instagram: "https://www.instagram.com/code_cult_/",
  instagramHandle: "@code_cult_",
  location: "Based in Indore · Working across India",
} as const;

/* ───────────────────────── WhatsApp messages ─────────────────────────
 * Every "Message us" button on the CodeCult site pre-types one of these.
 * One consistent, professional format: greeting → what they want → a short
 * checklist they can fill in → polite close. *text* renders bold in WhatsApp.
 */

const DETAILS = ["• Business name: ", "• City: ", "• Best time to call: "].join("\n");

function compose(interest: string, opts: { details?: boolean; closing?: string } = {}) {
  const { details = true, closing = "Could you please share the next steps? Thank you." } = opts;
  return ["Hello CodeCult Studio 👋", "", interest, ...(details ? ["", DETAILS] : []), "", closing].join("\n");
}

export const WA = {
  /** Generic enquiry (nav, footer, floating button) */
  general: () => compose("I visited your website and I'm interested in getting a *website for my business*."),
  /** A specific sample website */
  sample: (s: { name: string; kind: string; tier: string; price: string; days: number }) =>
    compose(`I'd like a website like *${s.name}* (${s.kind.toLowerCase()} design).\nPlan: *${s.tier}* · ${s.price} · live in ${s.days} days`),
  /** WhatsApp Business + Google profile setup */
  whatsappGoogle: (price: string) => compose(`I'm interested in the *WhatsApp Business + Google profile setup* (${price}).`),
  /** One of the add-on services */
  addon: (service: string, price: string) => compose(`I'm interested in *${service}* (from ${price}).`),
  /** Custom website */
  custom: () =>
    compose("I'd like to discuss a *custom website* for my business.", {
      closing: "Here's a short description of what I need:\n\nCould we schedule a quick call? Thank you.",
    }),
  /** Questions */
  question: (topic: string) => compose(`I have a question about ${topic}:`, { details: false, closing: "\n\nThank you." }),
};

export const DEFAULT_WA_MESSAGE = WA.general();

export function waLink(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
