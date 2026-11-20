import type { Metadata } from "next";
import { KabirShell } from "@/components/samples/kabir-rao/Shell";
import { DemoChrome, type TourItem } from "@/components/samples/shared/DemoChrome";
import { DemoProvider } from "@/components/samples/shared/DemoProvider";
import { getSample } from "@/data/samples";

export const metadata: Metadata = {
  title: { default: "Kabir Rao · Full-stack Developer | Sample by CodeCult Studio", template: "%s · kabir.dev | Sample by CodeCult Studio" },
  description: "Sample developer portfolio (Signature, ₹9,999) designed and built by CodeCult Studio.",
};

const B = "/samples/kabir-rao";
const TOUR: TourItem[] = [
  { id: "pages", label: "4-page portfolio + case-study pages" },
  { id: "terminal", label: "Interactive terminal: type `help`", href: B },
  { id: "cmdk", label: "⌘K quick search" },
  { id: "projects", label: "Featured projects with live UI previews", href: B },
  { id: "github", label: "GitHub-style activity graph", href: B },
  { id: "resume", label: "One-click resume download", href: B },
  { id: "project-filters", label: "Filter by tech stack + search", href: `${B}/projects` },
  { id: "case-study", label: "Full case-study pages", href: `${B}/projects/paylo` },
  { id: "timeline", label: "Animated career timeline", href: `${B}/experience` },
  { id: "skills", label: "Skill meters", href: `${B}/experience` },
  { id: "contact-form", label: "Contact form that sends to WhatsApp", href: `${B}/contact` },
  { id: "booking", label: "Book a 15-min call", href: `${B}/contact` },
];

export default function KabirLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider sample={getSample("kabir-rao")}>
      <KabirShell>{children}</KabirShell>
      <DemoChrome tourItems={TOUR} />
    </DemoProvider>
  );
}
