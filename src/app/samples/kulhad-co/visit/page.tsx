import type { Metadata } from "next";
import { KulhadVisit } from "@/components/samples/kulhad-co/VisitPage";

export const metadata: Metadata = { title: "Visit" };

export default function Page() {
  return <KulhadVisit />;
}
