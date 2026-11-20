export const SITE = {
  name: "CodeCult Studio",
  whatsapp: "916262866192",
  instagram: "https://www.instagram.com/code_cult_/",
  instagramHandle: "@code_cult_",
  location: "Based in Indore · Working across India",
} as const;

export const DEFAULT_WA_MESSAGE =
  "Hi CodeCult Studio! I'd like to know more about getting a website for my business.";

export function waLink(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
