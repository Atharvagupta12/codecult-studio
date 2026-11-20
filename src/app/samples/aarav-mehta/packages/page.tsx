import type { Metadata } from "next";
import { AaravPackages } from "@/components/samples/aarav-mehta/PackagesPage";

export const metadata: Metadata = { title: "Packages & Pricing" };

export default function Page() {
  return <AaravPackages />;
}
