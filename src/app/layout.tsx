import type { Metadata, Viewport } from "next";
import { geist, geistMono, instrument } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCult Studio — Websites & WhatsApp + Google setup for businesses",
  description:
    "We design and develop stunning websites for cafés, gyms, salons, boutiques and creators. UI/UX design included at no extra cost. Live in 5–7 days. Based in Indore, working across India.",
  openGraph: {
    title: "CodeCult Studio — Bring your business online",
    description: "Pick a stunning ready design. We customise it for your business and go live in 5–7 days. UI/UX design included.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
