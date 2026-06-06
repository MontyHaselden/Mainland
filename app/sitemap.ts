import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/business";
import { locationPath } from "@/lib/seo/location-helpers";
import { LOCATIONS } from "@/lib/seo/locations";

const STATIC_ROUTES = [
  "",
  "/about",
  "/book",
  "/contact",
  "/services",
  "/service-areas",
  "/sample-report",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${SITE_URL}${locationPath(location.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...locationEntries];
}
