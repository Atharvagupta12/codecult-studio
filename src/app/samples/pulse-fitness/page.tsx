import type { Metadata } from "next";
import { PulseFitness } from "@/components/samples/pulse-fitness/PulseFitness";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: "Pulse Fitness Club · Gym in Saket Nagar, Indore | Sample by CodeCult Studio",
  description: "Sample gym website (Essential, ₹7,999) designed and built by CodeCult Studio.",
};

const TOUR: TourItem[] = [
  { id: "trial", label: "Free-trial booking on WhatsApp" },
  { id: "open", label: "Live open / closed status" },
  { id: "batches", label: "Today's batches, shown automatically" },
  { id: "plans", label: "Plan picker with live prices" },
  { id: "trainers", label: "Trainer profiles" },
  { id: "reviews", label: "Google reviews" },
  { id: "gallery", label: "Photo gallery" },
  { id: "faq", label: "FAQ answers common questions" },
  { id: "call", label: "Tap to call" },
  { id: "map", label: "Google Maps + directions" },
  { id: "sticky", label: "Sticky trial button on phones" },
];

export default function Page() {
  return (
    <DemoProvider sample={getSample("pulse-fitness")}>
      <PulseFitness />
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
