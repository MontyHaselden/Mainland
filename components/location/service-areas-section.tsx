import Link from "next/link";
import { ServiceAreasGrid } from "@/components/location/service-areas-grid";
import { ServiceAreasMap } from "@/components/location/service-areas-map";
import {
  getLocationLinkLabel,
  locationPath,
} from "@/lib/seo/location-helpers";
import { getFeaturedLocations } from "@/lib/seo/locations";

type ServiceAreasSectionProps = {
  showViewAllLink?: boolean;
};

export function ServiceAreasSection({
  showViewAllLink = true,
}: ServiceAreasSectionProps) {
  const featuredLocations = getFeaturedLocations();

  return (
    <section
      id="service-areas"
      aria-labelledby="service-areas-heading"
      className="border-t border-border bg-surface"
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
            Mainland Building Inspections services Christchurch, surrounding
            suburbs, and greater Canterbury — from Rolleston and Lincoln to
            Rangiora, Kaiapoi, and the Banks Peninsula. Select your area below
            or book directly online.
          </p>
        </div>

        <div className="mt-10">
          <ServiceAreasMap />
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl text-navy sm:text-2xl">
            Popular service areas
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredLocations.map((location) => (
              <li key={location.slug}>
                <Link
                  href={locationPath(location.slug)}
                  className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
                >
                  <span className="font-medium text-navy group-hover:text-accent">
                    {getLocationLinkLabel(location)}
                  </span>
                  <span className="mt-1 text-sm text-muted">{location.h2}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {showViewAllLink ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/service-areas"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-6 font-semibold text-navy transition-colors hover:bg-surface"
            >
              View all service areas
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
  );
}
