import { ScrollToBookingLink } from "@/components/home/scroll-to-booking-link";

export function StandardPricingCta() {
  return (
    <section
      className="border-t border-border bg-navy-deep text-white"
      aria-labelledby="pricing-cta-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:py-20">
        <h2
          id="pricing-cta-heading"
          className="font-display text-3xl sm:text-4xl"
        >
          Ready to Book?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Check live availability, choose your inspection time and book online in
          minutes.
        </p>
        <ScrollToBookingLink className="mt-10 inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light">
          Check Dates &amp; Pricing
        </ScrollToBookingLink>
      </div>
    </section>
  );
}
