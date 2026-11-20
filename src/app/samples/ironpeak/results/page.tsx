import type { Metadata } from "next";
import { IronpeakResults } from "@/components/samples/ironpeak/ResultsPage";

export const metadata: Metadata = { title: "Results & Coaches" };

export default function Page() {
  return <IronpeakResults />;
}
