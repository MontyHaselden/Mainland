import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/auth/session";
import {
  getAllBookings,
  getTodayBookings,
  getUnacknowledgedBookings,
  getUpcomingBookings,
} from "@/lib/booking/queries";
import {
  getAllContactMessages,
  getUnacknowledgedContactMessages,
} from "@/lib/contact/queries";
import { StaffDashboardClient } from "@/components/dashboard/staff-dashboard-client";

export default async function StaffDashboardPage() {
  const session = await getStaffSession();
  if (!session) {
    redirect("/staff/login");
  }

  let newBookings: Awaited<ReturnType<typeof getUnacknowledgedBookings>> = [];
  let today: Awaited<ReturnType<typeof getTodayBookings>> = [];
  let upcoming: Awaited<ReturnType<typeof getUpcomingBookings>> = [];
  let all: Awaited<ReturnType<typeof getAllBookings>> = [];
  let newContactMessages: Awaited<
    ReturnType<typeof getUnacknowledgedContactMessages>
  > = [];
  let allContactMessages: Awaited<ReturnType<typeof getAllContactMessages>> = [];
  let dbError = false;

  try {
    [newBookings, today, upcoming, all, newContactMessages, allContactMessages] =
      await Promise.all([
        getUnacknowledgedBookings(),
        getTodayBookings(),
        getUpcomingBookings(30),
        getAllBookings(),
        getUnacknowledgedContactMessages(),
        getAllContactMessages(),
      ]);
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <StaffDashboardClient
        newBookings={newBookings}
        today={today}
        upcoming={upcoming}
        all={all}
        newContactMessages={newContactMessages}
        allContactMessages={allContactMessages}
        dbError={dbError}
      />
    </div>
  );
}
