import type { Metadata } from "next";
import { ADDRESS } from "@/components/samples/forge-athletics/data";
import { ForgeShell } from "@/components/samples/forge-athletics/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";
import { sampleMetadata } from "@/lib/seo";

export const metadata: Metadata = sampleMetadata(getSample("forge-athletics"), { default: "FORGE Athletics · Strength & Conditioning Studio, Indore | Sample by CodeCult Studio", template: "%s · FORGE Athletics | Sample by CodeCult Studio" });

const B = "/samples/forge-athletics";
const TOUR: TourItem[] = [
  { id: "pages", label: "6-page website with page transitions" },
  { id: "booking", label: "Multi-step free-trial booking", href: `${B}/trial` },
  { id: "quiz", label: "Goal quiz that recommends a program + plan", href: `${B}/membership` },
  { id: "method", label: "Scroll story: The Forge Method", href: B },
  { id: "program-detail", label: "Program pages with weekly plans", href: `${B}/programs` },
  { id: "coach-profiles", label: "Coach profiles with full bios", href: `${B}/coaches` },
  { id: "charts", label: "Case studies with animated progress charts", href: `${B}/results` },
  { id: "plans", label: "Membership plans", href: `${B}/membership` },
  { id: "open", label: "Live open / closed status", href: B },
  { label: "Custom cursor, page curtain & premium motion" },
  { label: "SEO setup: page titles + Google gym data" },
];

/** Google "ExerciseGym" structured data — part of the Premium SEO setup */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "FORGE Athletics",
  description: "Coach-led strength and conditioning studio in Indore.",
  priceRange: "₹₹₹",
  address: { "@type": "PostalAddress", streetAddress: ADDRESS, addressLocality: "Indore", addressRegion: "MP", addressCountry: "IN" },
  openingHours: ["Mo-Sa 06:00-22:00", "Su 08:00-12:00"],
};

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("forge-athletics")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ForgeShell>{children}</ForgeShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
