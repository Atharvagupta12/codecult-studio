import type { Metadata } from "next";
import { KabirExperience } from "@/components/samples/kabir-rao/ExperiencePage";

export const metadata: Metadata = { title: "Experience" };

export default function Page() {
  return <KabirExperience />;
}
