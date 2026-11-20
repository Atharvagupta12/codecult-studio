import type { Metadata } from "next";
import { EmberShell } from "@/components/samples/ember/Shell";
import { ADDRESS } from "@/components/samples/ember/data";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: { default: "Ember · Modern Indian Fine Dining, Indore | Sample by CodeCult Studio", template: "%s · Ember | Sample by CodeCult Studio" },
  description: "Sample fine-dining restaurant website (Premium, ₹12,999) designed and built by CodeCult Studio.",
};

const B = "/samples/ember-bistro";
const TOUR: TourItem[] = [
  { id: "pages", label: "6-page website with page transitions" },
  { id: "cart", label: "Online order cart → WhatsApp", href: `${B}/order` },
  { id: "booking", label: "Table booking flow", href: `${B}/reserve` },
  { id: "signatures", label: "Cinematic scroll gallery", href: B },
  { id: "hover-menu", label: "Menu with hover dish previews", href: `${B}/menu` },
  { id: "filters", label: "Dietary filters", href: `${B}/menu` },
  { id: "events", label: "Event listings with seat booking", href: `${B}/events` },
  { id: "private-dining", label: "Private dining enquiry form", href: `${B}/events` },
  { id: "open", label: "Live open / closed status", href: B },
  { id: "reviews", label: "Guest reviews", href: B },
  { label: "Custom cursor, intro curtain & smooth motion" },
  { label: "SEO setup: page titles + Google restaurant data" },
];

/** Google "Restaurant" structured data — part of the Premium SEO setup */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Ember Modern Indian",
  servesCuisine: ["Indian", "Modern Indian"],
  priceRange: "₹₹₹",
  address: { "@type": "PostalAddress", streetAddress: ADDRESS, addressLocality: "Indore", addressRegion: "MP", addressCountry: "IN" },
  openingHours: ["Tu-Th 19:00-23:30", "Fr-Su 19:00-24:00"],
  acceptsReservations: true,
};

export default function EmberLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("ember-bistro")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EmberShell>{children}</EmberShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
