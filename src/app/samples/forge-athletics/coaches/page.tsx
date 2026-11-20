import type { Metadata } from "next";
import { ForgeCoaches } from "@/components/samples/forge-athletics/CoachesPage";

export const metadata: Metadata = { title: "Coaches" };

export default function Page() {
  return <ForgeCoaches />;
}
