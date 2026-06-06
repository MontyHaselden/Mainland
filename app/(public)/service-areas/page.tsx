import type { Metadata } from "next";
import Link from "next/link";
import { ServiceAreasGrid } from "@/components/location/service-areas-grid";
import { ServiceAreasMap } from "@/components/location/service-areas-map";
import { SeoOnly } from "@/components/seo/seo-only";
import { formatLocationPostcodes } from "@/lib/seo/location-helpers";
import { LOCATIONS, REGION_LABELS } from "@/lib/seo/locations";

export const metadata: Metadata = {
  title: "Building Inspection Service Areas",
  description:
    "Mainland Building Inspections services Christchurch CBD, surrounding suburbs, and greater Canterbury. View our full coverage map and book a premium building inspection online.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <SeoOnly>
        <div>
          <p>Christchurch &amp; Canterbury</p>
          <h1>Building Inspection Service Areas</h1>
          <p>
            Mainland Building Inspections provides premium pre-purchase building
            inspections, drone roof surveys, moisture testing, thermal imaging,
            and detailed Spectora reports across Christchurch and Canterbury.
            Select your suburb or town below, or book directly if you already
            know your preferred date.
          </p>

          <ServiceAreasMap title="Building inspection service areas across Christchurch and Canterbury" />

          <h2>Service areas by postcode</h2>
          {(["christchurch", "greater-canterbury"] as const).map((region) => (
            <div key={region}>
              <h3>{REGION_LABELS[region]}</h3>
              <ul>
                {LOCATIONS.filter((l) => l.region === region).map((location) => (
                  <li key={location.slug}>
                    {location.name}
                    {location.postcodes.length > 0
                      ? ` — ${formatLocationPostcodes(location)}`
                      : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ServiceAreasGrid />

          <h2>Book a premium building inspection</h2>
          <p>
            Every inspection is carried out by a qualified licensed builder with
            25+ years experience. Morning and afternoon slots are available
            Monday to Saturday.
          </p>
          <Link href="/book">Book inspection</Link>
          <Link href="/sample-report">View sample report</Link>
        </div>
      </SeoOnly>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="font-display text-3xl text-navy sm:text-4xl">
          Book your inspection
        </p>
        <p className="mt-4 text-lg text-muted">
          Premium building inspections across Christchurch and Canterbury.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light"
          >
            Book inspection
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-8 font-semibold text-navy transition-colors hover:bg-surface"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
