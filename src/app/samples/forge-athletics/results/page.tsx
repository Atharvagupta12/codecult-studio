import type { Metadata } from "next";
import { ForgeResults } from "@/components/samples/forge-athletics/ResultsPage";

export const metadata: Metadata = { title: "Results & Case Studies" };

export default function Page() {
  return <ForgeResults />;
}
