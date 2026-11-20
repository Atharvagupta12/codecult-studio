import type { Metadata } from "next";
import { ForgePrograms } from "@/components/samples/forge-athletics/ProgramsPage";

export const metadata: Metadata = { title: "Programs" };

export default function Page() {
  return <ForgePrograms />;
}
