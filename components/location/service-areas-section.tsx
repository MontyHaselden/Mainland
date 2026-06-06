import Link from "next/link";
import { ServiceAreasGrid } from "@/components/location/service-areas-grid";
import { ServiceAreasMap } from "@/components/location/service-areas-map";
import { SeoOnly } from "@/components/seo/seo-only";
import { formatLocationPostcodes } from "@/lib/seo/location-helpers";
import { LOCATIONS, REGION_LABELS } from "@/lib/seo/locations";

type ServiceAreasSectionProps = {
  showViewAllLink?: boolean;
};

export function ServiceAreasSection({
  showViewAllLink = true,
}: ServiceAreasSectionProps) {
  return (
    <SeoOnly>
    <section
      id="service-areas"
      aria-labelledby="service-areas-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Service coverage
          </p>
          <h2
            id="service-areas-heading"
            className="font-display mt-3 text-3xl text-navy sm:text-4xl"
          >
            Building Inspections Across Christchurch &amp; Canterbury
          </h2>
          <p className="mt-4 text-lg text-muted">
            Mainland Building Inspections services Christchurch CBD, surrounding
            suburbs, and greater Canterbury — from Rolleston and Lincoln to
            Rangiora, Kaiapoi, and the Banks Peninsula. Select your area below
            or book directly online.
          </p>
        </div>

        <div className="mt-10">
          <ServiceAreasMap />
        </div>

        <div className="mt-12">
          <h3>Postcodes serviced</h3>
          {(["christchurch", "greater-canterbury"] as const).map((region) => (
            <div key={region}>
              <h4>{REGION_LABELS[region]}</h4>
              <ul>
                {LOCATIONS.filter((l) => l.region === region).map(
                  (location) => (
                    <li key={location.slug}>
                      {location.name}
                      {location.postcodes.length > 0
                        ? `: ${formatLocationPostcodes(location)}`
                        : null}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
          <ServiceAreasGrid />
        </div>

        {showViewAllLink ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/service-areas"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 font-semibold text-navy transition-colors hover:bg-background"
            >
              View full service areas page
            </Link>
            <Link
              href="/book"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-light"
            >
              Book inspection
            </Link>
          </div>
        ) : null}
      </div>
    </section>
    </SeoOnly>
  );
}
