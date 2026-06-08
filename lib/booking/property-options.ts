export const DECADES_BUILT = [
  "2020s",
  "2010s",
  "2000s",
  "1990s",
  "1980s",
  "1970s",
  "1960s",
  "Pre-1960",
  "Unsure",
] as const;

export type DecadeBuilt = (typeof DECADES_BUILT)[number];

export const PROPERTY_TYPES = [
  "Standalone house",
  "Townhouse",
  "Unit",
  "Lifestyle property",
  "Other",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const STOREY_OPTIONS = [
  "Single storey",
  "Two storey",
  "Three storey+",
  "Unsure",
] as const;

export type StoreyOption = (typeof STOREY_OPTIONS)[number];

export const HOMES_CO_NZ_URL = "https://homes.co.nz";

export const FLOOR_AREA_QUICK_SELECTS = [
  { label: "Under 140m²", value: 135 },
  { label: "Around 160m²", value: 160 },
  { label: "Around 185m²", value: 185 },
  { label: "Around 215m²", value: 215 },
  { label: "Around 260m²", value: 260 },
  { label: "300m²+", value: 300 },
  { label: "Unsure", value: null },
] as const;

export function formatFloorAreaDisplay(
  sqm: number | null | undefined,
  legacyBand?: string | null,
): string {
  if (sqm != null) return `~${sqm} m²`;
  if (legacyBand) return legacyBand;
  return "Unsure";
}

export function formatFullPropertyAddress(parts: {
  streetAddress: string;
  suburb: string;
  city: string;
}): string {
  return [parts.streetAddress, parts.suburb, parts.city]
    .map((p) => p.trim())
    .filter(Boolean)
    .join(", ");
}
