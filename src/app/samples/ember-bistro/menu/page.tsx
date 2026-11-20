import type { Metadata } from "next";
import { EmberMenu } from "@/components/samples/ember/MenuPage";

export const metadata: Metadata = { title: "Menu" };

export default function Page() {
  return <EmberMenu />;
}
