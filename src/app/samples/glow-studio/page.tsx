import type { Metadata } from "next";
import { GlowStudio } from "@/components/samples/glow-studio/GlowStudio";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: "Glow Studio · Hair, Skin & Bridal Salon in Indore | Sample by CodeCult Studio",
  description: "Sample salon website (Essential, ₹7,999) designed and built by CodeCult Studio.",
};

const TOUR: TourItem[] = [
  { id: "visit-builder", label: "Build your visit: prices + time add up live" },
  { id: "open", label: "Live open status + next free slot" },
  { id: "offers", label: "Offers banner" },
  { id: "before-after", label: "Before / after slider" },
  { id: "stylists", label: "Stylist profiles" },
  { id: "reviews", label: "Google reviews" },
  { id: "gallery", label: "Photo gallery" },
  { id: "call", label: "Tap to call" },
  { id: "map", label: "Google Maps + directions" },
  { id: "sticky", label: "Sticky book button on phones" },
];

export default function Page() {
  return (
    <DemoProvider sample={getSample("glow-studio")}>
      <GlowStudio />
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
