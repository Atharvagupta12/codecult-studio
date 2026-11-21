import type { Metadata } from "next";
import { MehrAcademy } from "@/components/samples/mehr-bridal/AcademyPage";

export const metadata: Metadata = { title: "Makeup Academy" };

export default function Page() {
  return <MehrAcademy />;
}
