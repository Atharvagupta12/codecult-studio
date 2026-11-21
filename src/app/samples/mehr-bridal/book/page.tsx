import type { Metadata } from "next";
import { MehrBook } from "@/components/samples/mehr-bridal/BookPage";

export const metadata: Metadata = { title: "Check Availability" };

export default function Page() {
  return <MehrBook />;
}
