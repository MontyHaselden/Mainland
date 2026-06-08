import { HomeBookingCalendar } from "@/components/booking/home-booking-calendar";

export function HomeBookingSection() {
  return (
    <section
      id="booking"
      className="scroll-mt-28 border-b border-border bg-background"
      aria-labelledby="home-booking-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="home-booking-heading"
            className="font-display text-2xl text-navy sm:text-3xl"
          >
            Book your inspection
          </h2>
          <p className="mt-3 text-muted">
            Choose an available date and time, select your floor area package,
            and submit your details. We&apos;ll confirm your inspection shortly.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-4xl">
          <HomeBookingCalendar />
        </div>
      </div>
    </section>
  );
}
