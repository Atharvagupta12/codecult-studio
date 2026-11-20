import type { Metadata } from "next";
import { AaravStories } from "@/components/samples/aarav-mehta/StoriesPage";

export const metadata: Metadata = { title: "Love Stories" };

export default function Page() {
  return <AaravStories />;
}
