import type { Metadata } from "next";
import { BUSINESS_NAME } from "./business";
import {
  LOCATION_SLUG_PREFIX,
  LOCATIONS,
  type Location,
  type LocationRegion,
} from "./locations";

export function locationPath(slug: string): string {
  return `/${slug}`;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function isLocationSlug(slug: string): boolean {
  return slug.startsWith(LOCATION_SLUG_PREFIX);
}

export function getLocationsByRegion(region: LocationRegion): Location[] {
  return LOCATIONS.filter((l) => l.region === region);
}

export function getLocationTitle(location: Location): string {
  const suffix = ` | ${BUSINESS_NAME}`;
  if (location.h1.endsWith(suffix)) {
    return location.h1.slice(0, -suffix.length);
  }
  return location.h1;
}

export function getLocationLinkLabel(location: Location): string {
  return `Building Inspections ${location.name}`;
}

export function formatLocationPostcodes(location: Location): string {
  return location.postcodes.join(", ");
}

function excerptText(text: string, maxLen = 155): string {
  const full = text.replace(/\s+/g, " ");
  if (full.length <= maxLen) return full;
  const trimmed = full.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace)}…`;
}

export function getLocationMetaDescription(location: Location): string {
  if (location.metaDescription) {
    return excerptText(location.metaDescription);
  }
  if (location.introParagraph) {
    return excerptText(
      `${location.introParagraph} Licensed Building Practitioner with 25+ years experience. Drone roof, moisture testing, thermal imaging and Spectora reports in ${location.name}.`,
    );
  }
  return excerptText(
    `${location.h2} Book with ${BUSINESS_NAME} — drone roof inspections, moisture testing, thermal imaging and detailed Spectora reports.`,
  );
}

export function getLocationMetadata(location: Location): Metadata {
  const title = getLocationTitle(location);
  const description = getLocationMetaDescription(location);

  return {
    title,
    description,
    alternates: {
      canonical: locationPath(location.slug),
    },
    openGraph: {
      title: location.h1,
      description,
      type: "website",
    },
  };
}

export function resolveNearbyLocations(location: Location): Location[] {
  return location.nearbySlugs
    .map((slug) => getLocationBySlug(slug))
    .filter((l): l is Location => l !== undefined);
}
