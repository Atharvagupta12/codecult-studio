import { Bricolage_Grotesque, Caveat, Gloock, Yatra_One } from "next/font/google";

export const kcDisplay = Gloock({ subsets: ["latin"], weight: "400", variable: "--kc-display", display: "swap" });
export const kcBody = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth", "opsz"], variable: "--kc-body", display: "swap" });
export const kcHindi = Yatra_One({ subsets: ["devanagari"], weight: "400", variable: "--kc-hindi", display: "swap" });
export const kcHand = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--kc-hand", display: "swap" });
