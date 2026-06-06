import Link from "next/link";
import {
  formatLocationPostcodes,
  getLocationTitle,
  getLocationsByRegion,
  locationPath,
} from "@/lib/seo/location-helpers";
import {
  REGION_LABELS,
  type LocationRegion,
} from "@/lib/seo/locations";

const REGIONS: LocationRegion[] = ["christchurch", "greater-canterbury"];

type ServiceAreasGridProps = {
  showRegionHeadings?: boolean;
  compact?: boolean;
};

export function ServiceAreasGrid({
  showRegionHeadings = true,
  compact = false,
}: ServiceAreasGridProps) {
  return (
    <div className="space-y-10">
      {REGIONS.map((region) => {
        const locations = getLocationsByRegion(region);

        return (
          <div key={region}>
            {showRegionHeadings ? (
              <h3 className="font-display text-xl text-navy sm:text-2xl">
                {REGION_LABELS[region]}
              </h3>
            ) : null}
            <ul
              className={
                compact
                  ? "mt-4 flex flex-wrap gap-2"
                  : "mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }
            >
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={locationPath(location.slug)}
                    className={
                      compact
                        ? "inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-accent/40 hover:bg-accent/5"
                        : "group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
                    }
                  >
                    <span className="font-medium text-navy group-hover:text-accent">
                      {getLocationTitle(location)}
                    </span>
                    {!compact ? (
                      <span className="mt-1 text-sm text-muted">
                        Pre-purchase · Roof · Moisture
                        {location.postcodes.length > 0
                          ? ` · ${formatLocationPostcodes(location)}`
                          : null}
                      </span>
                    ) : location.postcodes.length > 0 ? (
                      <span className="sr-only">
                        Postcodes {formatLocationPostcodes(location)}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
