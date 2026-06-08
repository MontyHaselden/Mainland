"use client";

import { usePathname } from "next/navigation";
import { ServiceAreasSection } from "@/components/location/service-areas-section";
import { LOCATION_SLUG_PREFIX } from "@/lib/seo/locations";

export function ServiceAreasLayoutGate() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/service-areas" ||
    pathname.startsWith(`/${LOCATION_SLUG_PREFIX}`)
  ) {
    return null;
  }

  return <ServiceAreasSection />;
}
