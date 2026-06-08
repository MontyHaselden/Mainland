import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "03 000 0000";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 text-navy sm:gap-3"
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="font-display truncate text-lg leading-tight sm:text-xl lg:text-2xl">
            Mainland Building Inspections
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <Link href="/pricing" className="hover:text-navy">
            Pricing
          </Link>
          <Link href="/services" className="hover:text-navy">
            Services
          </Link>
          <Link href="/about" className="hover:text-navy">
            About
          </Link>
          <Link href="/contact" className="hover:text-navy">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="hidden text-sm font-medium text-muted sm:block"
          >
            {PHONE}
          </a>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            Book inspection
          </Link>
        </div>
      </div>
    </header>
  );
}
