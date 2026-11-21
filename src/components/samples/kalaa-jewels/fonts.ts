import { Cormorant_Garamond, Jost } from "next/font/google";

export const kjSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--kj-serif",
  display: "swap",
});

export const kjSans = Jost({
  subsets: ["latin"],
  variable: "--kj-sans",
  display: "swap",
});
