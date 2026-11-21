import type { Metadata } from "next";
import { MehrShell } from "@/components/samples/mehr-bridal/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: { default: "Mehr · Bridal Makeup Artist in Indore | Sample by CodeCult Studio", template: "%s · Mehr Bridal | Sample by CodeCult Studio" },
  description: "Sample bridal makeup artist website (Premium, ₹12,999) designed and built by CodeCult Studio.",
};

const B = "/samples/mehr-bridal";
const TOUR: TourItem[] = [
  { id: "pages", label: "6-page website with silk transitions" },
  { id: "experience", label: "Scroll story: the Mehr experience", href: B },
  { id: "look-quiz", label: "Find-your-look quiz", href: `${B}/looks` },
  { id: "styles", label: "Filter looks by style", href: `${B}/portfolio` },
  { id: "viewer", label: "Full-screen look viewer", href: `${B}/portfolio` },
  { id: "packages", label: "Bridal packages", href: `${B}/packages` },
  { id: "price-builder", label: "Live bridal price builder", href: `${B}/packages` },
  { id: "courses", label: "Academy courses with seats left", href: `${B}/academy` },
  { id: "date-check", label: "Live date-check booking", href: `${B}/book` },
  { label: "Falling petals, rose-gold cursor, premium motion" },
  { label: "SEO setup: page titles + Google beauty-salon data" },
];

/** Google "BeautySalon" structured data — part of the Premium SEO setup */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Mehr Bridal Studio",
  description: "Bridal, engagement and reception makeup artist in Indore.",
  priceRange: "₹₹₹",
  address: { "@type": "PostalAddress", streetAddress: "Apollo Square, Race Course Road", addressLocality: "Indore", addressRegion: "MP", addressCountry: "IN" },
};

export default function MehrLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("mehr-bridal")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MehrShell>{children}</MehrShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
