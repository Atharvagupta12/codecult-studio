import type { Metadata } from "next";
import { AaravFilms } from "@/components/samples/aarav-mehta/FilmsPage";

export const metadata: Metadata = { title: "Wedding Films" };

export default function Page() {
  return <AaravFilms />;
}
