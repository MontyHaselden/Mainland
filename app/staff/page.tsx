import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/auth/session";
import {
  getAllBookings,
  getTodayBookings,
  getUnacknowledgedBookings,
  getUpcomingBookings,
} from "@/lib/booking/queries";
import { NewBookingsPanel } from "@/components/dashboard/new-bookings-panel";
import { TodayPanel } from "@/components/dashboard/today-panel";
import { UpcomingPanel } from "@/components/dashboard/upcoming-panel";
import { CrmTable } from "@/components/dashboard/crm-table";

export default async function StaffDashboardPage() {
  const session = await getStaffSession();
  if (!session) {
    redirect("/staff/login");
  }

  let newBookings: Awaited<ReturnType<typeof getUnacknowledgedBookings>> = [];
  let today: Awaited<ReturnType<typeof getTodayBookings>> = [];
  let upcoming: Awaited<ReturnType<typeof getUpcomingBookings>> = [];
  let all: Awaited<ReturnType<typeof getAllBookings>> = [];
  let dbError = false;

  try {
    [newBookings, today, upcoming, all] = await Promise.all([
      getUnacknowledgedBookings(),
      getTodayBookings(),
      getUpcomingBookings(30),
      getAllBookings(),
    ]);
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      {dbError && (
        <p className="mb-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          Database not connected. Set DATABASE_URL and run migrations.
        </p>
      )}

      <div className="mb-8 flex items-center gap-3">
        <h1 className="font-display text-3xl text-navy">Dashboard</h1>
        {newBookings.length > 0 && (
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
            {newBookings.length} new
          </span>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-navy">
            New bookings — confirm acknowledgment
          </h2>
          <p className="mt-1 text-sm text-muted">
            Bookings are already confirmed for customers. Acknowledge to clear
            the notification.
          </p>
          <div className="mt-6">
            <NewBookingsPanel bookings={newBookings} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-navy">
            Today&apos;s inspections
          </h2>
          <div className="mt-6">
            <TodayPanel bookings={today} />
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Upcoming inspections</h2>
        <div className="mt-6">
          <UpcomingPanel bookings={upcoming} />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">All bookings</h2>
        <div className="mt-6">
          <CrmTable bookings={all} />
        </div>
      </section>
    </div>
  );
}
