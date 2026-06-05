import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-xl">Mainland Building Inspections</p>
          <p className="mt-3 text-sm text-white/70">
            Professional pre-purchase and building inspections across Canterbury
            and the wider South Island.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Pre-purchase inspections</li>
            <li>Pre-sale inspections</li>
            <li>Moisture &amp; weathertightness</li>
            <li>New build staging inspections</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/book" className="text-white/80 hover:text-white">
                Book an inspection
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/80 hover:text-white">
                Contact us
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-xs text-white/50">
            © {new Date().getFullYear()} Mainland Building Inspections. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
