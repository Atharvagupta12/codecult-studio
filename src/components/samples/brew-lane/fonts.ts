import { DM_Sans, Fraunces } from "next/font/google";

export const blDisplay = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--bl-display",
  display: "swap",
});

export const blBody = DM_Sans({
  subsets: ["latin"],
  variable: "--bl-body",
  display: "swap",
});
