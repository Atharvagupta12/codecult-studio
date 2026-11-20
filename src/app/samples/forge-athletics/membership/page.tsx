import type { Metadata } from "next";
import { ForgeMembership } from "@/components/samples/forge-athletics/MembershipPage";

export const metadata: Metadata = { title: "Membership & Pricing" };

export default function Page() {
  return <ForgeMembership />;
}
