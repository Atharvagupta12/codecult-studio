import { getSample, type SampleSite } from "./samples";

export type HeroNiche = {
  id: string;
  /** Word shown in the headline: "Bring your ___ online." */
  word: string;
  /** Short label for the picker */
  label: string;
  /** Colour of the headline word + glow on the dark hero */
  tint: string;
  glow: string;
  sample: SampleSite;
};

export const HERO_NICHES: HeroNiche[] = [
  { id: "cafe", word: "café", label: "Café", tint: "#F2AE6B", glow: "#C8692A", sample: getSample("brew-lane") },
  { id: "gym", word: "gym", label: "Gym", tint: "#E5FF3D", glow: "#7E9600", sample: getSample("ironpeak") },
  { id: "salon", word: "salon", label: "Salon", tint: "#FF9DB2", glow: "#B8445E", sample: getSample("glow-studio") },
  { id: "portfolio", word: "portfolio", label: "Portfolio", tint: "#A9B8FF", glow: "#3E4FD6", sample: getSample("aarav-mehta") },
  { id: "boutique", word: "boutique", label: "Jewellery", tint: "#E8C46A", glow: "#9C7424", sample: getSample("kalaa-jewels") },
];
