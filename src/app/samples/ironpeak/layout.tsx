import type { Metadata } from "next";
import { IronpeakShell } from "@/components/samples/ironpeak/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: { default: "IRONPEAK · Strength Club in Vijay Nagar, Indore | Sample by CodeCult Studio", template: "%s · IRONPEAK | Sample by CodeCult Studio" },
  description: "Sample gym website (Signature, ₹9,999) designed and built by CodeCult Studio.",
};

const B = "/samples/ironpeak";
const TOUR: TourItem[] = [
  { id: "pages", label: "4-page website (Home, Programs, Results, Plans)" },
  { id: "trial", label: "Free-trial booking on WhatsApp", href: B },
  { id: "today", label: "Today's classes, updated live", href: B },
  { id: "programs", label: "Programs with hover previews", href: B },
  { id: "before-after", label: "Drag-to-compare transformations", href: B },
  { id: "timetable", label: "Weekly timetable with filters + reserve", href: `${B}/programs` },
  { id: "program-cards", label: "Program details (stacking cards)", href: `${B}/programs` },
  { id: "transformations", label: "Before / after sliders", href: `${B}/results` },
  { id: "coaches", label: "Coach profiles", href: `${B}/results` },
  { id: "bmi", label: "BMI calculator that suggests a program", href: `${B}/plans` },
  { id: "compare", label: "Plans + comparison table", href: `${B}/plans` },
  { label: "Page transitions + scroll animations" },
];

export default function IronpeakLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("ironpeak")}>
      <IronpeakShell>{children}</IronpeakShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
