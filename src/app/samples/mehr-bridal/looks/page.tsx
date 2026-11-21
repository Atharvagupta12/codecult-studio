import type { Metadata } from "next";
import { MehrLooks } from "@/components/samples/mehr-bridal/LooksPage";

export const metadata: Metadata = { title: "Find Your Bridal Look" };

export default function Page() {
  return <MehrLooks />;
}
