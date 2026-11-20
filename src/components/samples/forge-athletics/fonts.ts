import { Inter_Tight, JetBrains_Mono, Syne } from "next/font/google";

export const fgDisplay = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--fg-display",
  display: "swap",
});

export const fgBody = Inter_Tight({
  subsets: ["latin"],
  variable: "--fg-body",
  display: "swap",
});

export const fgMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--fg-mono",
  display: "swap",
});
