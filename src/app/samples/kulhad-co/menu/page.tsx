import type { Metadata } from "next";
import { KulhadMenu } from "@/components/samples/kulhad-co/MenuPage";

export const metadata: Metadata = { title: "Menu" };

export default function Page() {
  return <KulhadMenu />;
}
