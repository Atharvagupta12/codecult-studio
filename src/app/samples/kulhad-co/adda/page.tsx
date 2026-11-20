import type { Metadata } from "next";
import { KulhadAdda } from "@/components/samples/kulhad-co/AddaPage";

export const metadata: Metadata = { title: "Our Adda" };

export default function Page() {
  return <KulhadAdda />;
}
