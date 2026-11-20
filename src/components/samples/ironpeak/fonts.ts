import { Anton, Archivo } from "next/font/google";

export const ipDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--ip-display",
  display: "swap",
});

export const ipBody = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--ip-body",
  display: "swap",
});
