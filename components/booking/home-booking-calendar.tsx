"use client";

import { BookingWizard } from "./booking-wizard";

export function HomeBookingCalendar() {
  return (
    <BookingWizard
      variant="homepage"
      submitMode="live"
      availabilitySource="api"
    />
  );
}
