import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageTemplate } from "@/components/location/location-page-template";
import {
  getLocationBySlug,
  getLocationMetadata,
  isLocationSlug,
} from "@/lib/seo/location-helpers";
import { LOCATIONS } from "@/lib/seo/locations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isLocationSlug(slug)) return {};
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return getLocationMetadata(location);
}

export default async function LocationSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isLocationSlug(slug)) notFound();
  const location = getLocationBySlug(slug);
  if (!location) notFound();
  return <LocationPageTemplate location={location} />;
}
