import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";

export const amSans = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--am-sans",
  display: "swap",
});

export const amSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--am-serif",
  display: "swap",
});

export const amMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--am-mono",
  display: "swap",
});
