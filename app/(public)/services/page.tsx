import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <h1 className="font-display text-4xl text-navy">Our services</h1>
      <p className="mt-4 text-lg text-muted">
        Mainland Building Inspections provides residential and light commercial
        inspections tailored to your transaction stage.
      </p>
      <ul className="mt-12 space-y-10">
        {[
          {
            title: "Pre-purchase building inspections",
            description:
              "A comprehensive visual assessment of accessible areas, documenting significant defects and maintenance items for purchasers.",
          },
          {
            title: "Pre-sale inspections",
            description:
              "Help vendors understand property condition before listing, reducing surprises during due diligence.",
          },
          {
            title: "Moisture detection & weathertightness",
            description:
              "Moisture metre testing and targeted cladding assessments where concerns exist.",
          },
          {
            title: "New build staging inspections",
            description:
              "Stage inspections during construction to catch issues before they are buried in finishes.",
          },
        ].map((s) => (
          <li key={s.title} className="border-b border-border pb-10 last:border-0">
            <h2 className="font-display text-2xl text-navy">{s.title}</h2>
            <p className="mt-3 text-muted">{s.description}</p>
          </li>
        ))}
      </ul>
      <Link
        href="/book"
        className="mt-12 inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-semibold text-white hover:bg-accent-light"
      >
        Book an inspection
      </Link>
    </div>
  );
}
