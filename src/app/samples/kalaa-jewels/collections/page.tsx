import type { Metadata } from "next";
import { KalaaCollections } from "@/components/samples/kalaa-jewels/CollectionsPage";

export const metadata: Metadata = { title: "Collections" };

export default function Page() {
  return <KalaaCollections />;
}
