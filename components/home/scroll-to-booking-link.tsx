"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type ScrollToBookingLinkProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollToBookingLink({
  children,
  className,
}: ScrollToBookingLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = isHome ? "#booking" : "/#booking";

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;

    e.preventDefault();
    const target = document.getElementById("booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
