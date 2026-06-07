import type { Metadata } from "next";
import Link from "next/link";
import { ServiceAreasGrid } from "@/components/location/service-areas-grid";
import { ServiceAreasMap } from "@/components/location/service-areas-map";
import { formatLocationPostcodes } from "@/lib/seo/location-helpers";
import { BUSINESS_PHONE } from "@/lib/seo/business";
import { LOCATIONS, REGION_LABELS } from "@/lib/seo/locations";

export const metadata: Metadata = {
  title: "Building Inspection Service Areas",
  description:
    "Mainland Building Inspections services Christchurch, surrounding suburbs, and greater Canterbury. View our full coverage map and book a premium building inspection online.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  const phoneHref = `tel:${BUSINESS_PHONE.replace(/\s/g, "")}`;

  return (
    <>
      <section className="border-b border-border bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Christchurch &amp; Canterbury
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-tight sm:text-5xl">
            Building Inspection Service Areas
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Mainland Building Inspections provides premium pre-purchase building
            inspections, drone roof surveys, moisture testing, thermal imaging,
            and detailed Spectora reports across Christchurch and Canterbury.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light"
            >
              Book inspection
            </Link>
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <ServiceAreasMap title="Building inspection service areas across Christchurch and Canterbury" />

          <div className="mt-16">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              All service areas
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Select your suburb or town below, or book directly if you already
              know your preferred date.
            </p>
            <div className="mt-10">
              <ServiceAreasGrid />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              Service areas by postcode
            </h2>
            {(["christchurch", "greater-canterbury"] as const).map((region) => (
              <div key={region} className="mt-8">
                <h3 className="font-display text-xl text-navy">
                  {REGION_LABELS[region]}
                </h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {LOCATIONS.filter((l) => l.region === region).map(
                    (location) => (
                      <li
                        key={location.slug}
                        className="text-sm text-muted"
                      >
                        <span className="font-medium text-navy">
                          {location.name}
                        </span>
                        {location.postcodes.length > 0
                          ? ` — ${formatLocationPostcodes(location)}`
                          : null}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl sm:text-4xl">
            Book a premium building inspection
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Every inspection is carried out by a qualified licensed builder with
            25+ years experience. Morning and afternoon slots are available
            Monday to Saturday.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light"
            >
              Book inspection
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View sample report
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
