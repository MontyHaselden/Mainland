import { StaffLogoutButton } from "@/components/dashboard/staff-logout-button";
import { StaffNav } from "@/components/dashboard/staff-nav";
import { getStaffSession } from "@/lib/auth/session";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStaffSession();

  return (
    <div className="min-h-screen bg-background">
      {session && (
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="font-display text-lg text-navy">
                Mainland — Staff dashboard
              </p>
              <p className="text-xs text-muted">{session.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <StaffNav />
              <StaffLogoutButton />
            </div>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
