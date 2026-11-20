import type { Metadata } from "next";
import { AaravBook } from "@/components/samples/aarav-mehta/BookPage";

export const metadata: Metadata = { title: "Check Availability" };

export default function Page() {
  return <AaravBook />;
}
