import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Inspection Report",
  description:
    "See what a Mainland Building Inspections Spectora report includes — photographs, moisture readings, drone roof imagery, and prioritised findings from a licensed builder.",
  alternates: {
    canonical: "/sample-report",
  },
};

export default function SampleReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Spectora digital reports
      </p>
      <h1 className="font-display mt-3 text-4xl text-navy">
        Sample inspection report
      </h1>
      <p className="mt-5 text-lg text-muted">
        Every Mainland inspection is delivered through Spectora — a premium
        digital reporting platform used by leading inspection companies
        worldwide. Reports include annotated photographs, moisture readings,
        drone roof imagery where captured, and prioritised maintenance
        guidance in plain language.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-display text-xl text-navy">What your report includes</h2>
        <ul className="mt-5 space-y-3 text-muted">
          <li className="flex gap-3">
            <span className="font-semibold text-accent">✓</span>
            Structured summary suitable for lawyers, lenders, and trades
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">✓</span>
            High-resolution photographs of significant defects
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">✓</span>
            Moisture readings and thermal imaging notes where applicable
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">✓</span>
            Drone roof inspection imagery when included in scope
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">✓</span>
            Prioritised repair and maintenance recommendations
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted">
          A full sample report can be provided on request. Contact us or book an
          inspection to experience the Mainland reporting standard firsthand.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/book"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light"
        >
          Book inspection
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-8 font-semibold text-navy transition-colors hover:bg-background"
        >
          Request a sample
        </Link>
      </div>
    </div>
  );
}
