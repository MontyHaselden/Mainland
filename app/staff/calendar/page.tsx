import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/auth/session";
import { StaffCalendar } from "@/components/dashboard/staff-calendar";

export default async function StaffCalendarPage() {
  const session = await getStaffSession();
  if (!session) {
    redirect("/staff/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-navy">Calendar</h1>
        <p className="mt-2 text-sm text-muted">
          View bookings and block morning or afternoon slots. Blocked days show
          as unavailable on the public booking page.
        </p>
      </div>
      <StaffCalendar />
    </div>
  );
}
