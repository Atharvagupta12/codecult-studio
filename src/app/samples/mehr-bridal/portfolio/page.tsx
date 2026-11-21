import type { Metadata } from "next";
import { MehrPortfolio } from "@/components/samples/mehr-bridal/PortfolioPage";

export const metadata: Metadata = { title: "Bridal Portfolio" };

export default function Page() {
  return <MehrPortfolio />;
}
