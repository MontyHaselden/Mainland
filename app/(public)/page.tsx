import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { HeroExperience } from "@/components/hero/hero-experience";
import { getMonthAvailability } from "@/lib/booking/availability";
import { NZ_TIMEZONE } from "@/lib/booking/constants";
import Link from "next/link";

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

      <section className="relative z-30 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Thorough inspections, clear reports
            </h2>
            <p className="mt-4 text-lg text-muted">
              We help buyers and sellers make confident decisions with detailed
              building inspections, moisture testing, and practical guidance from
              experienced inspectors.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-semibold text-white hover:bg-accent-light"
            >
              Book your inspection
            </Link>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 lg:grid-cols-3 lg:px-8">
          {[
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
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <h3 className="font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-3 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
