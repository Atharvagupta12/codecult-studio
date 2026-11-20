import type { Metadata } from "next";
import { AaravPortfolio } from "@/components/samples/aarav-mehta/PortfolioPage";

export const metadata: Metadata = { title: "Portfolio" };

export default function Page() {
  return <AaravPortfolio />;
}
