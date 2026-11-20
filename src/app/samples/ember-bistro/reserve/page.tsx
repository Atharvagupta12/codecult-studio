import type { Metadata } from "next";
import { EmberReserve } from "@/components/samples/ember/ReservePage";

export const metadata: Metadata = { title: "Reserve a table" };

export default function Page() {
  return <EmberReserve />;
}
