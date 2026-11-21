import { Bodoni_Moda, Figtree } from "next/font/google";

export const mbSerif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--mb-serif",
  display: "swap",
});

export const mbSans = Figtree({
  subsets: ["latin"],
  variable: "--mb-sans",
  display: "swap",
});
