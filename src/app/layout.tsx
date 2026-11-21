import type { Metadata, Viewport } from "next";
import { geist, geistMono, instrument } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO, SITE_URL } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SEO.ogTitle, description: SEO.ogDescription },
  // After verifying the site in Google Search Console, paste the code here:
  // verification: { google: "your-code" },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
