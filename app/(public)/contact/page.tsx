import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
};

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "03 000 0000";
const EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@mainlandinspections.co.nz";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <h1 className="font-display text-4xl text-navy">Contact</h1>
      <p className="mt-4 text-lg text-muted">
        Ready to book? Use our online calendar for the fastest confirmation.
      </p>
      <dl className="mt-10 space-y-6">
        <div>
          <dt className="text-sm font-semibold text-navy">Phone</dt>
          <dd className="mt-1">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-accent">
              {PHONE}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-navy">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${EMAIL}`} className="text-accent">
              {EMAIL}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-navy">Hours</dt>
          <dd className="mt-1 text-muted">
            Monday – Saturday · Morning &amp; afternoon inspection slots
          </dd>
        </div>
      </dl>
      <Link
        href="/book"
        className="mt-10 inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-semibold text-white hover:bg-accent-light"
      >
        Book online
      </Link>
    </div>
  );
}
