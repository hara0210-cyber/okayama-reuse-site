import type { MetadataRoute } from "next";
import { getCategories, getNews, getResults } from "@/lib/cms";
import { methods } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, results, news] = await Promise.all([getCategories(), getResults(), getNews()]);
  const staticRoutes = ["", "/methods", "/items", "/results", "/first", "/faq", "/company", "/license", "/contact", "/privacy", "/terms", "/news"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date()
    })),
    ...methods.map((item) => ({
      url: `${siteConfig.url}/methods/${item.slug}`,
      lastModified: new Date()
    })),
    ...categories.map((item) => ({
      url: `${siteConfig.url}/items/${item.slug}`,
      lastModified: new Date()
    })),
    ...results.map((item) => ({
      url: `${siteConfig.url}/results/${item.slug}`,
      lastModified: new Date(item.date)
    })),
    ...news.map((item) => ({
      url: `${siteConfig.url}/news/${item.slug}`,
      lastModified: new Date(item.date)
    }))
  ];
}
