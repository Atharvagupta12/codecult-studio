import { Geist, Geist_Mono } from "next/font/google";

export const krSans = Geist({
  subsets: ["latin"],
  variable: "--kr-sans",
  display: "swap",
});

export const krMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--kr-mono",
  display: "swap",
});
