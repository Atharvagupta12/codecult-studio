import type { Metadata } from "next";
import { ForgeTrial } from "@/components/samples/forge-athletics/TrialPage";

export const metadata: Metadata = { title: "Book a Free Trial" };

export default function Page() {
  return <ForgeTrial />;
}
