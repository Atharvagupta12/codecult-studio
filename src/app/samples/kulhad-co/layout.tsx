import type { Metadata } from "next";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { KulhadShell } from "@/components/samples/kulhad-co/Shell";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: { default: "Kulhad Co. · Chai Café in Indore | Sample by CodeCult Studio", template: "%s · Kulhad Co. | Sample by CodeCult Studio" },
  description: "Sample chai café website (Signature, ₹9,999) designed and built by CodeCult Studio.",
};

const B = "/samples/kulhad-co";
const TOUR: TourItem[] = [
  { id: "pages", label: "4-page website (Home, Menu, Adda, Visit)" },
  { id: "special", label: "Today's special banner" },
  { id: "flavours", label: "Interactive chai flavour picker", href: B },
  { id: "reviews", label: "Auto-playing reviews carousel", href: B },
  { id: "events", label: "Weekly events section", href: B },
  { id: "smart-menu", label: "Smart menu: search + filters", href: `${B}/menu` },
  { id: "gallery", label: "Gallery with full-screen viewer", href: `${B}/adda` },
  { id: "open", label: "Live open / closed status", href: `${B}/visit` },
  { id: "map", label: "Google Maps + directions", href: `${B}/visit` },
  { id: "whatsapp", label: "Order on WhatsApp", href: B },
];

export default function KulhadLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("kulhad-co")}>
      <KulhadShell>{children}</KulhadShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
