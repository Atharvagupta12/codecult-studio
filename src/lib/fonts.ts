import {
  Anton,
  Bodoni_Moda,
  Bricolage_Grotesque,
  Cormorant_Garamond,
  DM_Serif_Display,
  Fraunces,
  Geist,
  Geist_Mono,
  Gloock,
  Instrument_Serif,
  Outfit,
  Playfair_Display,
  Syne,
  Unbounded,
} from "next/font/google";

/* ── CodeCult brand fonts ── */
export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/* ── Fonts used inside the sample-site previews (not preloaded) ── */
export const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "800"], style: ["normal", "italic"], preload: false, display: "swap" });
export const anton = Anton({ subsets: ["latin"], weight: "400", preload: false, display: "swap" });
export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "800"], preload: false, display: "swap" });
export const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], preload: false, display: "swap" });
export const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], preload: false, display: "swap" });
export const gloock = Gloock({ subsets: ["latin"], weight: "400", preload: false, display: "swap" });
export const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"], style: ["normal", "italic"], preload: false, display: "swap" });
export const unbounded = Unbounded({ subsets: ["latin"], weight: ["500", "800"], preload: false, display: "swap" });
export const syne = Syne({ subsets: ["latin"], weight: ["600", "800"], preload: false, display: "swap" });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700"], style: ["normal", "italic"], preload: false, display: "swap" });
export const outfit = Outfit({ subsets: ["latin"], weight: ["500", "800"], preload: false, display: "swap" });
