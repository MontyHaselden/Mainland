import Link from "next/link";
import type { Location } from "@/lib/seo/locations";

type LocationPageVisibleProps = {
  location: Location;
};

export function LocationPageVisible({ location }: LocationPageVisibleProps) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8 lg:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Mainland Building Inspections
      </p>
      <p className="font-display mt-4 text-3xl text-navy sm:text-4xl">
        Book your inspection
      </p>
      <p className="mt-4 text-lg text-muted">
        Premium building inspections across Christchurch and Canterbury —
        including {location.name}. Book a morning or afternoon slot online.
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
  );
}
