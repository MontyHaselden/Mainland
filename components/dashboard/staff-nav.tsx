"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/staff", label: "Dashboard" },
  { href: "/staff/calendar", label: "Calendar" },
  { href: "/staff/pricing", label: "Pricing" },
];

export function StaffNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 rounded-lg border border-border bg-background p-1">
      {links.map((link) => {
        const active =
          link.href === "/staff"
            ? pathname === "/staff"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-accent text-white"
                : "text-navy hover:bg-surface"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
