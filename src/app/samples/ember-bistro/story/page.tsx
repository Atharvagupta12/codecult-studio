import type { Metadata } from "next";
import { EmberStory } from "@/components/samples/ember/StoryPage";

export const metadata: Metadata = { title: "Our chef" };

export default function Page() {
  return <EmberStory />;
}
