import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";

export const pfDisplay = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--pf-display",
  display: "swap",
});

export const pfBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--pf-body",
  display: "swap",
});
