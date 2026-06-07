import Link from "next/link";
import {
  getLocationLinkLabel,
  locationPath,
} from "@/lib/seo/location-helpers";
import { getFeaturedLocations } from "@/lib/seo/locations";

export function SeoLocationLinks() {
  const featuredLocations = getFeaturedLocations();

  return (
    <nav aria-label="Building inspection service areas" className="mt-8">
      <h2 className="font-display text-lg text-navy">
        Areas we serve
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {featuredLocations.map((location) => (
          <li key={location.slug}>
            <Link
              href={locationPath(location.slug)}
              className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              {getLocationLinkLabel(location)}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/service-areas"
            className="inline-flex rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            All service areas
          </Link>
        </li>
      </ul>
    </nav>
  );
}
