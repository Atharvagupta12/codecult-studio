import type { Metadata } from "next";
import { KabirContact } from "@/components/samples/kabir-rao/ContactPage";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <KabirContact />;
}
