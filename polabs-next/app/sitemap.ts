import type { MetadataRoute } from "next";
import { guides } from "./guides/guides-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const guideUrls = guides.map((guide) => ({
    url: `https://polabs.co.kr/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://polabs.co.kr",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://polabs.co.kr/guides",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideUrls,
  ];
}
