import type { Metadata } from "next";
import { IronpeakPlans } from "@/components/samples/ironpeak/PlansPage";

export const metadata: Metadata = { title: "Plans & Pricing" };

export default function Page() {
  return <IronpeakPlans />;
}
