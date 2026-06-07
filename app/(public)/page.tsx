import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { HeroExperience } from "@/components/hero/hero-experience";
import { getMonthAvailability } from "@/lib/booking/availability";
import { NZ_TIMEZONE } from "@/lib/booking/constants";
import Link from "next/link";

const SERVICES = [
  {
    title: "Pre-purchase",
    body: "Know what you're buying before you commit. We document defects, risks, and maintenance priorities.",
  },
  {
    title: "Pre-sale",
    body: "Identify issues early so you can present your property with confidence to buyers.",
  },
  {
    title: "Moisture & weatherproofing",
    body: "Targeted testing and exterior assessments to catch weathertightness concerns.",
  },
  {
    title: "New build staging",
    body: "Independent checks at key construction stages so problems are caught before they're buried.",
  },
  {
    title: "Rental & compliance",
    body: "Healthy Homes and general condition reports for landlords, tenants, and property managers.",
  },
  {
    title: "Specialist follow-up",
    body: "Focused revisits on roofs, subfloors, retaining walls, or areas flagged in a prior report.",
  },
];

const REPORT_INCLUDES = [
  "Written summary in plain language",
  "Photographs of significant defects",
  "Moisture readings where applicable",
  "Maintenance and repair priorities",
  "Same-day verbal overview on request",
];

const PROCESS = [
  {
    step: "1",
    title: "Book online",
    body: "Choose a morning or afternoon slot that suits your timeline and access requirements.",
  },
  {
    step: "2",
    title: "On-site inspection",
    body: "A certified builder inspects accessible areas, documents findings, and tests where needed.",
  },
  {
    step: "3",
    title: "Clear report",
    body: "You receive a structured report so you can negotiate, plan repairs, or proceed with confidence.",
  },
];

export default async function HomePage() {
  const month = format(toZonedTime(new Date(), NZ_TIMEZONE), "yyyy-MM");
  let bookingInitial: Awaited<ReturnType<typeof getMonthAvailability>> | null =
    null;
  try {
    bookingInitial = await getMonthAvailability(month);
  } catch {
    bookingInitial = null;
  }

  return (
    <>
      <HeroExperience bookingInitial={bookingInitial} />

      <section className="relative bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 pt-12 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Certified builders
            </p>
            <h2 className="font-display mt-3 text-3xl text-navy sm:text-4xl">
              Thorough inspections, clear reports
            </h2>
            <p className="mt-4 text-lg text-muted">
              Mainland Building Inspections is led by licensed, certified
              builders — not generalists. We understand how homes are put
              together, what fails over time, and what matters when you are
              buying, selling, or maintaining a property across Canterbury and
              the South Island.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-semibold text-white hover:bg-accent-light"
            >
              Book your inspection
            </Link>
          </div>
        </div>

        <div className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
            <div>
              <h3 className="font-display text-2xl text-navy">
                Why certified builders inspect differently
              </h3>
              <p className="mt-4 text-muted">
                Our team has hands-on building experience — framing, cladding,
                weathertightness, and remediation. That background means we spot
                issues quickly, explain them clearly, and prioritise what is
                urgent versus cosmetic.
              </p>
              <ul className="mt-6 space-y-3 text-muted">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Licensed building practitioners with field experience
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Independent — we work for you, not the agent or vendor
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Practical advice you can act on before settlement
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Punctual appointments and same-week availability where possible
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8">
              <h3 className="font-display text-xl text-navy">
                What your report covers
              </h3>
              <ul className="mt-5 space-y-3 text-muted">
                {REPORT_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-semibold text-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Reports follow a consistent structure so lawyers, lenders, and
                trades can find what they need without chasing clarification.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl text-navy sm:text-3xl">
              Inspection services
            </h3>
            <p className="mt-3 text-muted">
              From first home purchases to pre-sale preparation and targeted
              moisture investigations — we tailor the scope to the property and
              your decision.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SERVICES.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <h4 className="font-display text-xl text-navy">{item.title}</h4>
                <p className="mt-3 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-navy-deep text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <h3 className="font-display text-2xl sm:text-3xl">
              How it works
            </h3>
            <p className="mt-3 max-w-2xl text-white/75">
              A straightforward process designed around your settlement dates and
              access windows.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {PROCESS.map((item) => (
                <article key={item.step} className="rounded-2xl bg-white/5 p-8">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold">
                    {item.step}
                  </span>
                  <h4 className="font-display mt-4 text-xl">{item.title}</h4>
                  <p className="mt-3 text-sm text-white/75">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:pb-24">
          <div className="rounded-2xl border border-border bg-surface p-8 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-12">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl text-navy">
                Serving Canterbury &amp; the South Island
              </h3>
              <p className="mt-3 text-muted">
                We inspect homes across Christchurch, Selwyn, Waimakariri, and
                wider Canterbury, with South Island appointments available by
                arrangement. If you are unsure whether we cover your area, get
                in touch — we will confirm availability and travel before you
                book.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
              <Link
                href="/book"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 font-semibold text-white hover:bg-accent-light"
              >
                Book your inspection
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-6 font-semibold text-navy hover:bg-background"
              >
                About our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
