import type { Metadata } from "next";
import { KalaaShell } from "@/components/samples/kalaa-jewels/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";
import { sampleMetadata } from "@/lib/seo";

export const metadata: Metadata = sampleMetadata(getSample("kalaa-jewels"), { default: "Kalaa Jewels · Handcrafted Jewellery in Indore | Sample by CodeCult Studio", template: "%s · Kalaa Jewels | Sample by CodeCult Studio" });

const B = "/samples/kalaa-jewels";
const TOUR: TourItem[] = [
  { id: "pages", label: "4-page website" },
  { id: "wishlist", label: "Wishlist across pages → send on WhatsApp" },
  { id: "rate-ticker", label: "Live gold-rate ticker", href: B },
  { id: "sheen", label: "Moving gold-light effect", href: B },
  { id: "quick-view", label: "Quick view with zoom + price breakdown", href: B },
  { id: "timeline", label: "Heritage timeline", href: B },
  { id: "filters", label: "Filter by collection, metal and occasion", href: `${B}/collections` },
  { id: "rates", label: "Today's gold & silver rates", href: `${B}/gold-rate` },
  { id: "calculator", label: "Jewellery price calculator", href: `${B}/gold-rate` },
  { id: "appointment", label: "Book a private store appointment", href: `${B}/visit` },
  { id: "map", label: "Google Maps + directions", href: `${B}/visit` },
];

export default function KalaaLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("kalaa-jewels")}>
      <KalaaShell>{children}</KalaaShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
