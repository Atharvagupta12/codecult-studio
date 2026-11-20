import { Manrope, Playfair_Display } from "next/font/google";

export const emDisplay = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--em-display", display: "swap" });
export const emBody = Manrope({ subsets: ["latin"], variable: "--em-body", display: "swap" });
