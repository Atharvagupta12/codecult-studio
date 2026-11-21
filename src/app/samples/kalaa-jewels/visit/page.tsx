import type { Metadata } from "next";
import { KalaaVisit } from "@/components/samples/kalaa-jewels/VisitPage";

export const metadata: Metadata = { title: "Visit the Showroom" };

export default function Page() {
  return <KalaaVisit />;
}
