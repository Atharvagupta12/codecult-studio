import type { Metadata } from "next";
import { KabirProjects } from "@/components/samples/kabir-rao/ProjectsPage";

export const metadata: Metadata = { title: "Projects" };

export default function Page() {
  return <KabirProjects />;
}
