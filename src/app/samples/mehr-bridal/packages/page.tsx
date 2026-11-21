import type { Metadata } from "next";
import { MehrPackages } from "@/components/samples/mehr-bridal/PackagesPage";

export const metadata: Metadata = { title: "Bridal Packages & Pricing" };

export default function Page() {
  return <MehrPackages />;
}
