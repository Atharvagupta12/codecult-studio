import type { Metadata } from "next";
import { AaravShell } from "@/components/samples/aarav-mehta/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";
import { sampleMetadata } from "@/lib/seo";

export const metadata: Metadata = sampleMetadata(getSample("aarav-mehta"), { default: "Aarav Mehta · Wedding Photographer in Indore | Sample by CodeCult Studio", template: "%s · Aarav Mehta Photography | Sample by CodeCult Studio" });

const B = "/samples/aarav-mehta";
const TOUR: TourItem[] = [
  { id: "pages", label: "6-page website + story pages" },
  { id: "hero-slideshow", label: "Full-screen story slideshow", href: B },
  { id: "stories", label: "Wedding story pages", href: B },
  { id: "drag-gallery", label: "Drag-to-explore gallery", href: B },
  { id: "lightbox", label: "Full-screen photo viewer", href: `${B}/portfolio` },
  { id: "filters", label: "Gallery filters", href: `${B}/portfolio` },
  { id: "story-chapters", label: "Magazine-style story chapters", href: `${B}/stories/ishita-rohan` },
  { id: "film-player", label: "Cinematic film player", href: `${B}/films` },
  { id: "estimator", label: "Live price estimator", href: `${B}/packages` },
  { id: "date-check", label: "Live date-check booking flow", href: `${B}/book` },
  { label: "Viewfinder cursor, shutter page transitions" },
  { label: "SEO setup: page titles + Google photographer data" },
];

/** Google "ProfessionalService" structured data — part of the Premium SEO setup */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aarav Mehta Photography",
  description: "Wedding, pre-wedding and portrait photographer based in Indore, shooting across India.",
  priceRange: "₹₹₹",
  areaServed: "India",
  address: { "@type": "PostalAddress", addressLocality: "Indore", addressRegion: "MP", addressCountry: "IN" },
};

export default function AaravLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("aarav-mehta")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AaravShell>{children}</AaravShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
