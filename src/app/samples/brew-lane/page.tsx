import type { Metadata } from "next";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { BrewLane } from "@/components/samples/brew-lane/BrewLane";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: "Brew Lane · Specialty Coffee in Vijay Nagar, Indore | Sample by CodeCult Studio",
  description: "Sample café website (Essential, ₹7,999) designed and built by CodeCult Studio.",
};

const TOUR: TourItem[] = [
  { id: "open", label: "Live open / closed status" },
  { id: "whatsapp", label: "Order on WhatsApp, message pre-typed" },
  { id: "menu", label: "Full menu with prices" },
  { id: "reviews", label: "Google reviews section" },
  { id: "gallery", label: "Photo gallery" },
  { id: "call", label: "Tap to call" },
  { id: "map", label: "Google Maps + directions" },
  { id: "sticky", label: "Sticky order button on phones" },
];

export default function Page() {
  const sample = getSample("brew-lane");
  return (
    <DemoProvider sample={sample}>
      <BrewLane />
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
