import Link from "next/link";
import { ServiceAreasMap } from "@/components/location/service-areas-map";
import {
  getLocationLinkLabel,
  locationPath,
} from "@/lib/seo/location-helpers";
import { getFeaturedLocations } from "@/lib/seo/locations";

export function HomeAreasSection() {
  const featuredLocations = getFeaturedLocations();

  return (
    <section
      id="service-areas"
      className="bg-background"
      aria-labelledby="home-areas-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Christchurch &amp; Canterbury
          </p>
          <h2
            id="home-areas-heading"
            className="font-display mt-3 text-3xl text-navy sm:text-4xl"
          >
            Areas We Service
          </h2>
          <p className="mt-4 text-lg text-muted">
            Premium building inspections across Christchurch suburbs and greater
            Canterbury. Select your area below or book directly online.
          </p>
        </div>

        <div className="mt-10">
          <ServiceAreasMap title="Building Inspections Across Christchurch and Canterbury" />
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={locationPath(location.slug)}
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                <span className="font-medium text-navy group-hover:text-accent">
                  {getLocationLinkLabel(location)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/service-areas"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 font-semibold text-navy transition-colors hover:bg-background"
          >
            View all service areas
          </Link>
        </div>
      </div>
    </section>
  );
}
