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
      {mode === "preview" ? (
        <p className="mt-3 text-muted">
          Thanks — your booking request has been received. Mainland Building
          Inspections will confirm your inspection shortly.
        </p>
      ) : (
        <p className="mt-3 text-muted">
          Your inspection is confirmed. A confirmation email has been sent to{" "}
          {customerEmail}.
        </p>
      )}
      {mode === "live" && bookingId ? (
        <p className="mt-4 text-xs text-muted">Reference: {bookingId}</p>
      ) : null}
    </Card>
  );
}
