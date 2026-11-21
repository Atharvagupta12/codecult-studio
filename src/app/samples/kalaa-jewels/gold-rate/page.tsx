import type { Metadata } from "next";
import { KalaaGoldRate } from "@/components/samples/kalaa-jewels/GoldRatePage";

export const metadata: Metadata = { title: "Today's Gold Rate" };

export default function Page() {
  return <KalaaGoldRate />;
}
