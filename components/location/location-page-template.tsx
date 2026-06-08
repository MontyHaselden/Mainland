import Link from "next/link";
import { ScrollToBookingLink } from "@/components/home/scroll-to-booking-link";
import { JsonLd } from "@/components/seo/json-ld";
import { LocationPostcodesSeo } from "@/components/seo/location-postcodes-seo";
import {
  BUSINESS_PHONE,
  SAMPLE_REPORT_PATH,
} from "@/lib/seo/business";
import {
  formatLocationPostcodes,
  locationPath,
  resolveNearbyLocations,
} from "@/lib/seo/location-helpers";
import type { Location } from "@/lib/seo/locations";
import {
  locationFaqSchema,
  locationPageSchema,
} from "@/lib/seo/schema";

const WHAT_WE_CHECK = [
  {
    title: "Roof & exterior",
    body: "Roof coverings, flashings, gutters, cladding, and exterior fixings — with drone imagery where access is limited.",
  },
  {
    title: "Moisture-prone areas",
    body: "Subfloors, skirting lines, and cladding junctions tested with moisture metres and thermal imaging.",
  },
  {
    title: "Bathroom & wet areas",
    body: "Showers, baths, tiling, ventilation, and visible waterproofing details in high-risk wet zones.",
  },
  {
    title: "Thermal imaging",
    body: "Infrared scanning to highlight hidden moisture patterns and insulation gaps not visible to the naked eye.",
  },
  {
    title: "Drone roof inspection",
    body: "Aerial roof surveys to document pitch areas, flashings, and defects safely from above.",
  },
  {
    title: "Interior & structural",
    body: "Accessible interior areas, structural observations, and maintenance items documented with photographs.",
  },
  {
    title: "Digital Spectora report",
    body: "A premium interactive report with photographs, moisture readings, and prioritised findings — shareable with your lawyer or lender.",
  },
];

const WHY_MAINLAND = [
  "Licensed Building Practitioner with 25+ years of building experience",
  "Fully insured professional inspection service",
  "Drone roof capability included where appropriate",
  "Detailed Spectora interactive reports — not basic PDF templates",
  "Modern online booking with morning and afternoon slots",
  "Clear, direct communication before and after every inspection",
];

const BOOKING_CTA_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light";

type LocationPageTemplateProps = {
  location: Location;
};

export function LocationPageTemplate({ location }: LocationPageTemplateProps) {
  const nearby = resolveNearbyLocations(location);
  const phoneHref = `tel:${BUSINESS_PHONE.replace(/\s/g, "")}`;

  const faqs = [
    {
      q: `Do you offer pre-purchase building inspections in ${location.name}?`,
      a: `Yes. We provide comprehensive pre-purchase building inspections throughout ${location.name}, documenting roof condition, moisture risk, interior defects, and structural observations in a detailed Spectora report.`,
    },
    {
      q: `Can you inspect the roof with a drone?`,
      a: `Yes. Where safe and appropriate, drone roof inspection is included to capture roof areas that are difficult to assess from ground level — particularly useful for ${location.name} homes with complex roof lines or limited access.`,
    },
    {
      q: `Do you check moisture-prone areas?`,
      a: `Moisture testing is standard. We use moisture metres and thermal imaging to identify damp in bathrooms, kitchens, subfloors, and cladding systems — a critical step for Canterbury properties.`,
    },
    {
      q: `How quickly will I receive my report?`,
      a: `Reports are delivered digitally through Spectora, typically within 24 hours of the inspection. A same-day verbal overview can be arranged on request.`,
    },
    {
      q: `Can I book online?`,
      a: `Yes. Choose a morning or afternoon slot through our online booking calendar. You will receive email confirmation once your inspection is secured.`,
    },
    {
      q: `Do you service nearby suburbs?`,
      a: `Yes. We cover ${location.name} and surrounding areas across Christchurch and Canterbury. Nearby suburbs are listed below, and our full service area is available on the service areas page.`,
    },
    ...(location.postcodes.length > 0
      ? [
          {
            q: `What postcodes do you cover in ${location.name}?`,
            a: `We provide building inspections across ${location.name} including postcodes ${formatLocationPostcodes(location)}. Services include pre-purchase inspections, drone roof surveys, moisture testing, thermal imaging, and Spectora digital reports.`,
          },
        ]
      : []),
  ];

  const introParagraph =
    location.introParagraph ??
    location.intro;

  return (
    <>
      <JsonLd
        data={[
          ...locationPageSchema(location),
          locationFaqSchema(location),
        ]}
      />

      <section className="border-b border-border bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Canterbury · Licensed Building Practitioner · Spectora reports
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {location.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">{location.h2}</p>
          <LocationPostcodesSeo location={location} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ScrollToBookingLink className={BOOKING_CTA_CLASS}>
              Check availability and pricing
            </ScrollToBookingLink>
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS_PHONE}
            </a>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl text-navy sm:text-3xl">
                Building inspection services in {location.name}
              </h2>
              <div className="mt-6 space-y-5 text-lg text-muted">
                <p>{introParagraph}</p>
                {location.seoBodyParagraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {!location.seoBodyParagraphs ? (
                  <p>{location.trustContext}</p>
                ) : null}
              </div>
              <div className="mt-8">
                <ScrollToBookingLink className={BOOKING_CTA_CLASS}>
                  Check availability and pricing
                </ScrollToBookingLink>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-8 lg:self-start">
              <h3 className="font-display text-lg text-navy">What you receive</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Licensed Building Practitioner (LBP) assessment
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Drone roof, moisture meter, and thermal imaging on site
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Spectora interactive reports with fast turnaround
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  25+ years of Canterbury building experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Comprehensive scope
            </p>
            <h2 className="font-display mt-3 text-2xl text-navy sm:text-3xl">
              What we check in {location.name}
            </h2>
            <p className="mt-4 text-muted">
              Every inspection in {location.name} follows a structured,
              builder-led process — combining traditional expertise with drone
              roof photography, moisture testing, thermal imaging, and
              interactive Spectora reports.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_CHECK.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-background p-7"
              >
                <h3 className="font-display text-lg text-navy">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl text-navy sm:text-3xl">
                Why Mainland Building Inspections
              </h2>
              <p className="mt-4 text-muted">
                We are not a one-person checklist operation. Mainland is built
                for buyers and vendors in {location.name} who want
                builder-qualified assessment, modern tools, and reports that
                stand up to due diligence.
              </p>
            </div>
            <ul className="space-y-4 rounded-2xl border border-border bg-surface p-8">
              {WHY_MAINLAND.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span className="font-semibold text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {nearby.length > 0 ? (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              Nearby service areas
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              We also provide premium building inspections in suburbs and towns
              surrounding {location.name}.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {nearby.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={locationPath(area.slug)}
                    className="inline-flex rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    Building Inspections {area.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="inline-flex rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                >
                  View all service areas
                </Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-8 last:border-0">
                <dt className="font-display text-lg text-navy">{faq.q}</dt>
                <dd className="mt-3 text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl sm:text-4xl">
            Book a building inspection in {location.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Check availability and pricing for your {location.name} inspection.
            Drone roof checks, moisture testing, thermal imaging, and a detailed
            Spectora report — carried out by a Licensed Building Practitioner
            with 25+ years experience.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScrollToBookingLink className={BOOKING_CTA_CLASS}>
              Check availability and pricing
            </ScrollToBookingLink>
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS_PHONE}
            </a>
            <Link
              href={SAMPLE_REPORT_PATH}
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
