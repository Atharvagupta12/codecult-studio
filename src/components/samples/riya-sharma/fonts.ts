import { Caveat, Instrument_Serif, Outfit } from "next/font/google";

export const rsSans = Outfit({
  subsets: ["latin"],
  variable: "--rs-sans",
  display: "swap",
});

export const rsSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--rs-serif",
  display: "swap",
});

export const rsHand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--rs-hand",
  display: "swap",
});
