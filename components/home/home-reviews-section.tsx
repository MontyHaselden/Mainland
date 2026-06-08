import { GOOGLE_REVIEWS_URL } from "@/lib/seo/business";

export function HomeReviewsSection() {
  return (
    <section
      className="border-y border-border bg-surface"
      aria-labelledby="home-reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="home-reviews-heading"
            className="font-display text-3xl text-navy sm:text-4xl"
          >
            Read Our Google Reviews
          </h2>
          <p className="mt-4 text-lg text-muted">
            See what Canterbury buyers and vendors say about our inspections,
            reporting, and communication.
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-8 font-semibold text-navy transition-colors hover:border-accent/40 hover:text-accent"
          >
            Read Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
