import type { Metadata } from "next";

// Sample sites are demos of fictional businesses: keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
