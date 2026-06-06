import Link from "next/link";
import { SeoOnly } from "@/components/seo/seo-only";
import {
  formatLocationPostcodes,
  getLocationTitle,
  locationPath,
} from "@/lib/seo/location-helpers";
import { LOCATIONS, REGION_LABELS } from "@/lib/seo/locations";

export function SeoLocationLinks() {
  return (
    <SeoOnly>
      <nav aria-label="Building inspection service areas">
        <h2>Building Inspections Across Christchurch &amp; Canterbury</h2>
        <p>
          Mainland Building Inspections services Christchurch CBD, surrounding
          suburbs, and greater Canterbury.
        </p>
        <Link href="/service-areas">Building inspection service areas</Link>
        {(["christchurch", "greater-canterbury"] as const).map((region) => (
          <div key={region}>
            <h3>{REGION_LABELS[region]}</h3>
            <ul>
              {LOCATIONS.filter((l) => l.region === region).map((location) => (
                <li key={location.slug}>
                  <Link href={locationPath(location.slug)}>
                    {getLocationTitle(location)}
                    {location.postcodes.length > 0
                      ? ` — postcodes ${formatLocationPostcodes(location)}`
                      : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </SeoOnly>
  );
}
