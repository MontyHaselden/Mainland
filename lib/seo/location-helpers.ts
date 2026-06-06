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
  return `Building Inspections ${location.name}`;
}

export function formatLocationPostcodes(location: Location): string {
  return location.postcodes.join(", ");
}

export function getLocationMetaDescription(location: Location): string {
  return `Book a premium building inspection in ${location.name} with ${BUSINESS_NAME}. Drone roof inspections, moisture testing, thermal imaging and detailed Spectora reports.`;
}

export function getLocationMetadata(location: Location): Metadata {
  return {
    title: getLocationTitle(location),
    description: getLocationMetaDescription(location),
    alternates: {
      canonical: locationPath(location.slug),
    },
    openGraph: {
      title: `${getLocationTitle(location)} | ${BUSINESS_NAME}`,
      description: getLocationMetaDescription(location),
      type: "website",
    },
  };
}

export function resolveNearbyLocations(location: Location): Location[] {
  return location.nearbySlugs
    .map((slug) => getLocationBySlug(slug))
    .filter((l): l is Location => l !== undefined);
}
