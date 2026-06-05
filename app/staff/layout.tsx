import { StaffLogoutButton } from "@/components/dashboard/staff-logout-button";
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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <div>
              <p className="font-display text-lg text-navy">
                Mainland — Staff dashboard
              </p>
              <p className="text-xs text-muted">{session.email}</p>
            </div>
            <StaffLogoutButton />
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
