import type { Metadata } from "next";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { getMonthAvailability } from "@/lib/booking/availability";
import { NZ_TIMEZONE } from "@/lib/booking/constants";

export const metadata: Metadata = {
  title: "Book an inspection",
};

export default async function BookPage() {
  const month = format(toZonedTime(new Date(), NZ_TIMEZONE), "yyyy-MM");
  let initialDays: Awaited<ReturnType<typeof getMonthAvailability>>["days"] =
    [];
  try {
    const data = await getMonthAvailability(month);
    initialDays = data.days;
  } catch {
    /* client will load on month change */
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:py-16">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-navy">Book an inspection</h1>
        <p className="mt-2 text-muted">
          Select a date, choose morning or afternoon, and confirm your booking.
          All times are New Zealand (Pacific/Auckland).
        </p>
      </div>
      <BookingWizard initialMonth={month} initialDays={initialDays} />
    </div>
  );
}
