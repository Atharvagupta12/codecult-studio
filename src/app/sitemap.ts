import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Only the CodeCult page goes to Google; the sample sites are fictional and marked noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-11-21"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.jpg`],
    },
  ];
}
