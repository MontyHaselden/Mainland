import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <h1 className="font-display text-4xl text-navy">About us</h1>
      <p className="mt-4 text-lg text-muted">
        Mainland Building Inspections is an independent inspection company
        serving Canterbury and the wider South Island. We focus on clear
        communication, punctual appointments, and reports that non-specialists
        can actually use.
      </p>
      <p className="mt-6 text-muted">
        Our inspectors combine field experience with structured reporting so
        you understand condition, risk, and next steps — whether you are buying,
        selling, or maintaining your home.
      </p>
    </div>
  );
}
