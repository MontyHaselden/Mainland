"use client";

import { Card } from "@/components/ui/card";

type BookingSuccessProps = {
  mode: "preview" | "live";
  customerEmail?: string;
  bookingId?: string | null;
  className?: string;
};

export function BookingSuccess({
  mode,
  customerEmail,
  bookingId,
  className,
}: BookingSuccessProps) {
  return (
    <Card className={className}>
      <h2 className="font-display text-2xl text-navy">
        {mode === "preview" ? "Request received" : "You're booked"}
      </h2>
      <p className="mt-3 text-muted">
        Thanks — your booking request has been received. Mainland Building
        Inspections will review the property details and confirm your
        inspection shortly.
      </p>
      {mode === "live" && customerEmail ? (
        <p className="mt-3 text-sm text-muted">
          We&apos;ve sent a summary to {customerEmail}. We&apos;ll email you
          again once your booking is confirmed.
        </p>
      ) : null}
      {mode === "live" && bookingId ? (
        <p className="mt-4 text-xs text-muted">Reference: {bookingId}</p>
      ) : null}
    </Card>
  );
}
