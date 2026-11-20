import type { Metadata } from "next";
import { EmberEvents } from "@/components/samples/ember/EventsPage";

export const metadata: Metadata = { title: "Events & private dining" };

export default function Page() {
  return <EmberEvents />;
}
