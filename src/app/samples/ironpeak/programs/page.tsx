import type { Metadata } from "next";
import { IronpeakPrograms } from "@/components/samples/ironpeak/ProgramsPage";

export const metadata: Metadata = { title: "Programs & Timetable" };

export default function Page() {
  return <IronpeakPrograms />;
}
