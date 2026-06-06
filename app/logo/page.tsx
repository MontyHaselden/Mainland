import type { Metadata } from "next";
import Link from "next/link";
import { LOGO_CONCEPTS, LogoLockup } from "@/components/brand/logo-concepts";

export const metadata: Metadata = {
  title: "Logo concepts",
  robots: { index: false, follow: false },
};

export default function LogoConceptsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Internal review
            </p>
            <h1 className="font-display mt-1 text-3xl text-navy sm:text-4xl">
              Logo concepts
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Eight directions for Mainland Building Inspections. Each shown on
              light and dark, with a header lockup preview.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-navy"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:px-8 lg:py-14">
        {LOGO_CONCEPTS.map((concept, index) => (
          <article
            key={concept.id}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold text-accent">
                  Concept {index + 1}
                </p>
                <h2 className="font-display text-2xl text-navy">{concept.name}</h2>
                <p className="text-sm text-muted">{concept.tagline}</p>
              </div>
            </div>

            <p className="border-b border-border px-5 py-3 text-sm text-muted sm:px-6">
              {concept.description}
            </p>

            <div className="grid md:grid-cols-2">
              <div className="flex min-h-[180px] items-center justify-center border-b border-border p-8 md:border-b-0 md:border-r">
                <LogoLockup
                  Mark={concept.Mark}
                  wide={concept.wide}
                  variant="light"
                />
              </div>
              <div className="flex min-h-[180px] items-center justify-center bg-navy-deep p-8">
                <LogoLockup
                  Mark={concept.Mark}
                  wide={concept.wide}
                  variant="dark"
                />
              </div>
            </div>

            {!concept.wide && (
              <div className="grid grid-cols-3 gap-px bg-border sm:grid-cols-6">
                {[16, 24, 32, 40, 48, 64].map((size) => (
                  <div
                    key={size}
                    className="flex flex-col items-center justify-center gap-2 bg-background py-6"
                  >
                    <concept.Mark style={{ width: size, height: size }} />
                    <span className="text-[10px] text-muted">{size}px</span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <footer className="border-t border-border px-5 py-6 text-center text-xs text-muted lg:px-8">
        Temporary review page — not indexed. Delete when a direction is chosen.
      </footer>
    </div>
  );
}
