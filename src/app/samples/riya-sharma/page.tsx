import type { Metadata } from "next";
import { RiyaSharma } from "@/components/samples/riya-sharma/RiyaSharma";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";
import { sampleMetadata } from "@/lib/seo";

export const metadata: Metadata = sampleMetadata(getSample("riya-sharma"), "Riya Sharma · Brand & UI Designer, Indore | Sample by CodeCult Studio");

const TOUR: TourItem[] = [
  { id: "work", label: "Project gallery → click for case studies" },
  { id: "filters", label: "Project filters" },
  { id: "stickers", label: "Playful drag-able stickers" },
  { id: "services", label: "Services with starting prices" },
  { id: "testimonials", label: "Client testimonials" },
  { id: "contact", label: "Contact form that sends to WhatsApp" },
  { id: "copy-email", label: "Copy email in one tap" },
  { id: "sticky", label: "Sticky contact button on phones" },
];

export default function Page() {
  return (
    <DemoProvider sample={getSample("riya-sharma")}>
      <RiyaSharma />
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
