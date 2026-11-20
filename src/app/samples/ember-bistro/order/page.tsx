import type { Metadata } from "next";
import { EmberOrder } from "@/components/samples/ember/OrderPage";

export const metadata: Metadata = { title: "Order online" };

export default function Page() {
  return <EmberOrder />;
}
