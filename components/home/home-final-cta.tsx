import { ScrollToBookingLink } from "@/components/home/scroll-to-booking-link";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export function HomeFinalCta() {
  return (
    <section
      className="border-t border-border bg-navy-deep text-white"
      aria-labelledby="home-final-cta-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:py-20">
        <h2
          id="home-final-cta-heading"
          className="font-display text-3xl sm:text-4xl"
        >
          Book Your Building Inspection Today
        </h2>
        <p className="font-display mt-4 text-2xl text-white/90 sm:text-3xl">
          Starting From ${INSPECTION_FROM_PRICE}
        </p>
        <ScrollToBookingLink className="mt-10 inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light">
          Check Dates &amp; Pricing
        </ScrollToBookingLink>
      </div>
    </section>
  );
}
