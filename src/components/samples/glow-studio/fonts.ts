import { DM_Sans, DM_Serif_Display } from "next/font/google";

export const gsSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--gs-serif",
  display: "swap",
});

export const gsSans = DM_Sans({
  subsets: ["latin"],
  variable: "--gs-sans",
  display: "swap",
});
